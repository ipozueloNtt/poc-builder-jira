import { newE2EPage } from '@stencil/core/testing';

describe('ath-table-body', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-table-body></ath-table-body>');

    const element = await page.find('ath-table-body');
    expect(element).toHaveClass('hydrated');
  });
});
