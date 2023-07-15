const formatValue = (value, depth) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value !== 'object') {
    return value;
  }
  const indentSize = 4;
  const indent = ' '.repeat(depth * indentSize);
  if (Array.isArray(value)) {
    const lines = value.map((val) => `${indent}${' '.repeat(indentSize)}${formatValue(val, depth + 1)}`);
    return `[\n${lines.join('\n')}\n${indent}]`;
  }
  const entries = value === undefined ? [] : Object.entries(value);
  const lines = entries.flatMap(([key, val]) => {
    const formattedValue = typeof val === 'object' ? formatValue(val, depth + 1) : val;
    const valueIndent = ' '.repeat(indentSize);
    return `${indent}${valueIndent}${key}: ${formattedValue}`;
  });
  return `{\n${lines.join('\n')}\n${indent}}`;
};

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
