import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthChipChoice } from '../chip-choice';
import { AthIcon } from '../../icon/icon';
import { ChipChoiceRole } from '../chip-choice.model';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthChipChoice, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-chip-choice', () => {
  describe('render', () => {
    it('should display the passed text', async () => {
      const text = 'Chip';
      const page = await testPage(`<ath-chip-choice label=${text}></ath-chip-choice>`);
      const span = page.root.shadowRoot.querySelector('.ath-chip-choice__text');
      expect(span).toEqualText(text);
    });

    it('should set default properties', async () => {
      const page = await testPage(`<ath-chip-choice label="test"></ath-chip-choice>`);
      expect(page.root).toHaveProperty('role', `${ChipChoiceRole.Checkbox}`);
    });

    it('should set the small size class when size is sm', async () => {
      const page = await testPage(`<ath-chip-choice label="test" size="sm"></ath-chip-choice>`);
      const container = page.root.shadowRoot.querySelector('.ath-chip-choice__container');
      expect(container).toHaveClass('ath-chip-choice__container--sm');
    });

    it('should set the medium size class when size is md', async () => {
      const page = await testPage(`<ath-chip-choice size="md"></ath-chip-choice>`);
      const container = page.root.shadowRoot.querySelector('.ath-chip-choice__container');
      expect(container).toHaveClass('ath-chip-choice__container--md');
    });

    it('should display icon when icon is filled', async () => {
      const page = await testPage('<ath-chip-choice icon="chevron-left"></ath-chip-choice>', [AthIcon]);
      const icon = page.root.shadowRoot.querySelector('ath-icon');
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#chevron-left');
    });

    it('should set the disabled class when disabled is true', async () => {
      const page = await testPage(`<ath-chip-choice label="test" disabled></ath-chip-choice>`);
      const container = page.root.shadowRoot.querySelector('.ath-chip-choice__container');
      expect(container).toHaveClass('ath-chip-choice__container--disabled');
    });

    it('should set the checked class when checked is true', async () => {
      const page = await testPage(`<ath-chip-choice label="test" selected></ath-chip-choice>`);
      await page.waitForChanges();
      const container = page.root.shadowRoot.querySelector('.ath-chip-choice__container');

      expect(container).toHaveClass('ath-chip-choice__container--checked');
    });
  });

  describe('action', () => {
    let page: SpecPage;
    let chipChoice;

    beforeEach(async () => {
      page = await testPage('<ath-chip-choice></ath-chip-choice>');
      chipChoice = page.root;
    });

    it('should emit the athChange event when clicked', async () => {
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      chipChoice.click();
      expect(athChange).toHaveBeenCalled();
    });

    it('should emit the athFocus event when focused', async () => {
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      chipChoice.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('should emit the athBlur event when blurred', async () => {
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      chipChoice.focus();
      chipChoice.blur();
      expect(athBlur).toHaveBeenCalled();
    });
  });
});
