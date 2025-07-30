// Test script to verify ignore functionality
const path = require('path');

// Simulate the ignore functionality from our extension
const userIgnoreFiles = ['ignore-me.txt'];
const userIgnorePatterns = ['\\.tmp$'];
const userIgnoreFolders = ['node_modules'];

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

// Default ignored patterns
const IGNORE_PATTERNS = [
    /\.log$/,
    /\.bak$/,
    /\.swp$/,
    /~$/,
    /^#.*#$/,
    /\.iml$/,
    /\.class$/,
    /\.jar$/,
    /\.war$/,
    /\.pyc$/,
    ...userIgnorePatterns.map(pattern => new RegExp(pattern))
];

function shouldIgnoreFile(filename) {
    if (IGNORE_FILES.has(filename)) {
        return true;
    }
    return IGNORE_PATTERNS.some(pattern => pattern.test(filename));
}

function shouldIgnoreDirectory(dirname) {
    return IGNORE_DIRS.has(dirname);
}

// Test cases
const testFiles = [
    'test.txt',
    'ignore-me.txt',
    'temp-file.tmp',
    'package-lock.json',
    'test.log',
    'test.bak'
];

const testDirectories = [
    'src',
    'node_modules',
    'dist',
    'build'
];

console.log('Testing file ignore functionality:');
testFiles.forEach(file => {
    const ignored = shouldIgnoreFile(file);
    console.log(`  ${file}: ${ignored ? 'IGNORED' : 'INCLUDED'}`);
});

console.log('\nTesting directory ignore functionality:');
testDirectories.forEach(dir => {
    const ignored = shouldIgnoreDirectory(dir);
    console.log(`  ${dir}: ${ignored ? 'IGNORED' : 'INCLUDED'}`);
});