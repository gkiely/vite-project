/* eslint-disable no-console */
import { spawn, spawnSync } from 'node:child_process';
import type { ConfigEnv, Plugin } from 'vite';

export const generateTypesFilePath = 'src/app/utils/generate-types.ts';

// Generate types for state.matches
// Runs on hot update and build
// TODO: see if there is a way to do this with vite-node instead of vitest
// https://www.npmjs.com/package/vite-node
const blacklist = ['.generated.ts', 'tsconfig.tsbuildinfo', '.eslintcache', '.typegen.ts'];

const debugging = false;

const plugin = (command: ConfigEnv['command']): Plugin => {
  let child: ReturnType<typeof spawn> | undefined;
  return {
    name: 'generate-types',
    config() {
      if (command === 'build') {
        if (debugging) {
          spawnSync('vitest', ['run', generateTypesFilePath], {
            stdio: 'inherit',
          });
          return;
        }
        spawnSync('vitest', ['run', generateTypesFilePath]);
      }
    },
    handleHotUpdate(e) {
      if (blacklist.some((s) => e.file.endsWith(s))) return;

      if (debugging) {
        spawn('vitest', ['run', generateTypesFilePath], {
          stdio: 'inherit',
        });
        return;
      }

      if (child) return;
      child = spawn('vitest', ['run', generateTypesFilePath]);
      child.stdout?.on('data', (data: ReadableStream) => {
        const result = data.toString();
        const output = (result.match(/\[[^\]]+\]/) ?? [])[0];
        if (output) {
          console.log('Types generated:');
          console.log(output);
        }
      });
      child.on('exit', () => {
        child = undefined;
      });
    },
  };
};

export default plugin;
