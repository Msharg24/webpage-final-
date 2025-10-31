import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("✅ ABCode extension activated!");

  const disposable = vscode.workspace.onDidSaveTextDocument((document) => {
    if (document.languageId === "python") {
      const dashboardUrl = "http://localhost:3000/"; // your Vite UI
      vscode.env.openExternal(vscode.Uri.parse(dashboardUrl));
      console.log("🐍 Python file saved → Opened ABCode Dashboard");
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
