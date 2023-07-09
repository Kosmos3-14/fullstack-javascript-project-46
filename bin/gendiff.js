#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/genDiff.js';
import format from '../src/formatters/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diffTree = genDiff(filepath1, filepath2);
    const formattedDiff = format(diffTree, program.format);
    console.log(formattedDiff);
  });

program.parse(process.argv);
