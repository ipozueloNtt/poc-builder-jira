import { newE2EPage } from '@stencil/core/testing';

describe('section-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-section-title></ath-section-title>');

    const element = await page.find('ath-section-title');
    expect(element).toHaveClass('hydrated');
  });
});
