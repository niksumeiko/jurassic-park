import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        exclude: [
            ...configDefaults.exclude,
            '**/__tests__/**', // Excludes any __tests__ dir and its contents
            // Add other patterns as needed, e.g., '**/dist/**'
        ],
    },
});
