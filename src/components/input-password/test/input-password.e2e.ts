import { newE2EPage } from '@stencil/core/testing';

describe('ath-input-password', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-input-password></ath-input-password>');

    const element = await page.find('ath-input-password');
    expect(element).toHaveClass('hydrated');
  });
});
