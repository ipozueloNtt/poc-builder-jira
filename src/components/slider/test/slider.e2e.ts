import { newE2EPage } from '@stencil/core/testing';

describe('ath-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-slider></ath-slider>');

    const element = await page.find('ath-slider');
    expect(element).toHaveClass('hydrated');
  });
});
