import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      name: 'svg-as-text',
      enforce: 'pre',
      load(id) {
        const file = id.split('?')[0];
        if (!file.endsWith('.svg')) return null;
        const path = file.startsWith('file://') ? fileURLToPath(file) : file;
        return `export default ${JSON.stringify(readFileSync(path, 'utf8'))}`;
      },
    },
  ],
  test: {
    environment: 'node',
  },
});
