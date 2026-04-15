import { newE2EPage } from '@stencil/core/testing';

describe('ath-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-progress-bar></ath-progress-bar>');

    const element = await page.find('ath-progress-bar');
    expect(element).toHaveClass('hydrated');
  });
});
