import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthUserMenu } from '../user-menu';
import { AthAvatar } from 'components/avatar/avatar';
import { AthButtonLink } from 'components/button-link/button-link';
import { AthMenuButtonItem } from 'components/menu-button/menu-button-item/menu-button-item';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthUserMenu, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-user-menu', () => {
  describe('render', () => {
    it('should set default avatar image', async () => {
      const page = await testPage(`<ath-user-menu></ath-user-menu>`, [AthAvatar]);
      const avatar = page.root.shadowRoot.querySelector('ath-avatar');
      expect(avatar.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('illu_male');
    });

    it('should not render avatar when type is "hide-avatar"', async () => {
      const page = await testPage(`<ath-user-menu type="hide-avatar"></ath-user-menu>`, [AthAvatar]);
      const avatar = page.root.shadowRoot.querySelector('ath-avatar');
      expect(avatar).toBeNull();
    });

    it('should have aria-expanded true when open is true', async () => {
      const page = await testPage(`<ath-user-menu src-image="./assets/images/person-shadow.png" open></ath-user-menu>`, [AthButtonLink]);
      const buttonLink = page.root.shadowRoot.querySelector('ath-button-link');
      expect(buttonLink).toEqualAttribute('aria-expanded', 'true');
    });

    it('should have aria-expanded true when button-link is clicked', async () => {
      const page = await testPage(
        `<ath-user-menu><ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item><ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item></ath-user-menu>`,
        [AthUserMenu, AthButtonLink],
      );
      await page.waitForChanges();

      const buttonLink = page.root.shadowRoot.querySelector('ath-button-link');
      buttonLink.focus();
      buttonLink.click();
      await page.waitForChanges();
      expect(buttonLink).toEqualAttribute('aria-expanded', 'true');
    });

    it('should close the overlay by clicking on an item', async () => {
      const page = await newSpecPage({
        components: [AthUserMenu, AthMenuButtonItem],
        html: `<ath-user-menu open><ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item></ath-user-menu>`,
      });

      const menuButtonItem = page.root.querySelector('ath-menu-button-item');
      expect(menuButtonItem).toBeTruthy();

      menuButtonItem.dispatchEvent(new CustomEvent('athSelected', { bubbles: true }));
      await page.waitForChanges();

      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeFalsy();
    });

    it('should close the overlay by clicking on button-link', async () => {
      const page = await testPage(`<ath-user-menu open><ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item></ath-user-menu>`, [
        AthButtonLink,
      ]);
      const ButtonLink = page.root.shadowRoot.querySelector('ath-button-link');
      ButtonLink.click();
      await page.waitForChanges();

      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeFalsy();
    });

    it('should not open the overlay by using space or enter keys on button-link', async () => {
      const page = await testPage(`<ath-user-menu></ath-user-menu>`, [AthMenuButtonItem]);
      await page.waitForChanges();
      const buttonLink = page.root.shadowRoot.querySelector('ath-button-link');

      const spaceEvent = new KeyboardEvent('keydown', {
        key: ' ',
        bubbles: true,
      });
      buttonLink.focus();
      buttonLink.dispatchEvent(spaceEvent);
      await page.waitForChanges();

      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeFalsy();

      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      });
      buttonLink.focus();
      buttonLink.dispatchEvent(enterEvent);
      await page.waitForChanges();

      const overlayAfter2 = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter2).toBeFalsy();
    });

    it('should second option focused when arrow down is pressed two times', async () => {
      const page = await testPage(
        `<ath-user-menu open=true><ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item><ath-menu-button-item slot="option" icon="placeholder" text="Opción2"></ath-menu-button-item></ath-user-menu>`,
        [AthMenuButtonItem, AthButtonLink],
      );
      await page.waitForChanges();

      const menuItems = page.root.querySelectorAll('ath-menu-button-item');

      expect(menuItems.length).toBe(2);
      expect(menuItems[0].itemTabIndex).toBe(0);
      expect(menuItems[1].itemTabIndex).toBe(-1);

      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        code: 'ArrowDown',
        bubbles: true,
      });
      menuItems[0].dispatchEvent(arrowDownEvent);
      await page.waitForChanges();

      menuItems[0].dispatchEvent(arrowDownEvent);
      await page.waitForChanges();

      const menuItemsCheck = page.root.querySelectorAll('ath-menu-button-item');
      const secondMenuItem = menuItemsCheck[1];

      expect(secondMenuItem.itemTabIndex).toBe(0);
    });

    it('should second option focused when arrow right is pressed two times', async () => {
      const page = await testPage(
        `<ath-user-menu open=true><ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item><ath-menu-button-item slot="option" icon="placeholder" text="Opción2"></ath-menu-button-item></ath-user-menu>`,
        [AthMenuButtonItem, AthButtonLink],
      );
      await page.waitForChanges();

      const menuItems = page.root.querySelectorAll('ath-menu-button-item');

      expect(menuItems.length).toBe(2);
      expect(menuItems[0].itemTabIndex).toBe(0);
      expect(menuItems[1].itemTabIndex).toBe(-1);

      const arrowRightEvent = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        code: 'ArrowRight',
        bubbles: true,
      });
      menuItems[0].dispatchEvent(arrowRightEvent);
      await page.waitForChanges();

      menuItems[0].dispatchEvent(arrowRightEvent);
      await page.waitForChanges();

      const menuItemsCheck = page.root.querySelectorAll('ath-menu-button-item');
      const secondMenuItem = menuItemsCheck[1];

      expect(secondMenuItem.itemTabIndex).toBe(0);
    });

    it('should third option focused when End is pressed', async () => {
      const page = await testPage(
        `<ath-user-menu open=true>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción2"></ath-menu-button-item>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción3"></ath-menu-button-item>
        </ath-user-menu>`,
        [AthMenuButtonItem, AthButtonLink],
      );
      await page.waitForChanges();

      const menuItems = page.root.querySelectorAll('ath-menu-button-item');

      expect(menuItems.length).toBe(3);
      expect(menuItems[0].itemTabIndex).toBe(0);
      expect(menuItems[2].itemTabIndex).toBe(-1);

      const endEvent = new KeyboardEvent('keydown', {
        key: 'End',
        code: 'End',
        bubbles: true,
      });
      menuItems[0].dispatchEvent(endEvent);
      await page.waitForChanges();

      const menuItemsCheck = page.root.querySelectorAll('ath-menu-button-item');
      const thirdMenuItem = menuItemsCheck[2];

      expect(thirdMenuItem.itemTabIndex).toBe(0);
    });

    it('should second option focused when arrowUp is pressed and third option is disabled', async () => {
      const page = await testPage(
        `<ath-user-menu open=true>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción2"></ath-menu-button-item>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción3" disabled></ath-menu-button-item>
        </ath-user-menu>`,
        [AthMenuButtonItem, AthButtonLink],
      );
      await page.waitForChanges();

      const menuItems = page.root.querySelectorAll('ath-menu-button-item');

      expect(menuItems.length).toBe(3);
      expect(menuItems[0].itemTabIndex).toBe(0);
      expect(menuItems[2].itemTabIndex).toBe(-1);

      const arrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });
      menuItems[0].dispatchEvent(arrowUpEvent);
      await page.waitForChanges();

      const menuItemsCheck = page.root.querySelectorAll('ath-menu-button-item');
      const secondMenuItem = menuItemsCheck[1];
      const thirdMenuItem = menuItemsCheck[2];
      expect(secondMenuItem.itemTabIndex).toBe(0);
      expect(thirdMenuItem.itemTabIndex).toBe(-1);
    });

    it('should second option focused when arrowUp is pressed two times', async () => {
      const page = await testPage(
        `<ath-user-menu  open=true>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción2"></ath-menu-button-item>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción3"></ath-menu-button-item>
        </ath-user-menu>`,
        [AthMenuButtonItem, AthButtonLink],
      );
      await page.waitForChanges();

      const menuItems = page.root.querySelectorAll('ath-menu-button-item');

      expect(menuItems.length).toBe(3);
      expect(menuItems[0].itemTabIndex).toBe(0);
      expect(menuItems[2].itemTabIndex).toBe(-1);

      const arrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });
      menuItems[0].dispatchEvent(arrowUpEvent);
      await page.waitForChanges();
      menuItems[0].dispatchEvent(arrowUpEvent);
      await page.waitForChanges();

      const menuItemsCheck = page.root.querySelectorAll('ath-menu-button-item');
      const secondMenuItem = menuItemsCheck[1];
      const thirdMenuItem = menuItemsCheck[2];
      expect(secondMenuItem.itemTabIndex).toBe(0);
      expect(thirdMenuItem.itemTabIndex).toBe(-1);
    });

    it('should first option focused when Home is pressed', async () => {
      const page = await testPage(
        `<ath-user-menu open=true>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción"></ath-menu-button-item>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción2"></ath-menu-button-item>
        <ath-menu-button-item slot="option" icon="placeholder" text="Opción3"></ath-menu-button-item>
        </ath-user-menu>`,
        [AthMenuButtonItem, AthButtonLink],
      );
      await page.waitForChanges();

      const menuItems = page.root.querySelectorAll('ath-menu-button-item');

      expect(menuItems.length).toBe(3);
      expect(menuItems[0].itemTabIndex).toBe(0);
      expect(menuItems[2].itemTabIndex).toBe(-1);

      const endEvent = new KeyboardEvent('keydown', {
        key: 'End',
        code: 'End',
        bubbles: true,
      });
      menuItems[0].dispatchEvent(endEvent);
      await page.waitForChanges();
      const thirdMenuItem = menuItems[2];
      expect(thirdMenuItem.itemTabIndex).toBe(0);

      const homeEvent = new KeyboardEvent('keydown', {
        key: 'Home',
        code: 'Home',
        bubbles: true,
      });
      menuItems[0].dispatchEvent(homeEvent);
      await page.waitForChanges();

      const firstMenuItem = menuItems[0];
      expect(firstMenuItem.itemTabIndex).toBe(0);
    });

    it('should close by using ESC key', async () => {
      const page = await testPage(`<ath-user-menu open></ath-user-menu>`);
      await page.waitForChanges();
      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeTruthy();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      page.root.dispatchEvent(event);
      await page.waitForChanges();
      const overlayEsc = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayEsc).toBeFalsy();
    });

    it('should close by using TAB key', async () => {
      const page = await testPage(`<ath-user-menu open></ath-user-menu>`);
      await page.waitForChanges();
      const overlayAfter = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayAfter).toBeTruthy();

      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      page.root.dispatchEvent(event);
      await page.waitForChanges();
      const overlayEsc = page.root.shadowRoot.querySelector('[role="menu"]');
      expect(overlayEsc).toBeFalsy();
    });
  });
});
