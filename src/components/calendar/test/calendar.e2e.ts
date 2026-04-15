import { newE2EPage } from '@stencil/core/testing';

describe('ath-calendar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-calendar></ath-calendar>');

    const element = await page.find('ath-calendar');
    expect(element).toHaveClass('hydrated');
  });
});
