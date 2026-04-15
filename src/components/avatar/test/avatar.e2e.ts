import { newE2EPage } from '@stencil/core/testing';

describe('ath-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-avatar></ath-avatar>');

    const element = await page.find('ath-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
