import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthProgressBar } from '../progress-bar';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthProgressBar, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('default properties', () => {
  it('should have default properties', async () => {
    const page = await testPage(`<ath-progress-bar></ath-progress-bar>`);
    const alignment = page.root.shadowRoot.querySelector('.ath-progress-bar');
    expect(page.root).toHaveProperty('labelAlignment', 'stack');
    expect(alignment).toHaveClass('ath-progress-bar--stack');
  });
});

describe('labels', () => {
  it('should display the label-left if label have text', async () => {
    const page = await testPage(`<ath-progress-bar label-left="left"></ath-progress-bar>`);
    const label = page.root.shadowRoot.querySelector('.ath-progress-bar-label.left');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('left');
  });

  it('should display the label-right if label have text', async () => {
    const page = await testPage(`<ath-progress-bar label-right="right"></ath-progress-bar>`);
    const label = page.root.shadowRoot.querySelector('.ath-progress-bar-label.right');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('right');
  });

  it('should display the label-left if label have text and alignment is inline', async () => {
    const page = await testPage(`<ath-progress-bar label-left="left" label-alignment="inline"></ath-progress-bar>`);
    const labelLeft = page.root.shadowRoot.querySelector('.ath-progress-bar-label.left');
    const alignment = page.root.shadowRoot.querySelector('.ath-progress-bar');

    expect(labelLeft).toBeTruthy();
    expect(labelLeft.textContent).toBe('left');
    expect(page.root).toHaveProperty('labelAlignment', 'inline');
    expect(alignment).toHaveClass('ath-progress-bar--inline');
  });

  it('should only display the label-left and not label-right if label have text and alignment is inline', async () => {
    const page = await testPage(`<ath-progress-bar label-left="left" label-right="right" label-alignment="inline"></ath-progress-bar>`);
    const labelLeft = page.root.shadowRoot.querySelector('.ath-progress-bar-label.left');
    const labelRight = page.root.shadowRoot.querySelector('.ath-progress-bar-label.right');
    const alignment = page.root.shadowRoot.querySelector('.ath-progress-bar');

    expect(labelLeft).toBeTruthy();
    expect(labelLeft.textContent).toBe('left');
    expect(labelRight).toBeNull();
    expect(page.root).toHaveProperty('labelAlignment', 'inline');
    expect(alignment).toHaveClass('ath-progress-bar--inline');
  });

  it('should display the label-right and label-left if label have text and alignment is stack', async () => {
    const page = await testPage(`<ath-progress-bar label-left="left" label-right="right" label-alignment="stack"></ath-progress-bar>`);
    const labelLeft = page.root.shadowRoot.querySelector('.ath-progress-bar-label.left');
    const labelRight = page.root.shadowRoot.querySelector('.ath-progress-bar-label.right');
    const alignment = page.root.shadowRoot.querySelector('.ath-progress-bar');

    expect(labelLeft).toBeTruthy();
    expect(labelLeft.textContent).toBe('left');
    expect(labelRight).toBeTruthy();
    expect(labelRight.textContent).toBe('right');
    expect(page.root).toHaveProperty('labelAlignment', 'stack');
    expect(alignment).toHaveClass('ath-progress-bar--stack');
  });
});

describe('progress bar', () => {
  it('should render the progress bar "in-progress" with value', async () => {
    const page = await testPage(`<ath-progress-bar value="30"></ath-progress-bar>`);
    const progressBar = page.root.shadowRoot.querySelector('.ath-progress-bar-item');
    expect(progressBar).toBeTruthy();

    const value = progressBar.getAttribute('style');
    expect(value).toContain('--progress-value: 30');

    const filler = progressBar.querySelector('.ath-progress-bar__filler');
    expect(filler).toBeTruthy();
  });

  it('should render the progress bar infinite with value', async () => {
    const page = await testPage(`<ath-progress-bar infinite value="30"></ath-progress-bar>`);
    const progressBar = page.root.shadowRoot.querySelector('.ath-progress-bar-item');
    expect(progressBar).toBeTruthy();

    const value = progressBar.getAttribute('style');
    expect(value).toContain('--progress-value: 30');

    const filler = progressBar.querySelector('.ath-progress-bar__filler');
    expect(filler).toBeTruthy();
  });

  it('should not render the progress bar "in-progress" with negative value', async () => {
    const page = await testPage(`<ath-progress-bar value="-30"></ath-progress-bar>`);
    const progressBar = page.root.shadowRoot.querySelector('.ath-progress-bar-item');
    expect(progressBar).toBeTruthy();

    const value = progressBar.getAttribute('style');
    expect(value.includes('--progress-value: -30')).toBe(false);

    const filler = progressBar.querySelector('.ath-progress-bar__filler');
    expect(filler).toBeTruthy();
  });

  it('should not render the progress bar infinite with negative value', async () => {
    const page = await testPage(`<ath-progress-bar infinite value="-30"></ath-progress-bar>`);
    const progressBar = page.root.shadowRoot.querySelector('.ath-progress-bar-item');
    expect(progressBar).toBeTruthy();

    const filler = progressBar.querySelector('.ath-progress-bar__filler');
    expect(filler).toBeTruthy();
    expect(filler).toHaveClass('infinite');
  });

  it('should render the progress bar infinite with out value', async () => {
    const page = await testPage(`<ath-progress-bar infinite></ath-progress-bar>`);
    const progressBar = page.root.shadowRoot.querySelector('.ath-progress-bar-item');
    expect(progressBar).toBeTruthy();

    const filler = progressBar.querySelector('.ath-progress-bar__filler');
    expect(filler).toBeTruthy();
    expect(filler).toHaveClass('infinite');
  });
});
