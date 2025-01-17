import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "bootstrap/scss/functions";
          @import "bootstrap/scss/variables";
          @import "bootstrap/scss/mixins";
        `
      }
    }
  },
  resolve: {
    alias: {
      'src': '/src',
      'Elements': '/src/Elements',
      'Lib': '/src/Lib'
    }
  }
});