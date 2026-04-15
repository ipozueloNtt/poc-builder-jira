import { newE2EPage } from '@stencil/core/testing';

describe('ath-chip-dismiss', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-chip-dismiss></ath-chip-dismiss>');

    const element = await page.find('ath-chip-dismiss');
    expect(element).toHaveClass('hydrated');
  });
});
