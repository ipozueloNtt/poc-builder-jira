import { newE2EPage } from '@stencil/core/testing';

describe('ath-input-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-input-text></ath-input-text>');

    const element = await page.find('ath-input-text');
    expect(element).toHaveClass('hydrated');
  });
});
