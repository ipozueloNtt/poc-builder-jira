import { newE2EPage } from '@stencil/core/testing';

describe('ath-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-table></ath-table>');

    const element = await page.find('ath-table');
    expect(element).toHaveClass('hydrated');
  });
});
