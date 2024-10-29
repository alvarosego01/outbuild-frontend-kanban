import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: true,
        }),
    ],
    assetsInclude: ['src/assets/**'],
    // resolve: {
    //     alias: {
    //         '@core': path.resolve(__dirname, './src/core'),
    //         '@components': path.resolve(__dirname, './src/core/components'),
    //         '@hooks': path.resolve(__dirname, './src/core/hooks'),
    //         '@models': path.resolve(__dirname, './src/core/models'),
    //         '@constants': path.resolve(__dirname, './src/core/constants'),
    //         '@store': path.resolve(__dirname, './src/core/store'),
    //         '@utils': path.resolve(__dirname, './src/core/utils'),
    //         '@pipes': path.resolve(__dirname, './src/core/pipes'),
    //         '@envs': path.resolve(__dirname, './src/env'),
    //         '@modules': path.resolve(__dirname, './src/modules'),
    //         '@assets': path.resolve(__dirname, './src/assets')
    //     },
    // },
})
