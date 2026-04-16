import { g as globalScripts, b as bootstrapLazy } from './index-BJ09SC2x.js';
export { s as setNonce } from './index-BJ09SC2x.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([], options);
};

export { defineCustomElements };
