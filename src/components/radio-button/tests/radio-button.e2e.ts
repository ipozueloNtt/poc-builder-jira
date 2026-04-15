import { newE2EPage } from '@stencil/core/testing';

describe('ath-radio-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-radio-button></ath-radio-button>');
    const element = await page.find('ath-radio-button');
    expect(element).toHaveClass('hydrated');
  });
});

describe('ath-radio-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-radio-button-group></ath-radio-button-group>');
    const element = await page.find('ath-radio-button-group');
    expect(element).toHaveClass('hydrated');
  });
});
