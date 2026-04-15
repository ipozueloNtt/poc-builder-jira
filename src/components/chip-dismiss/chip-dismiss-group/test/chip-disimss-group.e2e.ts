import { newE2EPage } from '@stencil/core/testing';

describe('ath-chip-dismiss-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ath-chip-dismiss-group></ath-chip-dismiss-group>');

    const element = await page.find('ath-chip-dismiss-group');
    expect(element).toHaveClass('hydrated');
    expect(element.getAttribute('role')).toBe('group');
  });
});
