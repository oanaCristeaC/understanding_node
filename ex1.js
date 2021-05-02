#! /usr/bin/env node

'use strict';

const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
const getStdin = require('get-stdin');
const args = minimist(process.argv.slice(2), {
  boolean: ['help', 'in'],
  string: ['file'],
});

if (args.help) {
  printHelp();
} else if (args.in || args._.includes('-')) {
  // getStdin().then(processFile).catch(error);
} else if (args.file) {
  fs.readFile(args.file, function (err, contents) {
    if (err) {
      error(err.toString());
    } else {
      processFile(contents);
    }
  });
} else {
  error('Incorrect usage', true);
}

// console.log(args);
// console.log('p.argv: ', process.argv.slice(2));

function processFile(contents) {
  process.stdout.write(contents.toString().toUpperCase());
  // console.log(contents); //buffer
  // console.log(contents.toString());
}

function printHelp() {
  console.log('ex1 usage:');
  console.log(' ex1.js --file={FILENAME}');
  console.log('');
  console.log('--help                                 print this help');
  console.log('--file={FILENAME}                      process the file');
  console.log('--in, -                                process stdin');
  console.log('');
}

function error(msg, includeHelp = false) {
  console.error(msg);

  if (includeHelp) {
    console.log('');
    printHelp();
  }
}

// process.stdout.write('Hello world\n');
