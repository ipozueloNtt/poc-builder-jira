import { newE2EPage } from '@stencil/core/testing';

describe('ath-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-checkbox></ath-checkbox>');
    const element = await page.find('ath-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});

describe('ath-checkbox-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-checkbox-group></ath-checkbox-group>');
    const element = await page.find('ath-checkbox-group');
    expect(element).toHaveClass('hydrated');
  });
});
