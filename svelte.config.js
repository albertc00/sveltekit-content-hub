import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    // vite: {
    //   optimizeDeps: {
    //     include: ['broadcast-channel'],
    //   },
    // },
    alias: {
      $shared: 'src/shared',
      $functions: 'src/functions',
      $stores: 'src/stores',
      $styles: 'src/styles',
      $actions: 'src/actions',
    },
  },
  preprocess: preprocess({}),
};

export default config;
