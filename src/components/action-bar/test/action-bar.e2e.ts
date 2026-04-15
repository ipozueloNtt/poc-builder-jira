import { newE2EPage } from '@stencil/core/testing';

describe('ath-action-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-action-bar></ath-action-bar>');

    const element = await page.find('ath-action-bar');
    expect(element).toHaveClass('hydrated');
  });
});
