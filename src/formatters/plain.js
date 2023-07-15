const formatValue = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diffTree, parentKey = '') => {
  const lines = diffTree.flatMap((node) => {
    const {
      key, type, value, oldValue, children,
    } = node;
    const currentKey = parentKey ? `${parentKey}.${key}` : key;
    switch (type) {
      case 'added':
        return `Property '${currentKey}' was added with value: ${formatValue(value)}`;
      case 'removed':
        return `Property '${currentKey}' was removed`;
      case 'changed':
        return `Property '${currentKey}' was updated. From ${formatValue(oldValue)} to ${formatValue(value)}`;
      case 'nested':
        return formatPlain(children, currentKey);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });
  return lines.join('\n');
};

export default formatPlain;
