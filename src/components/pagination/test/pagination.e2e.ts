import { newE2EPage } from '@stencil/core/testing';

describe('ath-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-pagination></ath-pagination>');

    const element = await page.find('ath-pagination');
    expect(element).toHaveClass('hydrated');
  });
});
