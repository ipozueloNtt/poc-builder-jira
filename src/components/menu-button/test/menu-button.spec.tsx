import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthMenuButton } from '../menu-button';
import { AthMenuButtonItem } from '../menu-button-item/menu-button-item';
import { AthButton } from 'components/button/button';
import { AthIcon } from 'components/icon/icon';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthMenuButton, AthMenuButtonItem, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

var counter = 0;
describe('ath-menu-button', () => {
  beforeEach(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    counter++;
  });

  describe('ath-menu-button', () => {
    it('should inject athButton properties to athButton', async () => {
      const page = await testPage(`<ath-menu-button autofocus clear color="secondary" disabled icon="scope" icon-position="icon-only" size="lg"></ath-menu-button>`, [AthButton]);
      const athButton = page.root.shadowRoot.querySelector('ath-button');
      expect(athButton).toHaveProperty('clear', true);
      expect(athButton).toHaveAttribute('autofocus');
      expect(athButton).toHaveProperty('color', 'secondary');
      expect(athButton).toHaveProperty('disabled', true);
      expect(athButton).toHaveProperty('icon', 'scope');
      expect(athButton.getAttribute('icon-position')).toBe('icon-only');
      expect(athButton).toHaveProperty('size', 'lg');
    });

    describe('ath-menu-button CLASSES based on alignment', () => {
      it('should have position-left class', async () => {
        const page = await testPage(`<ath-menu-button alignment="left" open></ath-menu-button>`, [AthButton]);
        const overlay = page.root.shadowRoot.querySelector('div.ath-menu-button-overlay');
        expect(overlay).toHaveClass('position--left');
      });

      it('should have position-right class', async () => {
        const page = await testPage(`<ath-menu-button alignment="right" open></ath-menu-button>`, [AthButton]);
        const overlay = page.root.shadowRoot.querySelector('div.ath-menu-button-overlay');
        expect(overlay).toHaveClass('position--right');
      });
    });
  });

  describe('overlay', () => {
    it('should open the overlay with the prop open', async () => {
      const page = await testPage('<ath-menu-button open></ath-menu-button>');
      const overlay = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlay).toHaveClass('ath-menu-button-overlay');
    });

    it('should not open the overlay without the prop open', async () => {
      const page = await testPage('<ath-menu-button></ath-menu-button>');
      const overlay = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlay).toBeFalsy();
    });

    it('should listen to athClick event from athButton and open the overlay, and close by clicking once again', async () => {
      const page = await testPage(`<ath-menu-button></ath-menu-button>`, [AthButton]);
      const athButton = page.root.shadowRoot.querySelector('ath-button');
      const overlayBefore = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayBefore).toBeFalsy();

      athButton.dispatchEvent(new CustomEvent('athClick'));
      await page.waitForChanges();
      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeTruthy();

      athButton.dispatchEvent(new CustomEvent('athClick'));
      await page.waitForChanges();
      const overlayClose = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayClose).toBeFalsy();
    });

    it('The menu button select the first option when the button has focus and enter ArrowDown key', async () => {
      const page = await newSpecPage({
        components: [AthMenuButton, AthMenuButtonItem, AthMenuButton],
        html: `<ath-menu-button open>  <ath-menu-button-item></ath-menu-button-item>
        <ath-menu-button-item></ath-menu-button-item></ath-menu-button>`,
      });

      const menuItems = page.root.querySelectorAll('ath-menu-button-item');

      page.root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();

      expect(menuItems[0].tabIndex).toBe(0);
    });

    it('should close by clicking outside the overlay', async () => {
      const page = await testPage(`<ath-menu-button alignment="right"></ath-menu-button>`, [AthButton]);
      const athButton = page.root.shadowRoot.querySelector('ath-button');
      const overlayBefore = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayBefore).toBeFalsy();

      athButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true }));
      await page.waitForChanges();
      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeTruthy();

      page.body.click();
      await page.waitForChanges();
      const overlayClose = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayClose).toBeFalsy();
    });

    it('should close by using ESC key', async () => {
      const page = await testPage(`<ath-menu-button alignment="right"></ath-menu-button>`, [AthButton]);
      const athButton = page.root.shadowRoot.querySelector('ath-button');
      const overlayBefore = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayBefore).toBeFalsy();

      athButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true }));
      await page.waitForChanges();
      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeTruthy();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      page.root.dispatchEvent(event);
      await page.waitForChanges();
      const overlayEsc = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayEsc).toBeFalsy();
    });

    it('should close by using Tab key', async () => {
      const page = await testPage(
        `<ath-menu-button alignment="right">
          <ath-menu-button-item></ath-menu-button-item>
        </ath-menu-button>`,
        [AthButton],
      );
      const athButton = page.root.shadowRoot.querySelector('ath-button');
      const overlayBefore = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayBefore).toBeFalsy();

      athButton.dispatchEvent(new CustomEvent('athClick'));
      await page.waitForChanges();
      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(page.rootInstance.open).toBe(true);
      expect(overlayAfter).toBeTruthy();

      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      page.root.dispatchEvent(event);
      await page.waitForChanges();
      const overlayEsc = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayEsc).toBeFalsy();
    });

    it('should close the overlay by clicking on an item', async () => {
      const page = await newSpecPage({
        components: [AthMenuButtonItem, AthMenuButton],
        html: `<ath-menu-button open><ath-menu-button-item></ath-menu-button-item></ath-menu-button>`,
      });
      const menuButtonItem = page.root.querySelector('ath-menu-button-item');
      expect(menuButtonItem).toBeTruthy();

      menuButtonItem.dispatchEvent(new CustomEvent('athSelected', { bubbles: true }));
      await page.waitForChanges();

      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeFalsy();
    });

    it('should emit athAction by clicking on an item', async () => {
      const page = await newSpecPage({
        components: [AthMenuButtonItem, AthMenuButton],
        html: `<ath-menu-button open><ath-menu-button-item></ath-menu-button-item></ath-menu-button>`,
      });
      const menuButtonItem = page.root.querySelector('ath-menu-button-item');
      expect(menuButtonItem).toBeTruthy();

      menuButtonItem.dispatchEvent(new CustomEvent('athSelected', { bubbles: true }));
      await page.waitForChanges();

      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeFalsy();
    });
  });
});

