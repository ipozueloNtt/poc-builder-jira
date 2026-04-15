import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthList } from '../list';
import { AthListItem } from '../list-item/list-item';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthList, AthListItem, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

const testPageItem = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthListItem, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

const testItemHtml = `<ath-list-item
        heading-level="4"
        heading-text="Title 2"
        subtitle="Subtitle 2"
        description="Lorem ipsum dolor sit amet."
        tooltip="Lorem ipsum dolor sit amet."
      >
        <div slot="left-detail">
          <ath-icon icon="placeholder" color="default" size="sm"></ath-icon>
        </div>
        <div slot="right-detail">
          <span class="ath-h4 ath-color-heading--primary">222,00€</span>
          <span class="ath-body--lg ath-color-text--subtle">333,00€</span>
          <ath-tag label="Tag 2" size="sm" color="primary"></ath-tag>
          <ath-icon icon="placeholder" color="default" size="sm"></ath-icon>
        </div>
      </ath-list-item>`;

//LIST
describe('ath-list', () => {
  describe('render', () => {
    it('should render with small size', async () => {
      const page = await testPage(`
        <ath-list size="sm" orientation="vertical" has-divider="true"
        >
        ${testItemHtml}
        ${testItemHtml}
        </ath-list>`);
      const listItem = page.root.querySelector('ath-list-item');
      expect(listItem).toHaveClass('ath-list-item--sm-vertical');
      expect(page.root).toHaveProperty('size', 'sm');
    });

    it('should render with horizontal orientation', async () => {
      const page = await testPage(`
        <ath-list orientation="horizontal">${testItemHtml}${testItemHtml}</ath-list>`);
      expect(page.root).toHaveClass('ath-list--horizontal');
      expect(page.root).toHaveProperty('orientation', 'horizontal');
    });

    it('should render with dividers', async () => {
      const page = await testPage(`
        <ath-list has-divider="true" orientation="horizontal" >${testItemHtml}${testItemHtml}</ath-list>`);
      const divider = page.root.querySelector('ath-divider');
      expect(page.root).toHaveProperty('hasDivider', true);
      expect(divider).toBeDefined();
    });
  });
});

//LIST ITEM
describe('ath-list-item', () => {
  describe('render', () => {
    it('should render with default values', async () => {
      const page = await testPageItem(`<ath-list-item></ath-list-item>`);
      expect(page.root).toHaveProperty('headingText', undefined);
      expect(page.root).toHaveProperty('headingLevel', 4);
      expect(page.root).toHaveProperty('subtitle', undefined);
      expect(page.root).toHaveProperty('description', undefined);
      expect(page.root).toHaveProperty('tooltip', undefined);
      expect(page.root).toHaveProperty('tooltipMaxWidth', 240);
    });

    it('should render with Title', async () => {
      const page = await testPageItem(`<ath-list-item heading-text="Titulo"></ath-list-item>`);
      expect(page.root).toHaveProperty('headingText', 'Titulo');
      const title = page.root.querySelector('.ath-list-item--title');
      expect(title).toEqualText('Titulo');
    });

    it('should render with Subtitle', async () => {
      const page = await testPageItem(`<ath-list-item subtitle="Subtitulo"></ath-list-item>`);
      expect(page.root).toHaveProperty('subtitle', 'Subtitulo');
      const subtitle = page.root.querySelector('.ath-list-item--subtitle-wrapper');
      expect(subtitle).toEqualText('Subtitulo');
    });

    it('should render with Description', async () => {
      const page = await testPageItem(`<ath-list-item description="Descripcion"></ath-list-item>`);
      expect(page.root).toHaveProperty('description', 'Descripcion');
      const description = page.root.querySelector('.ath-list-item--description');
      expect(description).toEqualText('Descripcion');
    });

    it('should render with Tooltip', async () => {
      const page = await testPageItem(`<ath-list-item tooltip="Tooltip"></ath-list-item>`);
      expect(page.root).toHaveProperty('tooltip', 'Tooltip');
      const tooltip = page.root.querySelector('ath-tooltip');
      expect(tooltip).toBeDefined();
    });

    it('should have role heading and aria-level h3', async () => {
      const level = '3';
      const page = await testPageItem(`<ath-list-item heading-level="${level}" heading-text="Titulo"></ath-list-item>`);
      const headerH3 = page.root.querySelector('h3.ath-list-item--title');
      expect(headerH3).toBeDefined();
    });
  });

  describe('clickable', () => {
    it('should emit athClick when clickable and clicked', async () => {
      const page = await testPageItem(`<ath-list-item clickable="true"></ath-list-item>`);
      const button = page.root.querySelector('.clickable') as HTMLElement;

      const spy = jest.fn();
      page.root.addEventListener('athClick', spy);

      button.click();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should render chevron_right icon when clickable and href are set', async () => {
      const page = await testPageItem(`<ath-list-item clickable="true" href="https://www.google.com"></ath-list-item>`);

      const link = page.root.querySelector('a.clickable');
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe('https://www.google.com');

      const icon = page.root.querySelector('ath-icon.icon');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('icon')).toBe('chevron_right');
    });

    it('should not render chevron_right icon when clickable and href are not set', async () => {
      const page = await testPageItem(`<ath-list-item></ath-list-item>`);

      const link = page.root.querySelector('a.clickable');
      expect(link).toBeFalsy();

      const icon = page.root.querySelector('ath-icon.icon');
      expect(icon).toBeFalsy();
    });
  });

  describe('getAriaLabel', () => {
    it('adds custom external-label when target is _blank', async () => {
      const page = await testPageItem(
        `<ath-list-item heading-text="Go to Google" clickable="true" href="www.google.com" ath-aria-label="Go to Google" target="blank" external-label="outside the site"></ath-list-item>`,
      );

      const link = page.root.querySelector('a.clickable');
      expect(link.getAttribute('aria-label')).toBe('Go to Google outside the site');
    });

    it('adds "se abre una nueva ventana" by default when target is _blank and no externalLabel is provided', async () => {
      const page = await testPageItem(
        `<ath-list-item heading-text="Go to Google" ath-aria-label="Go to Google" clickable="true" href="www.google.com" target="blank"></ath-list-item>`,
      );

      const link = page.root.querySelector('a.clickable');
      expect(link.getAttribute('aria-label')).toBe('Go to Google Se abre una ventana nueva');
    });

    it('it does not concatenate external-label when target != _blank', async () => {
      const page = await testPageItem(
        `<ath-list-item heading-text="View profile" clickable="true" href="www.google.com" ath-aria-label="View profile" target="self" external-label="outside the site"></ath-list-item>`,
      );
      const link = page.root.querySelector('a.clickable');
      expect(link.getAttribute('aria-label')).toBe('View profile');
    });

    it('it does not use external-label if no base-label and target != _blank', async () => {
      const page = await testPageItem(`<ath-list-item target="self" clickable="true" href="www.google.com" external-label="only extra"></ath-list-item>`);
      const link = page.root.querySelector('a.clickable');
      expect(link.getAttribute('aria-label')).toBeNull();
    });

    it('it does not set aria-labelledby if neither heading-text nor external-label provided', async () => {
      const page = await testPageItem(`<ath-list-item clickable="true" href="www.google.com"></ath-list-item>`);

      const link = page.root.querySelector('a.clickable');
      expect(link.getAttribute('aria-labelledby')).toBeNull();
    });
  });
});
