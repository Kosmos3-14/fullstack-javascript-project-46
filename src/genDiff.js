import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);

  const buildDiffTree = (obj1, obj2) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
    return keys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return {
          key,
          type: 'nested',
          children: buildDiffTree(value1, value2),
        };
      }
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return {
          key,
          type: 'removed',
          value: value1,
        };
      }
      if (!_.has(obj1, key) && _.has(obj2, key)) {
        return {
          key,
          type: 'added',
          value: value2,
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
  };
  return buildDiffTree(object1, object2);
};

export default genDiff;
