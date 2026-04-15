import { newE2EPage } from '@stencil/core/testing';

describe('ath-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-card></ath-card>');
    const element = await page.find('ath-card');
    expect(element).toHaveClass('hydrated');
  });
});

describe('ath-card-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-card-header></ath-card-header>');
    const element = await page.find('ath-card-header');
    expect(element).toHaveClass('hydrated');
  });
});

describe('ath-card-thumbnail', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ath-card-thumbnail></ath-card-thumbnail>');
    const element = await page.find('ath-card-thumbnail');
    expect(element).toHaveClass('hydrated');
  });
});
