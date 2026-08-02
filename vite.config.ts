import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        module: resolve(import.meta.dirname, 'src/scripts/module.ts'),
        styles: resolve(import.meta.dirname, 'src/styles/module.scss')
      },
      output: {
        dir: 'dist',
        format: 'es',
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'module' ? 'scripts/module.js' : '[name].js'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles/[name][extname]'
          }
          return '[name][extname]'
        }
      }
    },
    target: 'es2022',
    minify: false,
    sourcemap: true
  },
  plugins: [
    {
      name: 'copy-module-json',
      writeBundle() {
        copyFileSync(
          'src/module.json',
          'dist/module.json'
        )
      }
    }
  ],
  test: {
    globals: true,
    include: ['src/**/*.test.ts'],
    setupFiles: ['@revolutionarygamesco/common-foundryvtt/mocks/setup'],
    unstubGlobals: true,
    clearMocks: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/**/*.test.ts']
    }
  }
})