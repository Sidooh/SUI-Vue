import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'sui-vue',
            fileName: format => `sui-vue.${format}.js`,
        },
        rollupOptions: {
            external: [/\.(css|scss)$/, 'vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})
