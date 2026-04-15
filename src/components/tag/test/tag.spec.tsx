import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthTag } from '../tag';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthTag, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-tag render', () => {
  it('should display a slot element when no heading-text is provided', async () => {
    const text = 'Tag';
    const page = await testPage(`<ath-tag>${text}</ath-tag>`);

    const innerSpan = page.root.shadowRoot.querySelector('.ath-tag-container span span');
    const slotElement = innerSpan.querySelector('slot');

    expect(slotElement).not.toBeNull();
  });

  it('should display the heading-text when provided', async () => {
    const labelText = 'Label Text';
    const page = await testPage(`<ath-tag heading-text="${labelText}">Ignored Slot</ath-tag>`);

    const innerSpan = page.root.shadowRoot.querySelector('.ath-tag-container span span');
    expect(innerSpan.textContent).toBe(labelText);
  });
  it('should not set aria-level attribute by default', async () => {
    const page = await testPage(`<ath-tag heading-text="Label Text" ></ath-tag>`);
    const spans = page.root.shadowRoot.querySelectorAll('.ath-tag-container span span');
    const headingSpan = spans[spans.length - 1];

    expect(headingSpan.hasAttribute('aria-level')).toBe(false);
  });
  it('should have default properties', async () => {
    const page = await testPage(`<ath-tag></ath-tag>`);
    expect(page.root).toHaveProperty('color', 'primary');
    expect(page.root).toHaveProperty('size', 'md');
  });
});

describe('ath-tag icon', () => {
  it('should display icon', async () => {
    const text = 'Tag';
    const page = await testPage(`<ath-tag icon="close">${text}</ath-tag>`);
    const icon = page.root.shadowRoot.querySelector('ath-icon');

    expect(icon).toBeTruthy();
    expect(icon).toEqualAttribute('icon', 'close');
  });

  it('should not display icon', async () => {
    const page = await testPage(`<ath-tag></ath-tag>`);
    const icon = page.root.shadowRoot.querySelector('ath-icon');

    expect(icon).toBeFalsy();
  });
});

describe('ath-tag size', () => {
  it('should display the passed text', async () => {
    const text = 'Tag';
    const page = await testPage(`<ath-tag>${text}</ath-tag>`);

    expect(page.root).toEqualText(text);
  });

  it('should render sm size', async () => {
    const page = await testPage(`<ath-tag size="sm"></ath-tag>`);
    const tag = page.root.shadowRoot.querySelector('.ath-tag');
    expect(tag).toHaveClass('ath-tag--sm');
    expect(page.root).toHaveProperty('size', 'sm');
  });

  it('should render md size', async () => {
    const page = await testPage(`<ath-tag size="md"></ath-tag>`);
    const tag = page.root.shadowRoot.querySelector('.ath-tag');
    expect(tag).toHaveClass('ath-tag--md');
    expect(page.root).toHaveProperty('size', 'md');
  });

  it('should render lg size', async () => {
    const page = await testPage(`<ath-tag size="lg"></ath-tag>`);
    const tag = page.root.shadowRoot.querySelector('.ath-tag');
    expect(tag).toHaveClass('ath-tag--lg');
    expect(page.root).toHaveProperty('size', 'lg');
  });
});

describe('ath-tag color', () => {
  it('should render primary color', async () => {
    const page = await testPage(`<ath-tag color="primary"></ath-tag>`);
    const tag = page.root.shadowRoot.querySelector('.ath-tag');
    expect(tag).toHaveClass('ath-tag--primary');
    expect(page.root).toHaveProperty('color', 'primary');
  });

  it('should render secondary color', async () => {
    const page = await testPage(`<ath-tag color="secondary"></ath-tag>`);
    const tag = page.root.shadowRoot.querySelector('.ath-tag');
    expect(tag).toHaveClass('ath-tag--secondary');
    expect(page.root).toHaveProperty('color', 'secondary');
  });

  it('should render accent color', async () => {
    const page = await testPage(`<ath-tag color="accent"></ath-tag>`);
    const tag = page.root.shadowRoot.querySelector('.ath-tag');
    expect(tag).toHaveClass('ath-tag--accent');
    expect(page.root).toHaveProperty('color', 'accent');
  });

  it('should render danger color', async () => {
    const page = await testPage(`<ath-tag color="danger"></ath-tag>`);
    const tag = page.root.shadowRoot.querySelector('.ath-tag');
    expect(tag).toHaveClass('ath-tag--danger');
    expect(page.root).toHaveProperty('color', 'danger');
  });

  it('should render warning color', async () => {
    const page = await testPage(`<ath-tag color="warning"></ath-tag>`);
    const tag = page.root.shadowRoot.querySelector('.ath-tag');
    expect(tag).toHaveClass('ath-tag--warning');
    expect(page.root).toHaveProperty('color', 'warning');
  });

  it('should render success color', async () => {
    const page = await testPage(`<ath-tag color="success"></ath-tag>`);
    const tag = page.root.shadowRoot.querySelector('.ath-tag');
    expect(tag).toHaveClass('ath-tag--success');
    expect(page.root).toHaveProperty('color', 'success');
  });
});
