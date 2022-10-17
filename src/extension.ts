// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import CanvasPanel from "./CanvasPanel";
import PaperScriptCanvasPanel from "./PaperScriptCanvasPanel";
import TimerlessCanvasPanel from "./TimerlessCanvasPanel";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("dwitterer.start", () => {
      CanvasPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("dwitterer.doRefactor", () => {
      if (CanvasPanel.currentPanel) {
        CanvasPanel.currentPanel.doRefactor();
      }
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("dwitterer.timerless.start", () => {
      TimerlessCanvasPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("dwitterer.timerless.doRefactor", () => {
      if (TimerlessCanvasPanel.currentPanel) {
        TimerlessCanvasPanel.currentPanel.doRefactor();
      }
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("dwitterer.paperscript.start", () => {
      PaperScriptCanvasPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("dwitterer.paperscript.doRefactor", () => {
      if (PaperScriptCanvasPanel.currentPanel) {
        PaperScriptCanvasPanel.currentPanel.doRefactor();
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
