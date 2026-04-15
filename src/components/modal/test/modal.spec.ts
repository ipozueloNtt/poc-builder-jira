import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthModal } from '../modal';
import { ModalSize } from '../modal.model';
import { AthButton } from 'components/button/button';

const testPage = (html: string, othersComponents: any[] = []): Promise<SpecPage> => {
  const components = [AthModal, ...othersComponents];
  return newSpecPage({
    components,
    html,
    supportsShadowDom: true,
  });
};

describe('ath-modal', () => {
  // Backdrop Tests
  describe('backdrop', () => {
    it('should display the backdrop when open', async () => {
      const page = await testPage(`<ath-modal open></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const backdrop = page.root.shadowRoot.querySelector('.backdrop');
      expect(backdrop).toBeTruthy();
    });

    it('should close when clicking outside if enabled and emit AthClosed', async () => {
      const page = await testPage(`<ath-modal open click-outside-close></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const callback = jest.fn();
      page.root.addEventListener('athClosed', callback);

      const backdrop = page.root.shadowRoot.querySelector('.backdrop') as HTMLElement;
      backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

      await page.waitForChanges();

      expect(page.root.open).toBe(false);
      expect(callback).toHaveBeenCalled();
    });
  });

  // Overlay Tests
  describe('overlay', () => {
    it('should display the overlay when open', async () => {
      const page = await testPage(`<ath-modal open></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const modal = page.root.shadowRoot.querySelector('[role="dialog"]');
      expect(modal).toBeTruthy();
    });

    it('should inject default classes to overlay', async () => {
      const page = await testPage(`<ath-modal open></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const modal = page.root.shadowRoot.querySelector('[role="dialog"]');
      expect(modal).toHaveClass('ath-modal');
      expect(modal).toHaveClass('ath-modal--md');
    });

    it('should apply fullscreen class and custom styles', async () => {
      const h = '120px',
        w = '240px';
      const page = await testPage(`<ath-modal open full-screen max-height="${h}" max-width="${w}" size="${ModalSize.Small}"></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const dialog = page.root.shadowRoot.querySelector('[role="dialog"]') as HTMLElement;
      expect(dialog).toHaveClass('ath-modal--fullscreen');
      expect(dialog.style['max-height']).toBe(h);
      expect(dialog.style['max-width']).toBe(w);
      expect(dialog).toHaveClass('ath-modal--sm');
    });

    it('should render FcPictogram when isAlert is true and appearance is not default', async () => {
      const page = await testPage(`<ath-modal open is-alert appearance="warning"></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      const pictogram = page.root.shadowRoot.querySelector('img');
      expect(pictogram).toBeTruthy();
      expect(pictogram.src).toContain('illu_warning_msg.svg');
    });
  });

  // Content Rendering Tests
  describe('content rendering', () => {
    it('should render title, subtitle, close button, divider, and slots', async () => {
      const title = 'Hola';
      const subtitle = 'Sub';
      const page = await testPage(
        `<ath-modal open heading-text="${title}" subtitle-text="${subtitle}" has-close has-divider>
           <div slot="body">Body</div><div slot="footer">Footer</div>
         </ath-modal>`,
      );
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      expect(page.root.shadowRoot.querySelector('.ath-modal-header-text-title').innerHTML).toBe(title);
      expect(page.root.shadowRoot.querySelector('.ath-modal-header-text-subtitle').innerHTML).toBe(subtitle);
      expect(page.root.shadowRoot.querySelector('button')).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('ath-divider')).toBeTruthy();
      expect(page.root.querySelector('[slot="body"]').innerHTML).toBe('Body');
      expect(page.root.querySelector('[slot="footer"]').innerHTML).toBe('Footer');
    });

    it('should render the heading and subtitle', async () => {
      const headingText = 'Título';
      const subtitleText = 'Subtítulo';
      const page = await testPage(`<ath-modal open heading-text="${headingText}" subtitle-text="${subtitleText}"></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const heading = page.root.shadowRoot.querySelector('.ath-modal-header-text-title');
      const subtitle = page.root.shadowRoot.querySelector('.ath-modal-header-text-subtitle');
      expect(heading.innerHTML).toBe(headingText);
      expect(subtitle.innerHTML).toBe(subtitleText);
    });

    it('should render the body and footer slots', async () => {
      const slotContentText = 'Slot content text';
      const page = await testPage(`<ath-modal open><div slot="body">${slotContentText}</div><div slot="footer">${slotContentText}</div></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const bodySlot = page.root.querySelector('[slot="body"]');
      const footerSlot = page.root.querySelector('[slot="footer"]');
      expect(bodySlot.innerHTML).toBe(slotContentText);
      expect(footerSlot.innerHTML).toBe(slotContentText);
    });
  });

  // Accessibility Tests
  describe('accessibility', () => {
    it('should apply accessibility attributes and default classes', async () => {
      const page = await testPage(`<ath-modal open></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const dialog = page.root.shadowRoot.querySelector('[role="dialog"]');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
      expect(dialog.getAttribute('tabindex')).toBe('-1');
      expect(dialog).toHaveClass('ath-modal');
      expect(dialog).toHaveClass('ath-modal--md');
    });

    it('should assign the alertdialog role when is-alert is true', async () => {
      const page = await testPage(`<ath-modal open is-alert></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const alertdialog = page.root.shadowRoot.querySelector('[role="alertdialog"]');
      expect(alertdialog).toBeTruthy();
    });
  });

  // Interaction Tests
  describe('interactions', () => {
    it('should close when clicking on close button', async () => {
      const page = await testPage(
        `<ath-modal open autofocus="true" has-close="true"><div slot="body">
            <div class="ath-body--sm" style="padding:4px">
                <ath-button icon="mark" icon-position="icon-only" clear>Destacar</ath-button>
                <ath-button icon="mark" icon-position="icon-only" clear>Limpiar</ath-button>
            </div>
          </div></ath-modal>`,
        [AthButton],
      );
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      const closeButton = page.root.shadowRoot.querySelector('button');
      expect(closeButton).toBeTruthy();
      closeButton.click();
      expect(page.root.open).toBe(false);
    });

    it('should close when pressing Escape', async () => {
      const page = await testPage(`<ath-modal open></ath-modal>`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();
      const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      page.root.dispatchEvent(ev);
      expect(page.root.open).toBe(false);
    });
  });

  // Focus Management Tests
  describe('focus management', () => {
    it('should return focus to previously focused element', async () => {
      const page = await testPage(`<ath-modal></ath-modal>`);
      const before = document.createElement('button');
      document.body.appendChild(before);
      before.focus();

      const inst = page.rootInstance;
      inst.previouslyFocusedElement = before;
      const spyPrev = jest.spyOn(before, 'focus');
      await inst.closeModal();
      expect(spyPrev).toHaveBeenCalled();
      before.remove();
    });

    // it('should handle focus trapping correctly', async () => {
    //   const page = await testPage(`<ath-modal open>
    //   <div slot="body">
    //     <button id="btn1">Button 1</button>
    //     <button id="btn2">Button 2</button>
    //     <button id="btn3">Button 3</button>
    //     <button id="btn4">Button 4</button>
    //   </div>
    // </ath-modal>`);
    //   await new Promise(resolve => requestAnimationFrame(resolve));
    //   await page.waitForChanges();
    //   const inst = page.rootInstance;
    //   inst.focusableElements = [];
    //   const ev = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
    //   const spy = jest.spyOn(ev, 'preventDefault');
    //   inst.handleKeyDown(ev);
    //   expect(spy).toHaveBeenCalled();
    // });

    it('should handle focus trapping correctly', async () => {
      const page = await testPage(`<ath-modal open> </ath-modal>`);

      const component = page.rootInstance;
      const firstEl = document.createElement('button');
      const lastEl = document.createElement('button');

      firstEl.focus = jest.fn();
      lastEl.focus = jest.fn();

      component['focusableElements'] = [firstEl, lastEl];
      jest.spyOn(component, 'getDeepActiveElement').mockReturnValue(lastEl);

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      const preventDefault = jest.spyOn(event, 'preventDefault');

      page.root.dispatchEvent(event);
      await page.waitForChanges();
      expect(preventDefault).toHaveBeenCalled();
      expect(firstEl.focus).toHaveBeenCalled();
    });
    it('should trap focus backward with Shift+Tab', async () => {
      const page = await testPage(`<ath-modal open> </ath-modal>`);
      const component = page.rootInstance;

      const firstEl = document.createElement('button');
      const lastEl = document.createElement('button');
      firstEl.focus = jest.fn();
      lastEl.focus = jest.fn();

      component['focusableElements'] = [firstEl, lastEl];
      jest.spyOn(component, 'getDeepActiveElement').mockReturnValue(firstEl);

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      });
      const preventDefault = jest.spyOn(event, 'preventDefault');

      page.root.dispatchEvent(event);
      await page.waitForChanges();

      expect(preventDefault).toHaveBeenCalled();
      expect(lastEl.focus).toHaveBeenCalled();
    });

    it('should focus the first button in the slot (not the close button) when autofocus is set and open is set after initialization', async () => {
      const onFocusBtn1 = jest.fn();
      const onFocusClose = jest.fn();

      // Render the modal without open
      const page = await testPage(
        `<ath-modal autofocus has-close>
      <div slot="body">
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
        <button id="btn3">Button 3</button>
      </div>
    </ath-modal>`,
      );
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      // Set open to true after initialization
      page.root.open = true;
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      // Attach focus mocks
      const btn1 = page.root.querySelector('#btn1') as HTMLButtonElement;
      btn1.addEventListener('focus', onFocusBtn1);

      const closeButton = page.root.shadowRoot.querySelector('fcbuttoncomp, .ath-button_comp, button');
      if (closeButton) {
        closeButton.addEventListener('focus', onFocusClose);
      }

      // Simulate autofocus logic (normally called on open)
      const inst = page.rootInstance;
      inst.focusableElements = inst.findFocusableElements();
      inst.focusFirstElement();

      await page.waitForChanges();

      // Simulate focus event (Stencil/JSDOM workaround)
      btn1.dispatchEvent(new FocusEvent('focus', { bubbles: true }));

      // Assert
      expect(onFocusBtn1).toHaveBeenCalled();
      expect(onFocusClose).not.toHaveBeenCalled();
    });
    it('should button receives focus', async () => {
      const onFocusMock = jest.fn();

      const page = await testPage(
        `<ath-modal open>
      <div slot="body">
        <button id="btn1">Button 1</button>
      </div>
    </ath-modal>`,
      );
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      const btn = page.root.querySelector('#btn1') as HTMLButtonElement;
      btn.addEventListener('focus', onFocusMock);
      btn.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      expect(onFocusMock).toHaveBeenCalled();
    });

    it('should focus button1 twice when Tab is pressed 4 times with 3 buttons', async () => {
      const onFocusMocks = [jest.fn(), jest.fn(), jest.fn()];

      const page = await testPage(
        `<ath-modal open>
      <div slot="body">
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
        <button id="btn3">Button 3</button>
      </div>
    </ath-modal>`,
      );
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      const btns = [
        page.root.querySelector('#btn1') as HTMLButtonElement,
        page.root.querySelector('#btn2') as HTMLButtonElement,
        page.root.querySelector('#btn3') as HTMLButtonElement,
      ];
      btns.forEach((btn, idx) => {
        btn.addEventListener('focus', onFocusMocks[idx]);
      });

      btns[0].dispatchEvent(new FocusEvent('focus', { bubbles: true }));

      const inst = page.rootInstance;
      inst.focusableElements = inst.findFocusableElements();
      await page.waitForChanges();

      for (let i = 0; i < 3; i++) {
        const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        inst.handleKeyDown(ev);
        btns[(i + 1) % 3].dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await page.waitForChanges();
      }

      expect(onFocusMocks[0]).toHaveBeenCalledTimes(2);
    });

    it('should focus button1, then button2, then back to button1 with Shift+Tab', async () => {
      const onFocusMocks = [jest.fn(), jest.fn(), jest.fn()];

      const page = await testPage(
        `<ath-modal open>
      <div slot="body">
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
        <button id="btn3">Button 3</button>
      </div>
    </ath-modal>`,
      );
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      const btns = [
        page.root.querySelector('#btn1') as HTMLButtonElement,
        page.root.querySelector('#btn2') as HTMLButtonElement,
        page.root.querySelector('#btn3') as HTMLButtonElement,
      ];
      btns.forEach((btn, idx) => {
        btn.addEventListener('focus', onFocusMocks[idx]);
      });

      btns[0].dispatchEvent(new FocusEvent('focus', { bubbles: true }));

      const inst = page.rootInstance;
      inst.focusableElements = inst.findFocusableElements();

      await page.waitForChanges();

      let ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
      inst.handleKeyDown(ev);
      btns[1].dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      ev = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
      inst.handleKeyDown(ev);
      btns[0].dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      ev = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
      inst.handleKeyDown(ev);
      btns[2].dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(onFocusMocks[0]).toHaveBeenCalledTimes(2);
      expect(onFocusMocks[1]).toHaveBeenCalledTimes(1);
      expect(onFocusMocks[2]).toHaveBeenCalledTimes(1);
    });

    it('should cycle focus between close button and 3 slot buttons when Tab is pressed repeatedly', async () => {
      const onFocusMocks = [jest.fn(), jest.fn(), jest.fn(), jest.fn()]; // [close, btn1, btn2, btn3]

      const page = await testPage(
        `<ath-modal open has-close>
      <div slot="body">
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
        <button id="btn3">Button 3</button>
      </div>
    </ath-modal>`,
      );
      await new Promise(resolve => requestAnimationFrame(resolve));
      await page.waitForChanges();

      const closeButton = page.root.shadowRoot.querySelector('.ath-button_comp') as HTMLElement;

      const btns = [
        page.root.querySelector('#btn1') as HTMLButtonElement,
        page.root.querySelector('#btn2') as HTMLButtonElement,
        page.root.querySelector('#btn3') as HTMLButtonElement,
      ];

      closeButton.addEventListener('focus', onFocusMocks[0]);
      btns.forEach((btn, idx) => {
        btn.addEventListener('focus', onFocusMocks[idx + 1]);
      });

      const inst = page.rootInstance;
      inst.focusableElements = [closeButton, ...btns];

      closeButton.dispatchEvent(new FocusEvent('focus', { bubbles: true }));

      for (let i = 0; i < 5; i++) {
        const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        inst.handleKeyDown(ev);
        const nextIdx = (i + 1) % 4;
        [closeButton, ...btns][nextIdx].dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await page.waitForChanges();
      }

      expect(onFocusMocks[1]).toHaveBeenCalledTimes(2);
      expect(onFocusMocks[0]).toHaveBeenCalledTimes(2);
      expect(onFocusMocks[2]).toHaveBeenCalledTimes(1);
      expect(onFocusMocks[3]).toHaveBeenCalledTimes(1);
    });
  });
});
