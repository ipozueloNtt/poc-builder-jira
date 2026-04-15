import { newE2EPage } from '@stencil/core/testing';

describe('ath-stepper', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-stepper></ath-stepper>');
    const element = await page.find('ath-stepper');
    expect(element).toHaveClass('hydrated');
  });
});

describe('ath-step', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-step></ath-step>');
    const element = await page.find('ath-step');
    expect(element).toHaveClass('hydrated');
  });
});
