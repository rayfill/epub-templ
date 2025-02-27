import { UserConfig, defineConfig } from 'vite';
import { resolve } from 'node:path';

// import banner, { BannerPluginOptions } from 'vite-plugin-banner';
// const bannerPluginOptions: BannerPluginOptions = {
//   content: '/**\n hello world\n */'
// };

const userConfig: UserConfig = {
  build: {
    lib: {
      entry: {
        'index': resolve(__dirname, 'src/resource.ts'),
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'node:path',
        'node:fs/promises',
        'hogan.js',
      ]
    }
  },
  plugins: [
    //banner(bannerPluginOptions),
  ],
};
export default defineConfig(userConfig);
