import { SpecPage } from '@stencil/core/internal';
import { newSpecPage } from '@stencil/core/testing';
import { AthMenuLateral } from '../menu-lateral';
import { AthMenuLateralItemAction } from '../menu-lateral-item/menu-lateral-item-action';
import { AthMenuLateralItemLink } from '../menu-lateral-item/menu-lateral-item-link';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthMenuLateral, AthMenuLateralItemAction, AthMenuLateralItemLink, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

// Menu-lateral
describe('ath-menu-lateral', () => {
  it('should inject accesibility properties to athMenuLateral', async () => {
    const ariaLabel = 'My menu-lateral';
    const page = await testPage(`<ath-menu-lateral aria-label="${ariaLabel}"></ath-menu-lateral>`, [AthMenuLateral]);
    const athMenuLateral = page.root.shadowRoot.querySelector('[role=menubar]');
    expect(athMenuLateral.getAttribute('role')).toBe('menubar');
    expect(athMenuLateral.getAttribute('tabindex')).toBe('0');
  });
});

// Menu-lateral-items
describe('ath-menu-lateral-item-action', () => {
  const componentHtml = `<ath-menu-lateral aria-label="my menu-lateral"
      ><ath-menu-lateral-item-action
        aria-label="action 1 aria-label"
        badge-max="10"
        badge-value="5"
        icon="home_estrecha"
        name="action 1"
        tooltip-text="tooltip del action 1"
      ></ath-menu-lateral-item-action
    ></ath-menu-lateral>`;
  it('should inject menuitem class to menu item', async () => {
    const page = await testPage(componentHtml, [AthMenuLateral, AthMenuLateralItemAction]);
    const athMenuLateral = page.root;
    const athMenuLateralItemAction = athMenuLateral.shadowRoot.querySelector('[role=menuitem]');
    expect(athMenuLateralItemAction).toHaveClass('ath-menu-lateral__item-container');
  });

  it('should inject ath-visibility-hidden class to FcHelpDescription span', async () => {
    const page = await testPage(componentHtml, [AthMenuLateral, AthMenuLateralItemAction]);
    const athMenuLateral = page.root;
    const athMenuLateralItemAction = athMenuLateral.shadowRoot.querySelector('.ath-menu-lateral__item-wrapper');

    const tooltipSpan = athMenuLateralItemAction.querySelector('.ath-visibility-hidden');
    expect(tooltipSpan).toBeTruthy();
  });

  it('should inject disabled class to item', async () => {
    const disabledComponentHtml = `<ath-menu-lateral aria-label="my menu-lateral"
      ><ath-menu-lateral-item-action
        disabled
      ></ath-menu-lateral-item-action
    ></ath-menu-lateral>`;
    const page = await testPage(disabledComponentHtml, [AthMenuLateral, AthMenuLateralItemAction]);
    const athMenuLateral = page.root;
    const athMenuLateralItemAction = athMenuLateral.shadowRoot.querySelector('.ath-menu-lateral__item-container');
    expect(athMenuLateralItemAction).toHaveClass('ath-menu-lateral__item-container--disabled');
  });
  it('should invert icon color when disabled', async () => {
    const disabledComponentHtml = `<ath-menu-lateral aria-label="my menu-lateral"
      ><ath-menu-lateral-item-action
      icon="placeholder"
        disabled
      ></ath-menu-lateral-item-action
    ></ath-menu-lateral>`;
    const page = await testPage(disabledComponentHtml, [AthMenuLateral, AthMenuLateralItemAction]);
    const athMenuLateral = page.root;
    const athIcon = athMenuLateral.shadowRoot.querySelector('ath-icon');
    expect(athIcon.getAttribute('color')).toBe('disabled');
  });

  it('should inject selected class to item', async () => {
    const selectedComponentHtml = `<ath-menu-lateral aria-label="my menu-lateral"
      ><ath-menu-lateral-item-action icon="placeholder"
        selected
      ></ath-menu-lateral-item-action
    ></ath-menu-lateral>`;
    const page = await testPage(selectedComponentHtml, [AthMenuLateral, AthMenuLateralItemAction]);
    const athMenuLateral = page.root;
    const athMenuLateralItemAction = athMenuLateral.shadowRoot.querySelector('.ath-menu-lateral__item-container');
    expect(athMenuLateralItemAction).toHaveClass('ath-menu-lateral__item-container--selected');
  });
});

