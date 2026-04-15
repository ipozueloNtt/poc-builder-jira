import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthCard } from '../card';
import { AthCardThumbnail } from '../card-thumbnail/card-thumbnail';
import { AthIcon } from '../../icon/icon';
import { AthTag } from '../../tag/tag';

const testCard = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthCard, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};
const testCardThumbnail = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthCardThumbnail, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

describe('ath-card', () => {
  describe('render', () => {
    it('should set default classes and properties', async () => {
      const page = await testCard(`<ath-card></ath-card>`);
      const athComponent = page.root;
      const card = athComponent.querySelector('.ath-card');
      const wrapper = athComponent.querySelector('.ath-card-wrapper');
      expect(card).not.toHaveClass('ath-card--clickable');
      expect(card).not.toHaveClass('ath-card--fluid');
      expect(card).toHaveClass('ath-card--vertical');
      expect(wrapper).toHaveClass('ath-card-wrapper--sm');
    });

    it('should set class md when size is md', async () => {
      const page = await testCard(`<ath-card size="md"></ath-card>`);
      const athComponent = page.root;
      const wrapper = athComponent.querySelector('.ath-card-wrapper');
      expect(wrapper).toHaveClass('ath-card-wrapper--md');
    });

    it('should set class horizontal when orientation is horizontal', async () => {
      const page = await testCard(`<ath-card orientation="horizontal"></ath-card>`);
      const athComponent = page.root;
      const card = athComponent.querySelector('.ath-card');
      expect(card).toHaveClass('ath-card--horizontal');
    });

    it('should set class clickable when clickable is true', async () => {
      const page = await testCard(`<ath-card clickable="true"></ath-card>`);
      const athComponent = page.root;
      const card = athComponent.querySelector('.ath-card');
      expect(card).toHaveClass('ath-card--clickable');
    });

    it('should set class fluid when fluid is true', async () => {
      const page = await testCard(`<ath-card fluid="true"></ath-card>`);
      const athComponent = page.root;
      const card = athComponent.querySelector('.ath-card');
      expect(card).toHaveClass('ath-card--fluid');
    });

    it('should set icon arrow when clickable is true', async () => {
      const page = await testCard(`<ath-card clickable="true"></ath-card>`, [AthIcon]);
      const athComponent = page.root;
      const icon = athComponent.querySelector('ath-icon');
      expect(icon.shadowRoot.querySelector('svg')).toHaveClasses(['ath-icon']);
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#arrow_right');
    });
  });

  describe('action', () => {
    let page: SpecPage;
    let card;

    beforeEach(async () => {
      page = await testCard('<ath-card clickable="true"></ath-card>');
      card = page.root.querySelector('.ath-card');
    });

    it('should emit the athClick event when clicked', async () => {
      const athClick = jest.fn();
      page.root.addEventListener('athClick', athClick);
      card.click();
      expect(athClick).toHaveBeenCalled();
    });

    it('should emit the athFocus event when focused', async () => {
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      card.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('should emit the athBlur event when blurred', async () => {
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      card.focus();
      card.blur();
      expect(athBlur).toHaveBeenCalled();
    });
  });
});

describe('ath-card-thumbnail', () => {
  describe('render', () => {
    it('should set top tag when has-tag-thumbnail-top is true', async () => {
      const page = await testCardThumbnail(`<ath-card-thumbnail top-tag="test"></ath-card-thumbnail>`, [AthTag]);
      const athComponent = page.root;
      const tag = athComponent.querySelector('ath-tag');
      expect(tag).toBeDefined();
    });

    it('should set bottom tag when has-tag-thumbnail-bottom is true', async () => {
      const page = await testCardThumbnail(`<ath-card-thumbnail bottom-tag="test"></ath-card-thumbnail>`, [AthTag]);
      const athComponent = page.root;
      const tag = athComponent.querySelector('ath-tag');
      expect(tag).toBeDefined();
    });

    it('should set avatar container when type is avatar', async () => {
      const page = await testCardThumbnail(`<ath-card-thumbnail type="avatar"></ath-card-thumbnail>`);
      const athComponent = page.root;
      const avatar = athComponent.querySelector('.ath-card-thumbnail_avatar');
      expect(avatar).toBeDefined();
    });

    it('should set highlight container when type is highlight', async () => {
      const page = await testCardThumbnail(`<ath-card-thumbnail type="highlight"></ath-card-thumbnail>`);
      const athComponent = page.root;
      const avatar = athComponent.querySelector('.ath-card-thumbnail_highlight');
      expect(avatar).toBeDefined();
    });
  });
});
