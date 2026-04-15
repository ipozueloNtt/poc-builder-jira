import { newE2EPage } from '@stencil/core/testing';

describe('ath-pictogram', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-pictogram></ath-pictogram>');

    const element = await page.find('ath-pictogram');
    expect(element).toHaveClass('hydrated');
  });
});