describe('AthMenuLateral - @Watch(items)', () => {
  let component: AthMenuLateral;

  beforeEach(() => {
    component = new AthMenuLateral();

    jest.spyOn(component as any, 'generateMenuLateralItems');
  });

  it('should call generateMenuLateralItems function if items value changes', () => {
    const oldValue = [
      {
        'aria-label': 'link 1 aria-label',
        'badge-max': '10',
        'badge-value': '5',
        'icon': 'home_estrecha',
        'name': 'home',
        'tooltip-text': 'tooltip del link 1',
      },
    ];
    const newValue = [
      {
        'aria-label': 'link 2 aria-label',
        'badge-max': '5',
        'badge-value': '3',
        'icon': 'home_estrecha',
        'name': 'home',
        'tooltip-text': 'tooltip del link 2',
      },
    ];
    component.onItemsChange(newValue, oldValue);
    expect((component as any).generateMenuLateralItems).toHaveBeenCalled();
  });
});

// Interaction on actions
describe('ath-menu-lateral interaction', () => {
  const componentHtml = `
    <ath-menu-lateral aria-label="my menu-lateral">
      <ath-menu-lateral-item-action
        aria-label="action 1 aria-label"
        badge-max="10"
        badge-value="5"
        icon="home_estrecha"
        name="action 1"
        tooltip-text="tooltip del action 1"
      ></ath-menu-lateral-item-action>
      <ath-menu-lateral-item-action
        aria-label="action 2 aria-label"
        badge-max="10"
        badge-value="2"
        icon="settings"
        name="action 2"
        tooltip-text="tooltip del action 2"
      ></ath-menu-lateral-item-action>
    </ath-menu-lateral>
  `;

  it('should show tooltip on mouse enter and hide on mouse leave', async () => {
    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemAction],
      html: componentHtml,
      supportsShadowDom: true,
    });

    const athMenuLateral = page.root.shadowRoot.querySelector('[role=menubar]');
    const menuitems = athMenuLateral.querySelectorAll('.ath-menu-lateral__item-container');
    const tooltipSpans = athMenuLateral.querySelectorAll('span.ath-visibility-hidden');

    expect(tooltipSpans.length).toBe(2);

    menuitems[0].dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    expect(tooltipSpans[0]).not.toHaveClass('ath-visibility-hidden');
    expect(tooltipSpans[1]).toHaveClass('ath-visibility-hidden');

    menuitems[0].dispatchEvent(new Event('mouseleave'));
    await page.waitForChanges();

    expect(tooltipSpans[0]).toHaveClass('ath-visibility-hidden');
  });

  it('should select item and emit event on click', async () => {
    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemAction],
      html: componentHtml,
      supportsShadowDom: true,
    });

    const shadowRoot = page.root.shadowRoot;
    const itemContainers = shadowRoot.querySelectorAll('.ath-menu-lateral__item-container');

    const athSelectedHandler = jest.fn();
    page.root.addEventListener('athSelected', athSelectedHandler);

    itemContainers[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(itemContainers[0]).toHaveClass('ath-menu-lateral__item-container--selected');
    expect(itemContainers[1]).not.toHaveClass('ath-menu-lateral__item-container--selected');

    expect(athSelectedHandler).toHaveBeenCalled();
  });
});

