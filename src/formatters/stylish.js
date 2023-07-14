import formatValue from './formatValue.js';

const formatStylish = (diffTree) => {
  const iter = (tree, depth) => {
    const indentSize = 4;
    const indent = ' '.repeat(depth * indentSize);
    const lines = tree.flatMap((node) => {
      const {
        key, type, value, oldValue, children,
      } = node;
      switch (type) {
        case 'added':
          return `${indent}  + ${key}: ${formatValue(value, depth + 1)}`;
        case 'removed':
          return `${indent}  - ${key}: ${formatValue(value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}  - ${key}: ${formatValue(oldValue, depth + 1)}`,
            `${indent}  + ${key}: ${formatValue(value, depth + 1)}`,
          ];
        case 'unchanged':
          return `${indent}    ${key}: ${formatValue(value, depth + 1)}`;
        case 'nested':
          return `${indent}    ${key}: {\n${iter(children, depth + 1).join('\n')}\n${indent}    }`;
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });
    return lines;
  };
  return `{\n${iter(diffTree, 0).join('\n')}\n}`;
};

export default formatStylish;
