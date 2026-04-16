import { p as promiseResolve, g as globalScripts, b as bootstrapLazy } from './index-BJ09SC2x.js';
export { s as setNonce } from './index-BJ09SC2x.js';

/*
 Stencil Client Patch Browser v4.43.4 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([], options);
});
