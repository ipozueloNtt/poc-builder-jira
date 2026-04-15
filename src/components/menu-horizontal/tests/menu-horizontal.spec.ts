import { SpecPage } from '@stencil/core/internal';
import { newSpecPage } from '@stencil/core/testing';
import { AthMenuHorizontal } from '../menu-horizontal';
import { AthMenuHorizontalItem } from '../menu-horizontal-item/menu-horizontal-item';
import { MenuHorizontalItem } from '../menu-horizontal-item/menu-horizontal-item.model';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthMenuHorizontal, AthMenuHorizontalItem, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-menu-horizontal', () => {
  beforeEach(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('should inject accessibility properties to menubar', async () => {
    const page = await testPage(`<ath-menu-horizontal ath-aria-label="Main menu"></ath-menu-horizontal>`);
    const nav = page.root.querySelector('nav');
    const ul = nav.querySelector('ul');
    expect(ul.getAttribute('role')).toBe('menubar');
    expect(ul.getAttribute('aria-label')).toBe('Main menu');
  });

  it('should render items from items prop (array)', async () => {
    const items = [{ label: 'Home', selected: true }, { label: 'Profile' }, { label: 'Settings', disabled: true }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    expect(menuItems.length).toBe(3);
    expect(menuItems[0].textContent).toContain('Home');
  });

  it('should not render items if JSON is invalid', async () => {
    const invalidJson = '{ "label": "Home", ';
    const page = await testPage(`<ath-menu-horizontal items='${invalidJson}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    expect(menuItems.length).toBe(0);
  });

  it('should not render items if string is empty', async () => {
    const page = await testPage(`<ath-menu-horizontal items=''></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    expect(menuItems.length).toBe(0);
  });

  it('should render items from DOM (imperative)', async () => {
    const html = `
      <ath-menu-horizontal>
        <ath-menu-horizontal-item label="One"></ath-menu-horizontal-item>
        <ath-menu-horizontal-item label="Two"></ath-menu-horizontal-item>
      </ath-menu-horizontal>
    `;
    const page = await testPage(html);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    expect(menuItems.length).toBe(2);
    expect(menuItems[0].textContent).toContain('One');
    expect(menuItems[1].textContent).toContain('Two');
  });

  it('should emit athSelected event with value from DOM items when using ath-menu-horizontal-item', async () => {
    const html = `
      <ath-menu-horizontal>
        <ath-menu-horizontal-item label="Home" value="home-page"></ath-menu-horizontal-item>
        <ath-menu-horizontal-item label="Profile" value='{"userId": 456, "section": "profile"}'></ath-menu-horizontal-item>
      </ath-menu-horizontal>
    `;
    const page = await testPage(html);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    const handler = jest.fn();
    page.root.addEventListener('athSelected', handler);

    menuItems[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          value: 'home-page',
        }),
      }),
    );

    handler.mockClear();
    menuItems[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          value: '{"userId": 456, "section": "profile"}',
        }),
      }),
    );
  });

  it('should apply --selected class to selected item', async () => {
    const items = [{ label: 'Home', selected: true }, { label: 'Profile' }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    expect(menuItems[0].classList.contains('ath-menu-horizontal-item--selected')).toBe(true);
    expect(menuItems[1].classList.contains('ath-menu-horizontal-item--selected')).toBe(false);
  });

  it('should apply --disabled class to disabled item', async () => {
    const items = [{ label: 'Home', disabled: true }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    expect(menuItems[0].classList.contains('ath-menu-horizontal-item--disabled')).toBe(true);
    expect(menuItems[0]).toHaveAttribute('aria-disabled');
  });

  it('should emit athSelected event when clicking enabled item', async () => {
    const items = [{ label: 'Home' }, { label: 'Profile' }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    const handler = jest.fn();
    page.root.addEventListener('athSelected', handler);

    menuItems[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();
    expect(handler).toHaveBeenCalled();
  });

  it('should not emit athSelected event when clicking disabled item', async () => {
    const items = [{ label: 'Home', disabled: true }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    const handler = jest.fn();
    page.root.addEventListener('athSelected', handler);

    menuItems[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();
    expect(handler).not.toHaveBeenCalled();
  });

  it('should emit athSelected event when pressing Enter on focused item', async () => {
    const items = [{ label: 'Home' }, { label: 'Profile' }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    const handler = jest.fn();
    page.root.addEventListener('athSelected', handler);

    (menuItems[1] as HTMLElement).focus();
    menuItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();
    expect(handler).toHaveBeenCalled();
  });

  it('should show visual indicator on selected item', async () => {
    const items = [{ label: 'Home', selected: true }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const indicator = page.root.querySelector('.ath-menu-horizontal-item--indicator');
    expect(indicator).toBeTruthy();
  });

  it('should show badge if badgeValue is defined', async () => {
    const items = [{ label: 'Home', badgeLabel: 'New', badgeValue: 5 }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const badge = page.root.querySelector('ath-badge');
    expect(badge).toBeTruthy();
    expect(badge.getAttribute('value')).toBe('5');
    expect(badge.getAttribute('label')).toBe('New');
  });

  it('should not show badge if badgeValue is not defined', async () => {
    const items = [{ label: 'Home' }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const badge = page.root.querySelector('ath-badge');
    expect(badge).toBeFalsy();
  });

  it('should show external label if target is _blank', async () => {
    const items = [{ label: 'Home', target: 'blank', externalLabel: 'Se abre en una nueva ventana' }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const externalLabelSpan = page.root.querySelector('.ath-external-label');
    expect(externalLabelSpan).toBeTruthy();
    expect(externalLabelSpan.textContent.trim()).toBe('Se abre en una nueva ventana');
  });

  it('should add aria-current="page" to selected item', async () => {
    const items = [{ label: 'Home', selected: true }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    expect(menuItems[0].getAttribute('aria-current')).toBe('page');
  });

  it('should add tabindex="0" to selected item and "-1" to others', async () => {
    const items = [{ label: 'Home', selected: true }, { label: 'Profile' }];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    expect(menuItems[0].getAttribute('tabindex')).toBe('0');
    expect(menuItems[1].getAttribute('tabindex')).toBe('-1');
  });

  it('should scroll items when clicking left/right arrows', async () => {
    const items = Array.from({ length: 10 }, (_, i) => ({ label: `Item ${i}` }));
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const instance = page.rootInstance as any;
    let scrolled = false;
    instance.itemGroup = {
      clientWidth: 100,
      scrollWidth: 500,
      scrollLeft: 100,
      scrollBy: ({ left }) => {
        scrolled = left !== 0;
      },
    };
    instance.scrollItems('left');
    expect(scrolled).toBe(true);
    scrolled = false;
    instance.scrollItems('right');
    expect(scrolled).toBe(true);
  });

  it('should call generateItems and detect methods when items change', async () => {
    const page = await testPage(`<ath-menu-horizontal items='[]'></ath-menu-horizontal>`);
    const instance = page.rootInstance as any;
    jest.spyOn(instance, 'generateItems');
    jest.spyOn(instance, 'detectFirstAndLastEnabledTab');
    jest.spyOn(instance, 'detectSelectedItem');
    instance.onItemsChange([{ label: 'Nuevo' }], []);
    expect(instance.generateItems).toHaveBeenCalled();
    expect(instance.detectFirstAndLastEnabledTab).toHaveBeenCalled();
    expect(instance.detectSelectedItem).toHaveBeenCalled();
  });

  it('should disconnect ResizeObserver on disconnectedCallback', async () => {
    const page = await testPage(`<ath-menu-horizontal items='[]'></ath-menu-horizontal>`);
    const instance = page.rootInstance as any;
    instance.resizeObserver = { disconnect: jest.fn() };
    instance.disconnectedCallback();
    expect(instance.resizeObserver.disconnect).toHaveBeenCalled();
  });

  it('should call scrollIntoView on item focus', async () => {
    const page = await testPage(`<ath-menu-horizontal items='[{"label":"Test"}]'></ath-menu-horizontal>`);
    const instance = page.rootInstance as any;
    instance.itemGroup = {};
    const target = { scrollIntoView: jest.fn() };
    const event = { target };
    instance.handleItemFocus(event as any);
    expect(target.scrollIntoView).toHaveBeenCalled();
  });

  it('should emit athSelected event with item value when item has value prop', async () => {
    const items: MenuHorizontalItem[] = [
      { id: '1', label: 'Home', value: 'home-page' },
      { id: '2', label: 'Profile', value: { id: 123, route: '/profile' } },
    ];
    const page = await testPage(`<ath-menu-horizontal items='${JSON.stringify(items)}'></ath-menu-horizontal>`);
    const menuItems = page.root.querySelectorAll('a[role="menuitem"]');
    const handler = jest.fn();
    page.root.addEventListener('athSelected', handler);

    menuItems[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          value: 'home-page',
        }),
      }),
    );

    handler.mockClear();
    menuItems[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          value: { id: 123, route: '/profile' },
        }),
      }),
    );
  });
});
