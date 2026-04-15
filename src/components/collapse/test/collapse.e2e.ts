import { newE2EPage } from '@stencil/core/testing';

describe('ath-collapse', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-collapse show></ath-collapse>');

    const element = await page.find('ath-collapse');
    expect(element).toHaveClass('hydrated');
  });
});
