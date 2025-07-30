#!/usr/bin/env node

// Script to package the extension for local installation
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Packaging Custom Smart File Combiner Extension...');

try {
  // Check if vsce is installed
  try {
    execSync('vsce --version', { stdio: 'pipe' });
    console.log('✓ vsce is installed');
  } catch (error) {
    console.log('Installing vsce...');
    execSync('npm install -g vsce', { stdio: 'inherit' });
  }

  // Compile TypeScript code
  console.log('Compiling TypeScript code...');
  execSync('npm run compile', { stdio: 'inherit' });

  // Package the extension
  console.log('Packaging extension...');
  execSync('vsce package', { stdio: 'inherit' });

  // Find the generated .vsix file
  const files = fs.readdirSync('.');
  const vsixFile = files.find(file => file.endsWith('.vsix'));

  if (vsixFile) {
    console.log(`\n✓ Extension packaged successfully: ${vsixFile}`);
    console.log('\nTo install locally:');
    console.log('1. Open VS Code');
    console.log('2. Open Command Palette (Ctrl+Shift+P or Cmd+Shift+P)');
    console.log('3. Run "Extensions: Install from VSIX..."');
    console.log(`4. Select the file: ${vsixFile}`);
  } else {
    console.error('✗ Failed to find packaged .vsix file');
    process.exit(1);
  }
} catch (error) {
  console.error('✗ Error packaging extension:', error.message);
  process.exit(1);
}