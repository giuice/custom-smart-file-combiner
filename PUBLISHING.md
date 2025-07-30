# Publishing and Installing the Custom Smart File Combiner Extension

## Publishing to the VS Code Marketplace

To publish this extension to the VS Code Marketplace, follow these steps:

### 1. Prerequisites

1. **Create a Publisher Account**:
   - Go to the [Visual Studio Marketplace publisher page](https://marketplace.visualstudio.com/manage)
   - Sign in with your Microsoft account
   - Create a new publisher by clicking "Create publisher"
   - Fill in the required information:
     - Publisher name (must be unique)
     - Publisher display name
     - Contact email
     - Website URL (optional)
     - Description (optional)

2. **Install Required Tools**:
   ```bash
   npm install -g vsce
   ```

### 2. Prepare the Extension

1. **Update package.json**:
   - Ensure your `package.json` has all required fields:
     - `name`: Must be unique and match your publisher name prefix
     - `publisher`: Must match your publisher name exactly
     - `version`: Increment the version number
     - `engines.vscode`: Specify the minimum VS Code version
     - `repository`: Include your repository URL
     - `icon`: Add a 128x128 pixel icon (optional but recommended)

2. **Verify Extension**:
   ```bash
   vsce package --out custom-smart-file-combiner.vsix
   ```
   This creates a `.vsix` file that can be installed locally for testing.

3. **Test the Extension**:
   - Install the extension locally:
     ```bash
     code --install-extension custom-smart-file-combiner.vsix
     ```
   - Test all functionality including the configurable ignore patterns
   - Uninstall when done testing:
     ```bash
     code --uninstall-extension your-publisher-name.custom-smart-file-combiner
     ```

### 3. Publish to Marketplace

1. **Get a Personal Access Token (PAT)**:
   - Go to [Azure DevOps](https://dev.azure.com/)
   - Create an organization if you don't have one
   - Go to User settings > Personal access tokens
   - Create a new token with the following settings:
     - Organization: All accessible organizations
     - Scopes: Marketplace (Acquire, Manage)
     - Expiration: Set an appropriate expiration date

2. **Login to vsce**:
   ```bash
   vsce login your-publisher-name
   ```
   Enter your PAT when prompted.

3. **Publish the Extension**:
   ```bash
   vsce publish
   ```
   This will:
   - Package the extension
   - Validate the package
   - Upload it to the marketplace
   - Make it available for installation

4. **Verify Publication**:
   - Go to your publisher page on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
   - You should see your extension listed
   - Check that all metadata is correct
   - Verify the extension page looks good

### 4. Post-Publication

1. **Update Documentation**:
   - Add installation instructions to README
   - Include marketplace badge in README:
     ```markdown
     [![Install](https://img.shields.io/visual-studio-marketplace/i/your-publisher-name.custom-smart-file-combiner)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.custom-smart-file-combiner)
     ```

2. **Monitor Feedback**:
   - Check the marketplace page for reviews
   - Address any issues reported by users
   - Update the extension as needed

## Installing from the Extension Marketplace

### Prerequisites
- Visual Studio Code version 1.101.0 or higher (as specified in package.json)

### Installation Steps

1. **Open VS Code**

2. **Open Extensions View**:
   - Click on the Extensions icon in the Activity Bar on the side of the window
   - Or use the shortcut `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)

3. **Search for the Extension**:
   - In the search box, type "Custom Smart File Combiner"
   - Or search by publisher name if you know it

4. **Install the Extension**:
   - Click on the extension in the search results
   - Click the "Install" button

5. **Verify Installation**:
   - After installation, you should see a "Manage" button instead of "Install"
   - The extension will be listed in your installed extensions

### Alternative Installation Method

1. **Using Command Palette**:
   - Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
   - Type "Extensions: Install Extensions"
   - Search for "Custom Smart File Combiner"
   - Click "Install"

2. **Direct Link Installation**:
   - If you have the direct marketplace URL, you can:
     - Open the URL in your browser
     - Click "Install" on the marketplace page
     - VS Code will open automatically and prompt for installation

### Post-Installation Setup

1. **Configure Ignore Patterns** (Optional):
   - Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
   - Search for "Custom Smart File Combiner"
   - Configure the following settings as needed:
     - `customSmartFileCombiner.ignoreFiles`: Add file names to ignore
     - `customSmartFileCombiner.ignorePatterns`: Add regex patterns to ignore
     - `customSmartFileCombiner.ignoreFolders`: Add folder names to ignore

2. **Using the Extension**:
   - Open a folder in VS Code
   - Right-click on the folder in the explorer
   - Select "Custom Combine Files/Folders into TXT"
   - The combined file will be created as `combined.txt` in the root of your workspace

### Troubleshooting Installation Issues

1. **Extension Not Found**:
   - Ensure you're using the correct name in search
   - Check that the extension is published and not in draft state
   - Try refreshing the extensions list

2. **Installation Fails**:
   - Check your internet connection
   - Ensure VS Code is updated to a compatible version
   - Check the VS Code output panel for error messages

3. **Extension Not Working**:
   - Restart VS Code after installation
   - Check that the extension is enabled in the Extensions view
   - Verify your VS Code version meets the minimum requirements

## Updating the Extension

### For Users
- VS Code will automatically check for updates
- You can manually check for updates in the Extensions view
- Click "Update" when a new version is available

### For Publishers
1. **Increment Version Number** in `package.json`
2. **Publish New Version**:
   ```bash
   vsce publish
   ```
3. **Users Will Receive Update** automatically