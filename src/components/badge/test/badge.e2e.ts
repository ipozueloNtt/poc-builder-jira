import { newE2EPage } from '@stencil/core/testing';

describe('ath-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-badge></ath-badge>');

    const element = await page.find('ath-badge');
    expect(element).toHaveClass('hydrated');
  });
});
