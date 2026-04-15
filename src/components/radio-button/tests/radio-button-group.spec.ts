import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthRadioButton } from '../radio-button';
import { AthRadioButtonGroup } from '../radio-button-group/radio-button-group';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthRadioButtonGroup, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

// RADIO-BUTTON-GROUP
describe('ath-radio-button-group', () => {
  describe('render', () => {
    // ATTRIBUTES
    it('should display text on label', async () => {
      const text = 'label example';
      const page = await testPage(`<ath-radio-button-group label='${text}'><ath-radio-button></ath-radio-button></ath-radio-button-group>`, [AthRadioButton]);
      const label = page.root.shadowRoot.querySelector('label');
      expect(label).toEqualText(text);
    });

    it('should display text on helperText', async () => {
      const text = 'helpText example';
      const page = await testPage(`<ath-radio-button-group helper-text='${text}'><ath-radio-button></ath-radio-button></ath-radio-button-group>`, [AthRadioButton]);
      const div = page.root.shadowRoot.querySelector('div.ath-input__helper-text');
      expect(div).toEqualText(text);
    });

    it('should display text on FeedbackText', async () => {
      const text = 'FeedbackText example';
      const page = await testPage(`<ath-radio-button-group feedback='error' feedback-text='${text}'><ath-radio-button></ath-radio-button></ath-radio-button-group>`, [
        AthRadioButton,
      ]);
      const div = page.root.shadowRoot.querySelector('div.ath-input__feedback');
      expect(div).toEqualText(text);
    });

    it('should emit the athChangeValue event when clicked', async () => {
      const page = await testPage(
        ` <ath-radio-button-group id="radioGroup">
              <ath-radio-button label="debug" value="option1"></ath-radio-button>
              <ath-radio-button label="debug" value="option2" checked></ath-radio-button>
            </ath-radio-button-group>
          `,
        [AthRadioButton],
      );

      const radioButtonGroup = page.root;
      expect(radioButtonGroup).toBeTruthy();

      const radioGroupEvent = jest.fn();
      radioButtonGroup.addEventListener('athChangeValue', radioGroupEvent);

      const radioButton = page.root.querySelector('ath-radio-button') as HTMLAthRadioButtonElement;
      const radioButtonItem = radioButton.shadowRoot.querySelector('.ath-radiobutton-item') as HTMLSpanElement;

      expect(radioButtonItem).toBeTruthy();

      radioButton.setFocus();
      await page.waitForChanges();

      radioButton.click();
      await page.waitForChanges();

      expect(radioGroupEvent).toHaveBeenCalled();
    });
  });

  // KEYBOARD INTERACTION
  describe('keyboard Navigation', () => {
    it('should navigate the selected radio button using arrow Down', async () => {
      const page = await newSpecPage({
        components: [AthRadioButtonGroup, AthRadioButton],
        html: `
        <ath-radio-button-group name="radio-group">
          <ath-radio-button value="option1" checked></ath-radio-button>
          <ath-radio-button value="option2"></ath-radio-button>
          <ath-radio-button value="option3"></ath-radio-button>
        </ath-radio-button-group>
      `,
      });

      const radioButtons = page.root.querySelectorAll('ath-radio-button');
      expect(radioButtons.length).toBe(3);

      const changeEvent = jest.fn();
      page.root.addEventListener('athChangeValue', changeEvent);
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        composed: true,
      });

      await radioButtons[0].setFocus();
      await page.waitForChanges();

      expect(radioButtons[0].checked).toBe(true);
      expect(radioButtons[1].checked).toBe(false);
      radioButtons[0].dispatchEvent(event);

      await page.waitForChanges();
      expect(changeEvent).toHaveBeenCalled();
      expect(radioButtons[0].checked).toBe(false);
      expect(radioButtons[1].checked).toBe(true);
    });

    it('should navigate to the third radio button using arrow Down', async () => {
      const page = await newSpecPage({
        components: [AthRadioButtonGroup, AthRadioButton],
        html: `
        <ath-radio-button-group name="radio-group">
          <ath-radio-button value="option1" checked></ath-radio-button>
          <ath-radio-button value="option2" disabled></ath-radio-button>
          <ath-radio-button value="option3"></ath-radio-button>
        </ath-radio-button-group>
      `,
      });

      const radioButtons = page.root.querySelectorAll('ath-radio-button');
      expect(radioButtons.length).toBe(3);

      const changeEvent = jest.fn();
      page.root.addEventListener('athChangeValue', changeEvent);
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        composed: true,
      });

      await radioButtons[0].setFocus();
      await page.waitForChanges();

      expect(radioButtons[0].checked).toBe(true);
      expect(radioButtons[2].checked).toBe(false);
      radioButtons[0].dispatchEvent(event);

      await page.waitForChanges();
      expect(changeEvent).toHaveBeenCalled();
      expect(radioButtons[0].checked).toBe(false);
      expect(radioButtons[1].checked).toBe(false);
      expect(radioButtons[2].checked).toBe(true);
    });

    it('should navigate the selected radio button using arrow Right', async () => {
      const page = await newSpecPage({
        components: [AthRadioButtonGroup, AthRadioButton],
        html: `
        <ath-radio-button-group>
          <ath-radio-button value="option1"></ath-radio-button>
          <ath-radio-button value="option2"></ath-radio-button>
          <ath-radio-button value="option3"></ath-radio-button>
        </ath-radio-button-group>
      `,
      });

      const radioButtons = page.root.querySelectorAll('ath-radio-button');
      expect(radioButtons.length).toBe(3);

      const changeEvent = jest.fn();
      page.root.addEventListener('athChangeValue', changeEvent);
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        composed: true,
      });

      await radioButtons[0].setFocus();
      await page.waitForChanges();

      expect(radioButtons[0].checked).toBe(true);
      expect(radioButtons[1].checked).toBe(false);
      radioButtons[0].dispatchEvent(event);

      await page.waitForChanges();
      expect(changeEvent).toHaveBeenCalled();
      expect(radioButtons[0].checked).toBe(false);
      expect(radioButtons[1].checked).toBe(true);
    });

    it('should navigate the selected radio button using arrow Up', async () => {
      const page = await newSpecPage({
        components: [AthRadioButtonGroup, AthRadioButton],
        html: `
        <ath-radio-button-group>
          <ath-radio-button value="option1"></ath-radio-button>
          <ath-radio-button value="option2"></ath-radio-button>
          <ath-radio-button value="option3"></ath-radio-button>
        </ath-radio-button-group>
      `,
      });

      const radioButtons = page.root.querySelectorAll('ath-radio-button');
      expect(radioButtons.length).toBe(3);

      const changeEvent = jest.fn();
      page.root.addEventListener('athChangeValue', changeEvent);
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        composed: true,
      });

      await radioButtons[0].setFocus();
      await page.waitForChanges();

      expect(radioButtons[0].checked).toBe(true);
      expect(radioButtons[2].checked).toBe(false);
      radioButtons[0].dispatchEvent(event);

      await page.waitForChanges();
      expect(changeEvent).toHaveBeenCalled();
      expect(radioButtons[0].checked).toBe(false);
      expect(radioButtons[2].checked).toBe(true);
    });
    it('should navigate the selected radio button using arrow Left', async () => {
      const page = await newSpecPage({
        components: [AthRadioButtonGroup, AthRadioButton],
        html: `
        <ath-radio-button-group required show-required>
          <ath-radio-button value="option1"></ath-radio-button>
          <ath-radio-button value="option2"></ath-radio-button>
          <ath-radio-button value="option3"></ath-radio-button>
        </ath-radio-button-group>
      `,
      });

      const radioButtons = page.root.querySelectorAll('ath-radio-button');
      expect(radioButtons.length).toBe(3);

      const changeEvent = jest.fn();
      page.root.addEventListener('athChangeValue', changeEvent);
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        bubbles: true,
        composed: true,
      });

      await radioButtons[0].setFocus();
      await page.waitForChanges();

      expect(radioButtons[0].checked).toBe(true);
      expect(radioButtons[2].checked).toBe(false);
      radioButtons[0].dispatchEvent(event);

      await page.waitForChanges();
      expect(changeEvent).toHaveBeenCalled();
      expect(radioButtons[0].checked).toBe(false);
      expect(radioButtons[2].checked).toBe(true);
    });
  });
  // SPREADING PROPERTIES
  describe('spreading properties', () => {
    it('should spread disabled property to radio button children', async () => {
      const page = await newSpecPage({
        components: [AthRadioButtonGroup, AthRadioButton],
        html: `
        <ath-radio-button-group disabled>
          <ath-radio-button value="option1"></ath-radio-button>
          <ath-radio-button value="option2"></ath-radio-button>
          <ath-radio-button value="option3"></ath-radio-button>
        </ath-radio-button-group>
      `,
      });
      await page.waitForChanges();
      const radioButtons = page.root.querySelectorAll('ath-radio-button');
      expect(radioButtons[0].disabled).toBe(true);
      expect(radioButtons[1].disabled).toBe(true);
      expect(radioButtons[2].disabled).toBe(true);
    });

    it('should spread readonly property to radio button children', async () => {
      const page = await newSpecPage({
        components: [AthRadioButtonGroup, AthRadioButton],
        html: `
        <ath-radio-button-group readonly>
          <ath-radio-button value="option1"></ath-radio-button>
          <ath-radio-button value="option2"></ath-radio-button>
          <ath-radio-button value="option3"></ath-radio-button>
        </ath-radio-button-group>
      `,
      });
      await page.waitForChanges();
      const radioButtons = page.root.querySelectorAll('ath-radio-button');
      expect(radioButtons[0].readonly).toBe(true);
      expect(radioButtons[1].readonly).toBe(true);
      expect(radioButtons[2].readonly).toBe(true);
    });
  });
});
