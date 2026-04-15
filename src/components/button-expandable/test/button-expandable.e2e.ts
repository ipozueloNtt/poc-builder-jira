import { newE2EPage } from '@stencil/core/testing';

describe('button-expandable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-button-expandable></ath-button-expandable>');

    const element = await page.find('ath-button-expandable');
    expect(element).toHaveClass('hydrated');
  });
});
