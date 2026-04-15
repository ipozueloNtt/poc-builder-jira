import { newE2EPage } from '@stencil/core/testing';

describe('ath-menu-lateral', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-menu-lateral></ath-menu-lateral>');

    const element = await page.find('ath-menu-lateral');
    expect(element).toHaveClass('hydrated');
  });
});

describe('ath-menu-lateral-item-action', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-menu-lateral-item-action></ath-menu-lateral-item-action>');

    const element = await page.find('ath-menu-lateral-item-action');
    expect(element).toHaveClass('hydrated');
  });
});

describe('ath-menu-lateral-item-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-menu-lateral-item-link></ath-menu-lateral-item-link>');

    const element = await page.find('ath-menu-lateral-item-link');
    expect(element).toHaveClass('hydrated');
  });
});
