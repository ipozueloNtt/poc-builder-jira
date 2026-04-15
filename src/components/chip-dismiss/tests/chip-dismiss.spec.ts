import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthIcon } from '../../icon/icon';
import { AthChipDismiss } from '../chip-dismiss';
import { ChipDismissSize } from '../chip-dismiss.model';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthChipDismiss, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-chip-dismiss', () => {
  describe('render', () => {
    it('should render the component with default properties', async () => {
      const page = await testPage(`<ath-chip-dismiss heading-text="test"></ath-chip-dismiss>`);
      expect(page.root).toBeTruthy();
      expect(page.root).toHaveProperty('size', ChipDismissSize.Medium);
      expect(page.root).toHaveProperty('disabled', false);
    });

    it('should display the passed headingText', async () => {
      const page = await testPage(`<ath-chip-dismiss heading-text="Texto chip"></ath-chip-dismiss>`);
      const span = page.root.shadowRoot.querySelector('.ath-chip-dismiss__text');
      expect(span).toEqualText('Texto chip');
    });

    it('should render the icon when provided', async () => {
      const page = await testPage(`<ath-chip-dismiss icon="check"></ath-chip-dismiss>`, [AthIcon]);
      const icon = page.root.shadowRoot.querySelector('.ath-chip-dismiss__container > ath-icon');
      expect(icon).toBeTruthy();
    });

    it('should not render an icon if the icon prop is "null"', async () => {
      const page = await testPage(`<ath-chip-dismiss icon="null"></ath-chip-dismiss>`);
      const icon = page.root.shadowRoot.querySelector('.ath-chip-dismiss__container > ath-icon');
      expect(icon).toBeFalsy();
    });

    it('should have the correct size class', async () => {
      const page = await testPage(`<ath-chip-dismiss size="small"></ath-chip-dismiss>`);
      const container = page.root.shadowRoot.querySelector('.ath-chip-dismiss__container');
      expect(container).toHaveClass('ath-chip-dismiss__container--small');
    });
  });

  describe('interaction', () => {
    it('should emit athDismiss event when clicking the close button', async () => {
      const page = await testPage(`<ath-chip-dismiss></ath-chip-dismiss>`);
      const button = page.root.shadowRoot.querySelector('.ath-chip-dismiss__button');
      const athDismiss = jest.fn();
      page.root.addEventListener('athDismiss', athDismiss);

      (button as HTMLElement).click();
      await page.waitForChanges();
      expect(athDismiss).toHaveBeenCalled();
    });

    it('should not emit athDismiss event when disabled', async () => {
      const page = await testPage(`<ath-chip-dismiss disabled='true'></ath-chip-dismiss>`);
      const button = page.root.shadowRoot.querySelector('.ath-chip-dismiss__button');
      const athDismiss = jest.fn();
      page.root.addEventListener('athDismiss', athDismiss);

      (button as HTMLElement).click();
      await page.waitForChanges();
      expect(athDismiss).not.toHaveBeenCalled();
    });
  });
});
