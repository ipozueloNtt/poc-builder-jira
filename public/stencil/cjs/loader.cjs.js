'use strict';

var index = require('./index-5u5AyTDB.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await index.globalScripts();
  return index.bootstrapLazy([], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