describe('ath-menu-button-item', () => {
  it('should apply menu-button-items properties', async () => {
    const page = await testPage(`<ath-menu-button-item disabled icon="add" text="item"></ath-menu-button-item>`, [AthMenuButtonItem]);
    const athMenuButtonItem = page.root;

    expect(athMenuButtonItem.disabled).toBe(true);
    expect(athMenuButtonItem.icon).toBe('add');
    expect(athMenuButtonItem.text).toBe('item');
  });

  describe('icons', () => {
    // ICONS
    it('should render an icon on the left side of the item', async () => {
      const page = await testPage(
        `
        <ath-menu-button open>
          <ath-menu-button-item text="Menu Button Option" icon="scope"></ath-menu-button-item>
        </ath-menu-button>`,
        [AthMenuButtonItem, AthIcon],
      );
      const AthMenuButtonitem = page.root.querySelector('ath-menu-button-item');
      const athIcon = AthMenuButtonitem.querySelector('ath-icon');
      expect(athIcon).toBeTruthy();
    });

    it('should not render an icon on the left side of the item by default', async () => {
      const page = await testPage(
        `
        <ath-menu-button open>
          <ath-menu-button-item text="Menu Button Option"></ath-menu-button-item>
        </ath-menu-button>`,
        [AthMenuButtonItem, AthIcon],
      );
      const menuButtonItem = page.root.querySelector('ath-menu-button-item');
      const athIcon = menuButtonItem.querySelector('ath-icon');
      expect(athIcon).toBeFalsy();
    });
  });

  // ACCESIBILIDAD
  describe('Accessibility tests for ath-menu-button', () => {
    it('should apply aria-label, aria-labelledby, and aria-describedby properties', async () => {
      const page = await testPage(`<ath-menu-button aria-label="Menu" aria-labelledby="menu-label" aria-describedby="menu-description"></ath-menu-button>`, [AthMenuButton]);
      const athMenuButton = page.root;
      expect(athMenuButton.getAttribute('aria-label')).toBe('Menu');
      expect(athMenuButton.getAttribute('aria-labelledby')).toBe('menu-label');
      expect(athMenuButton.getAttribute('aria-describedby')).toBe('menu-description');
    });
  });

  describe('Accessibility tests for ath-menu-button-item', () => {
    it('should apply aria-disabled when disabled', async () => {
      const page = await testPage(`<ath-menu-button-item disabled></ath-menu-button-item>`, [AthMenuButtonItem]);
      const athMenuButtonItem = page.root;

      expect(athMenuButtonItem.hasAttribute('aria-disabled'));
    });
  });
});
