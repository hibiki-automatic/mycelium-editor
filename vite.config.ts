import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: {
        'mycelium-editor': resolve(__dirname, 'src/index.ts'),
        'preview-runtime': resolve(__dirname, 'src/preview-runtime.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (format === 'es') return `${entryName}.es.js`
        if (format === 'cjs') return `${entryName}.cjs.js`
        return `${entryName}.${format}.js`
      },
    },
    rollupOptions: {
      external: [],
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
})
