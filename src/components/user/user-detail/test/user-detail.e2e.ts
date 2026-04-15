import { newE2EPage } from '@stencil/core/testing';

describe('ath-user-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-user-detail></ath-user-detail>');

    const element = await page.find('ath-user-detail');
    expect(element).toHaveClass('hydrated');
  });
});