// Same Interaction test but on links
describe('ath-menu-lateral interaction', () => {
  const componentHtml = `
    <ath-menu-lateral aria-label="my menu-lateral">
      <ath-menu-lateral-item-link
        aria-label="link 1 aria-label"
        badge-max="10"
        badge-value="5"
        icon="home_estrecha"
        name="link 1"
        tooltip-text="tooltip del link 1"
        href="https://www.google.es"
      ></ath-menu-lateral-item-link>
      <ath-menu-lateral-item-link
        aria-label="link 2 aria-label"
        badge-max="10"
        badge-value="2"
        icon="settings"
        name="link 2"
        tooltip-text="tooltip del link 2"
        href="https://www.google.es"
      ></ath-menu-lateral-item-link>
    </ath-menu-lateral>
  `;

  it('should select item and emit event on click', async () => {
    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemLink],
      html: componentHtml,
      supportsShadowDom: true,
    });

    const shadowRoot = page.root.shadowRoot;
    const itemContainers = shadowRoot.querySelectorAll('.ath-menu-lateral__item-container');

    const athSelectedHandler = jest.fn();
    page.root.addEventListener('athSelected', athSelectedHandler);

    itemContainers[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(itemContainers[0]).toHaveClass('ath-menu-lateral__item-container--selected');
    expect(itemContainers[1]).not.toHaveClass('ath-menu-lateral__item-container--selected');

    expect(athSelectedHandler).toHaveBeenCalled();
  });
});

// Item Link
describe('ath-menu-lateral-item-link', () => {
  const componentHtml = `<ath-menu-lateral aria-label="my menu-lateral"
      ><ath-menu-lateral-item-link
      ></ath-menu-lateral-item-action
    ></ath-menu-link>`;
  it('should inject menuitem class to menuitem', async () => {
    const page = await testPage(componentHtml, [AthMenuLateral, AthMenuLateralItemAction]);
    const athMenuLateral = page.root;
    const athMenuLateralItemAction = athMenuLateral.shadowRoot.querySelector('[role=menuitem]');
    expect(athMenuLateralItemAction).toHaveClass('ath-menu-lateral__item-container');
  });
});

// JSON
describe('ath-menu-lateral items como JSON string', () => {
  it('no debe renderizar items si el JSON es inválido', async () => {
    // JSON inválido
    const invalidJson = '{ "ariaLabel": "action 1", ';

    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemAction],
      html: `<ath-menu-lateral aria-label="my menu-lateral" items='${invalidJson}'></ath-menu-lateral>`,
      supportsShadowDom: true,
    });

    const shadowRoot = page.root.shadowRoot;
    const menuitems = shadowRoot.querySelectorAll('[role=menuitem]');
    expect(menuitems.length).toBe(0);
  });

  it('no debe renderizar items si el string está vacío', async () => {
    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemAction],
      html: `<ath-menu-lateral aria-label="my menu-lateral" items=''></ath-menu-lateral>`,
      supportsShadowDom: true,
    });

    const shadowRoot = page.root.shadowRoot;
    const menuitems = shadowRoot.querySelectorAll('[role=menuitem]');
    expect(menuitems.length).toBe(0);
  });
});

