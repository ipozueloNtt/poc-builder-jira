import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthIcon } from '../../icon/icon';
import { AthButton } from '../../button/button';
import { AthInputCounter } from '../input-counter';
import { InputCounterSizes } from '../input-counter.model';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthInputCounter, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

describe('ath-input-counter', () => {
  it('should build', async () => {
    const page = await testPage(`<ath-input-counter></ath-input-counter>`);
    expect(page.rootInstance).toBeTruthy();
  });

  describe('render', () => {
    it('should set default attributes and properties to input', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(page.root).toHaveProperty('size', `${InputCounterSizes.Medium}`);
      expect(input.getAttribute('type')).toBe('number');
      expect(input.getAttribute('id')).toBeTruthy();
      expect(input).toHaveClass('ath-input__text--value');
    });

    it('should set input element`s properties', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input).toHaveClass('ath-input__text--value');
      expect(input.getAttribute('id')).toContain('ath-input-');
      expect(input.getAttribute('type')).toBe('number');
    });
  });

  describe('optional attributes', () => {
    // Step
    it('should be able to set the step of the input number', async () => {
      const page = await testPage(`<ath-input-counter step="5"></ath-input-counter>`, [AthIcon]);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('step')).toBe('5');
    });
    // Name
    it('should set the name property when its defined', async () => {
      const page = await testPage(`<ath-input-counter name="text"></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('name')).toBe('text');
    });
    it('should not set the name property when its not defined', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('name')).toBeFalsy();
    });
    // Placeholder
    it('should set the placeholder property when is defined', async () => {
      const page = await testPage(`<ath-input-counter placeholder="text"></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).toBe('text');
    });
    it('should not set the placeholder property when is not defined', async () => {
      const page = await testPage(`<ath-input-counter ></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).toBeFalsy;
    });
    // Required & show-required:
    it('should set required and aria-required attributes when required is true', async () => {
      const page = await testPage(`<ath-input-counter label="Label" required></ath-input-counter>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeTruthy();
    });
    it('should not set required and aria-required attributes when required is not set', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeFalsy();
    });
    it('should not set required and aria-required attributes when required is not true but show-required is false', async () => {
      const page = await testPage(`<ath-input-counter required></ath-input-counter>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeFalsy();
    });
    // Size
    it('should be able to set the sm size', async () => {
      const page = await testPage(`<ath-input-counter size="sm"></ath-input-counter>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-sm');
    });
    it('should be able to set the md size', async () => {
      const page = await testPage(`<ath-input-counter size="md"></ath-input-counter>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-md');
    });
    it('should be able to set the lg size', async () => {
      const page = await testPage(`<ath-input-counter size="lg"></ath-input-counter>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-lg');
    });
    it('should set the md size by default', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-md');
    });
    // Tooltip-text
    it('should display a tooltip if label is set and tooltip-text is set', async () => {
      const page = await testPage(`<ath-input-counter label="Label" tooltip-text="Tooltip text"></ath-input-counter>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeTruthy();
    });
    it('should not display a tooltip if label is set but tooltip-text is not set', async () => {
      const page = await testPage(`<ath-input-counter label="Label"></ath-input-counter>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });
    it('should not display a tooltip if tooltip-text is set but label is not set', async () => {
      const page = await testPage(`<ath-input-counter tooltip-text="Tooltip text"></ath-input-counter>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });
    // Value
    it('should set the input value when the property it defined', async () => {
      const page = await testPage(`<ath-input-counter value="12"></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.value).toBe('12');
    });
    it('should set empty string as value when the property is not defined', async () => {
      const page = await testPage(`<ath-input-counter ></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.value).toBe('');
    });
  });

  describe('add ons', () => {
    // Feedback
    it('should display the feedback text with an icon if feedback-text is set and feedback is "error"', async () => {
      const page = await testPage(`<ath-input-counter feedback-text="feedback text" feedback="error"></ath-input-counter>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy;
      expect(feedback.querySelector('ath-icon')).toBeTruthy();
      expect(feedback.children[1].textContent).toBe('feedback text');
    });
    it('should not display the feedback when feedback it is not defined', async () => {
      const page = await testPage(`<ath-input-counter feedback-text="feedback text"></ath-input-counter>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });
    it('should not display the feedback when feedback it is not "error"', async () => {
      const page = await testPage(`<ath-input-counter feedback-text="feedback-text" feedback="none"></ath-input-counter>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });
    // Helper-text
    it('should display the helper-text if helper-text is not empty', async () => {
      const page = await testPage(`<ath-input-counter helper-text="text"></ath-input-counter>`);
      await page.waitForChanges();
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeTruthy;
      expect(helperText.firstElementChild.textContent).toBe('text');
    });
    it('should not display helper-text when helper-text it is not defined', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeFalsy();
    });
    // Label
    it('should display the label if label has a value', async () => {
      const page = await testPage(`<ath-input-counter label="text"></ath-input-counter>`);
      const label = page.root.shadowRoot.querySelector('label span');
      expect(label).toBeTruthy;
      expect(label.textContent).toBe('text');
    });
    it('should not display label tag when label it is not defined', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const label = page.root.shadowRoot.querySelector('label');
      expect(label).toBeFalsy();
    });
  });

  describe('accessibility', () => {
    // ARIA
    it('should set the aria-label property when input-aria-label is defined', async () => {
      const page = await testPage(`<ath-input-counter input-aria-label="text"></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-label')).toBe('text');
    });
    it('should set the aria-required property when required is defined', async () => {
      const page = await testPage(`<ath-input-counter required></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-required')).toBe('true');
    });
    it('should set the aria-disabled property when disabled is defined', async () => {
      const page = await testPage(`<ath-input-counter disabled></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-disabled')).toBe('true');
    });
    it('should set the aria-readonly property when readonly is defined', async () => {
      const page = await testPage(`<ath-input-counter readonly></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-readonly')).toBe('true');
    });
    it('shouldn`t set the aria-readonly property to null when readonly is defined but disabled is true', async () => {
      const page = await testPage(`<ath-input-counter readonly disabled></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-readonly')).toBeNull();
    });
  });

  describe('actions', () => {
    it('should allow the user introduce text', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      const newValue = 'Nuevo texto';
      const athInputMock = jest.fn(); // Crea un mock para el evento athInput
      page.rootInstance.athInput = { emit: athInputMock }; // Sustituye el evento del componente por el evento mockeado
      input.value = newValue;
      input.dispatchEvent(new Event('input')); // Simula el evento de entrada
      expect(athInputMock).toHaveBeenCalledWith(newValue); // Verifica que el mock del evento athInput se ha llamado con el nuevo valor
    });
    it('should emit the athFocus event when focused', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      input.focus();
      expect(athFocus).toHaveBeenCalled();
    });
    it('should emit the athBlur event when blurred', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      input.focus();
      input.blur();
      expect(athBlur).toHaveBeenCalled();
    });
    it('should emit the athInput when the value changes', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athInput = jest.fn();
      page.root.addEventListener('athInput', athInput);
      const event = new Event('input');
      input.dispatchEvent(event);
      await page.waitForChanges();
      expect(athInput).toHaveBeenCalled();
    });
    it('should emit the athChange when the value changes and loses focus', async () => {
      const page = await testPage(`<ath-input-counter></ath-input-counter>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      const event = new Event('change');
      input.dispatchEvent(event);
      await page.waitForChanges();
      expect(athChange).toHaveBeenCalled();
    });
  });

  describe('button actions default', () => {
    let page: SpecPage;
    let addButton;
    let removeButton;

    beforeEach(async () => {
      page = await testPage('<ath-input-counter></ath-input-counter>', [AthButton]);
      removeButton = page.root.shadowRoot.querySelectorAll('ath-button')[0];
      addButton = page.root.shadowRoot.querySelectorAll('ath-button')[1];
    });

    it('should have value 1 when add button clicked', async () => {
      const clickButton = jest.fn();
      page.root.addEventListener('athClick', clickButton);
      const input = page.root.shadowRoot.querySelector('input');
      addButton.click();
      expect(input.getAttribute('value')).toBe('1');
    });

    it('should have value -1 when remove button clicked', async () => {
      const clickButton = jest.fn();
      page.root.addEventListener('athClick', clickButton);
      const input = page.root.shadowRoot.querySelector('input');
      removeButton.click();
      expect(input.getAttribute('value')).toBe('-1');
    });
  });

  describe('button actions with value & step filled', () => {
    let page: SpecPage;
    let addButton;
    let removeButton;

    beforeEach(async () => {
      page = await testPage('<ath-input-counter value="12" step="5"></ath-input-counter>', [AthButton]);
      removeButton = page.root.shadowRoot.querySelectorAll('ath-button')[0];
      addButton = page.root.shadowRoot.querySelectorAll('ath-button')[1];
    });

    it('should have value 15 when value is 12, step is 5 and addButton clicked', async () => {
      const clickButton = jest.fn();
      page.root.addEventListener('athClick', clickButton);
      const input = page.root.shadowRoot.querySelector('input');
      addButton.click();
      expect(input.getAttribute('value')).toBe('15');
    });

    it('should have value 10 when value is 12, step is 5 and addButton clicked', async () => {
      const clickButton = jest.fn();
      page.root.addEventListener('athClick', clickButton);
      const input = page.root.shadowRoot.querySelector('input');
      removeButton.click();
      expect(input.getAttribute('value')).toBe('10');
    });
  });
});
