import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthAccordion } from '../accordion';
import { AthAccordionItem } from '../accordion-item/accordionItem';
import { AthIcon } from '../../icon/icon';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthAccordion, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

const testPageItem = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthAccordionItem, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

//ACCORDION
describe('ath-accordion', () => {
  describe('render', () => {
    it('should set noLastItemDivider to false on the last accordion item', async () => {
      const page = await testPage(`
    <ath-accordion no-last-item-divider="true">
      <ath-accordion-item heading-text="Item 1"></ath-accordion-item>
      <ath-accordion-item heading-text="Item 2"></ath-accordion-item>
      <ath-accordion-item heading-text="Item 3"></ath-accordion-item>
    </ath-accordion>
  `);
      const items = page.body.querySelectorAll('ath-accordion-item');
      expect(items.length).toBe(3);
      const lastItem = items[items.length - 1];
      expect(lastItem.noDivider).toBe(true);
    });

    it('should have property one', async () => {
      const expand = 'one';
      const page = await testPage(`<ath-accordion expand="${expand}"></ath-accordion>`);
      expect(page.root).toHaveProperty('expand', `${expand}`);
    });

    it('should have property all', async () => {
      const expand = 'all';
      const page = await testPage(`<ath-accordion expand="${expand}"></ath-accordion>`);
      expect(page.root).toHaveProperty('expand', `${expand}`);
    });
  });
});

//ACCORDION ITEM
describe('ath-accordion-item', () => {
  describe('render', () => {
    it('should have class disabled', async () => {
      const className = 'disabled';
      const page = await testPageItem(`<ath-accordion-item disabled=true></ath-accordion-item>`);
      const div = page.root.shadowRoot.querySelector('div.ath-accordion-item--header');
      expect(page.root).toHaveProperty('disabled', true);
      expect(div).toHaveClass(className);
    });

    it('should not have class disabled', async () => {
      const className = 'disabled';
      const page = await testPageItem(`<ath-accordion-item></ath-accordion-item>`);
      const div = page.root.shadowRoot.querySelector('div.ath-accordion-item--header');
      expect(page.root).toHaveProperty('disabled', false);
      expect(div).not.toHaveClass(className);
    });

    //TEST ICONS
    it('should display icon', async () => {
      const page = await testPageItem(`<ath-accordion-item icon="location"></ath-accordion-item>`, [AthIcon]);
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#location');
    });

    it('should display icon open accordeon item', async () => {
      const page = await testPageItem(`<ath-accordion-item></ath-accordion-item>`, [AthIcon]);
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('assets/images/sprites/core/sprites.svg#chevron_down');
    });

    it('should display icon close accordeon item', async () => {
      const page = await testPageItem(`<ath-accordion-item expanded="true"></ath-accordion-item>`, [AthIcon]);
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#chevron_down');
    });
    //

    it('should display title', async () => {
      const text = 'title example';
      const page = await testPageItem(`<ath-accordion-item heading-text="${text}"></ath-accordion-item>`);
      const span = page.root.shadowRoot.querySelector('span.ath-accordion-item--header__title');
      expect(span.innerHTML).toContain(text);
    });

    it('should display description', async () => {
      const text = 'title example';
      const page = await testPageItem(`<ath-accordion-item description="${text}"></ath-accordion-item>`);
      const span = page.root.shadowRoot.querySelector('span.ath-accordion-item--header__subtitle');
      expect(span.innerHTML).toContain(text);
    });

    it('should have role heading and aria-level h3', async () => {
      const level = '3';
      const page = await testPageItem(`<ath-accordion-item heading-level="${level}"></ath-accordion-item>`);
      const divHeader = page.root.shadowRoot.querySelector('span.ath-accordion-item--header__button');
      expect(divHeader.getAttribute('role')).toBe(`heading`);
      expect(divHeader.getAttribute('aria-level')).toBe(`${level}`);
    });

    it('should have aria-expanded true and not class expanded', async () => {
      const page = await testPageItem(`<ath-accordion-item expanded="true"></ath-accordion-item>`);
      const divButtonHeader = page.root.shadowRoot.querySelector('div.ath-accordion-item--header');
      const divPanel = page.root.shadowRoot.querySelector('div.ath-accordion-item--panel');
      expect(divPanel).toHaveClass('expanded');
      expect(divButtonHeader.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-expanded false and class expanded', async () => {
      const page = await testPageItem(`<ath-accordion-item expanded="false"></ath-accordion-item>`);
      const divButtonHeader = page.root.shadowRoot.querySelector('div.ath-accordion-item--header');
      const divPanel = page.root.shadowRoot.querySelector('div.ath-accordion-item--panel');
      expect(divPanel).not.toHaveClass('expanded');
      expect(divButtonHeader.getAttribute('aria-expanded')).toBe('false');
    });

    it('should set aria-controls', async () => {
      const page = await testPageItem(`<ath-accordion-item></ath-accordion-item>`);
      const divButtonHeader = page.root.shadowRoot.querySelector('div.ath-accordion-item--header');
      const divPanel = page.root.shadowRoot.querySelector('div.ath-accordion-item--panel');
      const buttonHeaderControls = divButtonHeader.getAttribute('aria-controls');
      expect(divPanel.getAttribute('id')).toBe(buttonHeaderControls);
    });

    it('should set aria-disabled & class diabled when disabled is true', async () => {
      const page = await testPageItem(`<ath-accordion-item disabled="true"></ath-accordion-item>`);
      const divButtonHeader = page.root.shadowRoot.querySelector('div.ath-accordion-item--header');
      const divHeader = page.root.shadowRoot.querySelector('div.ath-accordion-item--header');
      expect(divButtonHeader.getAttribute('aria-disabled')).toBe('true');
      expect(divHeader).toHaveClass('disabled');
    });

    it('should emit the opened event when clicked', async () => {
      const page = await testPageItem(`<ath-accordion-item></ath-accordion-item>`);
      const divButtonHeader = page.root.shadowRoot.querySelector('div.ath-accordion-item--header') as HTMLElement;
      const opened = jest.fn();
      page.root.addEventListener('opened', opened);
      divButtonHeader.click();
      expect(opened).toHaveBeenCalled();
    });
  });
});
