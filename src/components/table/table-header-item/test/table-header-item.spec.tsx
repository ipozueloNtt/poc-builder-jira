import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthTableHeaderItem } from '../table-header-item';

const testPage = (html: string): Promise<SpecPage> => {
  return newSpecPage({
    components: [AthTableHeaderItem],
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-table-header-item', () => {
  it('renders', async () => {
    const page = await testPage(`<ath-table-header-item></ath-table-header-item>`);
    expect(page.root).toEqualHtml(`
      <ath-table-header-item class="ath-table-header-item ath-table-header-item--primary" role="columnheader" style="width: auto;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ath-table-header-item>
    `);
  });

  it('should render with correct cell width', async () => {
    const page = await testPage(`<ath-table-header-item cell-width="150px">Header</ath-table-header-item>`);
    expect(page.root).toHaveProperty('cellWidth', '150px');
  });

  it('should render with correct alignment', async () => {
    const page = await testPage(`<ath-table-header-item alignment="center">Header</ath-table-header-item>`);
    expect(page.root).toHaveProperty('alignment', 'center');
    expect(page.root).toHaveClass('ath-table-header-item--center');
  });

  it('should add the frozen class when frozen property is set', async () => {
    const page = await testPage(`<ath-table-header-item frozen="first">Header</ath-table-header-item>`);
    expect(page.root).toHaveProperty('frozen', 'first');
    expect(page.root).toHaveClass('ath-table-header-item--frozen-first');
  });

  it('should add the size class when size property is set', async () => {
    const page = await testPage(`<ath-table-header-item size="lg">Header</ath-table-header-item>`);
    expect(page.root).toHaveProperty('size', 'lg');
    expect(page.root).toHaveClass('ath-table-header-item--lg');
  });
});
