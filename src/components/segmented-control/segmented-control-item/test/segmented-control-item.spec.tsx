import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthSegmentedControlItem } from '../segmented-control-item';
import { AthIcon } from '../../../icon/icon';
import { AthBadge } from '../../../badge/badge';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthSegmentedControlItem, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-segmented-control-item', () => {
  it('should have default properties', async () => {
    const page = await testPage(`<ath-segmented-control-item></ath-segmented-control-item>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(page.root).toHaveProperty('color', 'primary');
    expect(item).toHaveClass('ath-segmented-control-item--primary');
    expect(page.root).toHaveProperty('size', 'md');
    expect(item).toHaveClass('ath-segmented-control-item--md');
    expect(page.root).toHaveProperty('iconPosition', 'none');
    expect(item).not.toHaveClass('ath-segmented-control-item--icon-none');
    expect(page.root).toHaveProperty('selected', false);
    expect(item).not.toHaveClass('selected');
    expect(page.root).toHaveProperty('disabled', false);
    expect(item).not.toHaveClass('disabled');
  });

  it('should set the primary color property when color is primary', async () => {
    const page = await testPage(`<ath-segmented-control-item color="primary"></ath-segmented-control-item>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(item).toHaveClass('ath-segmented-control-item--primary');
  });

  it('should set the secondary color property when color is secondary', async () => {
    const page = await testPage(`<ath-segmented-control-item color="secondary"></ath-segmented-control-item>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(item).toHaveClass('ath-segmented-control-item--secondary');
  });

  it('should set the small size property when size is sm', async () => {
    const page = await testPage(`<ath-segmented-control-item size="sm"></ath-segmented-control-item>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(item).toHaveClass('ath-segmented-control-item--sm');
  });

  it('should set the medium size property when size is md', async () => {
    const page = await testPage(`<ath-segmented-control-item size="md"></ath-segmented-control-item>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(item).toHaveClass('ath-segmented-control-item--md');
  });

  it('should set the large size property when size is lg', async () => {
    const page = await testPage('<ath-segmented-control-item size="lg"></ath-segmented-control-item>');
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(item).toHaveClass('ath-segmented-control-item--lg');
  });

  it('should set the extra large size property when size is xl', async () => {
    const page = await testPage(`<ath-segmented-control-item size="xl"></ath-segmented-control-item>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(item).toHaveClass('ath-segmented-control-item--xl');
  });
});

describe('render icon', () => {
  it('should render with icon on the left', async () => {
    const page = await testPage(`<ath-segmented-control-item icon-position="left" icon="arrow_left"></ath-segmented-control-item>`, [AthIcon]);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(item).toHaveClass('ath-segmented-control-item--icon-left');
    expect(page.root).toHaveProperty('iconPosition', 'left');
    const icon = page.root.shadowRoot.querySelector('ath-icon');
    expect(item.firstChild.nodeName).toBe('ath-ICON');
    expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#arrow_left');
  });

  it('should render with icon on the right', async () => {
    const page = await testPage(`<ath-segmented-control-item icon-position="right" icon="arrow_right"></ath-segmented-control-item>`, [AthIcon]);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(item).toHaveClass('ath-segmented-control-item--icon-right');
    expect(page.root).toHaveProperty('iconPosition', 'right');
    const icon = page.root.shadowRoot.querySelector('ath-icon');
    expect(item.firstChild.nodeName).toBe('ath-ICON');
    expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#arrow_right');
  });

  it('should render with iconOnly', async () => {
    const page = await testPage(`<ath-segmented-control-item icon-position="icon-only" icon="accident"></ath-segmented-control-item>`, [AthIcon]);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control-item');
    expect(item).toHaveClass('ath-segmented-control-item--icon-only');
    expect(page.root).toHaveProperty('iconPosition', 'icon-only');
    const icon = page.root.shadowRoot.querySelector('ath-icon');
    expect(item.firstChild.nodeName).toBe('ath-ICON');
    expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#accident');
  });
});

describe('render badge and color', () => {
  it('should display the passed text', async () => {
    const text = 'Badge';
    const page = await testPage(`<ath-badge>${text}</ath-badge>`);

    expect(page.root).toEqualText(text);
  });

  it('should render danger color', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge color="danger"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const badgeSpan = badgeEl.shadowRoot.querySelector('.ath-badge');
    expect(badgeSpan).toHaveClass('ath-badge--danger');
  });

  it('should render warning color', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge color="warning"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const badgeSpan = badgeEl.shadowRoot.querySelector('.ath-badge');
    expect(badgeSpan).toHaveClass('ath-badge--warning');
  });

  it('should render info color', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge color="info"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const badgeSpan = badgeEl.shadowRoot.querySelector('.ath-badge');
    expect(badgeSpan).toHaveClass('ath-badge--info');
  });

  it('should render success color', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge color="success"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const badgeSpan = badgeEl.shadowRoot.querySelector('.ath-badge');
    expect(badgeSpan).toHaveClass('ath-badge--success');
  });

  it('should render accent color', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge color="accent"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const badgeSpan = badgeEl.shadowRoot.querySelector('.ath-badge');
    expect(badgeSpan).toHaveClass('ath-badge--accent');
  });
});

