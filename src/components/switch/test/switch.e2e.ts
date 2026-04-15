import { newE2EPage } from '@stencil/core/testing';

describe('ath-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-switch></ath-switch>');

    const element = await page.find('ath-switch');
    expect(element).toHaveClass('hydrated');
  });
});
