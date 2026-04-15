import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthEmptyState } from '../empty-state';
import { FcPictogram } from 'sharedfc/input';

const testPage = (html, otherComponents = []): Promise<SpecPage> => {
  const components = [AthEmptyState, ...otherComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

describe('optional/default properties', () => {
  it('should render with default properties', async () => {
    const page = await testPage(`<ath-empty-state></ath-empty-state>`);
    expect(page.root).toHaveProperty('type', 'empty');
    expect(page.root).toHaveProperty('hideImage', false);

    const emptyStateImage = page.root.shadowRoot.querySelector('.ath-empty-state--image.empty');
    expect(emptyStateImage).toBeTruthy();
    expect(emptyStateImage).toHaveClass('ath-empty-state--image');
    expect(emptyStateImage).toHaveClass('empty');
    expect(page.rootInstance.hideImage).toBe(false);
  });
});

describe('check returns correct values to pictograms', () => {
  it('should render "empty img" when type is "empty"', async () => {
    const page = await testPage(`<ath-empty-state type="empty"></ath-empty-state>`, [FcPictogram]);

    const emptyStateImage = page.root.shadowRoot.querySelector('.ath-empty-state--image.empty');
    expect(emptyStateImage).toBeTruthy();

    const pictogram = emptyStateImage.querySelector('img');
    expect(pictogram).toBeTruthy();
    expect(emptyStateImage.firstElementChild.tagName.toLowerCase()).toBe('img');
    expect(pictogram.getAttribute('src')).toContain('assets/images/pictograms/core/illu_empty.svg');
  });

  it('should render "search img" when type is "search-no-results"', async () => {
    const page = await testPage(`<ath-empty-state type="search-no-results"></ath-empty-state>`, [FcPictogram]);

    const emptyStateImage = page.root.shadowRoot.querySelector('.ath-empty-state--image.search-no-results');
    expect(emptyStateImage).toBeTruthy();

    const pictogram = emptyStateImage.querySelector('img');
    expect(pictogram).toBeTruthy();
    expect(emptyStateImage.firstElementChild.tagName.toLowerCase()).toBe('img');
    expect(pictogram.getAttribute('src')).toContain('assets/images/pictograms/core/illu_search.svg');
  });

  it('should render "error_connection img" when type is "error"', async () => {
    const page = await testPage(`<ath-empty-state type="error"></ath-empty-state>`, [FcPictogram]);

    const emptyStateImage = page.root.shadowRoot.querySelector('.ath-empty-state--image.error');
    expect(emptyStateImage).toBeTruthy();

    const pictogram = emptyStateImage.querySelector('img');
    expect(pictogram).toBeTruthy();
    expect(emptyStateImage.firstElementChild.tagName.toLowerCase()).toBe('img');
    expect(pictogram.getAttribute('src')).toContain('assets/images/pictograms/core/illu_error_connection.svg');
  });

  it('should render "default" and use type value for unknown type', async () => {
    const unknownType = 'custom-type';
    const page = await testPage(`<ath-empty-state type="${unknownType}"></ath-empty-state>`, [FcPictogram]);

    const emptyStateImage = page.root.shadowRoot.querySelector(`.ath-empty-state--image.${unknownType}`);
    expect(emptyStateImage).toBeTruthy();

    const pictogram = emptyStateImage.querySelector('img');
    expect(pictogram).toBeTruthy();

    expect(pictogram.getAttribute('src')).toContain(`assets/images/pictograms/core/${unknownType}.svg`);
  });
});

describe('check correct returns of class names', () => {
  it('should include "ath-empty-state--hide-image" when hideImage=true and type !== loading', async () => {
    const page = await testPage(`<ath-empty-state hide-image="true" type="empty"></ath-empty-state>`);
    const emptyState = page.root.shadowRoot.querySelector('.ath-empty-state');

    expect(emptyState.classList.contains('ath-empty-state--hide-image')).toBe(true);
    expect(emptyState.classList.contains('ath-empty-state')).toBe(true);
  });

  it('should NOT include "ath-empty-state--hide-image" when hideImage=false and type !== loading', async () => {
    const page = await testPage(`<ath-empty-state hide-image="false" type="empty"></ath-empty-state>`);
    const emptyState = page.root.shadowRoot.querySelector('.ath-empty-state');

    expect(emptyState.classList.contains('ath-empty-state--hide-image')).toBe(false);
    expect(emptyState.classList.contains('ath-empty-state')).toBe(true);
  });

  it('should NOT include loading classname when type=loading, renders image and sr message', async () => {
    const page = await testPage(`<ath-empty-state type="loading" loading-label="Buscando datos"></ath-empty-state>`);
    await page.waitForChanges();

    const emptyState = page.root.shadowRoot.querySelector('.ath-empty-state--hide-image');
    expect(emptyState).toBeNull();

    const loadingState = page.root.shadowRoot.querySelector('.ath-empty-state--loading');
    expect(loadingState).toBeTruthy();

    const live = page.root.shadowRoot.querySelector('.sr-only') as HTMLElement;
    expect(live).toBeTruthy();

    await sleep(600);
    await page.waitForChanges();
    expect(live.textContent).toBe('Buscando datos');
  });
});

describe('headingTag', () => {
  it('should render heading with correctly when headingText and Level are provided', async () => {
    const headingText = 'Text';
    const headingLevel = 2;

    const page = await testPage(`<ath-empty-state heading-text="${headingText}" heading-level="${headingLevel}"></ath-empty-state>`);
    const emptyStateHeading = page.root.shadowRoot.querySelector(`.ath-h4.heading`);

    expect(emptyStateHeading).toBeTruthy();
    expect(emptyStateHeading.tagName.toLocaleLowerCase()).toBe(`h${headingLevel}`);
    expect(emptyStateHeading.textContent).toBe(`${headingText}`);
    expect(emptyStateHeading).toHaveClass(`ath-h4`);
    expect(emptyStateHeading).toHaveClass('heading');
  });
});

describe('headingLevel y headingSize', () => {
  it('should render heading with correctly when headingLevel and headingSize default are provided', async () => {
    const headingText = 'Text';

    const page = await testPage(`<ath-empty-state heading-text="${headingText}"></ath-empty-state>`);
    const emptyStateHeading = page.root.shadowRoot.querySelector(`.ath-h4.heading`);

    expect(emptyStateHeading).toBeTruthy();
    expect(emptyStateHeading.tagName.toLocaleLowerCase()).toBe(`h4`);
    expect(emptyStateHeading).toHaveClass(`ath-h4`);
    expect(emptyStateHeading).toHaveClass('heading');
  });
  it('should render heading with correctly when headingLevel and headingSize prop are provided', async () => {
    const headingText = 'Text';

    const page = await testPage(`<ath-empty-state heading-text="${headingText}" heading-size="md" heading-level="2"></ath-empty-state>`);
    const emptyStateHeading = page.root.shadowRoot.querySelector(`.ath-h3.heading`);

    expect(emptyStateHeading).toBeTruthy();
    expect(emptyStateHeading.tagName.toLocaleLowerCase()).toBe(`h2`);
    expect(emptyStateHeading).toHaveClass(`ath-h3`);
    expect(emptyStateHeading).toHaveClass('heading');
  });
});
describe('description', () => {
  it('should render description when text is not provided', async () => {
    const descriptionText = 'description';

    const page = await testPage(`<ath-empty-state description="${descriptionText}"></ath-empty-state>`);

    const emptyStateDescription = page.root.shadowRoot.querySelector('.ath-empty-state-info');

    expect(emptyStateDescription).toBeTruthy();
    expect(emptyStateDescription.tagName.toLocaleLowerCase()).toBe('div');
    expect(emptyStateDescription.textContent).toBe(`${descriptionText}`);
  });

  it('should NOT render description when text is provided', async () => {
    const page = await testPage(`<ath-empty-state></ath-empty-state>`);

    const emptyStateDescription = page.root.shadowRoot.querySelector('.description');
    expect(emptyStateDescription).toBeNull();
  });
});
