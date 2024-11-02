// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: true,
        }),
    ],

});
