/* eslint-disable no-console */
/**
 * Description:
 * Run wrangler as a vite plugin
 */
import { delay } from '@gkiely/utils';
import { spawn } from 'node:child_process';
import type { Plugin } from 'vite';
declare const global: typeof globalThis & {
  child?: ReturnType<typeof spawn>;
};

type Params = {
  config: string;
  port: number;
};

const serverFlag = process.argv.findIndex((o) => o === '--server');
const serverPath = process.argv[serverFlag + 1];

const startServer = ({ port, config }: Params) => {
  // Restart
  if (global.child) return;

  // Spawn
  const child = spawn(
    'wrangler',
    [
      'dev',
      '--env',
      'development',
      '--port',
      `${port}`,
      '--local',
      '--persist',
      ...(config ? ['--config', config] : []),
      serverPath,
    ],
    {
      stdio: 'inherit',
    }
  );

  // child.on('close', () => console.log('> close'));
  // child.on('error', () => console.log('> error'));
  // child.on('disconnect', () => console.log('> disconnect'));
  // child.on('exit', () => console.log('> child.exit'));
  // child.on('message', () => console.log('> message'));
  // child.on('spawn', () => console.log('> spawn'));

  // Set global
  global.child = child;
};

// process.on('SIGUSR1', () => console.log('> SIGUSR1'));
// process.on('SIGUSR2', () => console.log('> SIGUSR2'));
// process.on('SIGINT', () => console.log('> SIGINT'));
// process.on('SIGQUIT', () => console.log('> SIGQUIT'));
// process.on('uncaughtException', (e) => console.log('> uncaughtException', e));
// process.on('SIGTERM', () => console.log('> SIGTERM'));

process.on('exit', () => {
  if (global.child?.killed) return;
  global.child?.kill();
  delete global.child;
  process.exit();
});

const wranglerPlugin = ({ port = 8080, config = '' } = {}): Plugin => {
  const plugin: Plugin = {
    name: 'wrangler',
    configureServer: (server) => {
      startServer({ port, config });

      let hasRequested = false;
      // It takes wrangler can take up to 500ms to start the first time
      // delay request until server is ready
      server.middlewares.use((req, _res, next) => {
        if (!req.url) return next();
        if (req.url.startsWith('/api') && !hasRequested) {
          hasRequested = true;
          void delay(500).then(next);
        } else {
          next();
        }
      });
    },
  };
  return {
    ...plugin,
    configurePreviewServer: plugin.configureServer as Plugin['configurePreviewServer'],
  };
};

export default wranglerPlugin;
