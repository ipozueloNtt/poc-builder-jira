import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthTableRow } from '../table-row';
import { TableStriping } from '../../table.model';
import { AthTableRowItem } from '../../table-row-item/table-row-item';
import { AthRadioButton } from '../../../radio-button/radio-button';
import { AthCheckBox } from '../../../checkbox/checkbox';
import { AthIcon } from '../../../icon/icon';

const testPage = (html: string, othersComponents = []): Promise<SpecPage> => {
  const components = [AthTableRow, AthTableRowItem, AthRadioButton, AthCheckBox, AthIcon, ...othersComponents];
  return newSpecPage({
    components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-table-row', () => {
  it('renders', async () => {
    const page = await testPage(`<ath-table-row></ath-table-row>`);
    expect(page.root).toEqualHtml(`
      <ath-table-row role="row">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ath-table-row>
    `);
  });

  it('should render with striped attribute', async () => {
    const page = await testPage(`<ath-table-row striped="rows"></ath-table-row>`);
    expect(page.root).toHaveProperty('striped', TableStriping.Rows);
  });

  it('should render row items correctly', async () => {
    const page = await testPage(`
      <ath-table-row>
        <ath-table-row-item>1</ath-table-row-item>
        <ath-table-row-item>John</ath-table-row-item>
      </ath-table-row>
    `);

    expect(page.root).toBeTruthy();
    expect(page.root.querySelectorAll('ath-table-row-item').length).toBe(2);
  });

  it('should apply striping to row items based on row striping type', async () => {
    const page = await testPage(`
      <ath-table-row striped="rows">
        <ath-table-row-item>1</ath-table-row-item>
        <ath-table-row-item>John</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    // First row's items should have striping (index 0 is even)
    const rowItems = page.root.querySelectorAll('ath-table-row-item');
    expect(rowItems[0]).toHaveProperty('striped', true);
    expect(rowItems[1]).toHaveProperty('striped', true);
  });

  it('should apply striping to row items based on column striping type', async () => {
    const page = await testPage(`
      <ath-table-row striped="columns">
        <ath-table-row-item>1</ath-table-row-item>
        <ath-table-row-item>John</ath-table-row-item>
        <ath-table-row-item>Cena</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const items = page.root.querySelectorAll('ath-table-row-item');
    expect(items[0].striped).toBe(false);
    expect(items[1].striped).toBe(true);
    expect(items[2].striped).toBe(false);
  });
});

describe('ath-table-row selection functionality', () => {
  it('should render single selection mode with radio button', async () => {
    const page = await testPage(`
      <ath-table-row selectable="single" selection-group-name="test-group">
        <ath-table-row-item>Row Content</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const radioButton = page.root.shadowRoot.querySelector('ath-radio-button');
    expect(radioButton).toBeTruthy();
    expect(radioButton.name).toBe('test-group');
    expect(radioButton.ariaLabel).toBe('Selecciona esta fila');
  });

  it('should render multiple selection mode with checkbox', async () => {
    const page = await testPage(`
      <ath-table-row selectable="multiple">
        <ath-table-row-item>Row Content</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const checkbox = page.root.shadowRoot.querySelector('ath-checkbox');
    expect(checkbox).toBeTruthy();
    expect(checkbox.ariaLabel).toBe('Selecciona esta fila');
    expect(checkbox.value).toBe('false');
  });

  it('should handle radio button selection change', async () => {
    const page = await testPage(`
      <ath-table-row selectable="single" selection-group-name="test-group">
        <ath-table-row-item>Row Content</ath-table-row-item>
      </ath-table-row>
    `);

    let eventFired = false;
    let eventDetail = null;

    page.root.addEventListener('athRowSelectionChange', (event: CustomEvent) => {
      eventFired = true;
      eventDetail = event.detail;
    });

    await page.waitForChanges();

    // Simulate radio button change
    const radioButton = page.root.shadowRoot.querySelector('ath-radio-button');
    radioButton.dispatchEvent(
      new CustomEvent('athChange', {
        detail: { checked: true, value: 'test' },
        bubbles: true,
      }),
    );

    expect(eventFired).toBe(true);
    expect(eventDetail).toEqual({ selected: true });
    expect(page.root.selected).toBe(true);
  });

  it('should handle checkbox selection change', async () => {
    const page = await testPage(`
      <ath-table-row selectable="multiple">
        <ath-table-row-item>Row Content</ath-table-row-item>
      </ath-table-row>
    `);

    let eventFired = false;
    let eventDetail = null;

    page.root.addEventListener('athRowSelectionChange', (event: CustomEvent) => {
      eventFired = true;
      eventDetail = event.detail;
    });

    await page.waitForChanges();

    // Simulate checkbox change
    const checkbox = page.root.shadowRoot.querySelector('ath-checkbox');
    checkbox.dispatchEvent(
      new CustomEvent('athChange', {
        detail: { value: 'true' },
        bubbles: true,
      }),
    );

    expect(eventFired).toBe(true);
    expect(eventDetail).toEqual({ selected: true });
    expect(page.root.selected).toBe(true);
  });

  it('should sync controls when selected property changes', async () => {
    const page = await testPage(`
      <ath-table-row selectable="single">
        <ath-table-row-item>Row Content</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    page.root.selected = true;
    await page.waitForChanges();

    const radioButton = page.root.shadowRoot.querySelector('ath-radio-button');
    expect(radioButton.checked).toBe(true);
  });

  it('should sync checkbox when selected property changes', async () => {
    const page = await testPage(`
      <ath-table-row selectable="multiple">
        <ath-table-row-item>Row Content</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    page.root.selected = true;
    await page.waitForChanges();

    const checkbox = page.root.shadowRoot.querySelector('ath-checkbox');
    expect(checkbox.value).toBe('true');
  });
});

describe('ath-table-row clickable functionality', () => {
  it('should render clickable row with focus div', async () => {
    const page = await testPage(`
      <ath-table-row clickable="true" clickable-aria-label="Navigate to details">
        <ath-table-row-item>Clickable Row</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const focusDiv = page.root.shadowRoot.querySelector('.ath-table-row__focus');
    expect(focusDiv).toBeTruthy();
    expect(focusDiv.getAttribute('aria-label')).toBe('Navigate to details');
    expect(focusDiv.getAttribute('tabindex')).toBe('0');
  });

  it('should render action icon when reserve-clickable is true', async () => {
    const page = await testPage(`
      <ath-table-row clickable="true" reserve-clickable="true">
        <ath-table-row-item>Row with action</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const actionCell = page.root.shadowRoot.querySelector('[data-ath-action]');
    expect(actionCell).toBeTruthy();
    expect(actionCell.tagName.toLowerCase()).toBe('ath-table-row-item');

    const icon = actionCell.querySelector('ath-icon');
    expect(icon).toBeTruthy();
    expect(icon.icon).toBe('arrow_right');
  });

  it('should handle row click events', async () => {
    const page = await testPage(`
      <ath-table-row clickable="true" row-id="test-row" value="test-value">
        <ath-table-row-item>Clickable Row</ath-table-row-item>
      </ath-table-row>
    `);

    let eventFired = false;
    let eventDetail = null;

    page.root.addEventListener('athRowClick', (event: CustomEvent) => {
      eventFired = true;
      eventDetail = event.detail;
    });

    await page.waitForChanges();

    const focusDiv = page.root.shadowRoot.querySelector('.ath-table-row__focus');
    focusDiv.dispatchEvent(new Event('click', { bubbles: true }));

    expect(eventFired).toBe(true);
    expect(eventDetail).toEqual({
      rowValue: 'test-value',
      rowId: 'test-row',
    });
  });

  it('should handle keyboard navigation for clickable rows', async () => {
    const page = await testPage(`
      <ath-table-row clickable="true" row-id="test-row">
        <ath-table-row-item>Clickable Row</ath-table-row-item>
      </ath-table-row>
    `);

    let eventFired = false;

    page.root.addEventListener('athRowClick', () => {
      eventFired = true;
    });

    await page.waitForChanges();

    const focusDiv = page.root.shadowRoot.querySelector('.ath-table-row__focus');

    // Test Enter key
    const enterEvent = new KeyboardEvent('keydown', { code: 'Enter', bubbles: true });
    focusDiv.dispatchEvent(enterEvent);

    expect(eventFired).toBe(true);

    eventFired = false;

    // Test Space key
    const spaceEvent = new KeyboardEvent('keydown', { code: 'Space', bubbles: true });
    focusDiv.dispatchEvent(spaceEvent);

    expect(eventFired).toBe(true);
  });

  it('should wrap content in clickable wrapper when clickable', async () => {
    const page = await testPage(`
      <ath-table-row clickable="true">
        <ath-table-row-item>Content</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const wrapper = page.root.shadowRoot.querySelector('.ath-table-row__wrapper');
    expect(wrapper).toBeTruthy();
  });

  it('should not wrap content when not clickable', async () => {
    const page = await testPage(`
      <ath-table-row clickable="false">
        <ath-table-row-item>Content</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const wrapper = page.root.shadowRoot.querySelector('.ath-table-row__wrapper');
    expect(wrapper).toBeFalsy();
  });
});

describe('ath-table-row hierarchical functionality', () => {
  it('should handle parent row with children', async () => {
    const page = await testPage(`
      <ath-table-row has-children="true" row-id="parent-1">
        <ath-table-row-item>Parent Row</ath-table-row-item>
        <ath-table-row-item>Data</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    expect(page.root.hasChildren).toBe(true);
    expect(page.root.rowId).toBe('parent-1');

    // Check if expander is applied to first data cell
    const firstCell = page.root.querySelector('ath-table-row-item');
    expect(firstCell.expander).toBe(true);
    expect(firstCell.expanded).toBe(false);
    expect(firstCell.expanderAriaControls).toBe('parent-1');
  });

  it('should handle child row with parent-id', async () => {
    const page = await testPage(`
      <ath-table-row parent-id="parent-1" row-id="child-1" reserve-expander="true">
        <ath-table-row-item>Child Row</ath-table-row-item>
        <ath-table-row-item>Data</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    expect(page.root.parentId).toBe('parent-1');
    expect(page.root.rowId).toBe('child-1');

    // Wait for lifecycle methods to complete
    await page.root.componentOnReady();
    await page.waitForChanges();

    // Check if child flag is applied to first cell (only works when expander logic runs)
    const firstCell = page.root.querySelector('ath-table-row-item');
    expect(firstCell.isChild).toBe(true);
  });

  it('should handle expansion state changes', async () => {
    const page = await testPage(`
      <ath-table-row has-children="true" row-id="parent-1" expanded="false">
        <ath-table-row-item>Parent Row</ath-table-row-item>
      </ath-table-row>
    `);

    // Listen for collapse events
    let eventFired = false;
    window.addEventListener('athToggleCollapse', (event: CustomEvent) => {
      eventFired = true;
      expect(event.detail).toBe('parent-1');
    });

    await page.waitForChanges();

    // Change expanded state
    page.root.expanded = true;
    await page.waitForChanges();

    expect(eventFired).toBe(true);

    const firstCell = page.root.querySelector('ath-table-row-item');
    expect(firstCell.expanded).toBe(true);
  });

  it('should handle reserve expander functionality', async () => {
    const page = await testPage(`
      <ath-table-row reserve-expander="true">
        <ath-table-row-item>Row with reserved expander</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const firstCell = page.root.querySelector('ath-table-row-item');
    expect(firstCell.expander).toBe(true);
  });
});

describe('ath-table-row properties and styling', () => {
  it('should apply color property', async () => {
    const page = await testPage(`
      <ath-table-row color="secondary">
        <ath-table-row-item>Colored Row</ath-table-row-item>
      </ath-table-row>
    `);

    expect(page.root.color).toBe('secondary');
  });

  it('should apply size property', async () => {
    const page = await testPage(`
      <ath-table-row size="lg">
        <ath-table-row-item>Large Row</ath-table-row-item>
      </ath-table-row>
    `);

    expect(page.root.size).toBe('lg');
  });

  it('should apply frozen property', async () => {
    const page = await testPage(`
      <ath-table-row frozen="first">
        <ath-table-row-item>Frozen Row</ath-table-row-item>
      </ath-table-row>
    `);

    expect(page.root.frozen).toBe('first');
  });

  it('should apply last row styling', async () => {
    const page = await testPage(`
      <ath-table-row last="true">
        <ath-table-row-item>Last Row</ath-table-row-item>
      </ath-table-row>
    `);

    expect(page.root.last).toBe(true);
    expect(page.root.classList.contains('ath-table-row--last')).toBeTruthy();
  });

  it('should apply clickable styling', async () => {
    const page = await testPage(`
      <ath-table-row clickable="true">
        <ath-table-row-item>Clickable Row</ath-table-row-item>
      </ath-table-row>
    `);

    expect(page.root.classList.contains('ath-table-row--clickable')).toBeTruthy();
  });

  it('should have correct accessibility attributes', async () => {
    const page = await testPage(`
      <ath-table-row>
        <ath-table-row-item>Accessible Row</ath-table-row-item>
      </ath-table-row>
    `);

    expect(page.root.getAttribute('role')).toBe('row');
  });
});

describe('ath-table-row edge cases and integration', () => {
  it('should handle row without items', async () => {
    const page = await testPage(`<ath-table-row></ath-table-row>`);

    expect(page.root).toBeTruthy();
  });

  it('should handle complex row with all features', async () => {
    const page = await testPage(`
      <ath-table-row 
        selectable="multiple"
        clickable="true"
        reserve-clickable="true"
        has-children="true"
        row-id="complex-row"
        value="complex-value"
        color="secondary"
        size="lg"
        frozen="first"
        striped="rows"
        selected="true"
        expanded="true"
        last="true"
      >
        <ath-table-row-item>Complex Row</ath-table-row-item>
        <ath-table-row-item>Data 1</ath-table-row-item>
        <ath-table-row-item>Data 2</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    // Verify all properties are applied
    expect(page.root.selectable).toBe('multiple');
    expect(page.root.clickable).toBe(true);
    expect(page.root.reserveClickable).toBe(true);
    expect(page.root.hasChildren).toBe(true);
    expect(page.root.rowId).toBe('complex-row');
    expect(page.root.value).toBe('complex-value');
    expect(page.root.color).toBe('secondary');
    expect(page.root.size).toBe('lg');
    expect(page.root.frozen).toBe('first');
    expect(page.root.selected).toBe(true);
    expect(page.root.expanded).toBe(true);
    expect(page.root.last).toBe(true);

    // Verify UI elements are rendered
    const checkbox = page.root.shadowRoot.querySelector('ath-checkbox');
    expect(checkbox).toBeTruthy();
    expect(checkbox.value).toBe('true');

    const focusDiv = page.root.shadowRoot.querySelector('.ath-table-row__focus');
    expect(focusDiv).toBeTruthy();

    const actionCell = page.root.shadowRoot.querySelector('[data-ath-action]');
    expect(actionCell).toBeTruthy();

    const firstCell = page.root.querySelector('ath-table-row-item');
    expect(firstCell.expander).toBe(true);
    expect(firstCell.expanded).toBe(true);
  });

  it('should handle selection cell properties correctly', async () => {
    const page = await testPage(`
      <ath-table-row selectable="single" color="secondary" size="lg" frozen="first">
        <ath-table-row-item>Row Content</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const selectionCell = page.root.shadowRoot.querySelector('[data-ath-selection]') as HTMLAthTableRowItemElement;
    expect(selectionCell).toBeTruthy();
    expect(selectionCell.alignment).toBe('center');
    expect(selectionCell.cellWidth).toBe('64px');
    expect(selectionCell.frozen).toBe('first');
    expect(selectionCell.noFrozenShadow).toBe(true);
    expect(selectionCell.color).toBe('secondary');
    expect(selectionCell.size).toBe('lg');
  });

  it('should handle action cell properties correctly', async () => {
    const page = await testPage(`
      <ath-table-row reserve-clickable="true" color="secondary" size="lg">
        <ath-table-row-item>Row Content</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const actionCell = page.root.shadowRoot.querySelector('[data-ath-action]') as HTMLAthTableRowItemElement;
    expect(actionCell).toBeTruthy();
    expect(actionCell.alignment).toBe('center');
    expect(actionCell.cellWidth).toBe('64px');
    expect(actionCell.color).toBe('secondary');
    expect(actionCell.size).toBe('lg');
  });

  it('should handle striping updates when striped property changes', async () => {
    const page = await testPage(`
      <ath-table-row striped="none">
        <ath-table-row-item>Item 1</ath-table-row-item>
        <ath-table-row-item>Item 2</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    const items = page.root.querySelectorAll('ath-table-row-item');
    expect(items[0].striped).toBe(false);
    expect(items[1].striped).toBe(false);

    // Change striping
    page.root.striped = 'columns';
    await page.waitForChanges();

    expect(items[0].striped).toBe(false);
    expect(items[1].striped).toBe(true);
  });

  it('should handle hierarchy flag changes', async () => {
    const page = await testPage(`
      <ath-table-row has-children="false" reserve-expander="false">
        <ath-table-row-item>Row Content</ath-table-row-item>
      </ath-table-row>
    `);

    await page.waitForChanges();

    let firstCell = page.root.querySelector('ath-table-row-item');
    expect(firstCell.expander).toBe(false);

    // Change hierarchy flags
    page.root.hasChildren = true;
    await page.waitForChanges();

    firstCell = page.root.querySelector('ath-table-row-item');
    expect(firstCell.expander).toBe(true);
  });
});
