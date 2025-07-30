"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const minimatch_1 = require("minimatch");
function activate(context) {
    const cmd = vscode.commands.registerCommand('custom.extension.combineFiles', async (_arg) => {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders || folders.length === 0) {
            return vscode.window.showErrorMessage('Open a folder first!');
        }
        const ws = folders[0].uri.fsPath;
        const picks = [vscode.Uri.file(ws)];
        // Get user-configurable ignore settings
        const config = vscode.workspace.getConfiguration('customSmartFileCombiner');
        const userIgnoreFiles = config.get('ignoreFiles', []);
        const userIgnorePatterns = config.get('ignorePatterns', []);
        const userIgnoreFolders = config.get('ignoreFolders', []);
        // Default ignored directories
        const IGNORE_DIRS = new Set([
            'node_modules',
            'dist',
            'build',
            'out',
            'coverage',
            '__pycache__',
            'venv',
            '.venv',
            '.idea',
            '.vscode',
            'logs',
            'deploy',
            'temp',
            'tmp',
            '.git',
            '.svn',
            '.hg',
            '.cache',
            ...userIgnoreFolders
        ]);
        // Default ignored files
        const IGNORE_FILES = new Set([
            'package-lock.json',
            'yarn.lock',
            '.DS_Store',
            'Thumbs.db',
            ...userIgnoreFiles
        ]);
        // Default ignored patterns (regex)
        const DEFAULT_IGNORE_PATTERNS = [
            /\.log$/,
            /\.bak$/,
            /\.swp$/,
            /~$/,
            /^#.*#$/,
            /\.iml$/,
            /\.class$/,
            /\.jar$/,
            /\.war$/,
            /\.pyc$/
        ];
        // User ignored patterns (can be glob or regex)
        const USER_IGNORE_PATTERNS = userIgnorePatterns.map(pattern => {
            // If it looks like a glob pattern, treat it as such
            if (pattern.includes('*') || pattern.includes('?') || pattern.includes('[')) {
                return pattern;
            }
            // Otherwise treat it as a regex
            try {
                return new RegExp(pattern);
            }
            catch {
                // If regex fails, treat as literal string
                return pattern;
            }
        });
        function shouldIgnoreFile(filename) {
            // Check exact file names
            if (IGNORE_FILES.has(filename)) {
                return true;
            }
            // Check default regex patterns
            if (DEFAULT_IGNORE_PATTERNS.some(pattern => pattern.test(filename))) {
                return true;
            }
            // Check user patterns (both glob and regex)
            for (const pattern of USER_IGNORE_PATTERNS) {
                if (typeof pattern === 'string') {
                    // Glob pattern
                    if ((0, minimatch_1.minimatch)(filename, pattern)) {
                        return true;
                    }
                }
                else if (pattern instanceof RegExp) {
                    // Regex pattern
                    if (pattern.test(filename)) {
                        return true;
                    }
                }
                else {
                    // Literal string
                    if (filename === pattern) {
                        return true;
                    }
                }
            }
            return false;
        }
        async function hasEnvExample() {
            try {
                const envExamplePath = path.join(ws, '.env.example');
                await fs.access(envExamplePath);
                return true;
            }
            catch {
                return false;
            }
        }
        function processEnvFile(content) {
            const lines = content.split('\n');
            const processedLines = [];
            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) {
                    processedLines.push(line);
                    continue;
                }
                const equalIndex = trimmed.indexOf('=');
                if (equalIndex > 0) {
                    const key = trimmed.substring(0, equalIndex).trim();
                    const placeholder = `<${key.toLowerCase().replace(/_/g, '_')}>`;
                    processedLines.push(`${key}=${placeholder}`);
                }
                else {
                    processedLines.push(line);
                }
            }
            return processedLines.join('\n');
        }
        const entries = [];
        const envExampleExists = await hasEnvExample();
        async function processUri(uri) {
            const stats = await fs.stat(uri.fsPath);
            if (stats.isDirectory()) {
                const base = path.basename(uri.fsPath);
                if (IGNORE_DIRS.has(base)) {
                    return;
                }
                const items = await fs.readdir(uri.fsPath);
                for (const name of items) {
                    const child = vscode.Uri.file(path.join(uri.fsPath, name));
                    await processUri(child);
                }
            }
            else {
                const filename = path.basename(uri.fsPath);
                if (shouldIgnoreFile(filename)) {
                    return;
                }
                const abs = uri.fsPath;
                const rel = path.relative(ws, abs).replace(/\\/g, '/');
                if (filename === '.env') {
                    if (envExampleExists) {
                        return;
                    }
                    try {
                        let content = await fs.readFile(abs, 'utf8');
                        content = processEnvFile(content);
                        entries.push({ rel, content });
                    }
                    catch (error) {
                        console.warn(`Could not read file ${rel}:`, error);
                    }
                    return;
                }
                try {
                    const content = await fs.readFile(abs, 'utf8');
                    entries.push({ rel, content });
                }
                catch (error) {
                    console.warn(`Could not read file ${rel}:`, error);
                }
            }
        }
        for (const uri of picks) {
            try {
                await processUri(uri);
            }
            catch (error) {
                console.warn(`Error processing ${uri.fsPath}:`, error);
            }
        }
        const lines = [];
        for (const e of entries) {
            lines.push(`// ${e.rel}`);
            lines.push(e.content.trimEnd());
            lines.push('');
        }
        const out = lines.join('\n');
        const outPath = path.join(ws, 'combined.txt');
        await fs.writeFile(outPath, out, 'utf8');
        vscode.window.showInformationMessage(`✅ Wrote ${entries.length} files into combined.txt`);
    });
    context.subscriptions.push(cmd);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map