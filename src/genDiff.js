import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);
  let obj1;
  let obj2;

  switch (ext1) {
    case '.json':
      obj1 = JSON.parse(data1);
      break;
    case '.yml':
    case '.yaml':
      obj1 = parse(filepath1);
      break;
    default:
      throw new Error(`Unknown file extension: ${ext1}`);
  }

  switch (ext2) {
    case '.json':
      obj2 = JSON.parse(data2);
      break;
    case '.yml':
    case '.yaml':
      obj2 = parse(filepath2);
      break;
    default:
      throw new Error(`Unknown file extension: ${ext2}`);
  }

  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const diff = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (!_.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return `    ${key}: ${obj1[key]}`;
    }
    return [`  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
  });
  return `{\n${_.flatten(diff).join('\n')}\n}`;
};

export default genDiff;
