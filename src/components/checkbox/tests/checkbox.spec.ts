import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthCheckBox } from '../checkbox';
import { AthCheckBoxGroup } from '../checkbox-group/checkbox-group';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthCheckBox, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

const testPageGroup = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthCheckBoxGroup, AthCheckBox, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-checkbox', () => {
  describe('render', () => {
    //Text Tests
    it('should display text on helperText', async () => {
      const text = 'helpText example';
      const page = await testPage(`<ath-checkbox helper-text="${text}"></ath-checkbox>`);
      const div = page.root.shadowRoot.querySelector('div.ath-input__helper-text');
      expect(div).toEqualText(text);
    });

    it('should display text on FeedbackText', async () => {
      const text = 'FeedbackText example';
      const page = await testPage(`<ath-checkbox feedback="error" feedback-text="${text}"></ath-checkbox>`);
      const div = page.root.shadowRoot.querySelector('div.ath-input__feedback');
      expect(div).toEqualText(text);
    });

    //Aria Tests
    it('should have aria-checked true when checked is true', async () => {
      const page = await testPage(`<ath-checkbox checked></ath-checkbox>`);
      const input = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(input.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-checked true when value is true', async () => {
      const page = await testPage(`<ath-checkbox value="true"></ath-checkbox>`);
      const input = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(input.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-checked false when value is false', async () => {
      const page = await testPage(`<ath-checkbox value="false"></ath-checkbox>`);
      const input = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(input.getAttribute('aria-checked')).toBe('false');
    });

    it('should have aria-checked false', async () => {
      const page = await testPage(`<ath-checkbox></ath-checkbox>`);
      const input = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(input.getAttribute('aria-checked')).toBe('false');
    });

    it('should have aria-checked mixed when value is indeterminate', async () => {
      const page = await testPage(`<ath-checkbox value="indeterminate"></ath-checkbox>`);
      const input = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(input.getAttribute('aria-checked')).toBe('mixed');
    });

    it('should have aria-invalid true when feedback is error', async () => {
      const page = await testPage(`<ath-checkbox feedback="error"></ath-checkbox>`);
      const input = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-disabled true when feedback is error', async () => {
      const page = await testPage(`<ath-checkbox disabled></ath-checkbox>`);
      const input = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(input.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have aria-required true when required is true', async () => {
      const page = await testPage(`<ath-checkbox required></ath-checkbox>`);
      const input = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(input.getAttribute('aria-required')).toBe('true');
    });
  });

  describe('value property', () => {
    it('should set correct CSS classes when value is true', async () => {
      const page = await testPage(`<ath-checkbox value="true"></ath-checkbox>`);
      const checkbox = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(checkbox).toHaveClass('ath-checkbox--checked');
    });

    it('should set correct CSS classes when value is indeterminate', async () => {
      const page = await testPage(`<ath-checkbox value="indeterminate"></ath-checkbox>`);
      const checkbox = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(checkbox).toHaveClass('ath-checkbox--indeterminate');
    });

    it('should not have checked or indeterminate classes when value is false', async () => {
      const page = await testPage(`<ath-checkbox value="false"></ath-checkbox>`);
      const checkbox = page.root.shadowRoot.querySelector('div.ath-checkbox');
      expect(checkbox).not.toHaveClass('ath-checkbox--checked');
      expect(checkbox).not.toHaveClass('ath-checkbox--indeterminate');
    });

    it('should update when value property changes programmatically', async () => {
      const page = await testPage(`<ath-checkbox value="false"></ath-checkbox>`);
      const component = page.rootInstance;
      const checkbox = page.root.shadowRoot.querySelector('div.ath-checkbox');

      // Initially false
      expect(checkbox.getAttribute('aria-checked')).toBe('false');

      // Change to true
      component.value = 'true';
      await page.waitForChanges();
      expect(checkbox.getAttribute('aria-checked')).toBe('true');
      expect(checkbox).toHaveClass('ath-checkbox--checked');

      // Change to indeterminate
      component.value = 'indeterminate';
      await page.waitForChanges();
      expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
      expect(checkbox).toHaveClass('ath-checkbox--indeterminate');
      expect(checkbox).not.toHaveClass('ath-checkbox--checked');
    });

    it('should respect checked property and set value to true', async () => {
      const page = await testPage(`<ath-checkbox checked></ath-checkbox>`);
      const component = page.rootInstance;
      const checkbox = page.root.shadowRoot.querySelector('div.ath-checkbox');

      expect(component.value).toBe('true');
      expect(checkbox.getAttribute('aria-checked')).toBe('true');
      expect(checkbox).toHaveClass('ath-checkbox--checked');
    });

    it('should handle toggle behavior correctly with value property', async () => {
      const page = await testPage(`<ath-checkbox value="false"></ath-checkbox>`);
      const component = page.rootInstance;
      const checkbox = page.root.shadowRoot.querySelector('div.ath-checkbox') as HTMLElement;

      // Click to toggle
      checkbox.click();
      await page.waitForChanges();

      expect(component.value).toBe('true');
      expect(checkbox.getAttribute('aria-checked')).toBe('true');

      // Click again to toggle back
      checkbox.click();
      await page.waitForChanges();

      expect(component.value).toBe('false');
      expect(checkbox.getAttribute('aria-checked')).toBe('false');
    });
  });

  //Actions Checkbox Tests
  describe('Events', () => {
    let page: SpecPage;
    let checkboxDiv;

    beforeEach(async () => {
      page = await testPage('<ath-checkbox></ath-checkbox>');
      checkboxDiv = page.root.shadowRoot.querySelector('.ath-checkbox') as HTMLElement;
    });

    it('should emit the athFocus event when focused', async () => {
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      checkboxDiv.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('should emit the athBlur event when blurred', async () => {
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      checkboxDiv.focus();
      checkboxDiv.blur();
      await new Promise(resolve => requestAnimationFrame(resolve));
      expect(athBlur).toHaveBeenCalled();
    });

    it('should emit the athChange event when clicked', async () => {
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      checkboxDiv.click();
      expect(athChange).toHaveBeenCalled();
    });

    //Actions Checkbox Group Tests
    describe('Events', () => {
      it('should emit the athChecked event when a child checkbox changes', async () => {
        const page = await testPageGroup('<ath-checkbox-group><ath-checkbox label="Sample Checkbox" checked></ath-checkbox></ath-checkbox-group>');

        const athChecked = jest.fn();
        page.root.addEventListener('athChecked', athChecked);

        const childCheckbox = page.root.querySelector('ath-checkbox');
        expect(childCheckbox).toBeTruthy();

        const eventPayload = { label: 'label', name: 'name', value: 'true' };
        childCheckbox.dispatchEvent(new CustomEvent('athChange', { bubbles: true, detail: { eventPayload } }));
        await page.waitForChanges();

        expect(athChecked).toHaveBeenCalled();
      });

      //Checkbox Group
      describe('ath-checkbox-group', () => {
        describe('render', () => {
          //Label Text & Helper Text Tests
          it('should display text on label', async () => {
            const text = 'label example';
            const page = await testPageGroup(`<ath-checkbox-group label="${text}"></ath-checkbox-group>`);
            const label = page.root.shadowRoot.querySelector('label');
            expect(label).toEqualText(text);
          });

          it('should display text on helperText', async () => {
            const text = 'helpText example';
            const page = await testPageGroup(`<ath-checkbox-group helper-text="${text}"></ath-checkbox-group>`);
            const div = page.root.shadowRoot.querySelector('div.ath-input__helper-text');
            expect(div).toEqualText(text);
          });

          //Feedback Tests
          it('should display text on FeedbackText', async () => {
            const text = 'FeedbackText example';
            const page = await testPageGroup(`<ath-checkbox-group feedback="error" feedback-text="${text}"></ath-checkbox-group>`);
            const div = page.root.shadowRoot.querySelector('div.ath-input__feedback');
            expect(div).toEqualText(text);
          });

          //Required Test
          it('span show-required should be defined', async () => {
            const page = await testPageGroup(`<ath-checkbox-group label="label" show-required></ath-checkbox-group>`);
            const span = page.root.shadowRoot.querySelector('span.required');
            expect(page.root).toHaveProperty('showRequired', true);
            expect(span).not.toBeNull();
          });

          it('should properly set aria-labelledby including sr-only when showRequired is true', async () => {
            const requiredText = 'required';
            const page = await testPageGroup(`<ath-checkbox-group show-required required-aria-label="${requiredText}" label="Grupo de opciones"></ath-checkbox-group>`);
            const fieldset = page.root.shadowRoot.querySelector('fieldset');

            expect(fieldset.getAttribute('aria-labelledby')).toContain('checkbox-group-');
            expect(fieldset.getAttribute('aria-labelledby')).toContain('-sr-only');
            const srOnlyDiv = page.root.shadowRoot.querySelector('.sr-only');
            expect(srOnlyDiv).not.toBeNull();
            expect(srOnlyDiv.textContent).toBe(requiredText);
          });
        });
      });
    });
  });
});
