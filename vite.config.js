import { defineConfig } from 'vite'

export default defineConfig({
  envDir: 'config',
  build: {
    target: 'modules'
  }
})