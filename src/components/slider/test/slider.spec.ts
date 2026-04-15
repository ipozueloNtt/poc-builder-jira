import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthInputCounter } from '../../input-counter/input-counter';
import { AthSlider } from '../slider';

const testPage = (html: string, otherComponents: any[] = []): Promise<SpecPage> => {
  const components = [AthSlider, ...otherComponents];
  return newSpecPage({
    components,
    html,
    supportsShadowDom: true,
  });
};

describe('ath-slider', () => {
  it('should build', async () => {
    const page = await testPage(`<ath-slider></ath-slider>`);
    expect(page.rootInstance).toBeTruthy();
  });

  it('should mousedown & mouseup event called on bar', async () => {
    const page = await testPage(`<ath-slider></ath-slider>`);

    const sliderFiller = page.root.shadowRoot.querySelector('div.ath-slider__filler') as HTMLDivElement;
    const bar = page.root.shadowRoot.querySelector('div.ath-slider__filler__steps') as HTMLDivElement;

    const mousedown = jest.fn();
    sliderFiller.addEventListener('mousedown', mousedown);
    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      composed: true,
    });

    bar.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();

    expect(mousedown).toHaveBeenCalled();

    const mouseup = jest.fn();
    sliderFiller.addEventListener('mouseup', mouseup);
    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
      composed: true,
    });

    bar.dispatchEvent(mouseUpEvent);
    await page.waitForChanges();

    expect(mouseup).toHaveBeenCalled();
  });

  it('should mousedown & mouseup event called on handle1', async () => {
    const page = await testPage(`<ath-slider></ath-slider>`);

    const sliderFiller = page.root.shadowRoot.querySelector('div.ath-slider__filler') as HTMLDivElement;
    const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range') as HTMLSpanElement;

    const mousedown = jest.fn();
    sliderFiller.addEventListener('mousedown', mousedown);
    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      composed: true,
    });

    handle.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();

    expect(mousedown).toHaveBeenCalled();

    const mouseup = jest.fn();
    sliderFiller.addEventListener('mouseup', mouseup);
    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
      composed: true,
    });

    handle.dispatchEvent(mouseUpEvent);
    await page.waitForChanges();

    expect(mouseup).toHaveBeenCalled();
  });

  it('should mousedown & mouseup event called on handle1 & type range', async () => {
    const page = await testPage(`<ath-slider type="range"></ath-slider>`);

    const sliderFiller = page.root.shadowRoot.querySelector('div.ath-slider__filler') as HTMLDivElement;
    const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range') as HTMLSpanElement;

    const mousedown = jest.fn();
    sliderFiller.addEventListener('mousedown', mousedown);
    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      composed: true,
    });

    handle.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();

    expect(mousedown).toHaveBeenCalled();

    const mouseup = jest.fn();
    sliderFiller.addEventListener('mouseup', mouseup);
    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
      composed: true,
    });

    handle.dispatchEvent(mouseUpEvent);
    await page.waitForChanges();

    expect(mouseup).toHaveBeenCalled();
  });

  it('should mousedown & mouseup event called on handle2 & type range', async () => {
    const page = await testPage(`<ath-slider type="range"></ath-slider>`);

    const sliderFiller = page.root.shadowRoot.querySelector('div.ath-slider__filler') as HTMLDivElement;
    const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range2') as HTMLSpanElement;

    const mousedown = jest.fn();
    sliderFiller.addEventListener('mousedown', mousedown);
    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      composed: true,
    });

    handle.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();

    expect(mousedown).toHaveBeenCalled();

    const mouseup = jest.fn();
    sliderFiller.addEventListener('mouseup', mouseup);
    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
      composed: true,
    });

    handle.dispatchEvent(mouseUpEvent);
    await page.waitForChanges();

    expect(mouseup).toHaveBeenCalled();
  });

  describe('render', () => {
    it('should set default attributes and properties to input', async () => {
      const page = await testPage(`<ath-slider></ath-slider>`);
      expect(page.root).toHaveProperty('type', `default`);
      expect(page.root).toHaveProperty('min', 0);
      expect(page.root).toHaveProperty('max', 100);
      expect(page.root).toHaveProperty('step', 1);
    });

    it('should set first and last detail when their property are filled', async () => {
      const detail1 = 'detail1';
      const detail2 = 'detail2';
      const page = await testPage(`<ath-slider detail-first=${detail1} detail-last=${detail2}></ath-slider>`);
      const divDetails = page.root.shadowRoot.querySelector('div.ath-slider__slider-wrapper__details') as HTMLDivElement;
      expect(divDetails).toBeDefined();
      const firstDetail = divDetails.querySelectorAll('span');
      expect(firstDetail[0].textContent).toBe(detail1);
      expect(firstDetail[1].textContent).toBe(detail2);
    });

    it('should have 2 input-counter and 2 handles when type is range', async () => {
      const page = await testPage(`<ath-slider type="range"></ath-slider>`, [AthInputCounter]);
      const inputs = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const handles = page.root.shadowRoot.querySelectorAll('.ath-slider-handle-range, .ath-slider-handle-range2');
      expect(inputs.length).toBe(2);
      expect(handles.length).toBe(2);
    });

    it('Should have steps defined when stepped is true', async () => {
      const page = await testPage(`<ath-slider stepped="true" value="3"></ath-slider>`, [AthInputCounter]);
      const steps = page.root.shadowRoot.querySelectorAll('.ath-slider__step');
      expect(steps.length > 0).toBeTruthy();
    });

    it('Should have steps defined when stepped is true and type is range', async () => {
      const page = await testPage(`<ath-slider type="range" stepped="true" value="[2,10]"></ath-slider>`, [AthInputCounter]);
      const steps = page.root.shadowRoot.querySelectorAll('.ath-slider__step');
      expect(steps.length > 0).toBeTruthy();
    });
    // Helper-text
    it('should display the helper-text if helper-text is not empty', async () => {
      const page = await testPage(`<ath-slider helper-text="text"></ath-slider>`);
      await page.waitForChanges();
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeTruthy();
      expect(helperText.firstElementChild.textContent).toBe('text');
    });

    it('should not display helper-text when helper-text it is not defined', async () => {
      const page = await testPage(`<ath-slider></ath-slider>`);
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeFalsy();
    });

    // Feedback
    it('should display the feedback text with an icon if feedback-text is set and feedback is "error"', async () => {
      const page = await testPage(`<ath-slider feedback-text="feedback text" feedback="error"></ath-slider>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy();
      expect(feedback.querySelector('ath-icon')).toBeTruthy();
      expect(feedback.children[1].textContent).toBe('feedback text');
    });

    it('should not display the feedback when feedback it is not defined', async () => {
      const page = await testPage(`<ath-slider feedback-text="feedback text"></ath-slider>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });

    it('should not display the feedback when feedback it is not "error"', async () => {
      const page = await testPage(`<ath-slider feedback-text="feedback-text" feedback="none"></ath-slider>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });

    it('should first ath-input-counter have feedback="error" if feedback-text is set and feedback is "error" and feedback-counter is from', async () => {
      const page = await testPage(`<ath-slider type="range" feedback-text="feedback text" feedback="error" feedback-counter="from"></ath-slider>`, [AthInputCounter]);
      await page.waitForChanges();
      const athcounters = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      expect(athcounters[0]).toHaveProperty('feedback', 'error');
      expect(athcounters[1]).toHaveProperty('feedback', 'none');
    });

    it('should second ath-input-counter have feedback="error" if feedback-text is set and feedback is "error" and feedback-counter is to', async () => {
      const page = await testPage(`<ath-slider type="range" feedback-text="feedback text" feedback="error" feedback-counter="to"></ath-slider>`, [AthInputCounter]);
      await page.waitForChanges();
      const athcounters = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      expect(athcounters[0]).toHaveProperty('feedback', 'none');
      expect(athcounters[1]).toHaveProperty('feedback', 'error');
    });

    it('should second ath-input-counter have feedback="error" if feedback-text is set and feedback is "error" and feedback-counter is both', async () => {
      const page = await testPage(`<ath-slider type="range" feedback-text="feedback text" feedback="error" feedback-counter="both"></ath-slider>`, [AthInputCounter]);
      await page.waitForChanges();
      const athcounters = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      expect(athcounters[0]).toHaveProperty('feedback', 'error');
      expect(athcounters[1]).toHaveProperty('feedback', 'error');
    });

    it('should set the aria-disabled property when disabled is defined', async () => {
      const page = await testPage(`<ath-slider disabled="true"></ath-slider>`);
      const slider = page.root.shadowRoot.querySelector('.ath-slider__filler');
      expect(slider.getAttribute('aria-disabled')).toBe('true');
    });
    it('should set the aria-readonly property when readonly is defined', async () => {
      const page = await testPage(`<ath-slider readonly="true"></ath-slider>`);
      const slider = page.root.shadowRoot.querySelector('.ath-slider-handle-range');
      expect(slider.getAttribute('aria-readonly')).toBe('true');
    });

    // Label-group
    it('should display the label if label has a value', async () => {
      const page = await testPage(`<ath-slider label-group="text"></ath-slider>`);
      const label = page.root.shadowRoot.querySelector('label span');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('text');
    });

    it('should not display label tag when label it is not defined', async () => {
      const page = await testPage(`<ath-slider></ath-slider>`);
      const label = page.root.shadowRoot.querySelector('label');
      expect(label).toBeFalsy();
    });
  });

  describe('actions', () => {
    it('should emit the athFocus event when focused', async () => {
      const page = await testPage(`<ath-slider></ath-slider>`, [AthInputCounter]);
      const inputCounter = page.root.shadowRoot.querySelector('ath-input-counter');
      const input = inputCounter.shadowRoot.querySelector('input');
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      input.focus();
      expect(athFocus).toHaveBeenCalled();
    });
    it('should emit the athBlur event when focus outside of ath-slider', async () => {
      const page = await testPage(`<ath-slider></ath-slider>`, [AthInputCounter]);
      const inputCounter = page.root.shadowRoot.querySelector('ath-input-counter');
      const input = inputCounter.shadowRoot.querySelector('input');
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      input.focus();
      const event = new MouseEvent('focusout', {
        bubbles: true,
        composed: true,
      });
      document.body.dispatchEvent(event);
      await page.waitForChanges();
      expect(athBlur).toHaveBeenCalled();
    });
    it('should emit the athChange when the value changes on first input counter and loses focus', async () => {
      const page = await testPage(`<ath-slider></ath-slider>`, [AthInputCounter]);
      const inputCounter = page.root.shadowRoot.querySelector('ath-input-counter');
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      const input = inputCounter.shadowRoot.querySelector('input') as HTMLInputElement;
      input.focus();
      input.value = '12';
      const changeEvent = new Event('change', { bubbles: true });
      input.dispatchEvent(changeEvent);
      const blurEvent = new FocusEvent('blur', {
        bubbles: true,
        composed: true,
      });
      input.dispatchEvent(blurEvent);
      await page.waitForChanges();
      expect(athChange).toHaveBeenCalled();
    });

    it('should emit the athChange when the value changes on second input counter and loses focus', async () => {
      const page = await testPage(`<ath-slider type="range"></ath-slider>`, [AthInputCounter]);
      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      const input = inputCounter[1].shadowRoot.querySelector('input') as HTMLInputElement;
      input.focus();
      input.value = '12';
      const changeEvent = new Event('change', { bubbles: true });
      input.dispatchEvent(changeEvent);
      const blurEvent = new FocusEvent('blur', {
        bubbles: true,
        composed: true,
      });
      input.dispatchEvent(blurEvent);
      await page.waitForChanges();
      expect(athChange).toHaveBeenCalled();
    });

    it('should emit the athChange when the value changes on first input counter and loses focus type range', async () => {
      const page = await testPage(`<ath-slider type="range"></ath-slider>`, [AthInputCounter]);
      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      const input = inputCounter[0].shadowRoot.querySelector('input') as HTMLInputElement;
      input.focus();
      input.value = '12';
      const changeEvent = new Event('change', { bubbles: true });
      input.dispatchEvent(changeEvent);
      const blurEvent = new FocusEvent('blur', {
        bubbles: true,
        composed: true,
      });
      input.dispatchEvent(blurEvent);
      await page.waitForChanges();
      expect(athChange).toHaveBeenCalled();
    });

    //Keyboard navigation

    it('should value have 13 on first input counter when key is ArrowUp and focus on first handle', async () => {
      const page = await testPage(`<ath-slider value="12"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[0].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('13');
    });

    it('should value have 13 first input counter when key is ArrowRight and focus on first handle', async () => {
      const page = await testPage(`<ath-slider value="12"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[0].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('13');
    });

    it('should value have 11 on first input counter when key is ArrowDown and focus on first handle', async () => {
      const page = await testPage(`<ath-slider value="12"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[0].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('11');
    });

    it('should value have 11 on first input counter when key is ArrowLeft and focus on first handle', async () => {
      const page = await testPage(`<ath-slider value="12"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[0].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('11');
    });

    it('should value have 13 on second input counter when key is ArrowUp and focus on second handle', async () => {
      const page = await testPage(`<ath-slider type="range" value="[0,12]"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range2') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[1].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('13');
    });

    it('should value have 13 on second input counter when key is ArrowRight and focus on second handle', async () => {
      const page = await testPage(`<ath-slider type="range" value="[0,12]"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range2') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[1].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('13');
    });

    it('should value have 11 on second input counter when key is ArrowDown and focus on second handle', async () => {
      const page = await testPage(`<ath-slider type="range" value="[0,12]"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range2') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[1].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('11');
    });

    it('should value have 11 on second input counter when key is ArrowLeft and focus on second handle', async () => {
      const page = await testPage(`<ath-slider type="range" value="[0,12]"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range2') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[1].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('11');
    });

    it('First input should not surpass second input counter when key is ArrowUp', async () => {
      const page = await testPage(`<ath-slider type="range" value="[12,12]"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[0].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('12');
    });

    it('Second input should not be less than first input counter when key is ArrowDown', async () => {
      const page = await testPage(`<ath-slider type="range" value="[12,12]"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range2') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[1].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('12');
    });

    it('should value have 4 on first input counter value when key is ArrowRight and type range', async () => {
      const page = await testPage(`<ath-slider type="range" value="[3,10]"></ath-slider>`, [AthInputCounter]);
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[0].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('4');
    });

    it('should value have 2 on first input counter value when key is ArrowDown and type range', async () => {
      const page = await testPage(`<ath-slider type="range" value="[3,10]" stepped="true"></ath-slider>`, [AthInputCounter]);
      await page.waitForChanges();
      const handle = page.root.shadowRoot.querySelector('span.ath-slider-handle-range') as HTMLSpanElement;

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        composed: true,
      });
      handle.dispatchEvent(event);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[0].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('2');
    });

    it('should value be min value when value is lower than min and type is default', async () => {
      const page = await testPage(`<ath-slider value="1" min=10 stepped="true"></ath-slider>`, [AthInputCounter]);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelector('ath-input-counter');
      const input = inputCounter.shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('10');
    });

    it('should value be max value when value is more than max and type is default', async () => {
      const page = await testPage(`<ath-slider value="11" max=10 stepped="true"></ath-slider>`, [AthInputCounter]);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelector('ath-input-counter');
      const input = inputCounter.shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('10');
    });

    it('should value of first input counter be min value when value is lower than min and type is range', async () => {
      const page = await testPage(`<ath-slider value="[1,10]" min=10 stepped="true" type="range"></ath-slider>`, [AthInputCounter]);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[0].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('10');
    });

    it('should value of second input counter be max value when value is more than max and type is range', async () => {
      const page = await testPage(`<ath-slider value="[11,11]" max=10 stepped="true" type="range"></ath-slider>`, [AthInputCounter]);
      await page.waitForChanges();

      const inputCounter = page.root.shadowRoot.querySelectorAll('ath-input-counter');
      const input = inputCounter[1].shadowRoot.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('10');
    });
  });
});
