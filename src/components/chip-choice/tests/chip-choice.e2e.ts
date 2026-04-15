import { newE2EPage } from '@stencil/core/testing';

describe('ath-chip-choice', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-chip-choice></ath-chip-choice>');
    const element = await page.find('ath-chip-choice');
    expect(element).toHaveClass('hydrated');
  });
});
