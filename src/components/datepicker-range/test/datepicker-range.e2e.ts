import { newE2EPage } from '@stencil/core/testing';

describe('ath-datepicker-range', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-datepicker-range></ath-datepicker-range>');

    const element = await page.find('ath-datepicker-range');
    expect(element).toHaveClass('hydrated');
  });
});
