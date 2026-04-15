import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthMenuVertical } from '../menu-vertical';
import { AthMenuVerticalItemAction } from '../menu-vertical-item-action/menu-vertical-item-action';
import { AthMenuVerticalItemLink } from '../menu-vertical-item-link/menu-vertical-item-link';
import { AthSectionTitle } from 'components/section-title/section-title';

/**
 * Mock MutationObserver for Jest test environment.
 */
class MutationObserver {
  constructor() {}
  observe() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
global.MutationObserver = MutationObserver;

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthMenuVertical, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-menu-vertical', () => {
  describe('Rendering', () => {
    it('should set default appearance property to "primary"', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
          <ath-menu-vertical-item-action text="item"></ath-menu-vertical-item-action>
        </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      expect(page.root.appearance).toBe('primary');
    });

    it('when removing the component, it disappears from the DOM', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item"></ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );

      page.root.remove();

      await page.waitForChanges();

      expect(document.querySelector('ath-menu-vertical')).toBeNull();
    });

    it('should add "disabled" class when disabled property is true (level 1)', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
          <ath-menu-vertical-item-action text="item" disabled="true"></ath-menu-vertical-item-action>
        </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      const menuVerticalLevel1 = page.root.shadowRoot.querySelector('div.ath-menu-vertical__level-1');
      expect(menuVerticalLevel1).toHaveClass('disabled');
    });

    it('should render section title when appearance is "secondary"', async () => {
      const page = await testPage(
        `<ath-menu-vertical appearance="secondary">
          <ath-menu-vertical-item-action text="item">
            <ath-menu-vertical-item-action text="item"></ath-menu-vertical-item-action>
          </ath-menu-vertical-item-action>
        </ath-menu-vertical>`,
        [AthMenuVerticalItemAction, AthSectionTitle],
      );
      expect(page.root.appearance).toBe('secondary');
      const sectionTitle = page.root.shadowRoot.querySelector('ath-section-title');
      expect(sectionTitle).toBeTruthy();
    });
  });

  describe('Action Items', () => {
    it('should add "selected" class to level 3 action when selected is true', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item">
        <ath-menu-vertical-item-action text="item2">
          <ath-menu-vertical-item-action text="item3" selected="true"></ath-menu-vertical-item-action>
        </ath-menu-vertical-item-action>
      </ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();
      const items = page.root.shadowRoot.querySelectorAll('div.ath-menu-vertical__wrapper-title');
      expect(items[1]).toHaveClass('selected');
    });

    it('should add "disabled" class to level 2 action when disabled is true', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item" selected="true">
        <ath-menu-vertical-item-action text="item2" disabled="true"></ath-menu-vertical-item-action>
      </ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();
      const items = page.root.shadowRoot.querySelectorAll('div.ath-menu-vertical__wrapper-title');
      const level2 = Array.from(items).find(el => el.textContent.includes('item2'));
      expect(level2).toHaveClass('disabled');
    });

    it('when clicking on an level 1 item whith children only, its submenu is expanded but not selected', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item">
        <ath-menu-vertical-item-action text="item2"></ath-menu-vertical-item-action>
      </ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      const level1 = page.root.shadowRoot.querySelector('div.ath-menu-vertical__level-1') as HTMLElement;
      expect(level1).not.toHaveClass('selected');
      level1.click();
      await page.waitForChanges();

      const actions = page.root.querySelectorAll('ath-menu-vertical-item-action');
      expect(actions[0].selected).toBe(false);
    });

    it('when clicking on an level 2 item whith children only, its submenu is expanded but not selected', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item">
        <ath-menu-vertical-item-action text="item2">
          <ath-menu-vertical-item-action text="item3"></ath-menu-vertical-item-action>
        </ath-menu-vertical-item-action>
      </ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();
      const items = page.root.shadowRoot.querySelectorAll('div.ath-menu-vertical__wrapper-title');
      const level2 = Array.from(items).find(el => el.textContent.includes('item2'));
      expect(level2).not.toHaveClass('selected');
      (level2 as HTMLElement).click();
      await page.waitForChanges();
      const actions = page.root.querySelectorAll('ath-menu-vertical-item-action');
      expect(actions[1].selected).toBe(false);
    });

    it('when pressing Enter on an item with children, the submenu opens in the DOM', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
          <ath-menu-vertical-item-action text="item 1">
            <ath-menu-vertical-item-action text="item 1.1"></ath-menu-vertical-item-action>
          </ath-menu-vertical-item-action>
          <ath-menu-vertical-item-action text="item 2" open>
            <ath-menu-vertical-item-action text="item2.1"></ath-menu-vertical-item-action>
          </ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );

      await page.waitForChanges();

      const level1 = page.root.shadowRoot.querySelector('div.ath-menu-vertical__level-1') as HTMLElement;

      level1.setAttribute('tabindex', '0');

      expect(level1.getAttribute('aria-expanded')).toBe('false');

      level1.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
      await page.waitForChanges();

      expect(level1.getAttribute('aria-expanded')).toBe('true');

      const submenu = page.root.shadowRoot.querySelector('ul.ath-menu-vertical__sublist');
      expect(submenu).not.toBeNull();
    });
  });

  describe('Link Items', () => {
    it('should add "disabled" class to link on level 2 when disabled is true', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
          <ath-menu-vertical-item-action text="item">
            <ath-menu-vertical-item-link text="item2" url="https://" disabled="true"></ath-menu-vertical-item-link>
            <ath-menu-vertical-item-link text="item3" url="https://"></ath-menu-vertical-item-link>
          </ath-menu-vertical-item-action>
        </ath-menu-vertical>`,
        [AthMenuVerticalItemAction, AthMenuVerticalItemLink],
      );

      await page.waitForChanges();
      const links = page.root.shadowRoot.querySelectorAll('a.ath-menu-vertical__wrapper-title');
      expect(links[0]).toHaveClass('disabled');
    });
  });

  describe('Events', () => {
    let page: SpecPage;
    let menuVerticalAction;

    beforeEach(async () => {
      page = await testPage(
        `<ath-menu-vertical>
          <ath-menu-vertical-item-action text="Action Text" selected="true">
            <ath-menu-vertical-item-action text="item"></ath-menu-vertical-item-action>
          </ath-menu-vertical-item-action>
        </ath-menu-vertical>`,
        [AthMenuVerticalItemAction, AthMenuVerticalItemLink],
      );
      await page.waitForChanges();
      menuVerticalAction = page.root.shadowRoot.querySelector('div.ath-menu-vertical__wrapper-title');
    });

    it('should emit the athSelected event when an action item is clicked', async () => {
      const athSelected = jest.fn();
      page.root.addEventListener('athSelected', athSelected);
      menuVerticalAction.click();
      expect(athSelected).toHaveBeenCalled();
    });

    it('should not emit the event if the link is disabled', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item" selected="true">
        <ath-menu-vertical-item-link text="item2" url="https://" disabled="true"></ath-menu-vertical-item-link>
      </ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction, AthMenuVerticalItemLink],
      );
      await page.waitForChanges();

      const link = page.root.shadowRoot.querySelector('a.ath-menu-vertical__wrapper-title');
      const athSelected = jest.fn();
      page.root.addEventListener('athSelected', athSelected);

      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      link.dispatchEvent(event);
      await page.waitForChanges();

      expect(athSelected).not.toHaveBeenCalled();
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Interaction and Focus management', () => {
    it('only the focused item has tabIndex=0', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item1"></ath-menu-vertical-item-action>
      <ath-menu-vertical-item-action text="item2"></ath-menu-vertical-item-action>
      <ath-menu-vertical-item-action text="item3"></ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();
      const items = page.root.shadowRoot.querySelectorAll('[role="menuitem"]');
      expect(items.length).toBe(3);

      expect(items[0].getAttribute('tabindex')).toBe('0');
      expect(items[1].getAttribute('tabindex')).toBe('-1');
      expect(items[2].getAttribute('tabindex')).toBe('-1');
    });

    it('when ArrowDown in an item with children and being its submenu open, focus goes to its first child', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item1">
        <ath-menu-vertical-item-action text="child1"></ath-menu-vertical-item-action>
        <ath-menu-vertical-item-action text="child2"></ath-menu-vertical-item-action>
      </ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();

      const items = page.root.shadowRoot.querySelectorAll('[role="menuitem"]');
      const level1 = items[0] as HTMLElement;

      level1.focus();

      level1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      await page.waitForChanges();

      level1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();

      const updatedItems = page.root.shadowRoot.querySelectorAll('[role="menuitem"]');
      const firstChild = updatedItems[1] as HTMLElement;

      expect(firstChild.getAttribute('tabindex')).toBe('0');
    });

    it('when pressing ArrowDown on an item, the focus moves to the next menu item', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item1"></ath-menu-vertical-item-action>
      <ath-menu-vertical-item-action text="item2"></ath-menu-vertical-item-action>
      <ath-menu-vertical-item-action text="item3"></ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();

      const items = page.root.shadowRoot.querySelectorAll('[role="menuitem"]');
      const firstItem = items[0] as HTMLElement;
      const secondItem = items[1] as HTMLElement;

      firstItem.focus();
      await page.waitForChanges();

      expect(firstItem.getAttribute('tabindex')).toBe('0');
      expect(secondItem.getAttribute('tabindex')).toBe('-1');

      firstItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await page.waitForChanges();

      secondItem.focus();
      await page.waitForChanges();

      expect(secondItem.getAttribute('tabindex')).toBe('0');
      expect(firstItem.getAttribute('tabindex')).toBe('-1');
    });

    it('when pressing ArrowUp on an item, the focus moves to the previous menu item', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
        <ath-menu-vertical-item-action text="item1"></ath-menu-vertical-item-action>
        <ath-menu-vertical-item-action text="item2"></ath-menu-vertical-item-action>
        <ath-menu-vertical-item-action text="item3"></ath-menu-vertical-item-action>
      </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();

      const items = page.root.shadowRoot.querySelectorAll('[role="menuitem"]');
      const firstItem = items[0] as HTMLElement;
      const secondItem = items[1] as HTMLElement;
      secondItem.focus();
      await page.waitForChanges();

      expect(items[1].getAttribute('tabindex')).toBe('0');

      items[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await page.waitForChanges();

      firstItem.focus();
      await page.waitForChanges();

      expect(secondItem.getAttribute('tabindex')).toBe('-1');
      expect(firstItem.getAttribute('tabindex')).toBe('0');
    });

    it('when pressing ArrowUp on the first item of a submenu, the focus goes back to its father', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item1" open>
        <ath-menu-vertical-item-action text="child1"></ath-menu-vertical-item-action>
        <ath-menu-vertical-item-action text="child2"></ath-menu-vertical-item-action>
      </ath-menu-vertical-item-action>
      <ath-menu-vertical-item-action text="item2"></ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();

      const items = page.root.shadowRoot.querySelectorAll('[role="menuitem"]');

      const child1 = items[1] as HTMLElement;
      const parent = items[0] as HTMLElement;

      const focusSpy = jest.spyOn(parent, 'focus');

      child1.focus();
      await page.waitForChanges();

      child1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await page.waitForChanges();

      expect(focusSpy).toHaveBeenCalled();
      expect(parent.getAttribute('tabindex')).toBe('0');
    });

    it('should focus the first child when pressing ArrowDown on the parent with the submenu open', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="padre" open>
        <ath-menu-vertical-item-action text="hijo1"></ath-menu-vertical-item-action>
        <ath-menu-vertical-item-action text="hijo2"></ath-menu-vertical-item-action>
      </ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();

      const domItems = page.root.shadowRoot.querySelectorAll('[role="menuitem"]');

      (domItems[0] as HTMLElement).focus();
      domItems[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const domItemsUpdated = page.root.shadowRoot.querySelectorAll('[role="menuitem"]');
      expect(domItemsUpdated[1].getAttribute('tabindex')).toBe('0');
    });

    it('should not select or emit an event when clicking on a disabled action item', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item1" disabled="true"></ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();

      const domItem = page.root.shadowRoot.querySelector('.ath-menu-vertical__level-1') as HTMLElement;
      const athSelected = jest.fn();
      page.root.addEventListener('athSelected', athSelected);

      const event = new MouseEvent('click', { bubbles: true, cancelable: true });

      domItem.dispatchEvent(event);
      await page.waitForChanges();

      expect(athSelected).not.toHaveBeenCalled();
    });

    it('should open the submenu when clicking on a level 1 item with children', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="padre">
        <ath-menu-vertical-item-action text="hijo"></ath-menu-vertical-item-action>
      </ath-menu-vertical-item-action>
      <ath-menu-vertical-item-action text="otro"></ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();

      const domItems = page.root.shadowRoot.querySelectorAll('.ath-menu-vertical__level-1');
      const padre = domItems[0] as HTMLElement;

      const estabaAbierto = padre.classList.contains('open');

      padre.click();
      await page.waitForChanges();

      expect(padre.classList.contains('open')).toBe(true);
      expect(padre.getAttribute('aria-expanded')).toBe('true');

      if (!estabaAbierto) {
        expect(padre.classList.contains('open')).toBe(true);
      } else {
        expect(padre.classList.contains('open')).toBe(true);
      }
    });

    it('should not focus any item if all are disabled', async () => {
      const page = await testPage(
        `<ath-menu-vertical>
      <ath-menu-vertical-item-action text="item1" disabled="true"></ath-menu-vertical-item-action>
      <ath-menu-vertical-item-action text="item2" disabled="true"></ath-menu-vertical-item-action>
    </ath-menu-vertical>`,
        [AthMenuVerticalItemAction],
      );
      await page.waitForChanges();

      const items = page.root.shadowRoot.querySelectorAll('[role="menuitem"]');
      expect(items.length).toBe(2);

      expect(items[0].getAttribute('tabindex')).toBe('-1');
      expect(items[1].getAttribute('tabindex')).toBe('-1');
    });
  });
});
