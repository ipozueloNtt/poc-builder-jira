import { newE2EPage } from '@stencil/core/testing';

describe('ath-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-alert></ath-alert>');
    const element = await page.find('ath-alert');
    expect(element).toHaveClass('hydrated');
  });
});
