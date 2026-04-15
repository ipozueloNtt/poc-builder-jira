import { newE2EPage } from '@stencil/core/testing';

describe('ath-empty-state', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-empty-state></ath-empty-state>');

    const element = await page.find('ath-empty-state');
    expect(element).toHaveClass('hydrated');
  });
});
