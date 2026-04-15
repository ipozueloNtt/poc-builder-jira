import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthAvatar } from '../avatar';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthAvatar, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-avatar render', () => {
  it('should have default properties', async () => {
    const page = await testPage(`<ath-avatar></ath-avatar>`);
    expect(page.root).toHaveProperty('type', undefined);
    expect(page.root).toHaveProperty('size', 'md');
    const svg = page.root.shadowRoot.querySelector('svg');
    const use = svg.querySelector('use');
    expect(use.getAttribute('href')).toContain('illu_male');
  });

  it('should have initials text and type is initials', async () => {
    const page = await testPage(`<ath-avatar type="initials" initials="GC"></ath-avatar>`);
    const span = page.root.shadowRoot.querySelector('span');
    expect(page.root).toHaveProperty('type', 'initials');
    expect(page.root).toHaveProperty('size', 'md');
    expect(span.innerHTML).toEqualText('GC');
  });

  it('should have img', async () => {
    const page = await testPage(`<ath-avatar type="image"><img slot="img" alt="texto alternativo de la imagen" src="./assets/images/person-shadow.png"></ath-avatar>`);
    await page.waitForChanges();
    expect(page.root).toHaveProperty('type', 'image');
    const img = page.root.querySelector('img');
    expect(img.src).toContain('person-shadow.png');
  });

  it('should have svg when type is image and there is no img added to slot', async () => {
    const page = await testPage(`<ath-avatar type="image"></ath-avatar>`);
    await page.waitForChanges();
    expect(page.root).toHaveProperty('type', 'image');
    const img = page.root.querySelector('img');
    expect(img).toBe(null);
    const svg = page.root.shadowRoot.querySelector('svg');
    const use = svg.querySelector('use');
    expect(use.getAttribute('href')).toContain('illu_male');
  });

  it('should have img when type is not filled and theres an image in slot', async () => {
    const page = await testPage(`<ath-avatar><img slot="img" alt="texto alternativo de la imagen" src="./assets/images/person-shadow.png"></ath-avatar>`);
    await page.waitForChanges();
    expect(page.root).toHaveProperty('type', undefined);
    const img = page.root.querySelector('img');
    expect(img.src).toContain('person-shadow.png');
  });

  it('should have svg when type is initials and initials and avatar-name not filled', async () => {
    const page = await testPage(`<ath-avatar type="initials"></ath-avatar>`);
    await page.waitForChanges();
    expect(page.root).toHaveProperty('type', 'initials');
    const svg = page.root.shadowRoot.querySelector('svg');
    const use = svg.querySelector('use');
    expect(use.getAttribute('href')).toContain('illu_male');
  });

  it('should have initials text when type is undefined and avatar-name is filled', async () => {
    const page = await testPage(`<ath-avatar avatar-name="avatar name"></ath-avatar>`);
    const span = page.root.shadowRoot.querySelector('span');
    expect(page.root).toHaveProperty('type', undefined);
    expect(span.innerHTML).toEqualText('AN');
  });
});
