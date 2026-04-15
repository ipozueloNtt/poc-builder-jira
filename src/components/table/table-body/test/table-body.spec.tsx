import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthTableBody } from '../table-body';

const testPage = (html: string): Promise<SpecPage> => {
  return newSpecPage({
    components: [AthTableBody],
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-table-body', () => {
  it('renders', async () => {
    const page = await testPage(`<ath-table-body></ath-table-body>`);
    expect(page.root).toEqualHtml(`
      <ath-table-body role="rowgroup" slot="body">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ath-table-body>
    `);
  });

  it('should render rows correctly', async () => {
    const page = await testPage(`
      <ath-table-body>
        <ath-table-row>
          <ath-table-row-item>1</ath-table-row-item>
          <ath-table-row-item>John</ath-table-row-item>
        </ath-table-row>
        <ath-table-row>
          <ath-table-row-item>2</ath-table-row-item>
          <ath-table-row-item>Jane</ath-table-row-item>
        </ath-table-row>
      </ath-table-body>
    `);

    expect(page.root).toBeTruthy();
    expect(page.root.querySelectorAll('ath-table-row').length).toBe(2);
  });
});
