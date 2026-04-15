import { newE2EPage } from '@stencil/core/testing';

describe('ath-card-selectable', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-card-selectable></ath-card-selectable>');
    const element = await page.find('ath-card-selectable');
    expect(element).toHaveClass('hydrated');
  });
});
