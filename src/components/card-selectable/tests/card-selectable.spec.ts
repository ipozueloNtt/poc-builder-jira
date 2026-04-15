import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthCardSelectable } from '../card-selectable';
import { AthCardSelectableGroup } from '../card-selectable-group/card-selectable-group';
import { AthTag } from 'components/tag/tag';
import { AthIcon } from 'components/icon/icon';

const testCardSelectable = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthCardSelectable, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};
const testCardSelectableGroup = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthCardSelectableGroup, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

describe('ath-card-selectable', () => {
  describe('render', () => {
    it('should set default classes', async () => {
      const page = await testCardSelectable(`<ath-card-selectable></ath-card-selectable>`);
      const athComponent = page.root;
      const card = athComponent.querySelector('.ath-card-selectable');
      expect(card).not.toHaveClass('ath-card-selectable--disabled');
      expect(card).not.toHaveClass('ath-card-selectable--selected');
      expect(card).toHaveClass('ath-card-selectable--single');
      expect(card).toHaveClass('ath-card-selectable--sm');
    });

    it('should set disabled class when disabled is true', async () => {
      const page = await testCardSelectable(`<ath-card-selectable disabled=true></ath-card-selectable>`);
      const athComponent = page.root;
      const card = athComponent.querySelector('.ath-card-selectable');
      expect(card).toHaveClass('ath-card-selectable--disabled');
    });

    it('should have tag when tag property is filled', async () => {
      const page = await testCardSelectable(`<ath-card-selectable tag='tag'></ath-card-selectable>`, [AthTag]);
      const athComponent = page.root;
      const tag = athComponent.querySelector('ath-tag');
      expect(tag).toBeDefined();
    });

    it('Should have text filling overlay heading-text and subtitle property', async () => {
      const overlineText = 'overline';
      const headlineText = 'headline';
      const subheadlineText = 'subhealine';

      const page = await testCardSelectable(`<ath-card-selectable heading-text=${headlineText} subtitle=${subheadlineText} overline=${overlineText}></ath-card-selectable>`, [
        AthTag,
      ]);
      const athComponent = page.root;
      const headline = athComponent.querySelector('.ath-card-selectable_headline');
      const subheadline = athComponent.querySelector('.ath-card-selectable_subheadline');
      const overline = athComponent.querySelector('.ath-card-selectable_overline');

      expect(headline).toEqualText(headlineText);
      expect(subheadline).toEqualText(subheadlineText);
      expect(overline).toEqualText(overlineText);
    });

    it('should set role checkbox when type is multiselect', async () => {
      const page = await testCardSelectable(`<ath-card-selectable type='multiselect'></ath-card-selectable>`);
      const athComponent = page.root;
      expect(athComponent).toEqualAttribute('role', 'checkbox');
    });

    it('Should have check icon when selected is true', async () => {
      const page = await testCardSelectable(`<ath-card-selectable selected=true></ath-card-selectable>`, [AthIcon]);

      const icon = page.root.querySelector('ath-icon');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#check');
    });

    it('Should have completed icon when selected is true & type is multiselect', async () => {
      const page = await testCardSelectable(`<ath-card-selectable type='multiselect' selected=true></ath-card-selectable>`, [AthIcon]);

      const icon = page.root.querySelector('ath-icon');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#completed');
    });

    it('should not emit the athChange event when clicked & is disabled', async () => {
      const athChange = jest.fn();
      const page = await testCardSelectable(`<ath-card-selectable disabled=true></ath-card-selectable>`);
      const athComponent = page.root;
      page.root.addEventListener('athChange', athChange);
      athComponent.click();
      expect(athChange).not.toHaveBeenCalled();
    });
  });

  describe('action', () => {
    let page: SpecPage;
    let cardSelectable;

    beforeEach(async () => {
      page = await testCardSelectable('<ath-card-selectable></ath-card-selectable>');
      cardSelectable = page.root;
    });

    it('should emit the athChange event when clicked', async () => {
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      cardSelectable.click();
      expect(athChange).toHaveBeenCalled();
    });

    it('should emit the athFocus event when focused', async () => {
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      cardSelectable.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('should emit the athBlur event when blurred', async () => {
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      cardSelectable.focus();
      cardSelectable.blur();
      expect(athBlur).toHaveBeenCalled();
    });

    it('should emit the athChange event when Space is pressed', async () => {
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });

      cardSelectable.onkeydown(spaceEvent);
      await page.waitForChanges();
      expect(athChange).toHaveBeenCalled();
    });
  });

  describe('action2', () => {
    let page: SpecPage;
    let cardSelectable;

    beforeEach(async () => {
      page = await testCardSelectable('<ath-card-selectable type="multiselect"></ath-card-selectable>');
      cardSelectable = page.root;
    });

    it('should emit the athChange event when clicked & is multiselect', async () => {
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      cardSelectable.click();
      expect(athChange).toHaveBeenCalled();
    });
  });
});

