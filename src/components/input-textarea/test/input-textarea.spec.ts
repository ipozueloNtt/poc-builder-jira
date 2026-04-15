import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthInputTextarea } from '../input-textarea';
import { InputSizes } from '../input-textarea.models';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthInputTextarea, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

describe('ath-input-text', () => {
  it('should build', async () => {
    const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
    expect(page.root).toBeTruthy();
  });
  describe('render', () => {
    it('should set default attributes and properties to input', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(page.root).toHaveProperty('size', `${InputSizes.Medium}`);
      expect(textarea.getAttribute('id')).toBeTruthy();
      expect(textarea).toHaveClass('ath-input__text--value');
    });
    it('should set children`s clases', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const firstChild = page.root.shadowRoot.firstChild;
      expect(firstChild).toHaveClass('ath-input');
      const secondChild = firstChild.firstChild;
      expect(secondChild).toHaveClass('wrapper');
      const thirthChild = secondChild.firstChild;
      expect(thirthChild).toHaveClass('ath-input__field');
    });
    it('should set textarea element`s properties', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea).toHaveClass('ath-input__text--value');
      expect(textarea.getAttribute('tabindex')).toContain('0');
      expect(textarea.getAttribute('aria-describedby')).toContain('ath-input-textarea-');
    });
  });

  describe('optional attributes', () => {
    // Autocomplete
    it('should set the autocomplete property when its defined', async () => {
      const page = await testPage(`<ath-input-textarea autocomplete="off"></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('autocomplete')).toBe('off');
    });
    it('should not set the autocomplete property when autocomplete it is not defined', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('autocomplete')).toBeFalsy();
    });
    it('should set the autofocus property when its defined', async () => {
      // Autofocus
      const page = await testPage(`<ath-input-textarea autofocus></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.style.outline).toBeTruthy;
    });
    // Maxlength
    it('should be able to set the maxlentgth of the input when type is text', async () => {
      const page = await testPage(`<ath-input-textarea type="text" maxlength="5"></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('maxlength')).toBe('5');
    });
    // Name
    it('should set the name property when its defined', async () => {
      const page = await testPage(`<ath-input-textarea name="text"></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('name')).toBe('text');
    });
    it('should not set the name property when its not defined', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('name')).toBeFalsy();
    });
    // Placeholder
    it('should set the placeholder property when is defined', async () => {
      const page = await testPage(`<ath-input-textarea placeholder="text"></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('placeholder')).toBe('text');
    });
    it('should not set the placeholder property when is not defined', async () => {
      const page = await testPage(`<ath-input-textarea ></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('placeholder')).toBeFalsy;
    });
    // Required & hide-required:
    it('should set required and aria-required attributes when required is true', async () => {
      const page = await testPage(`<ath-input-textarea label="Label" required></ath-input-textarea>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeTruthy();
    });
    it('should not set required and aria-required attributes when required is not set', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeFalsy();
    });
    it('should not set required and aria-required attributes when required is not true but hide-required is true', async () => {
      const page = await testPage(`<ath-input-textarea required hide-required></ath-input-textarea>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeFalsy();
    });
    // Rows
    it('should be able to set the visible rows number', async () => {
      const page = await testPage(`<ath-input-textarea rows="7"></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('rows')).toBe('7');
    });
    // Size
    it('should be able to set the sm size', async () => {
      const page = await testPage(`<ath-input-textarea size="sm"></ath-input-textarea>`);
      const textareaField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(textareaField).toHaveClass('ath-input__field--size-sm');
    });
    it('should be able to set the md size', async () => {
      const page = await testPage(`<ath-input-textarea size="md"></ath-input-textarea>`);
      const textareaField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(textareaField).toHaveClass('ath-input__field--size-md');
    });
    it('should be able to set the lg size', async () => {
      const page = await testPage(`<ath-input-textarea size="lg"></ath-input-textarea>`);
      const textareaField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(textareaField).toHaveClass('ath-input__field--size-lg');
    });
    it('should set the md size by default', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textareaField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(textareaField).toHaveClass('ath-input__field--size-md');
    });
    // Tabindex
    it('should set the tabindex property to -1 to the input and to the clean button when input-tabindex="-1"', async () => {
      const page = await testPage(`<ath-input-textarea input-tabindex="-1"></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('tabindex')).toBe('-1');
    });
    it('should set the tabindex property to 0 to the input and to the clean button when input-tabindex is not defined', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('tabindex')).toBe('0');
    });
    // Tooltip-text
    it('should display a tooltip if label is set and tooltip-text is set', async () => {
      const page = await testPage(`<ath-input-textarea label="Label" tooltip-text="Tooltip text"></ath-input-textarea>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeTruthy();
    });
    it('should not display a tooltip if label is set but tooltip-text is not set', async () => {
      const page = await testPage(`<ath-input-textarea label="Label"></ath-input-textarea>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });
    it('should not display a tooltip if tooltip-text is set but label is not set', async () => {
      const page = await testPage(`<ath-input-textarea tooltip-text="Tooltip text"></ath-input-textarea>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });
    // Value
    it('should set the value property when its defined', async () => {
      const page = await testPage(`<ath-input-textarea value="text"></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('value')).toBe('text');
    });
    it('should not set the value property when is not defined', async () => {
      const page = await testPage(`<ath-input-textarea ></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      expect(textarea.getAttribute('value')).toBeFalsy();
    });
    // Width
    it('should be able to set the visible cols number', async () => {
      const page = await testPage(`<ath-input-textarea width="50%"></ath-input-textarea>`);
      const athInput = page.root.shadowRoot.querySelector('.ath-input');
      expect(athInput.getAttribute('style')).toBe('width: 50%;');
    });
  });

  describe('add ons', () => {
    // Counter
    it('should display the counter if counter is true and type is text', async () => {
      const page = await testPage(`<ath-input-textarea type="text" counter value="text"></ath-input-textarea>`);
      const counter = page.root.shadowRoot.querySelector('.ath-input__counter');
      expect(counter.textContent).toBe('4');
    });
    it('should counterLabel be present (hidden thought) if counter is true and type is text', async () => {
      const page = await testPage(`<ath-input-textarea type="text" counter></ath-input-textarea>`);
      const counter = page.root.shadowRoot.querySelector('.ath-visibility-hidden');
      expect(counter).toBeTruthy;
    });
    it('should counterLabel be able to be customuized', async () => {
      const page = await testPage(`<ath-input-textarea type="text" counter counter-label="customized text"></ath-input-textarea>`);
      const counter = page.root.shadowRoot.querySelector('.ath-visibility-hidden');
      expect(counter.textContent).toBe('customized text');
    });
    it('should not display counter when counter it is not defined', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const counter = page.root.shadowRoot.querySelector('.ath-input__counter');
      expect(counter).toBeFalsy();
    });
    it('should display the maxlength in the counter if counter is true, maxlength is set and type is text', async () => {
      const page = await testPage(`<ath-input-textarea type="text" counter maxlength="5"></ath-input-textarea>`);
      await page.waitForChanges();
      const counter = page.root.shadowRoot.querySelector('.ath-input__counter');
      expect(counter).toBeTruthy;
      expect(counter.textContent).toContain('/');
    });
    // Feedback
    it('should display the feedback text with an icon if feedback-text is set and feedback is "error"', async () => {
      const page = await testPage(`<ath-input-textarea feedback-text="feedback text" feedback="error"></ath-input-textarea>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy;
      expect(feedback.querySelector('ath-icon')).toBeTruthy();
      expect(feedback.children[1].textContent).toBe('feedback text');
    });
    it('should not display the feedback when feedback it is not defined', async () => {
      const page = await testPage(`<ath-input-textarea feedback-text="feedback text"></ath-input-textarea>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });
    it('should not display the feedback when feedback it is not "error"', async () => {
      const page = await testPage(`<ath-input-textarea feedback-text="feedback-text" feedback="none"></ath-input-textarea>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });
    // Helper-text
    it('should display the helper-text if helper-text is not empty', async () => {
      const page = await testPage(`<ath-input-textarea helper-text="text"></ath-input-textarea>`);
      await page.waitForChanges();
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeTruthy;
      expect(helperText.firstElementChild.textContent).toBe('text');
    });
    it('should not display helper-text when helper-text it is not defined', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeFalsy();
    });
    // Label
    it('should display the label if label has a value', async () => {
      const page = await testPage(`<ath-input-textarea label="text"></ath-input-textarea>`);
      const label = page.root.shadowRoot.querySelector('label span');
      expect(label).toBeTruthy;
      expect(label.textContent).toBe('text');
    });
    it('should not display label tag when label it is not defined', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const label = page.root.shadowRoot.querySelector('label');
      expect(label).toBeFalsy();
    });
  });

  describe('actions', () => {
    it('should allow the user introduce text', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      const newValue = 'Nuevo texto';
      const athInputMock = jest.fn(); // Crea un mock para el evento athInput
      page.rootInstance.athInput = { emit: athInputMock }; // Sustituye el evento del componente por el evento mockeado
      textarea.value = newValue;
      textarea.dispatchEvent(new Event('input')); // Simula el evento de entrada
      expect(athInputMock).toHaveBeenCalledWith(newValue); // Verifica que el mock del evento athInput se ha llamado con el nuevo valor
    });
    it('should emit the athFocus event when focused', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      textarea.focus();
      expect(athFocus).toHaveBeenCalled();
    });
    it('should emit the athBlur event when blurred', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      textarea.focus();
      textarea.blur();
      expect(athBlur).toHaveBeenCalled();
    });
    it('should emit the athInput when the value changes', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      const athInput = jest.fn();
      page.root.addEventListener('athInput', athInput);
      const event = new Event('input');
      textarea.dispatchEvent(event);
      await page.waitForChanges();
      expect(athInput).toHaveBeenCalled();
    });
    it('should emit the athChange when the value changes and loses focus', async () => {
      const page = await testPage(`<ath-input-textarea></ath-input-textarea>`);
      const textarea = page.root.shadowRoot.querySelector('textarea');
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      const event = new Event('change');
      textarea.dispatchEvent(event);
      await page.waitForChanges();
      expect(athChange).toHaveBeenCalled();
    });
  });
});
