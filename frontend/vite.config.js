import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // This is crucial for correct asset paths in your S3 bucket
  build: {
    outDir: 'dist', // Default, but good to be explicit
  },
});