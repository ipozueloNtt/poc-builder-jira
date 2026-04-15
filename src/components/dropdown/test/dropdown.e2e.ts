import { newE2EPage } from '@stencil/core/testing';

describe('ath-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-dropdown></ath-dropdown>');
    const element = await page.find('ath-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
