import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

if (process.env.NODE_ENV === 'test') {
  console.clear();
}

export default defineConfig({
  plugins: [react()],
});
