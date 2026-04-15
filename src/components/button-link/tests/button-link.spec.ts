import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthButtonLink } from '../button-link';
import { AthIcon } from '../../icon/icon';
import { ButtonLinkColor, ButtonLinkSize } from '../button-link.model';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthButtonLink, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-button-link', () => {
  describe('render', () => {
    it('should display the passed text', async () => {
      const text = 'Button';
      const page = await testPage(`<ath-button-link>${text}</ath-button-link>`);
      expect(page.root).toEqualText(text);
    });

    it('should set default properties', async () => {
      const page = await testPage(`<ath-button-link></ath-button-link>`);
      expect(page.root).toHaveProperty('color', `${ButtonLinkColor.Primary}`);
      expect(page.root).toHaveProperty('size', `${ButtonLinkSize.Medium}`);
    });

    it('should set the primary color property when color is primary', async () => {
      const page = await testPage(`<ath-button-link color="primary" tabindex="-1"></ath-button-link>`);
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button-link--container');
      expect(innerSpan).toHaveClass('ath-button-link--primary');
    });

    it('should set the secondary color property when color is secondary', async () => {
      const page = await testPage(`<ath-button-link color="secondary"></ath-button-link>`);
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button-link--container');
      expect(innerSpan).toHaveClass('ath-button-link--secondary');
    });

    it('should set the small size property when size is sm', async () => {
      const page = await testPage(`<ath-button-link size="sm"></ath-button-link>`);
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button-link--container');
      expect(innerSpan).toHaveClass('ath-button-link--sm');
    });

    it('should set the medium size property when size is md', async () => {
      const page = await testPage(`<ath-button-link size="md"></ath-button-link>`);
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button-link--container');
      expect(innerSpan).toHaveClass('ath-button-link--md');
    });

    it('should set the large size property when size is lg', async () => {
      const page = await testPage('<ath-button-link size="lg"></ath-button-link>');
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button-link--container');
      expect(innerSpan).toHaveClass('ath-button-link--lg');
    });

    it('should set the disabled attribute and the disabled property on the button-link element when it is disabled', async () => {
      const page = await testPage('<ath-button-link disabled="true"></ath-button-link>');
      const athButton = page.root;
      const button = page.root.shadowRoot.querySelector('.ath-button-link--container');
      expect(athButton).toHaveAttribute('disabled');
      await page.waitForChanges();
      expect(button.classList.contains('ath-button-link--disabled')).toBe(true);
    });

    it('should display button with an icon', async () => {
      const page = await testPage('<ath-button-link icon="close">Button</ath-button-link>', [AthIcon]);
      const span = page.root.shadowRoot.querySelector('span.ath-button-link__inner');
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(span.firstChild.nodeName).toBe('ath-ICON');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#close');
    });
  });

  describe('ath-button-link icon', () => {
    it('should display icon', async () => {
      const text = 'Button Link';
      const page = await testPage(`<ath-button-link icon="close">${text}</ath-button-link>`);
      const icon = page.root.shadowRoot.querySelector('ath-icon');

      expect(icon).toBeTruthy();
      expect(icon).toEqualAttribute('icon', 'close');
    });

    it('should display icon when icon-position is right', async () => {
      const text = 'Button Link';
      const page = await testPage(`<ath-button-link icon="close" icon-position="right">${text}</ath-button-link>`);
      const icon = page.root.shadowRoot.querySelector('ath-icon');

      expect(icon).toBeTruthy();
      expect(icon).toEqualAttribute('icon', 'close');
    });

    it('should not display icon', async () => {
      const page = await testPage(`<ath-button-link></ath-button-link>`);
      const icon = page.root.shadowRoot.querySelector('ath-icon');

      expect(icon).toBeFalsy();
    });
  });

  describe('action', () => {
    let page: SpecPage;
    let button;

    beforeEach(async () => {
      page = await testPage('<ath-button-link autofocus="true">Click me</ath-button-link>');
      button = page.root;
    });

    it('should emit the athClick event when clicked', async () => {
      const athClick = jest.fn();
      page.root.addEventListener('athClick', athClick);
      button.click();
      expect(athClick).toHaveBeenCalled();
    });

    it('should emit the athClick event when key is enter or space', async () => {
      const athClick = jest.fn();
      page.root.addEventListener('athClick', athClick);

      const keyEvent = new KeyboardEvent('keydown', {
        code: 'Enter',
        bubbles: true,
      });

      button.dispatchEvent(keyEvent);
      expect(athClick).toHaveBeenCalled();

      const keyEvent2 = new KeyboardEvent('keydown', {
        code: 'Space',
        bubbles: true,
      });

      button.dispatchEvent(keyEvent2);
      expect(athClick).toHaveBeenCalled();
    });

    it('should emit the athFocus event when focused', async () => {
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      button.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('should emit the athBlur event when blurred', async () => {
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      button.focus();
      button.blur();
      expect(athBlur).toHaveBeenCalled();
    });
  });
});
