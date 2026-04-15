const registerStencilComponents = async (): Promise<void> => {
  try {
    const loaderPath = '/stencil/loader/index.js';
    const stencilLoader = await import(/* @vite-ignore */ loaderPath);
    stencilLoader.defineCustomElements?.();
  } catch (error) {
    // Ignore while Stencil has not been built yet.
    console.warn('[stencil] Loader not available yet. Run "npm run build:stencil".', error);
  }
};

void registerStencilComponents();
