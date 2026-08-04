import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      tsconfigPaths: true
    },
    build: {
      sourcemap: env.VITE_GENERATE_SOURCEMAP === 'true'
    }
  }
})