/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  let proxy

  if (mode === 'development') {
    proxy = {
      '/api': {
        target: 'http://127.0.0.1:34765/',
        changeOrigin: true
      }
    }
  } else if (mode === 'staging') {
    proxy = {
      '/api': {
        target: 'http://nichujie.xyz/',
        changeOrigin: true
      }
    }
  }
  return {
    server: {
      proxy
    },
    test: {
      include: ['src/**/__tests__/*'],
      globals: true,
      environment: 'jsdom',
      setupFiles: 'src/setupTests.ts',
      clearMocks: true,
      coverage: {
        enabled: true,
        lines: 90,
        functions: 90,
        branches: 90,
        reporter: ['text', 'lcov'],
        reportsDirectory: 'coverage/jest'
      }
    },
    plugins: [
      tsconfigPaths(),
      react(),
      ...(mode !== 'test'
        ? [
            eslintPlugin(),
            VitePWA({
              registerType: 'autoUpdate',
              includeAssets: [
                'favicon.png',
                'robots.txt',
                'apple-touch-icon.png',
                'icons/*.svg',
                'fonts/*.woff2'
              ],
              manifest: {
                theme_color: '#BD34FE',
                icons: [
                  {
                    src: '/android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any maskable'
                  },
                  {
                    src: '/android-chrome-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                  }
                ]
              }
            })
          ]
        : [])
    ],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    }
  }
})
