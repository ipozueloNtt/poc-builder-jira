import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthSectionTitle } from '../section-title';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthSectionTitle, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-section-title render', () => {
  it('renders with default props', async () => {
    const page = await testPage('<ath-section-title></ath-section-title>');
    expect(page.root).toBeTruthy();
    const container = page.root.querySelector('.ath-section-title');
    expect(container).toHaveClass('ath-section-title');
  });

  it('renders default decorator when type is default (default)', async () => {
    const page = await testPage('<ath-section-title></ath-section-title>');
    const decorator = page.root.querySelector('.ath-section-title--decorator');
    expect(decorator).not.toBeNull();
    expect(decorator).toHaveClass('ath-section-title--default');
  });

  it('renders icon when type is icon', async () => {
    const page = await testPage('<ath-section-title type="icon" icon="card"></ath-section-title>');
    const icon = page.root.querySelector('ath-icon');
    expect(icon).not.toBeNull();
    expect(icon.getAttribute('icon')).toBe('card');
  });

  it('renders pictogram when type is pictogram', async () => {
    const page = await testPage('<ath-section-title type="pictogram" pictogram="search"></ath-section-title>');
    const img = page.root.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toContain('search.svg');
  });

  it('renders with heading-text', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title--label');
    expect(el.textContent.trim()).toBe('Test Title');
    expect(el).toHaveClass('ath-section-title--label');
  });
  it('renders with heading-size default', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title--label');
    expect(el.textContent.trim()).toBe('Test Title');
    expect(el).toHaveClass('ath-section-title--label--sm');
  });

  it('renders with heading-size', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title" heading-size="lg"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title--label');
    expect(el.textContent.trim()).toBe('Test Title');
    expect(el).toHaveClass('ath-section-title--label--lg');
  });

  it('renders with overline', async () => {
    const page = await testPage('<ath-section-title overline="Test Title with overline"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title--overline');
    expect(el.textContent.trim()).toBe('Test Title with overline');
    expect(el).toHaveClass('ath-section-title--overline');
  });
});

describe('ath-section-title heading', () => {
  it('renders with h4 heading-text by default', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title--label');
    expect(el.tagName.toLowerCase()).toBe('h4');
  });

  it('renders with h2 heading-text when specified', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title h2" heading-level="2"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title--label');
    expect(el.tagName.toLowerCase()).toBe('h2');
  });

  it('renders with p heading-text when level is 0', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title p" heading-level="0"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title--label');
    expect(el.tagName.toLowerCase()).toBe('p');
  });

  it('renders with p overline by default', async () => {
    const page = await testPage('<ath-section-title overline="Test Title with overline"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title--overline');
    expect(el.tagName.toLowerCase()).toBe('p');
  });

  it('renders with h5 overline when specified', async () => {
    const page = await testPage('<ath-section-title overline="Test Title with overline" heading-overline="5"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title--overline');
    expect(el.tagName.toLowerCase()).toBe('h5');
  });
});

describe('ath-section-title color', () => {
  it('applies default primary color', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title default color"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title');
    expect(el).toHaveClass('ath-section-title--primary');
  });

  it('applies primary color class when specified', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title primary color" color="accent"></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title');
    expect(el).toHaveClass('ath-section-title--accent');
  });
});

describe('ath-section-title collapsable', () => {
  it('renders without chevron when not collapsable', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title not collapsable"></ath-section-title>');
    const chevron = page.root.querySelector('.ath-section-title--chevron');
    expect(chevron).toBeNull();
    const container = page.root.querySelector('.ath-section-title');
    expect(container).not.toHaveClass('ath-section-title--collapsable');
  });

  it('renders with chevron when collapsable', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title collapsable" collapsable></ath-section-title>');
    const chevron = page.root.querySelector('.ath-section-title--chevron');
    expect(chevron).not.toBeNull();
    const container = page.root.querySelector('.ath-section-title');
    expect(container).toHaveClass('ath-section-title--collapsable');
  });

  it('adds button role when collapsable', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title collapsable" collapsable></ath-section-title>');
    const el = page.root.querySelector('.ath-section-title');
    expect(el.getAttribute('role')).toBe('button');
    expect(el.getAttribute('tabindex')).toBe('0');
    expect(el.getAttribute('aria-expanded')).toBe('false');
  });

  it('updates state when receiving athCollapseState event', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title collapsable" collapsable collapse-target="test-target"></ath-section-title>');
    const component = page.rootInstance;

    // Initial state
    expect(component.isExpanded).toBeFalsy();
    const icon = page.root.querySelector('ath-icon');
    const iconWrapper = page.root.querySelector('.ath-section-title--chevron');
    expect(icon.getAttribute('icon')).toBe('chevron_up');
    expect(iconWrapper).toHaveClass('ath-section-title--chevron-rotate');

    // Dispatch collapse state event
    window.dispatchEvent(
      new CustomEvent('athCollapseState', {
        detail: { id: 'test-target', isExpanded: true },
      }),
    );
    await page.waitForChanges();

    // Check that state and icon are updated
    expect(component.isExpanded).toBeTruthy();
    expect(iconWrapper).not.toHaveClass('ath-section-title--chevron-rotate');
  });
});

describe('ath-section-title events', () => {
  it('emits athToggleCollapse event when clicked', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title collapsable" collapsable collapse-target="test-target"></ath-section-title>');
    const el = page.root;

    const eventSpy = jest.fn();
    el.addEventListener('athToggleCollapse', eventSpy);

    (page.root.querySelector('.ath-section-title') as HTMLElement).click();
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalled();
    expect(eventSpy.mock.calls[0][0].detail).toBe('test-target');
  });
});

describe('ath-section-title state', () => {
  it('toggles state when clicked', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title collapsable" collapsable collapse-target="test-target"></ath-section-title>');
    const component = page.rootInstance;

    expect(component.isExpanded).toBeFalsy();

    const el = page.root.querySelector('.ath-section-title') as HTMLElement;
    el.click();
    await page.waitForChanges();

    expect(component.isExpanded).toBeTruthy();
  });
});

describe('ath-section-title tooltip', () => {
  it('renders tooltip when specified', async () => {
    const page = await testPage('<ath-section-title heading-text="Test Title with tooltip" tooltip="Test Tooltip"></ath-section-title>');

    const tooltip = page.root.querySelector('ath-tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip).toHaveClass('ath-section-title--tooltip');
    expect(tooltip.getAttribute('heading-text')).toBe('Test Tooltip');
  });
});
