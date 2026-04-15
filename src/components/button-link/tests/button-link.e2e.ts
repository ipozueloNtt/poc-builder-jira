import { newE2EPage } from '@stencil/core/testing';

describe('ath-button-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-button-link></ath-button-link>');
    const element = await page.find('ath-button-link');
    expect(element).toHaveClass('hydrated');
  });
});
