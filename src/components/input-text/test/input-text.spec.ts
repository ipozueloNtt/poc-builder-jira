import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { Icons } from '@utils/helper';
import { AthIcon } from '../../icon/icon';
import { AthButton } from '../../button/button';
import { AthInputText } from '../input-text';
import { InputSizes } from '../input-text.model';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthInputText, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

describe('ath-input-text', () => {
  it('should build', async () => {
    const page = await testPage(`<ath-input-text></ath-input-text>`);
    expect(page.root).toBeTruthy();
  });

  describe('render', () => {
    it('should set default attributes and properties to input', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(page.root).toHaveProperty('size', `${InputSizes.Medium}`);
      expect(input.getAttribute('type')).toBe('text');
      expect(input.getAttribute('id')).toBeTruthy();
      expect(input).toHaveClass('ath-input__text--value');
    });
    it('should set children`s clases', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const firstChild = page.root.shadowRoot.firstChild;
      expect(firstChild).toHaveClass('ath-input');
      const secondChild = firstChild.firstChild;
      expect(secondChild).toHaveClass('wrapper');
      const thirthChild = secondChild.firstChild;
      expect(thirthChild).toHaveClass('ath-input__field');
    });
    it('should set input element`s properties', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input).toHaveClass('ath-input__text--value');
      expect(input.getAttribute('id')).toContain('ath-input-');
      expect(input.getAttribute('iconPosition')).toBe('left');
      expect(input.getAttribute('type')).toBe('text');
      expect(input.getAttribute('labelclearbutton')).toBe('Borrar');
    });
  });

  describe('optional attributes', () => {
    // Autocomplete
    it('should set the autocomplete property when its defined', async () => {
      const page = await testPage(`<ath-input-text autocomplete="off"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('autocomplete')).toBe('off');
    });
    it('should not set the autocomplete property when autocomplete it is not defined', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('autocomplete')).toBeFalsy();
    });
    it('should set the autofocus property when its defined', async () => {
      // Autofocus
      const page = await testPage(`<ath-input-text autofocus></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.style.outline).toBeTruthy;
    });
    // Icon
    it('should display an icon to the left of the input when icon and icon-position are set', async () => {
      const page = await testPage(`<ath-input-text icon="scope" icon-position="right"></ath-input-text>`, [AthIcon]);
      const athIcon = page.root.shadowRoot.querySelector('ath-icon');
      expect(athIcon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('scope');
    });
    it('should not display an icon to the left of the input when icon and icon-position are not set', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const athIcon = page.root.shadowRoot.querySelector('ath-icon');
      expect(athIcon).toBeFalsy();
    });
    // Maxlength
    it('should be able to set the maxlentgth of the input when type is text', async () => {
      const page = await testPage(`<ath-input-text type="text"  maxlength="5"></ath-input-text>`, [AthIcon]);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('maxlength')).toBe('5');
    });
    it('should not set a maxlength if maxlength is not set', async () => {
      const page = await testPage(`<ath-input-text type="text"></ath-input-text>`, [AthIcon]);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('maxlength')).toBeFalsy();
    });
    it('should not be able to set the the maxlentgth of the input when type is different to text', async () => {
      const page = await testPage(`<ath-input-text type="search" maxlength="5"></ath-input-text>`, [AthIcon]);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('maxlength')).toBe('5');
    });
    // Name
    it('should set the name property when its defined', async () => {
      const page = await testPage(`<ath-input-text name="text"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('name')).toBe('text');
    });
    it('should not set the name property when its not defined', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('name')).toBeFalsy();
    });
    // Pattern
    it('should set the pattern property when is defined', async () => {
      const page = await testPage(`<ath-input-text pattern="^[\w\d\s]*$"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('pattern')).toBe('^[wds]*$');
    });
    it('should not set the pattern property when is not defined', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('pattern')).toBeFalsy();
    });
    // Placeholder
    it('should set the placeholder property when is defined', async () => {
      const page = await testPage(`<ath-input-text placeholder="text"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).toBe('text');
    });
    it('should not set the placeholder property when is not defined', async () => {
      const page = await testPage(`<ath-input-text ></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('placeholder')).toBeFalsy;
    });

    // Required & hide-required:
    it('should set required and aria-required attributes when required is true', async () => {
      const page = await testPage(`<ath-input-text label="Label" required></ath-input-text>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeTruthy();
    });
    it('should not set required and aria-required attributes when required is not set', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeFalsy();
    });
    it('should not set required and aria-required attributes when required is not true but hide-required is true', async () => {
      const page = await testPage(`<ath-input-text required hide-required></ath-input-text>`);
      const asterisk = page.root.shadowRoot.querySelector('.required');
      expect(asterisk).toBeFalsy();
    });
    // Size
    it('should be able to set the sm size', async () => {
      const page = await testPage(`<ath-input-text size="sm"></ath-input-text>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-sm');
    });
    it('should be able to set the md size', async () => {
      const page = await testPage(`<ath-input-text size="md"></ath-input-text>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-md');
    });
    it('should be able to set the lg size', async () => {
      const page = await testPage(`<ath-input-text size="lg"></ath-input-text>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-lg');
    });
    it('should set the md size by default', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-md');
    });
    // Tabindex
    it('should set the tabindex property to -1 to the input and to the clean button when input-tabindex="-1"', async () => {
      const page = await testPage(`<ath-input-text input-tabindex="-1"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('tabindex')).toBe('-1');
    });
    it('should set the tabindex property to 0 to the input and to the clean button when input-tabindex is not defined', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('tabindex')).toBe('0');
    });
    // Tooltip-text
    it('should display a tooltip if label is set and tooltip-text is set', async () => {
      const page = await testPage(`<ath-input-text label="Label" tooltip-text="Tooltip text"></ath-input-text>`);
      const ebTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(ebTooltip).toBeTruthy();
    });
    it('should not display a tooltip if label is set but tooltip-text is not set', async () => {
      const page = await testPage(`<ath-input-text label="Label"></ath-input-text>`);
      const ebTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(ebTooltip).toBeFalsy();
    });
    it('should not display a tooltip if tooltip-text is set but label is not set', async () => {
      const page = await testPage(`<ath-input-text tooltip-text="Tooltip text"></ath-input-text>`);
      const ebTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(ebTooltip).toBeFalsy();
    });
    // Value
    it('should set the value property when its defined', async () => {
      const page = await testPage(`<ath-input-text value="text"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('value')).toBe('text');
    });
    it('should not set the value property when is not defined', async () => {
      const page = await testPage(`<ath-input-text ></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('value')).toBeFalsy();
    });
  });

  describe('add ons', () => {
    // Counter
    it('should display the counter if counter is true and type is text', async () => {
      const page = await testPage(`<ath-input-text type="text" counter value="text"></ath-input-text>`);
      const counter = page.root.shadowRoot.querySelector('.ath-input__counter');
      expect(counter.textContent).toBe('4');
    });
    it('should counterLabel be present (hidden thought) if counter is true and type is text', async () => {
      const page = await testPage(`<ath-input-text type="text" counter></ath-input-text>`);
      const counter = page.root.shadowRoot.querySelector('.ath-visibility-hidden');
      expect(counter).toBeTruthy;
    });
    it('should counterLabel be able to be customuized', async () => {
      const page = await testPage(`<ath-input-text type="text" counter counter-label="customized text"></ath-input-text>`);
      const counter = page.root.shadowRoot.querySelector('.ath-visibility-hidden');
      expect(counter.textContent).toBe('customized text');
    });
    it('should not display counter when counter it is not defined', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const counter = page.root.shadowRoot.querySelector('.ath-input__counter');
      expect(counter).toBeFalsy();
    });
    it('should display the maxlength in the counter if counter is true, maxlength is set and type is text', async () => {
      const page = await testPage(`<ath-input-text type="text" counter maxlength="5"></ath-input-text>`);
      await page.waitForChanges();
      const counter = page.root.shadowRoot.querySelector('.ath-input__counter');
      expect(counter).toBeTruthy;
      expect(counter.textContent).toContain('/');
    });
    // Feedback
    it('should display the feedback text with an icon if feedback-text is set and feedback is "error"', async () => {
      const page = await testPage(`<ath-input-text feedback-text="feedback text" feedback="error"></ath-input-text>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy;
      expect(feedback.querySelector('ath-icon')).toBeTruthy();
      expect(feedback.children[1].textContent).toBe('feedback text');
    });
    it('should not display the feedback when feedback it is not defined', async () => {
      const page = await testPage(`<ath-input-text feedback-text="feedback text"></ath-input-text>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });
    it('should not display the feedback when feedback it is not "error"', async () => {
      const page = await testPage(`<ath-input-text feedback-text="feedback-text" feedback="none"></ath-input-text>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });
    // Helper-text
    it('should display the helper-text if helper-text is not empty', async () => {
      const page = await testPage(`<ath-input-text helper-text="text"></ath-input-text>`);
      await page.waitForChanges();
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeTruthy;
      expect(helperText.firstElementChild.textContent).toBe('text');
    });
    it('should not display helper-text when helper-text it is not defined', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeFalsy();
    });
    // Label
    it('should display the label if label has a value', async () => {
      const page = await testPage(`<ath-input-text label="text"></ath-input-text>`);
      const label = page.root.shadowRoot.querySelector('label span');
      expect(label).toBeTruthy;
      expect(label.textContent).toBe('text');
    });
    it('should not display label tag when label it is not defined', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const label = page.root.shadowRoot.querySelector('label');
      expect(label).toBeFalsy();
    });
  });

  describe('types', () => {
    it('should set the type text on the input element when type is text', async () => {
      const page = await testPage(`<ath-input-text type="text"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('type')).toBe('text');
    });
    it('should set the type email on the input element when type is email', async () => {
      const page = await testPage(`<ath-input-text type="email"></ath-input-text>`);
      const athInput = page.root.shadowRoot.querySelector('input');
      expect(athInput.getAttribute('type')).toBe('email');
    });
    it('should set the type url on the input element when type is url', async () => {
      const page = await testPage(`<ath-input-text type="url"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('type')).toBe('url');
    });
    it('should set the type number on the input element when type is number', async () => {
      const page = await testPage(`<ath-input-text type="number"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('type')).toBe('number');
    });
    it('should set the type tel on the input element when type is tel', async () => {
      const page = await testPage(`<ath-input-text type="tel"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('type')).toBe('tel');
    });
    it('should set the type text and the role searchbox on the input element when type is search', async () => {
      const page = await testPage(`<ath-input-text type="search"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('type')).toBe('text');
      expect(input.getAttribute('role')).toBe('searchbox');
    });
    // TEXT
    it('should display the clear button in the input element when type is text, has-clear is true and value is set', async () => {
      const page = await testPage(`<ath-input-text type="text" has-clear value="Value"></ath-input-text>`);
      const button = page.root.shadowRoot.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('Borrar');
    });
    it('should not display the clear button in the input element when type is text, has-clear is true but value is not set', async () => {
      const page = await testPage(`<ath-input-text type="text" has-clear></ath-input-text>`);
      const button = page.root.shadowRoot.querySelector('button');
      expect(button).toBeFalsy();
    });

    // SEARCH
    it('should display the search icon in the input element when type is search', async () => {
      const page = await testPage(`<ath-input-text type="search"></ath-input-text>`, [AthIcon]);
      const athIcon = page.root.shadowRoot.querySelector('ath-icon');
      expect(athIcon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain(Icons.Search);
    });
  });

  describe('accesibility', () => {
    // ARIA
    it('should set the aria-label property when input-aria-label is defined', async () => {
      const page = await testPage(`<ath-input-text input-aria-label="text"></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-label')).toBe('text');
    });
    it('should set the aria-required property when required is defined', async () => {
      const page = await testPage(`<ath-input-text required></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-required')).toBe('true');
    });
    it('should set the aria-disabled property when disabled is defined', async () => {
      const page = await testPage(`<ath-input-text disabled></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-disabled')).toBe('true');
    });
    it('should set the aria-readonly property when readonly is defined', async () => {
      const page = await testPage(`<ath-input-text readonly></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-readonly')).toBe('true');
    });
    it('shouldn`t set the aria-readonly property to null when readonly is defined but disabled is true', async () => {
      const page = await testPage(`<ath-input-text readonly disabled></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-readonly')).toBeNull();
    });
    it('should set the aria-label of the clear button when is clear-button-aria-label is set', async () => {
      const page = await testPage(`<ath-input-text type="text" has-clear value="Value" clear-button-aria-label="text"></ath-input-text>`);
      const button = page.root.shadowRoot.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('text');
    });
    it('should generate the accesible counter label', async () => {
      const page = await testPage(`<ath-input-text counter maxlength="10" counter-label="longitud: [length], total: [max], resto: [rest]"></ath-input-text>`);
      await page.waitForChanges();
      const counter = page.root.shadowRoot.querySelector('.ath-visibility-hidden');
      expect(counter).toBeTruthy;
      expect(counter.textContent).toBe('longitud: 0, total: 10, resto: 10');
    });
  });

  describe('actions', () => {
    it('should allow the user introduce text', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      const newValue = 'Nuevo texto';
      const athInputMock = jest.fn();
      page.rootInstance.athInput = { emit: athInputMock };
      input.value = newValue;
      input.dispatchEvent(new Event('input'));
      expect(athInputMock).toHaveBeenCalledWith(newValue);
    });
    it('should emit the athFocus event when focused', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      input.focus();
      expect(athFocus).toHaveBeenCalled();
    });
    it('should emit the athBlur event when blurred', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      input.focus();
      input.blur();
      expect(athBlur).toHaveBeenCalled();
    });
    it('should emit the ebClear event when clear icon is pressed', async () => {
      const page = await testPage(`<ath-input-text type="search" value="text" has-clear></ath-input-text>`, [AthButton]);
      const ebClear = jest.fn();
      page.root.addEventListener('ebClear', ebClear);
      const button = page.root.shadowRoot.querySelector('button');
      expect(button).toBeTruthy();
      button.click();
      await page.waitForChanges();
      expect(ebClear).toHaveBeenCalled();
    });
    it('should emit the athInput when the value changes', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athInput = jest.fn();
      page.root.addEventListener('athInput', athInput);
      const event = new Event('input');
      input.dispatchEvent(event);
      await page.waitForChanges();
      expect(athInput).toHaveBeenCalled();
    });
    it('should emit the athChange when the value changes and loses focus', async () => {
      const page = await testPage(`<ath-input-text></ath-input-text>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      const event = new Event('change');
      input.dispatchEvent(event);
      await page.waitForChanges();
      expect(athChange).toHaveBeenCalled();
    });
  });
});
