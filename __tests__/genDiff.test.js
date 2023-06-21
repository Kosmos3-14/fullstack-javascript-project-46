/* eslint-env jest */

import path from 'path';
import genDiff from '../src/genDiff.js';

const getFixturePath = (filename) => path.join(path.dirname(new URL(import.meta.url).pathname), '__fixtures__', filename);

test('compare flat JSON files', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
`;

  expect(genDiff(file1Path, file2Path)).toBe(expected);
});
