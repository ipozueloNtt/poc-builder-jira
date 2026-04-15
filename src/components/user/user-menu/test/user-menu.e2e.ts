import { newE2EPage } from '@stencil/core/testing';

describe('ath-user-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-user-menu></ath-user-menu>');
    const element = await page.find('ath-user-menu');
    expect(element).toHaveClass('hydrated');
  });
});
