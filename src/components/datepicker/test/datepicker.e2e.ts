import { newE2EPage } from '@stencil/core/testing';

describe('ath-datepicker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-datepicker></ath-datepicker>');

    const element = await page.find('ath-datepicker');
    expect(element).toHaveClass('hydrated');
  });
});
