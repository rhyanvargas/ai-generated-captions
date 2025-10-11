import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// Official Next.js + Vitest configuration
// Docs: https://nextjs.org/docs/app/guides/testing/vitest
// Vitest Config: https://vitest.dev/config/

export default defineConfig({
  plugins: [
    tsconfigPaths(), // Resolves TypeScript path aliases (e.g., @/lib)
    react(), // React support
  ],
  test: {
    environment: 'jsdom', // Browser-like environment for React components
    globals: true, // Use global test APIs (describe, it, expect) without imports
    setupFiles: ['./vitest.setup.ts'], // Optional: setup before tests
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        '*.config.*',
        'src/app/layout.tsx',
        'src/app/page.tsx',
      ],
    },
  },
})
