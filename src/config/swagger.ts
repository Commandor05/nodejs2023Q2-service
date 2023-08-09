import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';

const DOC_PATH = './doc/api.yaml';

export default () => {
  return yaml.load(readFileSync(resolve(DOC_PATH), 'utf8')) as Record<
    string,
    unknown
  >;
};
