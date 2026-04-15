import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthSegmentedControl } from '../segmented-control';
import { AthSegmentedControlItem } from '../segmented-control-item/segmented-control-item';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthSegmentedControl, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('optional and default properties', () => {
  it('should have default properties', async () => {
    const page = await testPage(`<ath-segmented-control></ath-segmented-control>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control');
    expect(page.root).toHaveProperty('color', 'primary');
    expect(item).toHaveClass('ath-segmented-control--primary');
    expect(page.root).toHaveProperty('size', 'md');
    expect(item).toHaveClass('ath-segmented-control--md');
    expect(page.root).toHaveProperty('disabled', false);
    expect(item).not.toHaveClass('disabled');
  });
});

describe('color', () => {
  it('should set the primary color property when color is primary', async () => {
    const page = await testPage(`<ath-segmented-control color="primary"></ath-segmented-control>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control');
    expect(item).toHaveClass('ath-segmented-control--primary');
    expect(page.root).toHaveProperty('color', 'primary');
  });

  it('should set the secondary color property when color is secondary', async () => {
    const page = await testPage(`<ath-segmented-control color="secondary"></ath-segmented-control>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control');
    expect(item).toHaveClass('ath-segmented-control--secondary');
    expect(page.root).toHaveProperty('color', 'secondary');
  });
});

describe('size', () => {
  it('should set the small size property when size is sm', async () => {
    const page = await testPage(`<ath-segmented-control size="sm"></ath-segmented-control>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control');
    expect(item).toHaveClass('ath-segmented-control--sm');
  });

  it('should set the medium size property when size is md', async () => {
    const page = await testPage(`<ath-segmented-control size="md"></ath-segmented-control>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control');
    expect(item).toHaveClass('ath-segmented-control--md');
  });

  it('should set the medium size property when size is lg', async () => {
    const page = await testPage(`<ath-segmented-control size="lg"></ath-segmented-control>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control');
    expect(item).toHaveClass('ath-segmented-control--lg');
  });

  it('should set the medium size property when size is xl', async () => {
    const page = await testPage(`<ath-segmented-control size="xl"></ath-segmented-control>`);
    const item = page.root.shadowRoot.querySelector('.ath-segmented-control');
    expect(item).toHaveClass('ath-segmented-control--xl');
  });
});

describe('tooltip', () => {
  it('should display tooltip if label is set and tooltip-text is set', async () => {
    const page = await testPage(`<ath-segmented-control label="Label" tooltip-text="Tooltip text"></ath-segmented-control>`);
    const tooltip = page.root.shadowRoot.querySelector('ath-tooltip');
    expect(tooltip).toBeTruthy();
  });

  it('should not display a tooltip if label is set but tooltip-text is not set', async () => {
    const page = await testPage(`<ath-segmented-control label="Label"></ath-segmented-control>`);
    const tooltip = page.root.shadowRoot.querySelector('ath-tooltip');
    expect(tooltip).toBeFalsy();
  });

  it('should not display a tooltip if label is not set but tooltip-text is set', async () => {
    const page = await testPage(`<ath-segmented-control tooltip-text="Tooltip text"></ath-segmented-control>`);
    const tooltip = page.root.shadowRoot.querySelector('ath-tooltip');
    expect(tooltip).toBeFalsy();
  });

  it('should display a tooltip if label and tooltip-text is set and have width', async () => {
    const page = await testPage(`<ath-segmented-control label="Label" tooltip-text="Tooltip text" tooltip-width="100"></ath-segmented-control>`);
    const tooltip = page.root.shadowRoot.querySelector('ath-tooltip');
    expect(tooltip).toBeTruthy();
  });

  it('should not display a tooltip if label is not set, but tooltip-text is set and have width', async () => {
    const page = await testPage(`<ath-segmented-control tooltip-text="Tooltip text" tooltip-width="100"></ath-segmented-control>`);
    const tooltip = page.root.shadowRoot.querySelector('ath-tooltip');
    expect(tooltip).toBeFalsy();
  });
});

describe('add ons', () => {
  describe('show-required', () => {
    it('should have the required when show-required is true', async () => {
      const page = await testPage(`<ath-segmented-control required="true" label="test" show-required="true"></ath-segmented-control>`);
      const showRequired = page.root.shadowRoot.querySelector('.ath-input__label__wrapper .required');
      expect(showRequired).toBeTruthy();
    });

    it('should not set required and required attributes when required is not set', async () => {
      const page = await testPage(`<ath-segmented-control></ath-segmented-control>`);
      const showRequired = page.root.shadowRoot.querySelector('.required');
      expect(showRequired).toBeFalsy();
    });
  });

  describe('feedback', () => {
    it('should display the feedback text with feedback-text is set and feedback is "error"', async () => {
      const page = await testPage(`<ath-segmented-control feedback-text="feedback text" feedback="error"></ath-segmented-control>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy();
    });

    it('should not display the feedback when feedback it is not defined', async () => {
      const page = await testPage(`<ath-segmented-control feedback-text="feedback text"></ath-segmented-control>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });

    it('should not display the feedback when feedback it is not "error"', async () => {
      const page = await testPage(`<ath-segmented-control feedback-text="feedback-text" feedback="none"></ath-segmented-control>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });
  });

  describe('helper-text', () => {
    it('should display the helper-text if helper-text is not empty', async () => {
      const page = await testPage(`<ath-segmented-control helper-text="text"></ath-segmented-control>`);
      await page.waitForChanges();
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeTruthy();
      expect(helperText.firstElementChild.textContent).toBe('text');
    });

    it('should not display helper-text when helper-text it is not defined', async () => {
      const page = await testPage(`<ath-segmented-control></ath-segmented-control>`);
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeFalsy();
    });
  });

  describe('label', () => {
    it('should display the label if label has value', async () => {
      const page = await testPage(`<ath-segmented-control label="text"></ath-segmented-control>`);
      const label = page.root.shadowRoot.querySelector('.ath-input__label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('text');
    });

    it('should not display label tag when label it is not defined', async () => {
      const page = await testPage(`<ath-segmented-control></ath-segmented-control>`);
      const label = page.root.shadowRoot.querySelector('.ath-input__label');
      expect(label).toBeFalsy();
    });
  });
});

describe('actions', () => {
  it('should change selected state of items', async () => {
    const page = await testPage(
      `<ath-segmented-control>
        <ath-segmented-control-item id="1" label="Label 1" selected="true"></ath-segmented-control-item>
        <ath-segmented-control-item id="2" label="Label 1" selected="false"></ath-segmented-control-item>
      </ath-segmented-control>`,
      [AthSegmentedControl, AthSegmentedControlItem],
    );
    const item1 = page.root.querySelector('#1');
    const item2 = page.root.querySelector('#2');

    expect(item1).toHaveProperty('selected', true);
    item2.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await page.waitForChanges();
    expect(item1).toHaveProperty('selected', false);
  });

  it('should disabled all items when the segmented control is disabled', async () => {
    const page = await testPage(
      `<ath-segmented-control disabled="true">
        <ath-segmented-control-item id="1"></ath-segmented-control-item>
        <ath-segmented-control-item id="2"></ath-segmented-control-item>
      </ath-segmented-control>`,
      [AthSegmentedControl, AthSegmentedControlItem],
    );
    const item1 = page.root.querySelector('#1');
    const item2 = page.root.querySelector('#2');

    expect(item1).toHaveProperty('disabled', true);
    expect(item2).toHaveProperty('disabled', true);
  });

  describe('ensureSelection', () => {
    it('should NOT override selection if one item is already selected', async () => {
      const page = await testPage(
        `<ath-segmented-control type="action">
            <ath-segmented-control-item id="1" selected></ath-segmented-control-item>
            <ath-segmented-control-item id="2"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      const items = page.root.querySelectorAll('ath-segmented-control-item');

      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();

      expect(items[0]).toHaveProperty('selected', true);
      expect(items[1]).toHaveProperty('selected', false);
    });

    it('should select the first item if none are selected and type is Action', async () => {
      const page = await testPage(
        `<ath-segmented-control type="action">
            <ath-segmented-control-item id="1"></ath-segmented-control-item>
            <ath-segmented-control-item id="2"></ath-segmented-control-item>
            <ath-segmented-control-item id="3"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      const items = page.root.querySelectorAll('ath-segmented-control-item');
      expect(items.length).toBe(3);

      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();

      expect(items[0]).toHaveProperty('selected', true);
      expect(items[1]).toHaveProperty('selected', false);
      expect(items[2]).toHaveProperty('selected', false);
    });

    it('should select first item automatically on load and after updates when type is action', async () => {
      const page = await testPage(
        `<ath-segmented-control type="action">
            <ath-segmented-control-item id="1"></ath-segmented-control-item>
            <ath-segmented-control-item id="2"></ath-segmented-control-item>
            <ath-segmented-control-item id="3"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      const items = page.root.querySelectorAll('ath-segmented-control-item');
      expect(items.length).toBe(3);

      const initiallySelected = Array.from(items).some(item => item.hasAttribute('selected'));
      expect(initiallySelected).toBe(false);

      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();

      expect(items[0]).toHaveProperty('selected', true);
      expect(items[1]).toHaveProperty('selected', false);
      expect(items[2]).toHaveProperty('selected', false);

      page.root.setAttribute('color', 'secondary');
      expect(page.root).toHaveProperty('color', 'secondary');
      await page.waitForChanges();

      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();

      expect(items[0]).toHaveProperty('selected', true);
      expect(items[1]).toHaveProperty('selected', false);
      expect(items[2]).toHaveProperty('selected', false);
    });
  });

  describe('keyboard interactions', () => {
    async function navigationKeys(page, navKey, selectKey, fromIndex, expectedIndex, options = { assertInitialSelected: true }) {
      const items = page.root.querySelectorAll('ath-segmented-control-item');
      expect(items.length).toBe(3);

      items[fromIndex].focus();
      await page.waitForChanges();

      Object.defineProperty(document, 'activeElement', {
        configurable: true,
        get: () => items[0],
      });

      if (options.assertInitialSelected) {
        expect(items[fromIndex]).toHaveProperty('selected', true);
      }

      const keyNavEvent = new KeyboardEvent('keydown', {
        key: navKey,
        bubbles: true,
        composed: true,
      });

      page.root.dispatchEvent(keyNavEvent);
      await page.waitForChanges();

      Object.defineProperty(document, 'activeElement', {
        configurable: true,
        get: () => items[1],
      });

      items[expectedIndex].dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();

      const selectEvent = new KeyboardEvent('keydown', {
        key: selectKey,
        bubbles: true,
        composed: true,
      });

      items[expectedIndex].dispatchEvent(selectEvent);
      await page.waitForChanges();

      for (let i = 0; i < items.length; i++) {
        const expected = i === expectedIndex;
        expect(items[i]).toHaveProperty('selected', expected);
      }
    }

    it('should navigate to the first item using Home and select with space', async () => {
      const page = await testPage(
        `<ath-segmented-control>
            <ath-segmented-control-item id="1"></ath-segmented-control-item>
            <ath-segmented-control-item id="2" selected="true"></ath-segmented-control-item>
            <ath-segmented-control-item id="3"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      await navigationKeys(page, 'Home', ' ', 1, 0, { assertInitialSelected: false });
    });

    it('should navigate to the last item using End and select with enter', async () => {
      const page = await testPage(
        `<ath-segmented-control>
            <ath-segmented-control-item id="1"></ath-segmented-control-item>
            <ath-segmented-control-item id="2" selected="true"></ath-segmented-control-item>
            <ath-segmented-control-item id="3"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      await navigationKeys(page, 'End', 'Enter', 1, 2, { assertInitialSelected: false });
    });

    it('should navigate to previous item using ArrowLeft and select with space', async () => {
      const page = await testPage(
        `<ath-segmented-control>
            <ath-segmented-control-item id="1" selected="true"></ath-segmented-control-item>
            <ath-segmented-control-item id="2"></ath-segmented-control-item>
            <ath-segmented-control-item id="3"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      await navigationKeys(page, 'ArrowLeft', ' ', 1, 0, { assertInitialSelected: false });
    });

    it('should navigate to next item using arrow right and select with enter', async () => {
      const page = await testPage(
        `<ath-segmented-control>
            <ath-segmented-control-item id="1" selected="true"></ath-segmented-control-item>
            <ath-segmented-control-item id="2"></ath-segmented-control-item>
            <ath-segmented-control-item id="3"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      await navigationKeys(page, 'ArrowRight', 'Enter', 0, 1, { assertInitialSelected: false });
    });

    it('should navigate to previous item using ArrowUp and select with enter', async () => {
      const page = await testPage(
        `<ath-segmented-control>
            <ath-segmented-control-item id="1"></ath-segmented-control-item>
            <ath-segmented-control-item id="2" selected="true"></ath-segmented-control-item>
            <ath-segmented-control-item id="3"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      await navigationKeys(page, 'ArrowUp', 'Enter', 1, 0, { assertInitialSelected: false });
    });

    it('should navigate to next item using arrow down and select with space', async () => {
      const page = await testPage(
        `<ath-segmented-control>
            <ath-segmented-control-item id="1" selected="true"></ath-segmented-control-item>
            <ath-segmented-control-item id="2"></ath-segmented-control-item>
            <ath-segmented-control-item id="3"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      await navigationKeys(page, 'ArrowDown', ' ', 0, 1, { assertInitialSelected: false });
    });

    it('should skip disabled items when navigating with ArrowRight and select on Space', async () => {
      const page = await testPage(
        `<ath-segmented-control>
            <ath-segmented-control-item id="1" selected="true"></ath-segmented-control-item>
            <ath-segmented-control-item id="2" disabled></ath-segmented-control-item>
            <ath-segmented-control-item id="3"></ath-segmented-control-item>
          </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      const items = page.root.querySelectorAll('ath-segmented-control-item');
      expect(items.length).toBe(3);

      items[0].focus();
      await page.waitForChanges();

      Object.defineProperty(document, 'activeElement', {
        configurable: true,
        get: () => items[0],
      });

      expect(items[0]).toHaveProperty('selected', true);
      expect(items[1]).toHaveProperty('selected', false);
      expect(items[1]).toHaveProperty('disabled', true);
      expect(items[2]).toHaveProperty('selected', false);

      const rightEvent = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        composed: true,
      });

      page.root.dispatchEvent(rightEvent);
      await page.waitForChanges();

      Object.defineProperty(document, 'activeElement', {
        configurable: true,
        get: () => items[2],
      });

      items[2].dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();

      const selectEvent = new KeyboardEvent('keydown', {
        key: ' ',
        bubbles: true,
        composed: true,
      });

      items[2].dispatchEvent(selectEvent);
      await page.waitForChanges();

      expect(items[0]).toHaveProperty('selected', false);
      expect(items[1]).toHaveProperty('selected', false);
      expect(items[1]).toHaveProperty('disabled', true);
      expect(items[2]).toHaveProperty('selected', true);
    });

    it('should exit if no item is currently focused', async () => {
      const page = await newSpecPage({
        components: [AthSegmentedControl, AthSegmentedControlItem],
        html: `
        <ath-segmented-control>
          <ath-segmented-control-item id="item1"></ath-segmented-control-item>
          <ath-segmented-control-item id="item2"></ath-segmented-control-item>
        </ath-segmented-control>`,
      });

      const instance = page.rootInstance;

      // Simula que ninguno tiene focus (activeElement es el body)
      const originalActive = Object.getOwnPropertyDescriptor(document, 'activeElement');
      Object.defineProperty(document, 'activeElement', {
        configurable: true,
        get: () => document.body,
      });

      const spyNextIndex = jest.spyOn(instance, 'getNextIndex');
      const event = { key: 'ArrowRight', preventDefault: jest.fn() } as unknown as KeyboardEvent;

      // Simula KeyDown sin item enfocado
      instance.handleKeyDown(event);

      if (originalActive) {
        Object.defineProperty(document, 'activeElement', originalActive);
      }

      expect(event.preventDefault).toHaveBeenCalled();
      expect(spyNextIndex).not.toHaveBeenCalled();
    });
  });

  describe('handlePropsChange', () => {
    it('should update children props when handlePropsChange is called', async () => {
      const page = await testPage(
        `<ath-segmented-control color="primary" size="lg" disabled>
          <ath-segmented-control-item id="item1"></ath-segmented-control-item>
          <ath-segmented-control-item id="item2"></ath-segmented-control-item>
        </ath-segmented-control>`,
        [AthSegmentedControl, AthSegmentedControlItem],
      );

      const items = page.root.querySelectorAll('ath-segmented-control-item');

      page.root.setAttribute('color', 'secondary');
      page.root.setAttribute('size', 'sm');

      await page.waitForChanges();

      items.forEach(item => {
        expect(item.color).toBe('secondary');
        expect(item.size).toBe('sm');
      });
    });
  });
});

describe('accesibily children', () => {
  it('should have aria-checked attribute on items when type is select', async () => {
    const page = await testPage(
      `<ath-segmented-control type="select">
          <ath-segmented-control-item id="1" selected="true"></ath-segmented-control-item>
          <ath-segmented-control-item id="2"></ath-segmented-control-item>
        </ath-segmented-control>`,
      [AthSegmentedControl, AthSegmentedControlItem],
    );

    const items = page.root.querySelectorAll('ath-segmented-control-item');
    expect(items.length).toBe(2);

    items.forEach(item => {
      expect(item).toHaveAttribute('aria-checked');
    });
  });

  it('should have aria-pressed attribute on items when type is action', async () => {
    const page = await newSpecPage({
      components: [AthSegmentedControl, AthSegmentedControlItem],
      html: `
        <ath-segmented-control type="action">
          <ath-segmented-control-item id="1" selected="true"></ath-segmented-control-item>
          <ath-segmented-control-item id="2"></ath-segmented-control-item>
        </ath-segmented-control>
      `,
    });
    const items = page.root.querySelectorAll('ath-segmented-control-item');
    expect(items.length).toBe(2);

    items.forEach(item => {
      expect(item).toHaveAttribute('aria-pressed');
    });
  });

  it('should have aria-pressed attribute on items when type is action and selected', async () => {
    const page = await testPage(
      `<ath-segmented-control type="action">
          <ath-segmented-control-item id="1" selected="true"></ath-segmented-control-item>
          <ath-segmented-control-item id="2"></ath-segmented-control-item>
        </ath-segmented-control>`,
      [AthSegmentedControl, AthSegmentedControlItem],
    );

    const items = page.root.querySelectorAll('ath-segmented-control-item');
    expect(items.length).toBe(2);

    const item0El = items[0];
    const item1El = items[1];
    expect(item0El.getAttribute('aria-pressed')).toBe('true');
    expect(item1El.getAttribute('aria-pressed')).toBe('false');
  });

  it('should have aria-checked attribute on items when type is select and selected', async () => {
    const page = await testPage(
      `<ath-segmented-control type="select">
          <ath-segmented-control-item id="1" selected="true"></ath-segmented-control-item>
          <ath-segmented-control-item id="2"></ath-segmented-control-item>
        </ath-segmented-control>`,
      [AthSegmentedControl, AthSegmentedControlItem],
    );

    const items = page.root.querySelectorAll('ath-segmented-control-item');
    expect(items.length).toBe(2);

    const item0El = items[0];
    const item1El = items[1];

    expect(item0El.getAttribute('aria-checked')).toBe('true');
    expect(item1El.getAttribute('aria-checked')).toBe('false');
  });
});
