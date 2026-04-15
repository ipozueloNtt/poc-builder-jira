import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthButton } from '../../button/button';
import { AthIcon } from '../../icon/icon';
import { AthInputPassword } from '../input-password';
import { InputSizes } from '../input-password.models';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthInputPassword, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

describe('ath-input-password', () => {
  it('should build', async () => {
    const page = await testPage(`<ath-input-password></ath-input-password>`);
    expect(page.rootInstance).toBeTruthy();
  });

  describe('render', () => {
    it('should set default attributes and properties to input', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(page.root).toHaveProperty('size', `${InputSizes.Medium}`);
      expect(input.getAttribute('type')).toBe('password');
      expect(input.getAttribute('id')).toBeTruthy();
      expect(input).toHaveClass('ath-input__text--value');
    });
    it('should set children`s clases', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const firstChild = page.root.shadowRoot.firstChild;
      expect(firstChild).toHaveClass('ath-input');
      const secondChild = firstChild.firstChild;
      expect(secondChild).toHaveClass('wrapper');
      const thirthChild = secondChild.firstChild;
      expect(thirthChild).toHaveClass('ath-input__field');
    });
    it('should set input element`s properties', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input).toHaveClass('ath-input__text--value');
      expect(input.getAttribute('id')).toContain('ath-input-pass');
      expect(input.getAttribute('type')).toBe('password');
      expect(input.getAttribute('labelclearbutton')).toBe('Ver password');
    });
  });

  describe('optional attributes', () => {
    //     // Autocomplete
    it('should set the autocomplete property when its defined', async () => {
      const page = await testPage(`<ath-input-password autocomplete="off"></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('autocomplete')).toBe('off');
    });
    it('should not set the autocomplete property when autocomplete it is not defined', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('autocomplete')).toBeFalsy();
    });
    it('should set the autofocus property when its defined', async () => {
      // Autofocus
      const page = await testPage(`<ath-input-password autofocus></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.style.outline).toBeTruthy;
    });
    // Maxlength
    it('should be able to set the maxlentgth of the input', async () => {
      const page = await testPage(`<ath-input-password maxlength="5"></ath-input-password>`, [AthIcon]);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('maxlength')).toBe('5');
    });
    it('should not set a maxlength if maxlength is not set', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`, [AthIcon]);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('maxlength')).toBeFalsy();
    });
    // Name
    it('should set the name property when its defined', async () => {
      const page = await testPage(`<ath-input-password name="text"></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('name')).toBe('text');
    });
    it('should not set the name property when its not defined', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('name')).toBeFalsy();
    });
    // Placeholder
    it('should set the placeholder property when is defined', async () => {
      const page = await testPage(`<ath-input-password placeholder="text"></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).toBe('text');
    });
    it('should not set the placeholder property when is not defined', async () => {
      const page = await testPage(`<ath-input-password ></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).toBeFalsy;
    });
    // Required & hide-required:
    it('should set required and aria-required attributes when required is true', async () => {
      const page = await testPage(`<ath-input-password label="Label" required></ath-input-password>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeTruthy();
    });
    it('should not set required and aria-required attributes when required is not set', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeFalsy();
    });
    it('should not set required and aria-required attributes when required is not true but hide-required is true', async () => {
      const page = await testPage(`<ath-input-password required hide-required></ath-input-password>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeFalsy();
    });
    // Size
    it('should be able to set the sm size', async () => {
      const page = await testPage(`<ath-input-password size="sm"></ath-input-password>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-sm');
    });
    it('should be able to set the md size', async () => {
      const page = await testPage(`<ath-input-password size="md"></ath-input-password>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-md');
    });
    it('should be able to set the lg size', async () => {
      const page = await testPage(`<ath-input-password size="lg"></ath-input-password>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-lg');
    });
    it('should set the md size by default', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-md');
    });
    // Tabindex
    it('should set the tabindex property to -1 to the input and to the clean button when input-tabindex="-1"', async () => {
      const page = await testPage(`<ath-input-password input-tabindex="-1"></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('tabindex')).toBe('-1');
    });
    it('should set the tabindex property to 0 to the input and to the clean button when input-tabindex is not defined', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('tabindex')).toBe('0');
    });
    // Tooltip-text
    it('should display a tooltip if label is set and tooltip-text is set', async () => {
      const page = await testPage(`<ath-input-password label="Label" tooltip-text="Tooltip text"></ath-input-password>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeTruthy();
    });
    it('should not display a tooltip if label is set but tooltip-text is not set', async () => {
      const page = await testPage(`<ath-input-password label="Label"></ath-input-password>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });
    it('should not display a tooltip if tooltip-text is set but label is not set', async () => {
      const page = await testPage(`<ath-input-password tooltip-text="Tooltip text"></ath-input-password>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });
    // Value
    it('should set the value property when its defined', async () => {
      const page = await testPage(`<ath-input-password value="text"></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('value')).toBe('text');
    });
    it('should not set the value property when is not defined', async () => {
      const page = await testPage(`<ath-input-password ></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('value')).toBeFalsy();
    });
  });

  describe('add ons', () => {
    // Counter
    it('should display the counter if counter is true and type is text', async () => {
      const page = await testPage(`<ath-input-password counter value="text"></ath-input-password>`);
      const counter = page.root.shadowRoot.querySelector('.ath-input__counter');
      expect(counter.textContent).toBe('4');
    });
    it('should counterLabel be present (hidden thought) if counter is true and type is text', async () => {
      const page = await testPage(`<ath-input-password counter></ath-input-password>`);
      const counter = page.root.shadowRoot.querySelector('.ath-visibility-hidden');
      expect(counter).toBeTruthy;
    });
    it('should counterLabel be able to be customuized', async () => {
      const page = await testPage(`<ath-input-password counter counter-label="customized text"></ath-input-password>`);
      const counter = page.root.shadowRoot.querySelector('.ath-visibility-hidden');
      expect(counter.textContent).toBe('customized text');
    });
    it('should not display counter when counter it is not defined', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const counter = page.root.shadowRoot.querySelector('.ath-input__counter');
      expect(counter).toBeFalsy();
    });
    it('should display the maxlength in the counter if counter is true, maxlength is set and type is text', async () => {
      const page = await testPage(`<ath-input-password counter maxlength="5"></ath-input-password>`);
      await page.waitForChanges();
      const counter = page.root.shadowRoot.querySelector('.ath-input__counter');
      expect(counter).toBeTruthy;
      expect(counter.textContent).toContain('/');
    });
    // Feedback
    it('should display the feedback text with an icon if feedback-text is set and feedback is "error"', async () => {
      const page = await testPage(`<ath-input-password feedback-text="feedback text" feedback="error"></ath-input-password>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy;
      expect(feedback.querySelector('ath-icon')).toBeTruthy();
      expect(feedback.children[1].textContent).toBe('feedback text');
    });
    it('should not display the feedback when feedback it is not defined', async () => {
      const page = await testPage(`<ath-input-password feedback-text="feedback text"></ath-input-password>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });
    it('should not display the feedback when feedback it is not "error"', async () => {
      const page = await testPage(`<ath-input-password feedback-text="feedback-text" feedback="none"></ath-input-password>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });
    it('should display the success feedback', async () => {
      const page = await testPage(`<ath-input-password feedback-text="feedback text" feedback="success"></ath-input-password>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy;
      expect(feedback).toHaveClass('ath-input__feedback--success');
    });
    it('should display the warning feedback', async () => {
      const page = await testPage(`<ath-input-password feedback-text="feedback text" feedback="warning"></ath-input-password>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy;
      expect(feedback).toHaveClass('ath-input__feedback--warning');
    });
    it('should display the error feedback', async () => {
      const page = await testPage(`<ath-input-password feedback-text="feedback text" feedback="error"></ath-input-password>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy;
      expect(feedback).toHaveClass('ath-input__feedback--error');
    });
    // Helper-text
    it('should display the helper-text if helper-text is not empty', async () => {
      const page = await testPage(`<ath-input-password helper-text="text"></ath-input-password>`);
      await page.waitForChanges();
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeTruthy;
      expect(helperText.firstElementChild.textContent).toBe('text');
    });
    it('should not display helper-text when helper-text it is not defined', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeFalsy();
    });
    // Label
    it('should display the label if label has a value', async () => {
      const page = await testPage(`<ath-input-password label="text"></ath-input-password>`);
      const label = page.root.shadowRoot.querySelector('label span');
      expect(label).toBeTruthy;
      expect(label.textContent).toBe('text');
    });
    it('should not display label tag when label it is not defined', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const label = page.root.shadowRoot.querySelector('label');
      expect(label).toBeFalsy();
    });
  });

  describe('accesibility', () => {
    // ARIA
    it('should set the aria-label property when input-aria-label is defined', async () => {
      const page = await testPage(`<ath-input-password input-aria-label="text"></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-label')).toBe('text');
    });
    it('should set the aria-required property when required is defined', async () => {
      const page = await testPage(`<ath-input-password required></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-required')).toBe('true');
    });
    it('should set the aria-disabled property when disabled is defined', async () => {
      const page = await testPage(`<ath-input-password disabled></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-disabled')).toBe('true');
    });
    it('should set the aria-readonly property when readonly is defined', async () => {
      const page = await testPage(`<ath-input-password readonly></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-readonly')).toBe('true');
    });
    it('shouldn`t set the aria-readonly property to null when readonly is defined but disabled is true', async () => {
      const page = await testPage(`<ath-input-password readonly disabled></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-readonly')).toBeNull();
    });
    it('should generate the accesible counter label', async () => {
      const page = await testPage(`<ath-input-password counter maxlength="10" counter-label="longitud: [length], total: [max], resto: [rest]"></ath-input-password>`);
      await page.waitForChanges();
      const counter = page.root.shadowRoot.querySelector('.ath-visibility-hidden');
      expect(counter).toBeTruthy;
      expect(counter.textContent).toBe('longitud: 0, total: 10, resto: 10');
    });
  });

  describe('actions', () => {
    it('should allow the user introduce text', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      const newValue = 'Nuevo texto';

      const athInputMock = jest.fn();
      page.rootInstance.athInput = { emit: athInputMock };
      input.value = newValue;
      input.dispatchEvent(new Event('input'));
      expect(athInputMock).toHaveBeenCalledWith(newValue);
    });
    it('should emit the athFocus event when focused', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      input.focus();
      expect(athFocus).toHaveBeenCalled();
    });
    it('should emit the athBlur event when blurred', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      input.focus();
      input.blur();
      expect(athBlur).toHaveBeenCalled();
    });
    it('should emit the athInput when the value changes', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athInput = jest.fn();
      page.root.addEventListener('athInput', athInput);
      const event = new Event('input');
      input.dispatchEvent(event);
      await page.waitForChanges();
      expect(athInput).toHaveBeenCalled();
    });
    it('should emit the athChange when the value changes and loses focus', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      const event = new Event('change');
      input.dispatchEvent(event);
      await page.waitForChanges();
      expect(athChange).toHaveBeenCalled();
    });
  });

  describe('show/hide password', () => {
    it('should allow the user to toggle password visibility', async () => {
      const page = await testPage(`<ath-input-password></ath-input-password>`, [AthButton]);
      const input = page.root.shadowRoot.querySelector('input');
      const button = page.root.shadowRoot.querySelector('button');
      expect(input.type).toBe('password');

      button.click();
      await page.waitForChanges();
      expect(input.type).toBe('text');

      button.click();
      await page.waitForChanges();
      expect(input.type).toBe('password');
    });
  });
});