describe('ath-card-selectable-group', () => {
  describe('render', () => {
    it('should set default properties & role', async () => {
      const page = await testCardSelectableGroup('<ath-card-selectable-group></ath-card-selectable-group>');
      const element = page.root;
      expect(element).not.toHaveAttribute('disabled');
      expect(element).not.toHaveAttribute('multiple');
      expect(element).toEqualAttribute('role', 'radiogroup');
    });

    it('should spread properties to cards', async () => {
      const page = await testCardSelectableGroup(
        `<ath-card-selectable-group disabled="true" multiple="true">
      <div class="ath-layout">
        <div class="ath-container--sm ath-grid-g--2 ath-container-margin--sm ath-row--sm">
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
        </div>
      </div>
    </ath-card-selectable-group>`,
        [AthCardSelectable],
      );
      const element = page.root;
      const cards = element.querySelectorAll('ath-card-selectable');

      expect(cards[0]).toEqualAttribute('disabled', 'true');
      expect(cards[0]).toEqualAttribute('role', 'checkbox');

      expect(cards[1]).toEqualAttribute('disabled', 'true');
      expect(cards[1]).toEqualAttribute('role', 'checkbox');
    });

    it('should tabindex be 0 on third card and -1 on first card when pressing arrowdown and second card is disabled', async () => {
      const page = await testCardSelectableGroup(
        `<ath-card-selectable-group>
      <div class="ath-layout">
        <div class="ath-container--sm ath-grid-g--2 ath-container-margin--sm ath-row--sm">
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag" disabled="true"></ath-card-selectable>
          </div>
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
        </div>
      </div>
    </ath-card-selectable-group>`,
        [AthCardSelectable],
      );
      const element = page.root;
      const cards = element.querySelectorAll('ath-card-selectable');

      expect(cards[0]).toEqualAttribute('tabindex', 0);

      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        code: 'ArrowDown',
        bubbles: true,
      });

      cards[0].dispatchEvent(arrowDownEvent);
      await page.waitForChanges();

      expect(cards[0]).toEqualAttribute('tabindex', -1);
      expect(cards[2]).toEqualAttribute('tabindex', 0);

      const arrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });

      cards[2].dispatchEvent(arrowUpEvent);
      await page.waitForChanges();

      expect(cards[0]).toEqualAttribute('tabindex', 0);
      expect(cards[2]).toEqualAttribute('tabindex', -1);
    });

    it('should tabindex be 0 on second card and -1 on first card when pressing arrowup and third card is disabled', async () => {
      const page = await testCardSelectableGroup(
        `<ath-card-selectable-group>
      <div class="ath-layout">
        <div class="ath-container--sm ath-grid-g--2 ath-container-margin--sm ath-row--sm">
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag" disabled="true"></ath-card-selectable>
          </div>
        </div>
      </div>
    </ath-card-selectable-group>`,
        [AthCardSelectable],
      );
      const element = page.root;
      const cards = element.querySelectorAll('ath-card-selectable');

      expect(cards[0]).toEqualAttribute('tabindex', 0);

      const arrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });

      cards[0].dispatchEvent(arrowUpEvent);
      await page.waitForChanges();

      expect(cards[0]).toEqualAttribute('tabindex', -1);
      expect(cards[1]).toEqualAttribute('tabindex', 0);
    });

    it('should selected be false on first card and true on second card when clicked', async () => {
      const page = await testCardSelectableGroup(
        `<ath-card-selectable-group>
      <div class="ath-layout">
        <div class="ath-container--sm ath-grid-g--2 ath-container-margin--sm ath-row--sm">
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag" selected="true"></ath-card-selectable>
          </div>
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
        </div>
      </div>
    </ath-card-selectable-group>`,
        [AthCardSelectable],
      );
      const element = page.root;
      const cards = element.querySelectorAll('ath-card-selectable');

      expect(cards[0].selected).toBe(true);

      cards[1].click();
      await page.waitForChanges();
      expect(cards[0].selected).toBe(false);
      expect(cards[1].selected).toBe(true);
    });
  });

  describe('action', () => {
    let page: SpecPage;
    let cardSelectableGroup;

    beforeEach(async () => {
      page = await testCardSelectableGroup(
        `<ath-card-selectable-group>
      <div class="ath-layout">
        <div class="ath-container--sm ath-grid-g--2 ath-container-margin--sm ath-row--sm">
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
          <div class="ath-col--4">
            <ath-card-selectable overline="overline" heading-text="headline" subtitle="subhealine" tag="tag"></ath-card-selectable>
          </div>
        </div>
      </div>
    </ath-card-selectable-group>`,
        [AthCardSelectable],
      );
      cardSelectableGroup = page.root;
    });

    it('should emit the athValueChanged event when a card is clicked', async () => {
      const athValueChanged = jest.fn();
      page.root.addEventListener('athValueChanged', athValueChanged);
      await page.waitForChanges();
      const cards = cardSelectableGroup.querySelectorAll('ath-card-selectable');
      cards[0].click();
      expect(athValueChanged).toHaveBeenCalled();
    });

    it('should emit the athValueChanged event when a card is clicked', async () => {
      const athValueChanged = jest.fn();
      page.root.addEventListener('athValueChanged', athValueChanged);
      await page.waitForChanges();
      const cards = cardSelectableGroup.querySelectorAll('ath-card-selectable');
      cards[0].click();
      expect(athValueChanged).toHaveBeenCalled();
    });

    it('should tabindex be 0 on next card and -1 on previous card when pressing arrowdown or arrowright', async () => {
      const cards = cardSelectableGroup.querySelectorAll('ath-card-selectable');

      expect(cards[0]).toEqualAttribute('tabindex', 0);

      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        code: 'ArrowDown',
        bubbles: true,
      });

      cardSelectableGroup.dispatchEvent(arrowDownEvent);
      await page.waitForChanges();

      expect(cards[0]).toEqualAttribute('tabindex', -1);
      expect(cards[1]).toEqualAttribute('tabindex', 0);

      const arrowRightEvent = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        code: 'ArrowRight',
        bubbles: true,
      });
      cardSelectableGroup.dispatchEvent(arrowRightEvent);
      await page.waitForChanges();

      expect(cards[1]).toEqualAttribute('tabindex', -1);
      expect(cards[2]).toEqualAttribute('tabindex', 0);
    });

    it('should tabindex be 0 on next card and -1 on previous card when pressing arrowup or arrowleft', async () => {
      const cards = cardSelectableGroup.querySelectorAll('ath-card-selectable');

      expect(cards[0]).toEqualAttribute('tabindex', 0);

      const arrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });

      cardSelectableGroup.dispatchEvent(arrowUpEvent);
      await page.waitForChanges();

      expect(cards[0]).toEqualAttribute('tabindex', -1);
      expect(cards[2]).toEqualAttribute('tabindex', 0);

      const arrowLeftEvent = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
        bubbles: true,
      });
      cardSelectableGroup.dispatchEvent(arrowLeftEvent);
      await page.waitForChanges();

      expect(cards[2]).toEqualAttribute('tabindex', -1);
      expect(cards[1]).toEqualAttribute('tabindex', 0);
    });

    it('should tabindex be 0 on last card and -1 on first card when pressing end key & tabindex be 0 on first card and -1 on last card when pressing home key', async () => {
      const cards = cardSelectableGroup.querySelectorAll('ath-card-selectable');

      expect(cards[0]).toEqualAttribute('tabindex', 0);

      const endEvent = new KeyboardEvent('keydown', {
        code: 'End',
        bubbles: true,
      });

      cardSelectableGroup.dispatchEvent(endEvent);
      await page.waitForChanges();

      expect(cards[0]).toEqualAttribute('tabindex', -1);
      expect(cards[2]).toEqualAttribute('tabindex', 0);

      const homeEvent = new KeyboardEvent('keydown', {
        code: 'Home',
        bubbles: true,
      });

      cardSelectableGroup.dispatchEvent(homeEvent);
      await page.waitForChanges();

      expect(cards[0]).toEqualAttribute('tabindex', 0);
      expect(cards[2]).toEqualAttribute('tabindex', -1);
    });
  });
});
