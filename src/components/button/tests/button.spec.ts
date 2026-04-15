import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthButton } from '../button';
import { AthIcon } from '../../icon/icon';
import { ButtonColor, ButtonSize } from '../button.model';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthButton, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-button', () => {
  describe('render', () => {
    it('should display the passed text', async () => {
      const text = 'Button';
      const page = await testPage(`<ath-button>${text}</ath-button>`);
      expect(page.root).toEqualText(text);
    });

    it('should set default properties', async () => {
      const page = await testPage(`<ath-button></ath-button>`);
      expect(page.root).toHaveProperty('color', `${ButtonColor.Primary}`);
      expect(page.root).toHaveProperty('size', `${ButtonSize.Medium}`);
    });

    it('should set the primary color property when color is primary', async () => {
      const page = await testPage(`<ath-button color="primary"></ath-button>`);
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button--container');
      expect(innerSpan).toHaveClass('ath-button--primary');
    });

    it('should set the secondary color property when color is secondary', async () => {
      const page = await testPage(`<ath-button color="secondary"></ath-button>`);
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button--container');
      expect(innerSpan).toHaveClass('ath-button--secondary');
    });

    it('should set the small size property when size is xs', async () => {
      const page = await testPage(`<ath-button size="xs"></ath-button>`);
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button--container');
      expect(innerSpan).toHaveClass('ath-button--xs');
    });

    it('should set the small size property when size is sm', async () => {
      const page = await testPage(`<ath-button size="sm"></ath-button>`);
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button--container');
      expect(innerSpan).toHaveClass('ath-button--sm');
    });

    it('should set the medium size property when size is md', async () => {
      const page = await testPage(`<ath-button size="md"></ath-button>`);
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button--container');
      expect(innerSpan).toHaveClass('ath-button--md');
    });

    it('should set the large size property when size is lg', async () => {
      const page = await testPage('<ath-button size="lg"></ath-button>');
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button--container');
      expect(innerSpan).toHaveClass('ath-button--lg');
    });

    it('should display button with an icon in the left side', async () => {
      const page = await testPage('<ath-button icon-position="left" icon="chevron-left">Button</ath-button>', [AthIcon]);
      const span = page.root.shadowRoot.querySelector('span.ath-button__inner');
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(span.firstChild.nodeName).toBe('ath-ICON');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#chevron-left');
    });

    it('should display button with an icon in the right side', async () => {
      const page = await testPage('<ath-button icon-position="right" icon="chevron-left">Button</ath-button>', [AthIcon]);
      const span = page.root.shadowRoot.querySelector('span.ath-button__inner');
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(span.lastChild.nodeName).toBe('ath-ICON');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#chevron-left');
    });

    it('should add only icon property when icon-position is icon-only', async () => {
      const page = await testPage('<ath-button icon-position="icon-only" icon="chevron-left"></ath-button>');
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button--container');
      expect(innerSpan).toHaveClass('ath-button--icon-only');
    });

    it('should display only icon button when icon-position is icon-only', async () => {
      const page = await testPage('<ath-button icon-position="icon-only" icon="close"></ath-button>', [AthIcon]);
      const athButton = page.root.shadowRoot.querySelector('.ath-button--container');
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(athButton).toHaveClass('ath-button--icon-only');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#close');
    });

    it('should set the clear property when clear is true', async () => {
      const page = await testPage('<ath-button clear="true"}></ath-button>');
      const innerSpan = page.root.shadowRoot.querySelector('.ath-button--container');
      expect(innerSpan).toHaveClass('ath-button--clear');
    });

    it('should set the disabled attribute and the disabled property on the button element when it is disabled', async () => {
      const page = await testPage('<ath-button disabled="true"></ath-button>');
      const athButton = page.root;
      const button = page.root.shadowRoot.querySelector('.ath-button--container');
      expect(athButton).toHaveAttribute('disabled');
      await page.waitForChanges();
      expect(button.classList.contains('ath-button--disabled')).toBe(true);
    });

    it('should update tabindex when disabled changes to true', async () => {
      const page = await testPage('<ath-button>Test</ath-button>');
      const button = page.root;

      button.disabled = true;
      await page.waitForChanges();

      expect(button.getAttribute('tabindex')).toBe('-1');
    });
    it('should restore initial tabindex when disabled changes to false', async () => {
      const page = await testPage('<ath-button tabindex="2">Test</ath-button>');
      const button = page.root;

      button.disabled = true;
      await page.waitForChanges();
      expect(button.getAttribute('tabindex')).toBe('-1');

      button.disabled = false;
      await page.waitForChanges();

      expect(button.getAttribute('tabindex')).toBe('2');
    });
    it('should set tabindex to 0 when disabled changes from true to false and no initial tabindex is set', async () => {
      const page = await testPage('<ath-button disabled="true">Test</ath-button>');
      const button = page.root;

      expect(button.getAttribute('tabindex')).toBe('-1');

      button.disabled = false;
      await page.waitForChanges();
      expect(button.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('action', () => {
    let page: SpecPage;
    let button;

    beforeEach(async () => {
      page = await testPage('<ath-button>Click me</ath-button>');
      button = page.root;
    });

    it('should emit the athClick event when clicked', async () => {
      const athClick = jest.fn();
      page.root.addEventListener('athClick', athClick);
      button.click();
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