// Focus managment
describe('ath-menu-lateral keyboard navigation', () => {
  const componentHtml = `
    <ath-menu-lateral aria-label="my menu-lateral">
      <ath-menu-lateral-item-action
        aria-label="action 1 aria-label"
        icon="home_estrecha"
        tooltip-text="tooltip del action 1"
      ></ath-menu-lateral-item-action>
      <ath-menu-lateral-item-action
        aria-label="action 2 aria-label"
        icon="settings"
        tooltip-text="tooltip del action 2"
      ></ath-menu-lateral-item-action>
      <ath-menu-lateral-item-action
        aria-label="action 3 aria-label"
        icon="user"
        tooltip-text="tooltip del action 3"
      ></ath-menu-lateral-item-action>
    </ath-menu-lateral>
  `;

  it('should focus the first item when receiving focus and move to the second with ArrowDown', async () => {
    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemAction],
      html: componentHtml,
      supportsShadowDom: true,
    });

    const athMenuLateral = page.root.shadowRoot.querySelector('[role=menubar]');
    const itemContainers = athMenuLateral.querySelectorAll('.ath-menu-lateral__item-container');

    athMenuLateral.dispatchEvent(new FocusEvent('focus'));
    await page.waitForChanges();

    expect(itemContainers[0]).toHaveClass('ath-menu-lateral__item--focused');
    expect(itemContainers[1]).not.toHaveClass('ath-menu-lateral__item--focused');

    const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    athMenuLateral.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();

    expect(itemContainers[0]).not.toHaveClass('ath-menu-lateral__item--focused');
    expect(itemContainers[1]).toHaveClass('ath-menu-lateral__item--focused');
  });

  it('should move focus to the second item with ArrowDown and return to the first with ArrowUp', async () => {
    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemAction],
      html: componentHtml,
      supportsShadowDom: true,
    });

    const athMenuLateral = page.root.shadowRoot.querySelector('[role=menubar]');
    const itemContainers = athMenuLateral.querySelectorAll('.ath-menu-lateral__item-container');

    athMenuLateral.dispatchEvent(new FocusEvent('focus'));
    await page.waitForChanges();

    expect(itemContainers[0]).toHaveClass('ath-menu-lateral__item--focused');
    expect(itemContainers[1]).not.toHaveClass('ath-menu-lateral__item--focused');

    const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    athMenuLateral.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();

    expect(itemContainers[0]).not.toHaveClass('ath-menu-lateral__item--focused');
    expect(itemContainers[1]).toHaveClass('ath-menu-lateral__item--focused');

    const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    athMenuLateral.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();

    expect(itemContainers[0]).toHaveClass('ath-menu-lateral__item--focused');
    expect(itemContainers[1]).not.toHaveClass('ath-menu-lateral__item--focused');
  });

  it('should move focus to the first item when pressing Home', async () => {
    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemAction],
      html: componentHtml,
      supportsShadowDom: true,
    });

    const athMenuLateral = page.root.shadowRoot.querySelector('[role=menubar]');
    const itemContainers = athMenuLateral.querySelectorAll('.ath-menu-lateral__item-container');

    athMenuLateral.dispatchEvent(new FocusEvent('focus'));
    await page.waitForChanges();

    athMenuLateral.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await page.waitForChanges();

    athMenuLateral.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    await page.waitForChanges();

    expect(itemContainers[0]).toHaveClass('ath-menu-lateral__item--focused');
    expect(itemContainers[1]).not.toHaveClass('ath-menu-lateral__item--focused');
    expect(itemContainers[2]).not.toHaveClass('ath-menu-lateral__item--focused');
  });

  it('should move focus to the last item when pressing End', async () => {
    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemAction],
      html: componentHtml,
      supportsShadowDom: true,
    });

    const athMenuLateral = page.root.shadowRoot.querySelector('[role=menubar]');
    const itemContainers = athMenuLateral.querySelectorAll('.ath-menu-lateral__item-container');

    athMenuLateral.dispatchEvent(new FocusEvent('focus'));
    await page.waitForChanges();

    athMenuLateral.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    await page.waitForChanges();

    expect(itemContainers[0]).not.toHaveClass('ath-menu-lateral__item--focused');
    expect(itemContainers[1]).not.toHaveClass('ath-menu-lateral__item--focused');
    expect(itemContainers[2]).toHaveClass('ath-menu-lateral__item--focused');
  });
});

// Events
describe('ath-menu-lateral keyboard navigation - Enter event', () => {
  const componentHtml = `
    <ath-menu-lateral aria-label="my menu-lateral">
      <ath-menu-lateral-item-action
        aria-label="action 1 aria-label"
        icon="home_estrecha"
        tooltip-text="tooltip del action 1"
      ></ath-menu-lateral-item-action>
      <ath-menu-lateral-item-action
        aria-label="action 2 aria-label"
        icon="settings"
        tooltip-text="tooltip del action 2"
      ></ath-menu-lateral-item-action>
    </ath-menu-lateral>
  `;

  it('should emit the athSelected event when pressing Enter on the focused item', async () => {
    const page = await newSpecPage({
      components: [AthMenuLateral, AthMenuLateralItemAction],
      html: componentHtml,
      supportsShadowDom: true,
    });

    const athMenuLateral = page.root.shadowRoot.querySelector('[role=menubar]');
    const itemContainers = athMenuLateral.querySelectorAll('.ath-menu-lateral__item-container');

    athMenuLateral.dispatchEvent(new FocusEvent('focus'));
    await page.waitForChanges();

    expect(itemContainers[0]).toHaveClass('ath-menu-lateral__item--focused');

    const athSelectedHandler = jest.fn();
    page.root.addEventListener('athSelected', athSelectedHandler);

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    athMenuLateral.dispatchEvent(enterEvent);
    await page.waitForChanges();

    expect(athSelectedHandler).toHaveBeenCalled();
  });
});
