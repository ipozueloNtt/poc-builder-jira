import { newE2EPage } from '@stencil/core/testing';

describe('ath-table-header-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-table-header-item></ath-table-header-item>');

    const element = await page.find('ath-table-header-item');
    expect(element).toHaveClass('hydrated');
  });
});
