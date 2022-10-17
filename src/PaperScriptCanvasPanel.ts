import * as vscode from "vscode";
import path = require("path");
import fs = require("fs");
class PaperScriptCanvasPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: PaperScriptCanvasPanel | undefined;

  public static readonly viewType = "dwitterer.paperscript.canvasView";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (PaperScriptCanvasPanel.currentPanel) {
      PaperScriptCanvasPanel.currentPanel._panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      PaperScriptCanvasPanel.viewType,
      "Dwitterer PaperScript",
      column || vscode.ViewColumn.One,
      getWebviewOptions(extensionUri)
    );

    PaperScriptCanvasPanel.currentPanel = new PaperScriptCanvasPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    PaperScriptCanvasPanel.currentPanel = new PaperScriptCanvasPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Update the content based on view changes
    this._panel.onDidChangeViewState(
      (e) => {
        if (this._panel.visible) {
          this._update();
        }
      },
      null,
      this._disposables
    );

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "alert":
            vscode.window.showErrorMessage(message.text);
            return;
        }
      },
      null,
      this._disposables
    );
  }

  public doRefactor() {
    // Send a message to the webview webview.
    // You can send any JSON serializable data.
    this._panel.webview.postMessage({ command: "refactor" });
  }

  public dispose() {
    PaperScriptCanvasPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update() {
    const webview = this._panel.webview;
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    // const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));

    const editor = vscode.window.activeTextEditor;
    let scriptCode = "";
    if (editor) {
      const document = editor.document;
      scriptCode = document.getText();
      // trim leading and trailing newlines
      scriptCode = scriptCode.replace(/^\s+|\s+$/g, "");
    }

    // Do the same for the stylesheet.
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.css")
    );
    const paperMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "paper.js")
    );
    const jqueryMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "jquery.js")
    );

    // load  source file located in ./src/script-canvas.js
    // which we will add to the webview html
    const scriptCanvasSource = fs.readFileSync(
      path.join(__dirname, "../media", "script-canvas.js"),
      "utf8"
    );
    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    const returnHtml = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">
        <link href="https://unpkg.com/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
				<title>Script Canvas</title>
        <style>
        canvas {
          width: 100%;
        }
        </style>
        <script src="${paperMainUri}" type="module">
        <script src="${jqueryMainUri}" type="module">
			</head>
      <body translate="no" >
      <canvas id="canvas"></canvas>
      <script type="text/paperscript" canvas="canvas">
      ${scriptCode}
      </script>
      </body>
	    </html>`;
    return returnHtml;
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
  return {
    // Enable javascript in the webview
    enableScripts: true,

    // And restrict the webview to only loading content from our extension's `media` directory.
    localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
  };
}

export default PaperScriptCanvasPanel;
