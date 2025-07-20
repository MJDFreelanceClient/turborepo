import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.tsx'],   // or .ts if not React
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    target: 'esnext',
    splitting: false,           // set to true if you need code splitting
    esbuildOptions(options) {
        options.jsx = 'automatic'; // or 'transform' for older React
    },
});
