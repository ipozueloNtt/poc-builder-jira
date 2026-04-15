import { newE2EPage } from '@stencil/core/testing';

describe('ath-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-accordion></ath-accordion>');
    const element = await page.find('ath-accordion');
    expect(element).toHaveClass('hydrated');
  });
});
