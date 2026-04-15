import { newE2EPage } from '@stencil/core/testing';

describe('ath-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-button></ath-button>');
    const element = await page.find('ath-button');
    expect(element).toHaveClass('hydrated');
  });
});
