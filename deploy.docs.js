#!/usr/bin/env node

const {execSync} = require('node:child_process');
const process = require('node:process');
// Const fs = require('node:fs');

// Build docs
execSync('npm run docs:build', {stdio: 'inherit'});

// Navigate to build directory
process.chdir('docs/.vuepress/dist');

// Custom domain
// fs.writeFileSync('CNAME', 'www.example.com');

// Initialize git
execSync('git init');
execSync('git add -A');
execSync('git commit -m "[docs] deploy"');

// Force push to gh-pages
execSync(
  'git push -f git@github.com:blakmatrix/node-zendesk.git master:gh-pages',
);

// Return to previous directory
process.chdir('..');
