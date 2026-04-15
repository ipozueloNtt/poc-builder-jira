import { newE2EPage } from '@stencil/core/testing';

describe('ath-menu-horizontal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-menu-horizontal></ath-menu-horizontal>');

    const element = await page.find('ath-menu-horizontal');
    expect(element).toHaveClass('hydrated');
  });
});

describe('ath-menu-horizontal-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-menu-horizontal-item></ath-menu-horizontal-item>');

    const element = await page.find('ath-menu-horizontal-item');
    expect(element).toHaveClass('hydrated');
  });
});
