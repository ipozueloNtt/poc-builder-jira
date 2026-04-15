import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthTable } from '../table';
import { AthTableHeader } from '../table-header/table-header';
import { AthTableHeaderItem } from '../table-header-item/table-header-item';
import { AthTableBody } from '../table-body/table-body';
import { AthTableRow } from '../table-row/table-row';
import { AthTableRowItem } from '../table-row-item/table-row-item';
import { TableSize, TableColor, TableFrozen, TableStriping, TableSelectable } from '../table.model';

const testPage = (html: string, othersComponents = []): Promise<SpecPage> => {
  const components = [AthTable, AthTableHeader, AthTableHeaderItem, AthTableBody, AthTableRow, AthTableRowItem, ...othersComponents];
  return newSpecPage({
    components,
    html,
    supportsShadowDom: true,
  });
};

describe('ath-table render', () => {
  it('renders with default props', async () => {
    const page = await testPage(`<ath-table></ath-table>`);
    expect(page.root).toBeTruthy();

    const table = page.root;
    expect(table).toHaveProperty('size', TableSize.Small);
    expect(table).toHaveProperty('color', TableColor.Primary);
    expect(table).toHaveProperty('striped', TableStriping.None);
  });

  it('applies the correct base class', async () => {
    const page = await testPage(`<ath-table></ath-table>`);
    expect(page.root.classList.contains('ath-table')).toBeTruthy();
  });

  it('renders with header and body', async () => {
    const page = await testPage(`
      <ath-table>
        <ath-table-header slot="header">
          <ath-table-header-item>ID</ath-table-header-item>
          <ath-table-header-item>Name</ath-table-header-item>
        </ath-table-header>
        <ath-table-body slot="body">
          <ath-table-row>
            <ath-table-row-item>1</ath-table-row-item>
            <ath-table-row-item>John Doe</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    expect(page.root.querySelector('ath-table-header')).toBeTruthy();
    expect(page.root.querySelectorAll('ath-table-header-item').length).toBe(2);
    expect(page.root.querySelector('ath-table-body')).toBeTruthy();
    expect(page.root.querySelector('ath-table-row')).toBeTruthy();
    expect(page.root.querySelectorAll('ath-table-row-item').length).toBe(2);
  });

  it('renders with proper accessibility attributes', async () => {
    const page = await testPage(`<ath-table></ath-table>`);
    const table = page.root;

    expect(table.getAttribute('role')).toBe('table');
    expect(table.getAttribute('tabindex')).toBe('0');

    const rowGroup = page.root.shadowRoot.querySelector('.ath-table__header');
    expect(rowGroup.getAttribute('role')).toBe('rowgroup');
  });
});

describe('ath-table props', () => {
  it('applies the correct size property', async () => {
    const page = await testPage(`<ath-table size="${TableSize.Medium}"></ath-table>`);
    expect(page.root).toHaveProperty('size', TableSize.Medium);
  });

  it('applies the primary color property', async () => {
    const page = await testPage(`<ath-table color="primary"></ath-table>`);
    expect(page.root).toHaveProperty('color', TableColor.Primary);
    expect(page.root.classList.contains('ath-table--primary')).toBeTruthy();
  });

  it('applies the secondary color class', async () => {
    const page = await testPage(`<ath-table color="secondary"></ath-table>`);
    expect(page.root).toHaveProperty('color', TableColor.Secondary);
    expect(page.root.classList.contains('ath-table--secondary')).toBeTruthy();
  });

  it('applies the correct frozen property', async () => {
    const page = await testPage(`<ath-table frozen="${TableFrozen.First}"></ath-table>`);
    expect(page.root).toHaveProperty('frozen', TableFrozen.First);
  });

  it('applies the striped rows property', async () => {
    const page = await testPage(`<ath-table striped="rows"></ath-table>`);
    expect(page.root).toHaveProperty('striped', TableStriping.Rows);
  });

  it('updates class when color changes', async () => {
    const page = await testPage(`<ath-table color="secondary"></ath-table>`);
    expect(page.root.classList.contains('ath-table--secondary')).toBeTruthy();

    page.root.color = TableColor.Primary;
    await page.waitForChanges();

    expect(page.root.classList.contains('ath-table--primary')).toBeTruthy();
    expect(page.root.classList.contains('ath-table--secondary')).toBeFalsy();
  });
});

describe('ath-table children properties', () => {
  it('should pass size property to header items and row items', async () => {
    const page = await testPage(`
      <ath-table size="lg">
        <ath-table-header slot="header">
          <ath-table-header-item>ID</ath-table-header-item>
        </ath-table-header>
        <ath-table-body slot="body">
          <ath-table-row>
            <ath-table-row-item>1</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    // Wait for component to initialize and run collectChildren
    await new Promise(resolve => setTimeout(resolve, 10));
    await page.waitForChanges();

    const headerItem = page.root.querySelector('ath-table-header-item');
    const rowItem = page.root.querySelector('ath-table-row-item');

    expect(headerItem.size).toBe(TableSize.Large);
    expect(rowItem.size).toBe(TableSize.Large);
  });

  it('should pass striped property to rows', async () => {
    const page = await testPage(`
      <ath-table striped="rows">
        <ath-table-body slot="body">
          <ath-table-row>
            <ath-table-row-item>1</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    // Wait for component to initialize and run collectChildren
    await new Promise(resolve => setTimeout(resolve, 10));
    await page.waitForChanges();

    const row = page.root.querySelector('ath-table-row');
    expect(row.striped).toBe(TableStriping.Rows);
  });

  it('should set frozen property when frozen is set', async () => {
    const page = await testPage(`
      <ath-table frozen="first">
        <ath-table-header slot="header">
          <ath-table-header-item>ID</ath-table-header-item>
          <ath-table-header-item>Name</ath-table-header-item>
        </ath-table-header>
        <ath-table-body slot="body">
          <ath-table-row>
            <ath-table-row-item>1</ath-table-row-item>
            <ath-table-row-item>John Doe</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    // Wait for component to initialize and run collectChildren
    await new Promise(resolve => setTimeout(resolve, 10));
    await page.waitForChanges();

    const firstHeaderItem = page.root.querySelectorAll('ath-table-header-item')[0];
    const firstRowItem = page.root.querySelectorAll('ath-table-row-item')[0];

    expect(firstHeaderItem.frozen).toBe(TableFrozen.First);
    expect(firstRowItem.frozen).toBe(TableFrozen.First);
  });

  it('should pass cell-width and alignment from header to row items', async () => {
    const page = await testPage(`
      <ath-table>
        <ath-table-header slot="header">
          <ath-table-header-item cell-width="100px" alignment="center">ID</ath-table-header-item>
          <ath-table-header-item cell-width="200px" alignment="right">Name</ath-table-header-item>
        </ath-table-header>
        <ath-table-body slot="body">
          <ath-table-row>
            <ath-table-row-item>1</ath-table-row-item>
            <ath-table-row-item>John Doe</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    // Wait for component to initialize and run collectChildren
    await new Promise(resolve => setTimeout(resolve, 10));
    await page.waitForChanges();

    const rowItems = page.root.querySelectorAll('ath-table-row-item');

    expect(rowItems[0].cellWidth).toBe('100px');
    expect(rowItems[0].alignment).toBe('center');

    expect(rowItems[1].cellWidth).toBe('200px');
    expect(rowItems[1].alignment).toBe('right');
  });
});

describe('ath-table refresh functionality', () => {
  it('should update children properties when refresh() method is called', async () => {
    const page = await testPage(`
      <ath-table size="md">
        <ath-table-header>
          <ath-table-header-item>ID</ath-table-header-item>
        </ath-table-header>
        <ath-table-body>
          <ath-table-row>
            <ath-table-row-item>1</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    // Change a property
    page.root.size = 'lg';

    // Trigger refresh
    await page.root.refresh();
    await page.waitForChanges();

    // Verify children properties are updated
    const headerItem = page.root.querySelector('ath-table-header-item');
    const rowItem = page.root.querySelector('ath-table-row-item');
    expect(headerItem.size).toBe(TableSize.Large);
    expect(rowItem.size).toBe(TableSize.Large);
  });

  it('should update the table when new rows are added and refresh is called', async () => {
    const page = await testPage(`
      <ath-table>
        <ath-table-header>
          <ath-table-header-item cell-width="100px">ID</ath-table-header-item>
        </ath-table-header>
        <ath-table-body id="tableBody">
          <ath-table-row>
            <ath-table-row-item>1</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    // Wait for initial render
    await new Promise(resolve => setTimeout(resolve, 10));
    await page.waitForChanges();

    // Add new row programmatically
    const tableBody = page.root.querySelector('#tableBody');
    const newRow = document.createElement('ath-table-row');
    newRow.innerHTML = `<ath-table-row-item>2</ath-table-row-item>`;
    tableBody.appendChild(newRow);

    // Call refresh
    await page.root.refresh();
    await page.waitForChanges();

    // Verify the new row item has the correct cell width
    const rowItems = page.root.querySelectorAll('ath-table-row-item');
    expect(rowItems[0]).toHaveProperty('cellWidth', '100px');
    expect(rowItems[1]).toHaveProperty('cellWidth', '100px');
  });
});

describe('ath-table selection functionality', () => {
  it('should handle single selection mode', async () => {
    const page = await testPage(`
      <ath-table selectable="single">
        <ath-table-body>
          <ath-table-row>
            <ath-table-row-item>Row 1</ath-table-row-item>
          </ath-table-row>
          <ath-table-row>
            <ath-table-row-item>Row 2</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();

    const rows = page.root.querySelectorAll('ath-table-row');
    expect(rows[0].selectable).toBe(TableSelectable.Single);
    expect(rows[1].selectable).toBe(TableSelectable.Single);
  });

  it('should handle multiple selection mode', async () => {
    const page = await testPage(`
      <ath-table selectable="multiple">
        <ath-table-body>
          <ath-table-row>
            <ath-table-row-item>Row 1</ath-table-row-item>
          </ath-table-row>
          <ath-table-row>
            <ath-table-row-item>Row 2</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();

    const rows = page.root.querySelectorAll('ath-table-row');
    expect(rows[0].selectable).toBe(TableSelectable.Multiple);
    expect(rows[1].selectable).toBe(TableSelectable.Multiple);
  });

  it('should handle selection change events', async () => {
    const page = await testPage(`
      <ath-table selectable="single">
        <ath-table-body>
          <ath-table-row value="row1">
            <ath-table-row-item>Row 1</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    await new Promise(resolve => requestAnimationFrame(resolve));

    let eventFired = false;
    let eventDetail = null;

    page.root.addEventListener('athSelectionChange', (event: CustomEvent) => {
      eventFired = true;
      eventDetail = event.detail;
    });

    // Simulate selection change from row
    const row = page.root.querySelector('ath-table-row');
    row.selected = true;
    row.dispatchEvent(
      new CustomEvent('athRowSelectionChange', {
        detail: { selected: true },
        bubbles: true,
      }),
    );

    await page.waitForChanges();

    expect(eventFired).toBe(true);
    expect(eventDetail).toEqual({ selectedIndexes: [0], selectedValues: ['row1'] });
  });
});

describe('ath-table hierarchical functionality', () => {
  it('should handle parent-child relationships', async () => {
    const page = await testPage(`
      <ath-table>
        <ath-table-body>
          <ath-table-row parent-id="">
            <ath-table-row-item>Parent Row</ath-table-row-item>
          </ath-table-row>
          <ath-table-row parent-id="parent1">
            <ath-table-row-item>Child Row</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    await page.waitForChanges();

    const rows = page.root.querySelectorAll('ath-table-row');
    expect(rows[0].parentId).toBe('');
    expect(rows[1].parentId).toBe('parent1');
  });
});

describe('ath-table clickable functionality', () => {
  it('should handle clickable rows', async () => {
    const page = await testPage(`
      <ath-table clickable="true">
        <ath-table-body>
          <ath-table-row>
            <ath-table-row-item>Clickable Row</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();

    const row = page.root.querySelector('ath-table-row');
    expect(row.reserveClickable).toBe(true);
  });

  it('should handle table click events', async () => {
    const page = await testPage(`
      <ath-table clickable="true">
        <ath-table-body>
          <ath-table-row id="test-row">
            <ath-table-row-item>Test Row</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    let eventFired = false;
    let eventDetail = null;

    page.root.addEventListener('athTableClick', (event: CustomEvent) => {
      eventFired = true;
      eventDetail = event.detail;
    });

    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();

    // Simulate click event from row
    const row = page.root.querySelector('ath-table-row');
    row.dispatchEvent(
      new CustomEvent('athTableClick', {
        detail: { rowId: 'test-row' },
        bubbles: true,
      }),
    );

    expect(eventFired).toBe(true);
    expect(eventDetail).toEqual({ rowId: 'test-row' });
  });
});

describe('ath-table edge cases and integration', () => {
  it('should handle complex integration with all features', async () => {
    const page = await testPage(`
      <ath-table 
        size="lg" 
        color="secondary" 
        selectable="multiple" 
        clickable="true" 
        striped="rows" 
        frozen="first"
      >
        <ath-table-header>
          <ath-table-header-item cell-width="50px">ID</ath-table-header-item>
          <ath-table-header-item cell-width="200px" alignment="center">Name</ath-table-header-item>
        </ath-table-header>
        <ath-table-body>
          <ath-table-row id="parent" parent-id="">
            <ath-table-row-item>1</ath-table-row-item>
            <ath-table-row-item>Parent Row</ath-table-row-item>
          </ath-table-row>
          <ath-table-row id="child" parent-id="parent">
            <ath-table-row-item>2</ath-table-row-item>
            <ath-table-row-item>Child Row</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();

    // Verify all properties are applied
    expect(page.root.size).toBe(TableSize.Large);
    expect(page.root.color).toBe(TableColor.Secondary);
    expect(page.root.selectable).toBe(TableSelectable.Multiple);
    expect(page.root.clickable).toBe(true);
    expect(page.root.striped).toBe(TableStriping.Rows);
    expect(page.root.frozen).toBe(TableFrozen.First);

    // Verify properties are passed to children
    const headerItems = page.root.querySelectorAll('ath-table-header-item');
    const rowItems = page.root.querySelectorAll('ath-table-row-item');
    const rows = page.root.querySelectorAll('ath-table-row');

    expect(headerItems[0].size).toBe(TableSize.Large);
    expect(headerItems[0].frozen).toBe(TableFrozen.First);
    expect(headerItems[1].size).toBe(TableSize.Large);

    expect(rowItems[0].size).toBe(TableSize.Large);
    expect(rowItems[0].frozen).toBe(TableFrozen.First);
    expect(rowItems[0].cellWidth).toBe('50px');
    expect(rowItems[1].alignment).toBe('center');
    expect(rowItems[1].cellWidth).toBe('200px');

    expect(rows[0].selectable).toBe(TableSelectable.Multiple);
    expect(rows[0].reserveClickable).toBe(true);
    expect(rows[0].striped).toBe(TableStriping.Rows);
  });

  it('should handle dynamic property updates', async () => {
    const page = await testPage(`
      <ath-table size="sm" color="primary">
        <ath-table-header>
          <ath-table-header-item>Test</ath-table-header-item>
        </ath-table-header>
        <ath-table-body>
          <ath-table-row>
            <ath-table-row-item>Data</ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
    `);

    // Change multiple properties
    page.root.size = TableSize.Large;
    page.root.color = TableColor.Secondary;
    page.root.selectable = TableSelectable.Single;
    page.root.clickable = true;
    page.root.striped = TableStriping.Rows;
    page.root.frozen = TableFrozen.First;

    await page.waitForChanges();

    // Verify DOM classes are updated
    expect(page.root.classList.contains('ath-table--secondary')).toBeTruthy();
    expect(page.root.classList.contains('ath-table--primary')).toBeFalsy();

    // Verify children properties are updated through refresh
    await page.root.refresh();
    await page.waitForChanges();

    const headerItem = page.root.querySelector('ath-table-header-item');
    const rowItem = page.root.querySelector('ath-table-row-item');
    const row = page.root.querySelector('ath-table-row');

    expect(headerItem.size).toBe(TableSize.Large);
    expect(rowItem.size).toBe(TableSize.Large);
    expect(row.selectable).toBe(TableSelectable.Single);
    expect(row.reserveClickable).toBe(true);
    expect(row.striped).toBe(TableStriping.Rows);
  });
});
