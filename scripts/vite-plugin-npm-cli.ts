/* eslint-disable no-console */
import type { Plugin, ConfigEnv } from 'vite';
import { spawn, spawnSync } from 'node:child_process';

type Options = {
  [k in ConfigEnv['command']]?: string;
} & {
  hotUpdate?: string;
};

const blacklist = ['.generated.ts', 'tsconfig.tsbuildinfo', '.eslintcache', '.typegen.ts'];

const plugin = (command: ConfigEnv['command'], options: Options): Plugin => {
  let child: ReturnType<typeof spawn> | undefined;
  return {
    name: 'npm-cli',
    config() {
      if (!options.build) return;
      if (command === 'build') {
        spawnSync(options.build);
      }
    },
    handleHotUpdate(e) {
      if (!options.hotUpdate) return;
      if (blacklist.some((s) => e.file.endsWith(s))) return;

      if (child) return;
      const args = options.hotUpdate.split(' ');
      child = spawn(args[0], args.slice(1));
      child.on('exit', () => {
        child = undefined;
      });

      // Debugging
      // console.log('hot update', e.file);
      // child.stdout?.on('data', (data: ReadableStream) => {
      //   const result = data.toString().trim();
      //   console.log(result);
      // });
    },
  };
};

export default plugin;
