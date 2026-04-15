import { newE2EPage } from '@stencil/core/testing';

describe('ath-input-counter', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-input-counter></ath-input-counter>');

    const element = await page.find('ath-input-counter');
    expect(element).toHaveClass('hydrated');
  });
});
