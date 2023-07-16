import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const format = (diffTree, formatName = 'stylish') => {
  if (!Object.prototype.hasOwnProperty.call(formatters, formatName)) {
    throw new Error(`Unknown format name: ${formatName}`);
  }
  return formatters[formatName](diffTree);
};

export default format;
