import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthTableRowItem } from '../table-row-item';
import { TableAlignment, TableFrozen, TableSize, TableColor } from '../../table.model';
import { AthCollapseIcon } from '../../../collapse/collapse-icon';
import { AthIcon } from '../../../icon/icon';

const testPage = (html: string, otherComponents = []): Promise<SpecPage> => {
  const components = [AthTableRowItem, AthCollapseIcon, AthIcon, ...otherComponents];
  return newSpecPage({
    components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-table-row-item', () => {
  it('renders', async () => {
    const page = await testPage(`<ath-table-row-item></ath-table-row-item>`);
    expect(page.root).toEqualHtml(`
      <ath-table-row-item class="ath-table-row-item ath-table-row-item--primary" frozen="none" role="cell" style="width: auto;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ath-table-row-item>
    `);
  });

  it('should handle default values correctly', async () => {
    const page = await testPage(`<ath-table-row-item>Default cell</ath-table-row-item>`);

    expect(page.root.cellWidth).toBe('auto');
    expect(page.root.isHeader).toBe(false);
    expect(page.root.hasInteractivity).toBe(false);
    expect(page.root.frozen).toBe('none');
    expect(page.root.noFrozenShadow).toBe(false);
    expect(page.root.striped).toBe(false);
    expect(page.root.color).toBe('primary');
    expect(page.root.expander).toBe(false);
    expect(page.root.expanded).toBe(false);
    expect(page.root.isChild).toBe(false);

    expect(page.root.classList.contains('ath-table-row-item')).toBeTruthy();
    expect(page.root.classList.contains('ath-table-row-item--primary')).toBeTruthy();

    expect(page.root.getAttribute('role')).toBe('cell');
    expect(page.root.style.width).toBe('auto');
  });

  it('should render with cell width', async () => {
    const page = await testPage(`<ath-table-row-item cell-width="150px">Cell</ath-table-row-item>`);
    expect(page.root).toHaveProperty('cellWidth', '150px');
    expect(page.root.style.width).toBe('150px');
  });

  it('should render with alignment', async () => {
    const page = await testPage(`<ath-table-row-item alignment="right">Cell</ath-table-row-item>`);
    expect(page.root).toHaveProperty('alignment', TableAlignment.Right);
    expect(page.root.classList.contains('ath-table-row-item--right')).toBeTruthy();
  });

  it('should render with frozen attribute', async () => {
    const page = await testPage(`<ath-table-row-item frozen="first">Cell</ath-table-row-item>`);
    expect(page.root).toHaveProperty('frozen', TableFrozen.First);
    expect(page.root.classList.contains('ath-table-row-item--frozen-first')).toBeTruthy();
  });

  it('should have rowheader role when isHeader is true', async () => {
    const page = await testPage(`<ath-table-row-item is-header="true">Header</ath-table-row-item>`);
    expect(page.root).toHaveProperty('isHeader', true);
    expect(page.root.getAttribute('role')).toBe('rowheader');
  });

  it('should apply size class when size is provided', async () => {
    const page = await testPage(`<ath-table-row-item size="md">Cell</ath-table-row-item>`);
    expect(page.root).toHaveProperty('size', TableSize.Medium);
    expect(page.root.classList.contains('ath-table-row-item--md')).toBeTruthy();
  });

  it('should apply striped class when striped is true', async () => {
    const page = await testPage(`<ath-table-row-item striped="true">Cell</ath-table-row-item>`);
    expect(page.root).toHaveProperty('striped', true);
    expect(page.root.classList.contains('ath-table-row-item--striped')).toBeTruthy();
  });

  it('should apply color class when color is provided', async () => {
    const page = await testPage(`<ath-table-row-item color="secondary" frozen="first">Cell</ath-table-row-item>`);
    expect(page.root).toHaveProperty('color', TableColor.Secondary);
    expect(page.root.classList.contains('ath-table-row-item--secondary')).toBeTruthy();
  });
});

describe('ath-table-row-item frozen functionality', () => {
  it('should apply frozen-first class and shadow when frozen is first', async () => {
    const page = await testPage(`<ath-table-row-item frozen="first">Cell</ath-table-row-item>`);

    expect(page.root.classList.contains('ath-table-row-item--frozen-first')).toBeTruthy();
    expect(page.root.classList.contains('ath-table-row-item--frozen-first--shadow')).toBeTruthy();
  });

  it('should apply frozen-last class and shadow when frozen is last', async () => {
    const page = await testPage(`<ath-table-row-item frozen="last">Cell</ath-table-row-item>`);

    expect(page.root.classList.contains('ath-table-row-item--frozen-last')).toBeTruthy();
    expect(page.root.classList.contains('ath-table-row-item--frozen-last--shadow')).toBeTruthy();
  });

  it('should not apply shadow when noFrozenShadow is true', async () => {
    const page = await testPage(`<ath-table-row-item frozen="first" no-frozen-shadow="true">Cell</ath-table-row-item>`);

    expect(page.root.classList.contains('ath-table-row-item--frozen-first')).toBeTruthy();
    expect(page.root.classList.contains('ath-table-row-item--frozen-first--shadow')).toBeFalsy();
  });

  it('should not apply frozen classes when frozen is none', async () => {
    const page = await testPage(`<ath-table-row-item frozen="none">Cell</ath-table-row-item>`);

    expect(page.root.classList.contains('ath-table-row-item--frozen-none')).toBeFalsy();
    expect(page.root.classList.contains('ath-table-row-item--frozen-none--shadow')).toBeFalsy();
  });
});

describe('ath-table-row-item interactivity functionality', () => {
  it('should accept hasInteractivity prop', async () => {
    const page = await testPage(`<ath-table-row-item has-interactivity="true">Cell with interactive content</ath-table-row-item>`);

    expect(page.root.hasInteractivity).toBe(true);
  });

  it('should default hasInteractivity to false', async () => {
    const page = await testPage(`<ath-table-row-item>Regular cell</ath-table-row-item>`);

    expect(page.root.hasInteractivity).toBe(false);
  });
});

describe('ath-table-row-item child row functionality', () => {
  it('should apply child class and render child spacing when isChild is true', async () => {
    const page = await testPage(`<ath-table-row-item is-child="true">Child cell</ath-table-row-item>`);

    await page.waitForChanges();

    expect(page.root.isChild).toBe(true);
    expect(page.root.classList.contains('ath-table-row-item--child')).toBeTruthy();

    const childSpacing = page.root.shadowRoot.querySelector('.ath-table-row-item__child-spacing');
    expect(childSpacing).toBeTruthy();
  });

  it('should not render child spacing when isChild is false', async () => {
    const page = await testPage(`<ath-table-row-item is-child="false">Regular cell</ath-table-row-item>`);

    await page.waitForChanges();

    expect(page.root.isChild).toBe(false);
    expect(page.root.classList.contains('ath-table-row-item--child')).toBeFalsy();

    const childSpacing = page.root.shadowRoot.querySelector('.ath-table-row-item__child-spacing');
    expect(childSpacing).toBeFalsy();
  });
});
