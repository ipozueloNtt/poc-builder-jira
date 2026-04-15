import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthUserDetail } from '../user-detail';
import { AthAvatar } from 'components/avatar/avatar';
import { AthButtonLink } from 'components/button-link/button-link';

const testPage = (html: string, othersComponents = []): Promise<SpecPage> => {
  const components = [AthAvatar, AthUserDetail, AthButtonLink, ...othersComponents];
  return newSpecPage({
    components,
    html,
    supportsShadowDom: true,
  });
};

describe('ath-user-detail render', () => {
  it('renders with default type prop', async () => {
    const page = await testPage(`<ath-user-detail></ath-user-detail>`);
    expect(page.root).toBeTruthy();

    const userDetail = page.root;
    expect(userDetail).toHaveProperty('type', undefined);
  });

  it('should not render avatar when type is "hide-avatar"', async () => {
    const page = await testPage(`<ath-user-detail type="hide-avatar"></ath-user-detail>`);
    expect(page.root).toBeTruthy();
    const avatar = page.root.shadowRoot.querySelector('ath-avatar');
    expect(avatar).toBeNull();
  });

  it('renders with description', async () => {
    const description = 'this is a description';
    const page = await testPage(`<ath-user-detail description="${description}"></ath-user-detail>`);
    expect(page.root).toBeTruthy();

    const userDescription = page.root.shadowRoot.querySelector('.ath-user-detail__content__description');
    expect(userDescription).toBeTruthy();
    expect(userDescription).toEqualText(description);
  });

  it('renders with clickable label(ath-button-link)', async () => {
    const userName = 'Fernando Garcia';
    const page = await testPage(`<ath-user-detail user-name="${userName}" clickable></ath-user-detail>`);
    expect(page.root).toBeTruthy();

    const athButtonLink = page.root.shadowRoot.querySelector('ath-button-link');
    expect(athButtonLink).toBeTruthy();
  });

  it('renders with label', async () => {
    const userName = 'Fernando Garcia';
    const page = await testPage(`<ath-user-detail user-name="${userName}"></ath-user-detail>`);
    expect(page.root).toBeTruthy();

    const label = page.root.shadowRoot.querySelector('.ath-user-detail__label');
    expect(label).toEqualText(userName);
  });

  it('renders with image when src-image is filled', async () => {
    const srcImage = './assets/images/person-shadow.png';
    const page = await testPage(`<ath-user-detail src-image="${srcImage}"></ath-user-detail>`);
    expect(page.root).toBeTruthy();

    const img = page.root.shadowRoot.querySelector('img');
    expect(img).toBeTruthy();
    expect(img).toEqualAttribute('src', srcImage);
  });

  it('should emit the athAction event when button-link is clicked', async () => {
    const userName = 'Fernando Garcia';
    const page = await testPage(`<ath-user-detail user-name="${userName}" clickable></ath-user-detail>`);
    const athAction = jest.fn();
    page.doc.addEventListener('athAction', athAction);

    const clickEvent = new CustomEvent('athClick', { bubbles: true });
    page.root.dispatchEvent(clickEvent);
    await page.waitForChanges();

    expect(athAction).toHaveBeenCalled();
  });
});
