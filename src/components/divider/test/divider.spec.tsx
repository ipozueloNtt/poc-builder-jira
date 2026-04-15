import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthDivider } from '../divider';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthDivider, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-divider', () => {
  it('should have default properties', async () => {
    const page = await testPage(`<ath-divider></ath-divider>`);
    const divider = page.root.shadowRoot.querySelector('.ath-divider');
    expect(page.root).toHaveProperty('orientation', 'horizontal');
    expect(divider).toHaveClass('ath-divider--orientation-horizontal');
    expect(page.root).toHaveProperty('size', 'md');
    expect(divider).toHaveClass('ath-divider--size-md');
    expect(page.root).toHaveProperty('color', 'bold');
    expect(divider).toHaveClass('ath-divider--color-bold');
  });

  it('should render with vertical orientation', async () => {
    const page = await testPage(`<ath-divider orientation="vertical"></ath-divider>`);
    const divider = page.root.shadowRoot.querySelector('.ath-divider');
    expect(divider).toHaveClass('ath-divider--orientation-vertical');
    expect(page.root).toHaveProperty('orientation', 'vertical');
  });

  it('should render with small size', async () => {
    const page = await testPage(`<ath-divider size="sm"></ath-divider>`);
    const divider = page.root.shadowRoot.querySelector('.ath-divider');
    expect(divider).toHaveClass('ath-divider--size-sm');
    expect(page.root).toHaveProperty('size', 'sm');
  });

  it('should render with bolder color', async () => {
    const page = await testPage(`<ath-divider color="bolder"></ath-divider>`);
    const divider = page.root.shadowRoot.querySelector('.ath-divider');
    expect(divider).toHaveClass('ath-divider--color-bolder');
    expect(page.root).toHaveProperty('color', 'bolder');
  });
});