describe('render badge types and positions', () => {
  it('should render dot type and right', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge type="dot" position="right"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const badgeSpan = badgeEl.shadowRoot.querySelector('.ath-badge');
    expect(badgeSpan).toHaveClass('ath-badge--dot');
    expect(badgeSpan).toHaveClass('ath-badge--right');
  });

  it('should render dot type and top-right', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge type="dot" position="top-right"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const badgeSpan = badgeEl.shadowRoot.querySelector('.ath-badge');
    expect(badgeSpan).toHaveClass('ath-badge--dot');
    expect(badgeSpan).toHaveClass('ath-badge--top-right');
  });

  it('should render numeric type and right', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge type="numeric" position="right"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const badgeSpan = badgeEl.shadowRoot.querySelector('.ath-badge');
    expect(badgeSpan).toHaveClass('ath-badge--numeric');
    expect(badgeSpan).toHaveClass('ath-badge--right');
  });

  it('should render numeric type and top-right', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge type="numeric" position="top-right"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const badgeSpan = badgeEl.shadowRoot.querySelector('.ath-badge');
    expect(badgeSpan).toHaveClass('ath-badge--numeric');
    expect(badgeSpan).toHaveClass('ath-badge--top-right');
  });

  it('should render with personalized position', async () => {
    const page = await testPage(
      `
    <ath-segmented-control-item><ath-badge distance-x="5" distance-y="5"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    expect(badgeEl).toHaveProperty('distanceX', 5);
    expect(badgeEl).toHaveProperty('distanceY', 5);
  });
});

describe('render badge value and max', () => {
  it('should render with value', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge type="numeric" value="2"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const value = badgeEl.shadowRoot.querySelector('.ath-badge').innerHTML;
    expect(value).toBe('2');
  });

  it('should render with max', async () => {
    const page = await testPage(
      `
      <ath-segmented-control-item><ath-badge type="numeric" value="2" max="1"></ath-badge></ath-segmented-control-item>`,
      [AthBadge],
    );
    const badgeEl = page.root.querySelector('ath-badge');
    const value = badgeEl.shadowRoot.querySelector('.ath-badge').innerHTML;
    expect(value).toBe('+1');
  });
});

describe('actions', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await testPage(`<ath-segmented-control-item></ath-segmented-control-item>`);
  });

  it('should emit the athChange event when clicked', async () => {
    const athChange = jest.fn();
    page.root.addEventListener('athChange', athChange);
    page.root.click();
    await page.waitForChanges();
    expect(athChange).toHaveBeenCalled();
  });

  it('should emit the athFocus event when focused', async () => {
    const athFocus = jest.fn();
    page.root.addEventListener('athFocus', athFocus);
    page.root.focus();
    await page.waitForChanges();
    expect(athFocus).toHaveBeenCalled();
  });

  it('should unselect the item when unSelectItem is called', async () => {
    const page = await testPage(`<ath-segmented-control-item selected="true"></ath-segmented-control-item>`);
    await page.root.unSelectItem();
    expect(page.root.selected).toBe(false);
  });

  describe('keyboard interactions', () => {
    let page: SpecPage;
    let item;

    beforeEach(async () => {
      page = await testPage(`<ath-segmented-control-item></ath-segmented-control-item>`);
      item = page.root;
    });

    it('should emit athFocus events on focus', async () => {
      const focusEvent = jest.fn();

      page.root.addEventListener('athFocus', focusEvent);
      item.dispatchEvent(new FocusEvent('focus'));
      expect(focusEvent).toHaveBeenCalledTimes(1);
    });

    it('should trigger athChange for Enter or Space keydown', async () => {
      const changeEvent = jest.fn();
      page.root.addEventListener('athChange', changeEvent);

      item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      item.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      expect(changeEvent).toHaveBeenCalledTimes(1); // An item cannot be selected twice
    });
  });
});
