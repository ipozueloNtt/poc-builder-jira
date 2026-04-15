import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthTableHeader } from '../table-header';
import { AthTableHeaderItem } from '../../table-header-item/table-header-item';
import { AthCheckBox } from '../../../checkbox/checkbox';
import { CheckboxValue } from '../../../checkbox/checkbox.model';

const testPage = (html: string, othersComponents = []): Promise<SpecPage> => {
  return newSpecPage({
    components: [AthTableHeader, AthCheckBox, ...othersComponents],
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-table-header', () => {
  it('renders', async () => {
    const page = await testPage(`<ath-table-header></ath-table-header>`);
    expect(page.root).toEqualHtml(`
      <ath-table-header role="row" slot="header">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ath-table-header>
    `);
  });

  it('should have the correct role and slot', async () => {
    const page = await testPage(`<ath-table-header></ath-table-header>`);
    const header = page.root;
    expect(header.getAttribute('role')).toBe('row');
    expect(header.getAttribute('slot')).toBe('header');
  });

  it('should render children correctly', async () => {
    const page = await testPage(
      `
      <ath-table-header>
        <ath-table-header-item>ID</ath-table-header-item>
        <ath-table-header-item>Name</ath-table-header-item>
      </ath-table-header>
    `,
      [AthTableHeaderItem],
    );

    expect(page.root).toBeTruthy();
    expect(page.root.querySelectorAll('ath-table-header-item').length).toBe(2);

    const firstItem = page.root.querySelector('ath-table-header-item');
    expect(firstItem.textContent).toBe('ID');
    expect(firstItem.getAttribute('role')).toBe('columnheader');
  });

  it('should set default widths for header items when not specified', async () => {
    const page = await testPage(
      `
      <ath-table-header>
        <ath-table-header-item>ID</ath-table-header-item>
        <ath-table-header-item>Name</ath-table-header-item>
      </ath-table-header>
    `,
      [AthTableHeaderItem],
    );

    const items = page.root.querySelectorAll('ath-table-header-item');
    expect(items.length).toBe(2);
    expect(items[0].cellWidth).toBe('50%');
    expect(items[1].cellWidth).toBe('50%');
  });

  describe('selection functionality', () => {
    it('should emit athSelectAllChange event when handleSelectAllChange is called with false state', async () => {
      const page = await testPage(
        `
        <ath-table-header 
          selectable="multiple" 
          select-all-state="${CheckboxValue.False}">
          <ath-table-header-item>ID</ath-table-header-item>
        </ath-table-header>
      `,
        [AthTableHeaderItem],
      );

      let eventFired = false;
      let eventDetail = null;

      page.root.addEventListener('athSelectAllChange', (event: CustomEvent) => {
        eventFired = true;
        eventDetail = event.detail;
      });

      const checkbox = page.root.shadowRoot.querySelector('ath-checkbox');
      const input = checkbox.shadowRoot.querySelector('input');
      input.click();
      await page.waitForChanges();

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        selectAll: true,
        state: CheckboxValue.True,
      });
    });

    it('should emit athSelectAllChange event when handleSelectAllChange is called with true state', async () => {
      const page = await testPage(
        `
        <ath-table-header 
          selectable="multiple" 
          select-all-state="${CheckboxValue.True}">
          <ath-table-header-item>ID</ath-table-header-item>
        </ath-table-header>
      `,
        [AthTableHeaderItem],
      );

      let eventFired = false;
      let eventDetail = null;

      page.root.addEventListener('athSelectAllChange', (event: CustomEvent) => {
        eventFired = true;
        eventDetail = event.detail;
      });

      const checkbox = page.root.shadowRoot.querySelector('ath-checkbox');
      const input = checkbox.shadowRoot.querySelector('input');
      input.click();
      await page.waitForChanges();

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        selectAll: false,
        state: CheckboxValue.False,
      });
    });

    it('should emit athSelectAllChange event when handleSelectAllChange is called with indeterminate state', async () => {
      const page = await testPage(
        `
        <ath-table-header 
          selectable="multiple" 
          select-all-state="${CheckboxValue.Indeterminate}">
          <ath-table-header-item>ID</ath-table-header-item>
        </ath-table-header>
      `,
        [AthTableHeaderItem],
      );

      let eventFired = false;
      let eventDetail = null;

      page.root.addEventListener('athSelectAllChange', (event: CustomEvent) => {
        eventFired = true;
        eventDetail = event.detail;
      });

      const checkbox = page.root.shadowRoot.querySelector('ath-checkbox');
      const input = checkbox.shadowRoot.querySelector('input');
      input.click();
      await page.waitForChanges();

      expect(eventFired).toBe(true);
      expect(eventDetail).toEqual({
        selectAll: true,
        state: CheckboxValue.True,
      });
    });

    it('should not render select all checkbox when no-select-all is true', async () => {
      const page = await testPage(
        `
        <ath-table-header 
          selectable="multiple" 
          no-select-all="true">
          <ath-table-header-item>ID</ath-table-header-item>
        </ath-table-header>
      `,
        [AthTableHeaderItem],
      );

      const checkbox = page.root.shadowRoot.querySelector('ath-checkbox');
      expect(checkbox).toBeNull();

      const srOnlySpan = page.root.shadowRoot.querySelector('.sr-only');
      expect(srOnlySpan).toBeTruthy();
      expect(srOnlySpan.textContent).toBe('Columna de selección');
    });
  });
});
