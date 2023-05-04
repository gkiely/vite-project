/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-console */
import packageJSON from '../package.json';

const blacklist: string[] = [
  // Typescript
  'typescript', // Using typescript beta
];

const deps = `${Object.keys({
  ...packageJSON.dependencies,
  ...packageJSON.devDependencies,
})
  .filter((k) => !blacklist.includes(k))
  .join('@latest ')}@latest`;

// Output to shell
console.log(deps);
