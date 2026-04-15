import { newE2EPage } from '@stencil/core/testing';

describe('ath-table-row-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-table-row-item></ath-table-row-item>');

    const element = await page.find('ath-table-row-item');
    expect(element).toHaveClass('hydrated');
  });
});
