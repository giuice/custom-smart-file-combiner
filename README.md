# Custom Smart File Combiner

A VS Code extension that combines multiple source files and folders into a single .txt file for documentation, review, or AI ingestion. This is an enhanced version of the "Smart File Combiner" extension with configurable ignore patterns.

[![Version](https://img.shields.io/visual-studio-marketplace/v/your-publisher-name.custom-smart-file-combiner)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.custom-smart-file-combiner)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/your-publisher-name.custom-smart-file-combiner)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.custom-smart-file-combiner)
[![Ratings](https://img.shields.io/visual-studio-marketplace/r/your-publisher-name.custom-smart-file-combiner)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.custom-smart-file-combiner)

## Features

- Combine all files in a workspace into a single `combined.txt` file
- Configurable ignore patterns for files, folders, and file name patterns
- Supports both glob patterns (e.g., `*.ds.ts`) and regex patterns (e.g., `\.log$`)
- Handles `.env` files specially (replaces values with placeholders)
- Works with any file type
- Preserves file paths as comments in the output

## Installation

### From VS Code Marketplace (Recommended)

1. Open Visual Studio Code
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for "Custom Smart File Combiner"
4. Click "Install"

### Local Installation (For Development or Private Use)

You can use this extension locally without publishing it to the marketplace. See [LOCAL_USAGE.md](LOCAL_USAGE.md) for detailed instructions on:

- Installing from a VSIX package
- Using symbolic links for development
- Copying files directly to the extensions directory

## Configuration

The extension can be configured through VS Code settings:

- `customSmartFileCombiner.ignoreFiles`: Array of file names to ignore (e.g., `["secret.txt", "temp.log"]`)
- `customSmartFileCombiner.ignorePatterns`: Array of patterns to ignore - supports both glob patterns (e.g., `["*.ds.ts", "*.md"]`) and regex patterns (e.g., `["\.log$"]`)
- `customSmartFileCombiner.ignoreFolders`: Array of folder names to ignore (e.g., `["node_modules", "dist"]`)

### Pattern Matching Examples

```json
{
  "customSmartFileCombiner.ignorePatterns": [
    "*.ds.ts",        // Glob pattern - matches any file ending with .ds.ts
    "*.ds.ts.map",    // Glob pattern - matches any file ending with .ds.ts.map
    "*.mdc",          // Glob pattern - matches any file ending with .mdc
    "*.md",           // Glob pattern - matches any file ending with .md
    "\\.log$",        // Regex pattern - matches any file ending with .log
    "^\\..*",         // Regex pattern - matches any file starting with a dot
    ".*\\.tmp$"       // Regex pattern - matches any file ending with .tmp
  ]
}
```

Glob patterns are automatically detected by the presence of wildcard characters (`*`, `?`, `[`). All other patterns are treated as regular expressions.

## Usage

1. Open a folder in VS Code
2. Right-click on the folder in the explorer
3. Select "Custom Combine Files/Folders into TXT"
4. The combined file will be created as `combined.txt` in the root of your workspace

## Default Ignored Items

The extension ignores the following by default:

### Folders
- `node_modules`
- `dist`
- `build`
- `out`
- `coverage`
- `__pycache__`
- `venv`
- `.venv`
- `.idea`
- `.vscode`
- `logs`
- `deploy`
- `temp`
- `tmp`
- `.git`
- `.svn`
- `.hg`
- `.cache`

### Files
- `package-lock.json`
- `yarn.lock`
- `.DS_Store`
- `Thumbs.db`

### Patterns
- `*.log`
- `*.bak`
- `*.swp`
- `~`
- `#*#`
- `*.iml`
- `*.class`
- `*.jar`
- `*.war`
- `*.pyc`

## Development

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to compile the TypeScript code
4. Press `F5` to launch a new VS Code window with the extension loaded

### Development Scripts

- `npm run compile`: Compile the TypeScript code
- `npm run watch`: Compile and watch for changes
- `npm run test`: Run tests (if any)
- `npm run package`: Package the extension as a .vsix file

## Publishing

To publish the extension to the VS Code Marketplace:

1. Install vsce: `npm install -g vsce`
2. Create a publisher: `vsce create-publisher <publisher-name>`
3. Get a Personal Access Token (PAT) from Azure DevOps
4. Login with vsce: `vsce login <publisher-name>`
5. Package and publish: `vsce publish`

For detailed publishing instructions, see [PUBLISHING.md](PUBLISHING.md).

## Local Usage

For instructions on using this extension locally without publishing to the marketplace, see [LOCAL_USAGE.md](LOCAL_USAGE.md).

## Contributing

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes with a clear commit message
6. Push to your fork
7. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on the original "Smart File Combiner" extension by Vineet Kumar Motwani
- Uses TypeScript and VS Code Extension API
- Uses minimatch library for glob pattern matching

## Note

The `images/icon.png` file is a placeholder. When publishing to the marketplace, replace it with a proper 128x128 pixel PNG icon.