import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ath-components',
  srcDir: 'src',
  outputTargets: [
    {
      type: 'dist',
      dir: 'public/stencil',
      esmLoaderPath: 'loader',
    },
    {
      type: 'docs-readme',
    },
  ],
};
