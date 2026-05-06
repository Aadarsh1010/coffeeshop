import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    open: true,
    host: true,           // listen on all addresses for LAN testing
  },

  preview: {
    port: 4173,
    host: true,
  },

  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,                 // disable for smaller, safer prod builds
    cssCodeSplit: true,               // separate CSS per route chunk
    cssMinify: 'lightningcss' in {} ? true : true,
    minify: 'esbuild',                // fastest minifier, near-identical output to terser
    chunkSizeWarningLimit: 600,       // kB — our chunks are ~200kB after gzip
    assetsInlineLimit: 4096,          // inline anything < 4kB as base64
    reportCompressedSize: true,

    rollupOptions: {
      output: {
        // Cache-friendly hashed filenames
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        // Manual code-splitting → smaller initial JS, better caching
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('react-router'))   return 'router'
          if (id.includes('framer-motion'))  return 'motion'
          if (id.includes('lucide-react'))   return 'icons'
          if (id.includes('react-dom'))      return 'react-dom'
          if (id.includes('react'))          return 'react'
          return 'vendor'
        },
      },
    },
  },

  // Strip console.log / debugger in production builds
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
  },

  // Faster prebundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
  },
})
