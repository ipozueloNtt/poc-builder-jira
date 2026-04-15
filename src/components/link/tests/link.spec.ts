import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthLink } from '../link';
import { AthIcon } from '../../icon/icon';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthLink, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-link', () => {
  describe('render', () => {
    it('should display the passed text', async () => {
      const text = 'Link';
      const page = await testPage(`<ath-link>${text}</ath-link>`);
      expect(page.root).toEqualText(text);
    });

    it('should have class disabled when disabled is true', async () => {
      const disabled = true;
      const page = await testPage(`<ath-link disabled=${disabled}></ath-link>`);
      const link = page.root.querySelector('.ath-link');
      expect(link).toHaveClass('ath-link--disabled');
    });

    it('should have class underline by default', async () => {
      const page = await testPage(`<ath-link >Link</ath-link>`);
      const link = page.root.querySelector('.ath-link');
      expect(link).toHaveClass('ath-link--underline');
    });

    it('should not have class underline if underline false and it has an icon', async () => {
      const page = await testPage(`<ath-link underline="false" icon="placeholder">Link</ath-link>`);
      const link = page.root.querySelector('.ath-link');
      expect(link).not.toHaveClass('ath-link--underline');
    });

    it('should have class sm when size is sm', async () => {
      const size = 'sm';
      const page = await testPage(`<ath-link size=${size}></ath-link>`);
      const link = page.root.querySelector('.ath-link');
      expect(link).toHaveClass(`ath-link--${size}`);
    });

    it('should have class md when size is md', async () => {
      const size = 'md';
      const page = await testPage(`<ath-link size=${size}></ath-link>`);
      const link = page.root.querySelector('.ath-link');
      expect(link).toHaveClass(`ath-link--${size}`);
    });

    it('should have class lg when size is md', async () => {
      const size = 'lg';
      const page = await testPage(`<ath-link size=${size}></ath-link>`);
      const link = page.root.querySelector('.ath-link');
      expect(link).toHaveClass(`ath-link--${size}`);
    });

    it('should display icon when icon is filled', async () => {
      const iconName = 'accident';
      const page = await testPage(`<ath-link icon=${iconName}></ath-link>`, [AthIcon]);
      const icon = page.root.querySelector('ath-icon');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain(`#${iconName}`);
    });
  });

  describe('action', () => {
    let page: SpecPage;
    let link;

    beforeEach(async () => {
      page = await testPage('<ath-link></ath-link>');
      link = page.root.querySelector('.ath-link');
    });

    it('should emit the athClick event when clicked', async () => {
      const athClick = jest.fn();
      page.root.addEventListener('athClick', athClick);
      link.click();
      expect(athClick).toHaveBeenCalled();
    });

    it('should emit the athFocus event when focused', async () => {
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      link.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('should emit the athBlur event when blurred', async () => {
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      link.focus();
      link.blur();
      expect(athBlur).toHaveBeenCalled();
    });
  });

  describe('aria-label and external-label', () => {
    it('should add custom external-label when link-target is "blank"', async () => {
      const page = await testPage(`<ath-link aria-label="Test" link-target="blank" external-label="with external-label"></ath-link>`);

      const linkEl = page.root.querySelector('.ath-link');
      expect(linkEl.getAttribute('aria-label')).toBe('Test with external-label');
    });

    it('adds (enlace externo) by default when link-target is "blank" and no external-label is provided', async () => {
      const page = await testPage(`<ath-link aria-label="Test" link-target="blank"></ath-link>`);

      const linkEl = page.root.querySelector('.ath-link');
      expect(linkEl.getAttribute('aria-label')).toBe('Test (enlace externo)');
    });

    it('concatenates external-label when link-target != "blank"', async () => {
      const page = await testPage(`<ath-link aria-label="Test" link-target="self" external-label="with external-label and target self"></ath-link>`);

      const linkEl = page.root.querySelector('.ath-link');
      expect(linkEl.getAttribute('aria-label')).toBe('Test with external-label and target self');
    });

    it('uses only external-label if no base-label and link-target != "blank"', async () => {
      const page = await testPage(`<ath-link link-target="self" external-label="only extra"></ath-link>`);

      const linkEl = page.root.querySelector('.ath-link');
      expect(linkEl.getAttribute('aria-label')).toBe('only extra');
    });
  });
});
