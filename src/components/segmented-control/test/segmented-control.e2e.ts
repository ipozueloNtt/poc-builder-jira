import { newE2EPage } from '@stencil/core/testing';

describe('ath-segmented-control', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-segmented-control></ath-segmented-control>');

    const element = await page.find('ath-segmented-control');
    expect(element).toHaveClass('hydrated');
  });
});
