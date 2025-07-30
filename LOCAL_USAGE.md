# Using the Custom Smart File Combiner Extension Locally

You can use this extension in your other projects without publishing it to the VS Code Marketplace. This is useful for development, testing, or private use.

## Method 1: Direct Installation from VSIX (Recommended)

### 1. Package the Extension

First, you need to create a `.vsix` file from the extension:

```bash
# Install vsce if you haven't already
npm install -g vsce

# Navigate to the extension directory
cd /path/to/custom-smart-file-combiner

# Package the extension
vsce package
```

This will create a `.vsix` file in the root directory with a name like `custom-smart-file-combiner-1.0.0.vsix`.

### 2. Install in Your Other Project

1. Open VS Code in your other project
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. Type "Install from VSIX" and select "Extensions: Install from VSIX..."
4. Navigate to and select the `.vsix` file you created
5. VS Code will install the extension locally

### 3. Verify Installation

1. Open the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`)
2. You should see "Custom Smart File Combiner" listed under "Installed" extensions
3. The install button should now say "Manage"

## Method 2: Symbolic Link Installation (For Development)

If you're actively developing the extension and want changes to be reflected immediately:

### 1. Create a VS Code Extensions Directory (if it doesn't exist)

```bash
# On Windows
mkdir %USERPROFILE%\.vscode\extensions

# On macOS/Linux
mkdir -p ~/.vscode/extensions
```

### 2. Create a Symbolic Link

```bash
# On Windows (requires Administrator privileges)
mklink /D %USERPROFILE%\.vscode\extensions\your-publisher-name.custom-smart-file-combiner C:\path\to\custom-smart-file-combiner

# On macOS/Linux
ln -s /path/to/custom-smart-file-combiner ~/.vscode/extensions/your-publisher-name.custom-smart-file-combiner
```

### 3. Restart VS Code

After creating the symbolic link, restart VS Code to load the extension.

## Method 3: Copy Files Directly

### 1. Locate Your VS Code Extensions Directory

```bash
# On Windows
%USERPROFILE%\.vscode\extensions

# On macOS
~/.vscode/extensions

# On Linux
~/.vscode/extensions
```

### 2. Copy Extension Files

1. Create a new directory in the extensions folder:
   `your-publisher-name.custom-smart-file-combiner-1.0.0`
2. Copy all files from this extension project to that directory:
   - `package.json`
   - `out/` directory (compiled JavaScript)
   - `images/` directory
   - `LICENSE`
   - `README.md`
   - Any other necessary files

### 3. Restart VS Code

Restart VS Code to load the extension.

## Configuring the Extension for Your Project

After installation, you can configure the extension for your specific project:

### 1. Workspace Settings

Create or modify `.vscode/settings.json` in your project root:

```json
{
  "customSmartFileCombiner.ignoreFiles": [
    "secret.txt",
    "temp.log"
  ],
  "customSmartFileCombiner.ignorePatterns": [
    "*.ds.ts",
    "*.ds.ts.map",
    "*.mdc",
    "*.md",
    "\\.log$",
    "^\\..*"
  ],
  "customSmartFileCombiner.ignoreFolders": [
    "node_modules",
    "dist",
    "build",
    "temp"
  ]
}
```

### 2. Pattern Matching

The extension now supports both glob patterns and regular expressions:

- **Glob Patterns**: Automatically detected by the presence of wildcard characters (`*`, `?`, `[`)
  - `*.ds.ts` - Matches any file ending with `.ds.ts`
  - `*.md` - Matches any file ending with `.md`
  - `test.*` - Matches any file starting with `test.`

- **Regular Expressions**: All other patterns are treated as regular expressions
  - `\.log$` - Matches any file ending with `.log`
  - `^\.git` - Matches any file or folder starting with `.git`

### 3. User Settings

You can also configure globally in VS Code User Settings:

1. Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
2. Search for "Custom Smart File Combiner"
3. Configure the settings as needed

## Using the Extension

1. Open your project in VS Code
2. Right-click on any folder in the Explorer
3. Select "Custom Combine Files/Folders into TXT"
4. The combined file will be created as `combined.txt` in the root of your workspace

## Updating the Extension

### For VSIX Installation

1. Create a new VSIX package with updated code
2. Uninstall the old extension:
   - Open Extensions view
   - Find "Custom Smart File Combiner"
   - Click the gear icon and select "Uninstall"
3. Install the new VSIX file using the same method as before

### For Symbolic Link Installation

Changes are reflected immediately since the extension is linked directly to your source code.

### For Direct Copy Installation

1. Remove the old extension directory from `~/.vscode/extensions/`
2. Copy the updated files to the same location
3. Restart VS Code

## Troubleshooting

### Extension Not Appearing

1. Ensure VS Code was restarted after installation
2. Check that the extension files are in the correct directory
3. Verify the `package.json` file exists and is valid

### Extension Not Working

1. Check the VS Code Developer Tools:
   - Open Command Palette
   - Run "Developer: Reload Window"
   - Run "Developer: Toggle Developer Tools"
   - Check the Console tab for errors

2. Verify that the compiled JavaScript files exist in the `out/` directory

### Configuration Issues

1. Ensure JSON syntax is correct in settings files
2. Check that file paths in configuration are correct
3. Restart VS Code after making configuration changes

## Development Workflow

If you're actively developing the extension for your project:

1. Use the symbolic link method for immediate feedback
2. Run `npm run watch` in the extension directory to automatically recompile on changes
3. Use `Ctrl+R` or `Cmd+R` in the VS Code window with your extension to reload it

This approach allows you to develop and test the extension alongside your project without needing to repeatedly package and install it.