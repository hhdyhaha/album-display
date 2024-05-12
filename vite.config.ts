import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());
    const baseApi = env.VITE_APP_BASE_API; // 先获取环境变量的值
    const basePort = env.VITE_APP_PORT; // 先获取环境变量的值
    return {
        base: './',
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            proxy: {
                // 使用环境变量值作为键名的动态方式
                [baseApi]: { // 这里改正了使用环境变量的方式
                    target: `http://123.56.15.95:${basePort}`,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp('^' + baseApi), ''), // 同样，在这里也使用变量
                }
            }
        }
    };
});