import { newE2EPage } from '@stencil/core/testing';

describe('ath-menu-vertical', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-menu-vertical></ath-menu-vertical>');
    const element = await page.find('ath-menu-vertical');
    expect(element).toHaveClass('hydrated');
  });
});
