import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthIcon } from '../icon';
import { IconSize } from '@utils/helper';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthIcon, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

describe('ath-icon', () => {
  const defaultSize = IconSize.Medium;

  it('should build', () => {
    expect(new AthIcon()).toBeTruthy();
  });

  describe('render', () => {
    it('should set default classes and properties', async () => {
      const page = await testPage(`<ath-icon></ath-icon>`);
      const icon = page.root.shadowRoot.querySelector('svg');
      expect(icon).toMatchClasses(['ath-icon', `ath-icon--${defaultSize}`, `ath-icon--default`]);
      expect(page.root).toHaveProperty('size', `${defaultSize}`);
      expect(page.root.getAttribute('aria-hidden')).toBe('true');
    });

    it('should set icon class when icon is defined', async () => {
      const page = await testPage(`<ath-icon icon="add"></ath-icon>`);
      const icon = page.root.shadowRoot.querySelector('svg');
      const use = icon.querySelector('use');
      expect(use.getAttribute('href')).toContain('sprites.svg#add');
    });

    it('should set extra small class when size is xs', async () => {
      const page = await testPage(`<ath-icon size="xs"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--xs');
    });

    it('should set small property when size is sm', async () => {
      const page = await testPage(`<ath-icon size="sm"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--sm');
    });

    it('should set medium property when size is md', async () => {
      const page = await testPage(`<ath-icon size="md"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--md');
    });

    it('should set large property when size is lg', async () => {
      const page = await testPage(`<ath-icon size="lg"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--lg');
    });

    it('should set aria-label and role img when aria-label is defined', async () => {
      const page = await testPage(`<ath-icon aria-label="text"></ath-icon>`);
      expect(page.root.getAttribute('aria-label')).toEqualText('text');
      expect(page.root.getAttribute('role')).toBe('img');
    });

    it('should set aria-labelledby and role img when aria-labelledby is defined', async () => {
      const page = await testPage(`<ath-icon aria-labelledby="id"></ath-icon>`);
      expect(page.root.getAttribute('aria-labelledby')).toEqualText('id');
      expect(page.root.getAttribute('role')).toBe('img');
    });

    it('should render primary color', async () => {
      const page = await testPage(`<ath-icon color="primary"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--primary');
    });

    it('should render accent color', async () => {
      const page = await testPage(`<ath-icon color="accent"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--accent');
    });

    it('should render error color', async () => {
      const page = await testPage(`<ath-icon color="error"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--error');
    });

    it('should render warning color', async () => {
      const page = await testPage(`<ath-icon color="warning"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--warning');
    });

    it('should render success color', async () => {
      const page = await testPage(`<ath-icon color="success"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--success');
    });

    it('should render info color', async () => {
      const page = await testPage(`<ath-icon color="info"></ath-icon>`);
      const innerSVG = page.root.shadowRoot.querySelector('svg');
      expect(innerSVG).toHaveClass('ath-icon--info');
    });
  });
});
