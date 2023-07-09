import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parse = (filepath) => {
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const extension = path.extname(filepath);
  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Unknown file extension: ${extension}`);
  }
};

export default parse;
