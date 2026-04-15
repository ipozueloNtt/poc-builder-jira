import { newE2EPage } from '@stencil/core/testing';

describe('ath-input-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-input-textarea></ath-input-textarea>');

    const element = await page.find('ath-input-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
