import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
    return {
        build: {
            outDir: 'build',
        },
        plugins: [
            react(),
            /** Xử lý absolute import (phối hợp với file `tsconfig.json`) */
            tsconfigPaths(),
        ],
        resolve: {
            alias: [
                { find: '@/', replacement: path.resolve(__dirname, 'src/') },
            ],
        }
    };
});