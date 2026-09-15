import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
            },
            {
              name: 'prime-vendor',
              test: /node_modules[\\/](?:primereact|react-transition-group|prop-types)[\\/]/,
            },
            {
              name: 'icons-vendor',
              test: /node_modules[\\/]@phosphor-icons[\\/]/,
            },
          ],
        },
      },
    },
  },
})
