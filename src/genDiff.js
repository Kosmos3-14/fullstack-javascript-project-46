import _ from 'lodash';
import fs from 'fs';

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }

    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }

    if (_.isEqual(data1[key], data2[key])) {
      return `    ${key}: ${data1[key]}`;
    }

    return [`  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`];
  });

  const flatResult = _.flattenDeep(result).join('\n');
  return `{\n${flatResult}\n}\n`;
};

export default genDiff;
