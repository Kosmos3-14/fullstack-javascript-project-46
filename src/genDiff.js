import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

const buildDiffTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).slice().sort();
  const diffTree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiffTree(value1, value2),
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: value2,
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: value1,
      };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'changed',
        oldValue: value1,
        value: value2,
      };
    }
    return {
      key,
      type: 'unchanged',
      value: value1,
    };
  });
  return diffTree;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);
  const diffTree = buildDiffTree(object1, object2);
  return format(diffTree, formatName);
};

export default genDiff;
