import { newE2EPage } from '@stencil/core/testing';

describe('ath-segmented-control-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-segmented-control-item></ath-segmented-control-item>');

    const element = await page.find('ath-segmented-control-item');
    expect(element).toHaveClass('hydrated');
  });
});
