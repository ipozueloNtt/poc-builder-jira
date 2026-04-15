import { newE2EPage } from '@stencil/core/testing';

describe('ath-chip-dismiss', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-modal></ath-modal>');

    const element = await page.find('ath-modal');
    expect(element).toHaveClass('hydrated');
  });
});
