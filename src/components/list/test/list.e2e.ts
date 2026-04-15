import { newE2EPage } from '@stencil/core/testing';

describe('ath-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-list></ath-list>');
    const element = await page.find('ath-list');
    expect(element).toHaveClass('hydrated');
  });
});
