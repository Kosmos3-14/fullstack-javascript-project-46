#!/usr/bin/env node

import { program } from 'commander';
import path from 'path';
import genDiff from '../src/genDiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filename1, filename2) => {
    const filepath1 = path.join(process.cwd(), filename1);
    const filepath2 = path.join(process.cwd(), filename2);
    const diff = genDiff(filepath1, filepath2, program.format);
    console.log(diff);
  });

program.parse(process.argv);
