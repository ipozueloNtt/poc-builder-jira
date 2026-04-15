import { newE2EPage } from '@stencil/core/testing';

describe('ath-table-row', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-table-row></ath-table-row>');

    const element = await page.find('ath-table-row');
    expect(element).toHaveClass('hydrated');
  });
});
