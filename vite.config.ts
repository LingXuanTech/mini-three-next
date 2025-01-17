import path from 'path';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    base: "./",
    plugins: [dts({ rollupTypes: true })],
    build: {
        outDir: "dist",
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "./src/index.ts"),
            name: "mini-three-next",
            formats: ["es", "cjs", "umd", "iife"],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            output: {
              extend: true, // 允许非合法的标识符
            },
          },
    },
} satisfies UserConfig);