import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthAlert } from '../alert';
import { AthIcon } from '../../icon/icon';
import { AthButton } from '../../button/button';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthAlert, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

(global as any).ResizeObserver = class {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};

describe('ath-alert', () => {
  describe('render', () => {
    // Default
    it('should set default classes and properties', async () => {
      const page = await testPage(`<ath-alert></ath-alert>`);
      const alert = page.root.shadowRoot.querySelector('.ath-alert');
      expect(page.root).toHaveProperty('color', 'info');
      expect(page.root).toHaveProperty('type', 'section');
      expect(alert).toHaveClass('ath-alert--info');
      expect(alert).toHaveClass('ath-alert__section');
    });

    it('should not display icon when it is not defined and color is danger', async () => {
      const page = await testPage(`<ath-alert color="danger"></ath-alert>`);
      const athComponent = page.root;
      const alert = athComponent.shadowRoot.querySelector('.ath-alert');
      expect(alert).toHaveClass('ath-alert--danger');
      const icon = athComponent.querySelector('ath-icon');
      expect(icon).toBeDefined();
    });

    it('should not display icon when it is not defined and color is specified)', async () => {
      const page = await testPage(`<ath-alert color="secondary"></ath-alert>`);
      const athComponent = page.root;
      const alert = athComponent.shadowRoot.querySelector('.ath-alert');
      expect(alert).toHaveClass('ath-alert--secondary');
      const icon = athComponent.querySelector('ath-icon');
      expect(icon).toBeFalsy();
    });

    // Colors
    it('should set warning color and exclamation icon', async () => {
      const page = await testPage(`<ath-alert color="warning" heading-text="example"></ath-alert>`, [AthIcon]);
      const div = page.root.shadowRoot.querySelector('div.ath-alert');
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(div).toHaveClass('ath-alert--warning');
      expect(icon.shadowRoot.querySelector('svg')).toHaveClasses(['ath-icon']);
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#exclamation_solid');
    });

    it('should set danger color and error icon', async () => {
      const page = await testPage(`<ath-alert color="danger" heading-text="example"></ath-alert>`, [AthIcon]);
      const div = page.root.shadowRoot.querySelector('div.ath-alert');
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(div).toHaveClass('ath-alert--danger');
      expect(icon.shadowRoot.querySelector('svg')).toHaveClasses(['ath-icon']);
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#error_solid');
    });

    it('should set success color and check icon', async () => {
      const page = await testPage(`<ath-alert color="success" heading-text="example"></ath-alert>`, [AthIcon]);
      const div = page.root.shadowRoot.querySelector('div.ath-alert');
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(div).toHaveClass('ath-alert--success');
      expect(icon.shadowRoot.querySelector('svg')).toHaveClasses(['ath-icon']);
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#check_2_solid');
    });

    it('should set info color and info icon', async () => {
      const page = await testPage(`<ath-alert color="info" heading-text="example"></ath-alert>`, [AthIcon]);
      const div = page.root.shadowRoot.querySelector('div.ath-alert');
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(div).toHaveClass('ath-alert--info');
      expect(icon.shadowRoot.querySelector('svg')).toHaveClasses(['ath-icon']);
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#info_solid');
    });

    //close button
    it('should set close button only-icon', async () => {
      const page = await testPage(`<ath-alert color="info" heading-text="example"></ath-alert>`, [AthButton, AthIcon]);
      const button = page.root.shadowRoot.querySelector('button');
      const icon = button.querySelector('ath-icon');
      expect(button).toBeTruthy();
      expect(icon.shadowRoot.querySelector('svg')).toHaveClasses(['ath-icon']);
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#close');
    });

    //title
    it('should set div title and content is title', async () => {
      const page = await testPage(`<ath-alert color="success" heading-text="title"></ath-alert>`, [AthIcon]);
      const h6 = page.root.shadowRoot.querySelector('h6.ath-alert__title');
      expect(h6.innerHTML).toBe('title');
    });

    it('should set title and heading level', async () => {
      const page = await testPage(`<ath-alert color="success" heading-text="title" heading-level="2"></ath-alert>`, [AthIcon]);
      const h2 = page.root.shadowRoot.querySelector('h2.ath-alert__title');
      expect(h2).toBeTruthy();
      expect(h2.innerHTML).toBe('title');
    });

    //description
    it('should set div description and content is description', async () => {
      const page = await testPage(`<ath-alert color="success" description="description" ></ath-alert>`, [AthIcon]);
      const div = page.root.shadowRoot.querySelector('div.ath-alert__description');
      expect(div.innerHTML).toBe('description');
    });

    //isUrgent
    it('should set div isUrgent and render alert role', async () => {
      const page = await testPage(`<ath-alert is-urgent></ath-alert>`, [AthIcon]);
      await page.waitForChanges();
      const role = page.root.getAttribute('role');
      expect(role).toBe('alert');
    });

    it('should set div isUrgent and render alert role', async () => {
      const page = await testPage(`<ath-alert></ath-alert>`, [AthIcon]);
      await page.waitForChanges();
      const role = page.root.getAttribute('role');
      expect(role).toBe('status');
    });
  });
});
