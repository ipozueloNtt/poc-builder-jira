import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthSwitch } from '../switch';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthSwitch, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('default properties', () => {
  it('should have default properties', async () => {
    const page = await testPage('<ath-switch></ath-switch>');
    const switchElement = page.rootInstance;
    expect(switchElement.disabled).toBe(false);
    expect(switchElement.selected).toBe(false);
    expect(switchElement.readonly).toBe(false);
  });

  it('should render with default class names', async () => {
    const page = await testPage('<ath-switch></ath-switch>');
    const switchElement = page.root;
    const switchInner = switchElement.shadowRoot.querySelector('span.ath-switch');
    expect(switchInner).toBeTruthy();
    expect(switchInner.classList.contains('ath-switch')).toBe(true);
    expect(switchInner.classList.contains('ath-switch__unselected')).toBe(true);
  });
});

describe('selected property', () => {
  it('should toggle selected state on click', async () => {
    const page = await testPage('<ath-switch></ath-switch>');
    const switchElement = page.rootInstance as AthSwitch;

    expect(switchElement.selected).toBe(false);

    page.root.click();
    expect(switchElement.selected).toBe(true);

    page.root.click();
    expect(switchElement.selected).toBe(false);
  });
  it('does not toggle on click when disabled', async () => {
    const page = await testPage('<ath-switch disabled></ath-switch>');
    const switchElement = page.rootInstance as AthSwitch;

    expect(switchElement.selected).toBe(false);
    page.root.click();
    await page.waitForChanges();
    expect(switchElement.selected).toBe(false);

    expect(page.root.getAttribute('tabindex')).toBe('-1');
  });
});

describe('keyboard', () => {
  it('toggles on Enter keydown and Space', async () => {
    const page = await testPage('<ath-switch></ath-switch>');
    const switchElement = page.rootInstance as AthSwitch;

    expect(switchElement.selected).toBe(false);
    page.root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();
    expect(switchElement.selected).toBe(true);

    page.root.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await page.waitForChanges();
    expect(switchElement.selected).toBe(false);
  });

  it('does not toggle with keyboard when disabled or readonly', async () => {
    let page = await testPage('<ath-switch disabled></ath-switch>');
    let switchElement = page.rootInstance as AthSwitch;
    page.root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();
    expect(switchElement.selected).toBe(false);

    page = await testPage('<ath-switch readonly></ath-switch>');
    switchElement = page.rootInstance as AthSwitch;
    page.root.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true }));
    await page.waitForChanges();
    expect(switchElement.selected).toBe(false);
  });
});

describe('aria attributes', () => {
  it('should set aria attributes correctly', async () => {
    const page = await testPage('<ath-switch></ath-switch>');
    const switchEl = page.root;

    expect(switchEl.getAttribute('role')).toBe('switch');
    expect(switchEl.getAttribute('aria-disabled')).toBe('false');
    expect(switchEl.getAttribute('aria-checked')).toBe('false');
    expect(switchEl.getAttribute('aria-readonly')).toBe('false');
    expect(switchEl.getAttribute('tabindex')).toBe('0');
  });

  it('should set aria attributes when disabled', async () => {
    const page = await testPage('<ath-switch disabled></ath-switch>');
    const switchEl = page.root;

    expect(switchEl.getAttribute('aria-disabled')).toBe('true');
    expect(switchEl.getAttribute('aria-checked')).toBe('false');
    expect(switchEl.getAttribute('aria-readonly')).toBe('false');
    expect(switchEl.getAttribute('tabindex')).toBe('-1');
  });

  it('should set aria attributes when readonly', async () => {
    const page = await testPage('<ath-switch readonly></ath-switch>');
    const switchEl = page.root;

    expect(switchEl.getAttribute('aria-disabled')).toBe('false');
    expect(switchEl.getAttribute('aria-checked')).toBe('false');
    expect(switchEl.getAttribute('aria-readonly')).toBe('true');
    expect(switchEl.getAttribute('tabindex')).toBe('0');
  });

  it('should set aria attributes when selected', async () => {
    const page = await testPage('<ath-switch selected></ath-switch>');
    const switchEl = page.root;
    expect(switchEl.getAttribute('aria-checked')).toBe('true');
  });
});

describe('focus and blur events', () => {
  it('should emit focus event on focus', async () => {
    const page = await testPage('<ath-switch></ath-switch>');
    const switchElement = page.rootInstance;
    const focusSpy = jest.spyOn(switchElement.athFocus, 'emit');

    page.root.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should emit blur event on blur', async () => {
    const page = await testPage('<ath-switch></ath-switch>');
    const switchElement = page.rootInstance;
    const blurSpy = jest.spyOn(switchElement.athBlur, 'emit');

    page.root.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(blurSpy).toHaveBeenCalled();
  });

  it('should focus when setFocus is called and does not toggle', async () => {
    const page = await testPage('<ath-switch></ath-switch>');
    const switchElement = page.rootInstance;

    const focusSpy = jest.spyOn(page.root as HTMLElement, 'focus').mockImplementation(() => {});
    expect(switchElement.selected).toBe(false);

    await switchElement.setFocus();
    expect(focusSpy).toHaveBeenCalled();
    expect((page.rootInstance as AthSwitch).selected).toBe(false);
  });
});
