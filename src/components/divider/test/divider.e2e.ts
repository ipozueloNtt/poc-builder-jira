import { newE2EPage } from '@stencil/core/testing';

describe('ath-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-divider></ath-divider>');

    const element = await page.find('ath-divider');
    expect(element).toHaveClass('hydrated');
  });
});
