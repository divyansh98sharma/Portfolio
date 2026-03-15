import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Figma Make asset
      'figma:asset/3f12db942eb596cb7c744a13790a87207de8db2c.png': path.resolve(__dirname, './src/assets/3f12db942eb596cb7c744a13790a87207de8db2c.png'),
      // Versioned imports used by UI components
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
      '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
      '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
      // Path alias
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
