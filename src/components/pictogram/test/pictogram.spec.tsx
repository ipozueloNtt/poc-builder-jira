import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthPictogram } from '../pictogram';
import { PictogramSizeType } from '../pictogram.model';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthPictogram, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

describe('ath-pictogram', () => {
  const defaultSize = PictogramSizeType.Medium;

  it('should build', () => {
    expect(new AthPictogram()).toBeTruthy();
  });

  describe('render', () => {
    it('should set default classes and properties', async () => {
      const page = await testPage(`<ath-pictogram name="search"></ath-pictogram>`);
      const pictogram = page.root.shadowRoot.querySelector('.ath-pictogram');
      expect(pictogram).toHaveClasses(['ath-pictogram', `ath-pictogram--${defaultSize}`]);
      expect(page.root).toHaveProperty('size', `${defaultSize}`);
      expect(page.root.getAttribute('aria-hidden')).toBe('true');
    });

    it('should set pictogram class when pictogram is defined', async () => {
      const page = await testPage(`<ath-pictogram name="search"></ath-pictogram>`);
      const pictogram = page.root.shadowRoot.querySelector('.ath-pictogram');
      const img = pictogram.querySelector('img');
      expect(img.getAttribute('src')).toContain('search.svg');
    });

    it('should set extra small class when size is xs', async () => {
      const page = await testPage(`<ath-pictogram size="xs" name="search"></ath-pictogram>`);
      const pictogram = page.root.shadowRoot.querySelector('.ath-pictogram');
      expect(pictogram).toHaveClass('ath-pictogram--xs');
    });

    it('should set small property when size is sm', async () => {
      const page = await testPage(`<ath-pictogram size="sm" name="search"></ath-pictogram>`);
      const pictogram = page.root.shadowRoot.querySelector('.ath-pictogram');
      expect(pictogram).toHaveClass('ath-pictogram--sm');
    });

    it('should set medium property when size is md', async () => {
      const page = await testPage(`<ath-pictogram size="md" name="search"></ath-pictogram>`);
      const pictogram = page.root.shadowRoot.querySelector('.ath-pictogram');
      expect(pictogram).toHaveClass('ath-pictogram--md');
    });

    it('should set large property when size is lg', async () => {
      const page = await testPage(`<ath-pictogram size="lg" name="search"></ath-pictogram>`);
      const pictogram = page.root.shadowRoot.querySelector('.ath-pictogram');
      expect(pictogram).toHaveClass('ath-pictogram--lg');
    });

    it('should set large property when size is xl', async () => {
      const page = await testPage(`<ath-pictogram size="xl" name="search"></ath-pictogram>`);
      const pictogram = page.root.shadowRoot.querySelector('.ath-pictogram');
      expect(pictogram).toHaveClass('ath-pictogram--xl');
    });

    it('should set large property when size is 2xl', async () => {
      const page = await testPage(`<ath-pictogram size="2xl" name="search"></ath-pictogram>`);
      const pictogram = page.root.shadowRoot.querySelector('.ath-pictogram');
      expect(pictogram).toHaveClass('ath-pictogram--2xl');
    });

    it('should set aria-label and role when ariaLabel is provided', async () => {
      const page = await testPage(`<ath-pictogram name="search" aria-label="Buscar"></ath-pictogram>`);
      expect(page.root.getAttribute('aria-label')).toBe('Buscar');
      expect(page.root.getAttribute('role')).toBe('img');
      expect(page.root.getAttribute('aria-hidden')).toBeNull();
    });

    it('should set aria-labelledby and role when ariaLabelledby is provided and ariaLabel is not', async () => {
      const page = await testPage(`<ath-pictogram name="search" aria-labelledby="label-id"></ath-pictogram>`);
      expect(page.root.getAttribute('aria-labelledby')).toBe('label-id');
      expect(page.root.getAttribute('role')).toBe('img');
      expect(page.root.getAttribute('aria-hidden')).toBeNull();
    });

    it('should set aria-hidden when no ariaLabel or ariaLabelledby is provided', async () => {
      const page = await testPage(`<ath-pictogram name="search"></ath-pictogram>`);
      expect(page.root.getAttribute('aria-hidden')).toBe('true');
      expect(page.root.getAttribute('role')).toBeNull();
      expect(page.root.getAttribute('aria-label')).toBeNull();
      expect(page.root.getAttribute('aria-labelledby')).toBeNull();
    });
  });
});
