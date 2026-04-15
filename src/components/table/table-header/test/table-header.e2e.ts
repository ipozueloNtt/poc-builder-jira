import { newE2EPage } from '@stencil/core/testing';

describe('ath-table-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-table-header></ath-table-header>');

    const element = await page.find('ath-table-header');
    expect(element).toHaveClass('hydrated');
  });
});
