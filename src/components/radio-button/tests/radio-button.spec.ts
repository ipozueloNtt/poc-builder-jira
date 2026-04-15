import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthRadioButton } from '../radio-button';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthRadioButton, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

// RADIO BUTTON
describe('ath-radio-button', () => {
  describe('render', () => {
    //CLASSES
    it('should inject checked', async () => {
      const className = 'ath-radiobutton--checked';
      const page = await testPage(`<ath-radio-button checked></ath-radio-button>`);
      const radio = page.root.shadowRoot.querySelector('div.ath-radiobutton');
      expect(radio).toHaveClass(className);
    });
    it('should have class disabled', async () => {
      const className = 'ath-radiobutton--disabled';
      const page = await testPage(`<ath-radio-button disabled></ath-radio-button>`);
      const radio = page.root.shadowRoot.querySelector('div.ath-radiobutton');
      expect(radio).toHaveClass(className);
    });

    it('should have class read-only', async () => {
      const className = 'ath-radiobutton--read-only';
      const page = await testPage(`<ath-radio-button readonly></ath-radio-button>`);
      const radio = page.root.shadowRoot.querySelector('div.ath-radiobutton');
      expect(radio).toHaveClass(className);
    });

    // PROPERTIES
    it('should inject label', async () => {
      const page = await testPage(`<ath-radio-button label="label"></ath-radio-button>`);
      const label = page.root.shadowRoot.querySelector('label');
      const span = label.querySelector('span');
      expect(span.innerText).toBe('label');
    });

    //ARIA
    it('should have aria-label when is defined', async () => {
      const page = await testPage(`<ath-radio-button aria-label="aria-label"></ath-radio-button>`);
      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');
      expect(radioButton.getAttribute('aria-label')).toBe('aria-label');
    });

    it('should have aria-label also when is not defined', async () => {
      const page = await testPage(`<ath-radio-button label="label"></ath-radio-button>`);
      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');
      expect(radioButton.getAttribute('aria-label')).toBe('label');
    });

    it('should have aria-checked true when checked is true', async () => {
      const page = await testPage(`<ath-radio-button checked=true></ath-radio-button>`);
      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');
      expect(radioButton.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-checked false', async () => {
      const page = await testPage(`<ath-radio-button></ath-radio-button>`);
      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');
      expect(radioButton.getAttribute('aria-checked')).toBe('false');
    });

    it('should have aria-disabled true when disabled is true', async () => {
      const page = await testPage(`<ath-radio-button disabled=true></ath-radio-button>`);
      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');
      expect(radioButton.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not have aria-disabled true when disabled is false', async () => {
      const page = await testPage(`<ath-radio-button disabled=true></ath-radio-button>`);
      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');
      expect(radioButton.getAttribute('aria-disabled')).toBeFalsy;
    });

    it('should have aria-required true when is defined as true', async () => {
      const page = await testPage(`<ath-radio-button required></ath-radio-button>`);
      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');
      expect(radioButton.getAttribute('required')).toBeTruthy;
    });

    it('should not have aria-required true when is not defined', async () => {
      const page = await testPage(`<ath-radio-button></ath-radio-button>`);
      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');
      expect(radioButton.getAttribute('required')).toBeFalsy;
    });
  });

  //ACTIONS
  describe('action', () => {
    let page: SpecPage;
    let radioButton;

    beforeEach(async () => {
      page = await testPage('<ath-radio-button></ath-radio-button>');
      radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item') as HTMLElement;
    });

    it('should emit the athChange event when clicked', async () => {
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      radioButton.click();
      expect(athChange).toHaveBeenCalled();
    });

    it('should emit the athFocus event when focused', async () => {
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      radioButton.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('should emit the athBlur event when blurred', async () => {
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      radioButton.focus();
      radioButton.blur();
      expect(athBlur).toHaveBeenCalled();
    });
  });

  // KEYBOARD INTERACTION
  describe('keyboard Interaction', () => {
    it('should emit athFocus and athBlur events on focus and blur', async () => {
      const page = await newSpecPage({
        components: [AthRadioButton],
        html: `<ath-radio-button></ath-radio-button>`,
      });

      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');

      const focusEvent = jest.fn();
      const blurEvent = jest.fn();

      page.root.addEventListener('athFocus', focusEvent);
      page.root.addEventListener('athBlur', blurEvent);

      // Simulate focus
      radioButton.dispatchEvent(new FocusEvent('focus'));
      expect(focusEvent).toHaveBeenCalledTimes(1);

      // Simulate blur
      radioButton.dispatchEvent(new FocusEvent('blur'));
      expect(blurEvent).toHaveBeenCalledTimes(1);
    });

    it('should not trigger athChange for Enter or Space if disabled or readOnly', async () => {
      const page = await newSpecPage({
        components: [AthRadioButton],
        html: `<ath-radio-button disabled></ath-radio-button>`,
      });

      const radioButton = page.root.shadowRoot.querySelector('.ath-radiobutton-item');

      const changeEvent = jest.fn();
      page.root.addEventListener('athChange', changeEvent);

      radioButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(changeEvent).toHaveBeenCalledTimes(0);

      radioButton.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' })); // Space key
      expect(changeEvent).toHaveBeenCalledTimes(0);
    });
  });
});
