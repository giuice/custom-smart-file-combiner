// Test script to verify glob pattern functionality
const { minimatch } = require('minimatch');

// Test cases for glob patterns
const testPatterns = [
    "*.ds.ts",
    "*.ds.ts.map",
    "*.mdc",
    "*.md"
];

const testFiles = [
    "test.ds.ts",
    "test.ds.ts.map",
    "test.mdc",
    "test.md",
    "test.txt",
    "another.ds.ts",
    "another.ds.ts.map",
    "another.mdc",
    "another.md",
    "another.txt"
];

console.log('Testing glob pattern functionality:');
console.log('====================================');

testPatterns.forEach(pattern => {
    console.log(`\nPattern: ${pattern}`);
    testFiles.forEach(file => {
        const matches = minimatch(file, pattern);
        if (matches) {
            console.log(`  ✓ ${file} matches`);
        }
    });
});

console.log('\n\nTesting non-matching files:');
console.log('==========================');

testPatterns.forEach(pattern => {
    console.log(`\nPattern: ${pattern}`);
    testFiles.forEach(file => {
        const matches = minimatch(file, pattern);
        if (!matches && file.endsWith(pattern.replace('*', ''))) {
            console.log(`  ✗ ${file} should match but doesn't`);
        } else if (!matches) {
            console.log(`  ✓ ${file} correctly does not match`);
        }
    });
});