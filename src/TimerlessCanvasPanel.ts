import * as vscode from "vscode";
import path = require("path");
import fs = require("fs");
class TimerlessCanvasPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: TimerlessCanvasPanel | undefined;

  public static readonly viewType = "dwitterer.timerless.canvasView";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (TimerlessCanvasPanel.currentPanel) {
      TimerlessCanvasPanel.currentPanel._panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      TimerlessCanvasPanel.viewType,
      "Dwitterer Timerless",
      column || vscode.ViewColumn.One,
      getWebviewOptions(extensionUri)
    );

    TimerlessCanvasPanel.currentPanel = new TimerlessCanvasPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    TimerlessCanvasPanel.currentPanel = new TimerlessCanvasPanel(panel, extensionUri);
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
    TimerlessCanvasPanel.currentPanel = undefined;

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
  <title>Script Canvas</title>
  <style>
  canvas {
    width: 100%;
  }
  </style>
</head>
<body translate="no" >
  <canvas id="canvas"></canvas>
  <script id="rendered-js" type="module">
  let zzfx,zzfxV,zzfxX
  // ZzFXMicro - Zuper Zmall Zound Zynth - v1.1.8 ~ 884 bytes minified
  zzfxV=.3    // volume
  zzfx=       // play sound
  (p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let
  M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0
  ,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+
  r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1)
  ,-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:
  -1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/
  2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)
  +1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.createBuffer(1,h,R);p.
  getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination
  );b.start();return b};zzfxX=new (window.AudioContext||webkitAudioContext) // audio context
  const canvas =  document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const c = canvas
  const x = context
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

export default TimerlessCanvasPanel;
