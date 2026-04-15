import { newE2EPage } from '@stencil/core/testing';

describe('ath-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-tag></ath-tag>');

    const element = await page.find('ath-tag');
    expect(element).toHaveClass('hydrated');
  });
});
