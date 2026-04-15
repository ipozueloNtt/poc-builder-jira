import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthBadge } from '../badge';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthBadge, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-badge render', () => {
  it('should display the passed text', async () => {
    const text = 'Badge';
    const page = await testPage(`<ath-badge>${text}</ath-badge>`);

    expect(page.root).toEqualText(text);
  });
  it('should have default properties', async () => {
    const page = await testPage(`<ath-badge></ath-badge>`);
    expect(page.root).toHaveProperty('type', 'numeric');
    expect(page.root).toHaveProperty('color', 'accent');
    const badge = page.root.shadowRoot.querySelector('.ath-badge');
    expect(badge).toHaveClass('ath-badge--top-right');
  });
});

describe('ath-badge color', () => {
  it('should render danger color', async () => {
    const page = await testPage(`<ath-badge color="danger"></ath-badge>`);
    const badge = page.root.shadowRoot.querySelector('.ath-badge');
    expect(badge).toHaveClass('ath-badge--danger');
    expect(page.root).toHaveProperty('color', 'danger');
  });
  it('should render warning color', async () => {
    const page = await testPage(`<ath-badge color="warning"></ath-badge>`);
    const badge = page.root.shadowRoot.querySelector('.ath-badge');
    expect(badge).toHaveClass('ath-badge--warning');
    expect(page.root).toHaveProperty('color', 'warning');
  });
  it('should render info color', async () => {
    const page = await testPage(`<ath-badge color="info"></ath-badge>`);
    const badge = page.root.shadowRoot.querySelector('.ath-badge');
    expect(badge).toHaveClass('ath-badge--info');
    expect(page.root).toHaveProperty('color', 'info');
  });
  it('should render success color', async () => {
    const page = await testPage(`<ath-badge color="success"></ath-badge>`);
    const badge = page.root.shadowRoot.querySelector('.ath-badge');
    expect(badge).toHaveClass('ath-badge--success');
    expect(page.root).toHaveProperty('color', 'success');
  });
  it('should render accent color', async () => {
    const page = await testPage(`<ath-badge color="accent"></ath-badge>`);
    const badge = page.root.shadowRoot.querySelector('.ath-badge');
    expect(badge).toHaveClass('ath-badge--accent');
    expect(page.root).toHaveProperty('color', 'accent');
  });
});

describe('ath-badge type and positioning', () => {
  it('should render type dot and position right', async () => {
    const page = await testPage(`<ath-badge type="dot"></ath-badge>`);

    expect(page.root).toHaveProperty('type', 'dot');
    const badge = page.root.shadowRoot.querySelector('.ath-badge');
    expect(badge).toHaveClass('ath-badge--dot');
    expect(badge).toHaveClass('ath-badge--right');
  });
  it('should render type dot and position top-right', async () => {
    const page = await testPage(`<ath-badge type="dot" position="top-right"></ath-badge>`);

    expect(page.root).toHaveProperty('type', 'dot');
    const badge = page.root.shadowRoot.querySelector('.ath-badge');
    expect(badge).toHaveClass('ath-badge--dot');
    expect(badge).toHaveClass('ath-badge--top-right');
  });
  it('should render type numeric and position right', async () => {
    const page = await testPage(`<ath-badge type="numeric" position="right"></ath-badge>`);
    const badge = page.root.shadowRoot.querySelector('.ath-badge');
    expect(badge).toHaveClass('ath-badge--numeric');
    expect(badge).toHaveClass('ath-badge--right');
    expect(page.root).toHaveProperty('type', 'numeric');
    expect(page.root).toHaveProperty('position', 'right');
  });
  it('should render with personalized position', async () => {
    const page = await testPage(`<ath-badge distance-x="5" distance-y="5"></ath-badge>`);
    expect(page.root).toHaveProperty('distanceX', 5);
    expect(page.root).toHaveProperty('distanceY', 5);
  });
});

describe('ath-badge value and max', () => {
  it('should render value number', async () => {
    const page = await testPage(`<ath-badge value="5"></ath-badge>`);

    const number = page.root.shadowRoot.querySelector('.ath-badge').innerHTML;
    expect(number).toBe('5');
  });
  it('should render max number', async () => {
    const page = await testPage(`<ath-badge value="5" max="4"></ath-badge>`);

    const number = page.root.shadowRoot.querySelector('.ath-badge').innerHTML;
    expect(number).toBe('+4');
  });
});

describe('ath-badge accessibility', () => {
  it('should render value number', async () => {
    const page = await testPage(`<ath-badge label="Items pendientes"></ath-badge>`);

    const label = page.root.shadowRoot.querySelector('.sr-only').innerHTML;
    expect(label).toBe('Items pendientes');
  });
});
