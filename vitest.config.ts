import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

if (process.env.NODE_ENV === 'test') {
  console.clear();
}

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './src/setupTests.ts',
    css: false,
    isolate: false,
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
