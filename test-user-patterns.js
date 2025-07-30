// Test script to verify the user's specific patterns
const { minimatch } = require('minimatch');

// User's specific patterns
const userIgnorePatterns = [
    "*.ds.ts",
    "*.ds.ts.map",
    "*.mdc",
    "*.md",
];

// Test files that should be ignored
const filesToIgnore = [
    "test.ds.ts",
    "example.ds.ts",
    "model.ds.ts",
    "test.ds.ts.map",
    "example.ds.ts.map",
    "model.ds.ts.map",
    "document.mdc",
    "notes.mdc",
    "readme.mdc",
    "README.md",
    "readme.md",
    "notes.md",
];

// Test files that should NOT be ignored
const filesToInclude = [
    "test.ts",
    "example.ts",
    "model.ts",
    "test.js",
    "example.js",
    "document.txt",
    "notes.txt",
    "README.txt",
];

console.log('Testing user\'s specific ignore patterns:');
console.log('========================================');

// Test files that should be ignored
console.log('\nFiles that should be IGNORED:');
filesToIgnore.forEach(file => {
    let shouldIgnore = false;
    for (const pattern of userIgnorePatterns) {
        if (minimatch(file, pattern)) {
            shouldIgnore = true;
            break;
        }
    }
    if (shouldIgnore) {
        console.log(`  ✓ ${file} correctly ignored (matches pattern)`);
    } else {
        console.log(`  ✗ ${file} should be ignored but isn't`);
    }
});

// Test files that should NOT be ignored
console.log('\nFiles that should be INCLUDED:');
filesToInclude.forEach(file => {
    let shouldIgnore = false;
    for (const pattern of userIgnorePatterns) {
        if (minimatch(file, pattern)) {
            shouldIgnore = true;
            break;
        }
    }
    if (!shouldIgnore) {
        console.log(`  ✓ ${file} correctly included (no pattern match)`);
    } else {
        console.log(`  ✗ ${file} should be included but is ignored`);
    }
});

console.log('\n\nPattern matching details:');
console.log('========================');
userIgnorePatterns.forEach(pattern => {
    console.log(`\nPattern: ${pattern}`);
    filesToIgnore.forEach(file => {
        if (minimatch(file, pattern)) {
            console.log(`  ✓ ${file} matches`);
        }
    });
});