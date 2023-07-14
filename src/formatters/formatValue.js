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

export default formatValue;
