import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthButtonExpandable } from '../button-expandable';
import { ButtonExpandableSizesTypes } from '../button-expandable.model';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthButtonExpandable, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
  });
};

describe('ath-button-expandable render', () => {
  it('renders button text', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable>${text}</ath-button-expandable>`);
    expect(page.root).toBeTruthy();
    expect(page.root).toEqualText(text);
  });

  it('renders button default props', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable>${text}</ath-button-expandable>`);
    expect(page.root).toHaveProperty('size', `${ButtonExpandableSizesTypes.Large}`);
  });

  it('renders button width icon', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable icon="placeholder">${text}</ath-button-expandable>`);
    const icon = page.root.querySelector('ath-icon');
    expect(icon).toBeTruthy();
    expect(icon).toEqualAttribute('icon', 'placeholder');
  });

  it('renders button width specific size', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable size="sm">${text}</ath-button-expandable>`);

    expect(page.root).toHaveProperty('size', `${ButtonExpandableSizesTypes.Small}`);
  });
});

describe('ath-button-expandable disable state', () => {
  it('renders button disabled', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable disabled>${text}</ath-button-expandable>`);
    const buttonSpan = page.root.querySelector('.ath-button-expandable--container');
    expect(buttonSpan).toHaveClass('ath-button-expandable--disabled');
  });

  it('should not respond to click when disabled', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable disabled>${text}</ath-button-expandable>`);
    const component = page.rootInstance;
    const button = page.root;
    const eventSpy = jest.fn();

    component.athToggleCollapse = { emit: eventSpy } as any;
    await page.waitForChanges();
    // tabindex and aria-disabled should reflect disabled state
    expect(button.getAttribute('tabindex')).toBe('-1');
    expect(button.getAttribute('aria-disabled')).toBe('true');
    // click event
    button.click();
    await page.waitForChanges();
    // Should not emit or toggle expansion
    expect(eventSpy).not.toHaveBeenCalled();
    expect(component.isExpanded).toBe(false);
  });

  it('should not focus when disabled', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable disabled>${text}</ath-button-expandable>`);
    const component = page.rootInstance;
    const button = page.root;
    const focusSpy = jest.spyOn(button, 'focus');
    await component.setFocus();
    expect(focusSpy).not.toHaveBeenCalled();
  });
  it('should call on preventDefault', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable disabled>${text}</ath-button-expandable>`);
    // const component = page.rootInstance;
    const button = page.root;
    const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(mouseDownEvent, 'preventDefault');
    button.dispatchEvent(mouseDownEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});

describe('ath-button-expandable collapse events', () => {
  it('updates state when receiving athCollapseState event', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable collapse-target="test-target">${text}</ath-button-expandable>`);
    const component = page.rootInstance;
    // expanded state initially as false
    expect(component.isExpanded).toBeFalsy();
    const iconWrapper = page.root.querySelector('.ath-button-expandable--chevron');
    const icon = iconWrapper.querySelector('ath-icon');
    // icon chevron with expanded false styling
    expect(icon.getAttribute('icon')).toBe('chevron_up');
    expect(iconWrapper).toHaveClass('ath-button-expandable--chevron-rotate');
    // event dispatch
    window.dispatchEvent(
      new CustomEvent('athCollapseState', {
        detail: { id: 'test-target', isExpanded: true },
      }),
    );
    await page.waitForChanges();
    // changes state and icon when the event is listened
    expect(component.isExpanded).toBeTruthy();
    expect(iconWrapper).not.toHaveClass('ath-button-expandable--chevron-rotate');
  });
  it('emits athToggleCollapse event when clicked', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable collapse-target="test-target-1">${text}</ath-button-expandable>`);
    const component = page.rootInstance;
    const button = page.root;
    const eventSpy = jest.fn();
    button.addEventListener('athToggleCollapse', eventSpy);
    // expanded state initial is false
    expect(component.isExpanded).toBeFalsy();
    // button expandable click event
    button.click();
    await page.waitForChanges();
    // change expanded state
    expect(component.isExpanded).toBeTruthy();
    // emit athToggleCollapse event
    expect(eventSpy).toHaveBeenCalled();
    expect(eventSpy.mock.calls[0][0].detail).toBe('test-target-1');
    // get focus
    const focusSpy = jest.spyOn(button, 'focus');
    await component.setFocus();
    expect(focusSpy).toHaveBeenCalled();
  });
});

describe('ath-button-expandable - keyboard events ', () => {
  it('should toggle and emit when pressing Enter or Space if not disabled', async () => {
    const text = 'Button text';
    const page = await testPage(`<ath-button-expandable collapse-target="test-target-1">${text}</ath-button-expandable>`);
    const component = page.rootInstance;
    const button = page.root;

    const eventSpy = jest.fn();
    component.athToggleCollapse = { emit: eventSpy } as any;

    await page.waitForChanges();

    // keydown: Enter
    const enterEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      code: 'Enter',
    });
    button.dispatchEvent(enterEvent);
    await page.waitForChanges();

    expect(component.isExpanded).toBeTruthy();
    expect(eventSpy).toHaveBeenCalledWith('test-target-1');

    // keydown: Space (should collapse again)
    const spaceEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      code: 'Space',
    });
    button.dispatchEvent(spaceEvent);
    await page.waitForChanges();

    expect(component.isExpanded).toBeFalsy();
    expect(eventSpy).toHaveBeenCalledTimes(2);
    expect(eventSpy).toHaveBeenLastCalledWith('test-target-1');
  });
});
