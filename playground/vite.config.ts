import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetIcons, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    Vue(),
    Unocss({
      presets: [
        presetUno(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@onelabeler/core': resolve(__dirname, '../src/index.ts'),
    },
  },
})
