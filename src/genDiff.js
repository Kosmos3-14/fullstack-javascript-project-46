import path from 'path';
import fs from 'fs';
import buildDiffTree from './buildDiffTree.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  const ext1 = path.extname(filepath1).slice(1);
  const ext2 = path.extname(filepath2).slice(1);
  const fileData1 = fs.readFileSync(absolutePath1, 'utf-8');
  const fileData2 = fs.readFileSync(absolutePath2, 'utf-8');
  const data1 = parse(fileData1, ext1);
  const data2 = parse(fileData2, ext2);
  const diffTree = buildDiffTree(data1, data2);
  return format(diffTree, formatName);
};

export default genDiff;
