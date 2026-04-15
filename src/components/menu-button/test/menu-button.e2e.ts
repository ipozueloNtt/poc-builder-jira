import { newE2EPage } from '@stencil/core/testing';

describe('ath-menu-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-menu-button></ath-menu-button>');

    const element = await page.find('ath-menu-button');
    expect(element).toHaveClass('hydrated');
  });
});

describe('ath-menu-button-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-menu-button-item></ath-menu-button-item>');

    const element = await page.find('ath-menu-button-item');
    expect(element).toHaveClass('hydrated');
  });
});
