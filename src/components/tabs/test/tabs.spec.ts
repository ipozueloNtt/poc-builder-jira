import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthTabs } from '../tabs';
import { AthTab } from '../tab/tab';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthTabs, AthTab, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

var counter = 0;
describe('ath-tabs', () => {
  beforeEach(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    counter++;
  });
  describe('render', () => {
    it('should display the passed tab label', async () => {
      const page = await testPage(`
        <ath-tabs>
          <ath-tab id="tab1" label="Tab 1"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
        </ath-tabs>`);
      expect(page.root.querySelector(`[role="tab"]`)).toEqualText('Tab 1');
    });

    it('should display multiple tabs', async () => {
      const page = await testPage(`
        <ath-tabs>
          <ath-tab id="tab1" label="Tab 1"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab2" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
        </ath-tabs>`);
      expect(page.root.querySelectorAll('[role="tab"]').length).toBe(2);
    });

    it('should mark the first not disabled tab as active by default', async () => {
      const page = await testPage(`
        <ath-tabs>
          <ath-tab id="tab1" label="Tab 1" disabled="true"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab2" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
        </ath-tabs>`);

      expect(page.root.querySelector(`#panel-tab-${counter}-tab1`).getAttribute('hidden')).toBeTruthy();
      expect(page.root.querySelector(`#panel-tab-${counter}-tab2`).getAttribute('hidden')).toBeFalsy();
    });

    it('should add --box class if it is of type box', async () => {
      const page = await testPage(`
        <ath-tabs type="box">
          <ath-tab id="tab1" label="Tab 1"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab2" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab3" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
        </ath-tabs>`);

      expect(page.root.querySelector(`#tab-${counter}-tab1`).classList.contains('ath-tab__item--box'));
    });

    it('should add --underline class by default', async () => {
      const page = await testPage(`
        <ath-tabs>
          <ath-tab id="tab1" label="Tab 1"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab2" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab3" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
        </ath-tabs>`);

      expect(page.root.querySelector(`#tab-${counter}-tab1`).classList.contains('ath-tab__item--underline'));
    });

    it('should mark the other tabs as hidden by default', async () => {
      const page = await testPage(`
        <ath-tabs>
          <ath-tab id="tab1" label="Tab 1"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab2" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab3" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
        </ath-tabs>`);

      expect(page.root.querySelector(`#panel-tab-${counter}-tab1`).getAttribute('hidden')).toBeFalsy();
      expect(page.root.querySelector(`#panel-tab-${counter}-tab2`).getAttribute('hidden')).toBeTruthy();
      expect(page.root.querySelector(`#panel-tab-${counter}-tab3`).getAttribute('hidden')).toBeTruthy();
    });

    it('should switch active tab when clicked', async () => {
      const page = await testPage(`
        <ath-tabs>
          <ath-tab id="tab1" label="Tab 1"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab2" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
        </ath-tabs>`);
      expect(page.root.querySelector(`#panel-tab-${counter}-tab1`).getAttribute('hidden')).toBeFalsy();
      expect(page.root.querySelector(`#panel-tab-${counter}-tab2`).getAttribute('hidden')).toBeTruthy();

      const tabs = page.root.querySelector(`#tab-${counter}-tab2`);
      (tabs as HTMLElement).click();
      await page.waitForChanges();

      expect(page.root.querySelector(`#panel-tab-${counter}-tab1`).getAttribute('hidden')).toBeTruthy();
      expect(page.root.querySelector(`#panel-tab-${counter}-tab2`).getAttribute('hidden')).toBeFalsy();
    });

    it('should set the disabled attribute and the disabled class when a tab is disabled', async () => {
      const page = await testPage(`
        <ath-tabs>
          <ath-tab id="tab1" label="Tab 1" disabled="true"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
          <ath-tab id="tab2" label="Tab 2"></ath-tab>
          <ath-panel slot="panel"></ath-panel>
        </ath-tabs>`);
      const tab = page.root.querySelector('ath-tab');
      expect(tab.getAttribute('disabled')).toBe('true');
    });

    it('should display arrows when the screen is smaller', async () => {
      const page = await testPage(`
        <div id="storybook-root" class="w250" style="max-width: 250px">
          <ath-tabs>
            <ath-tab id="tab1" label="Tab 1"></ath-tab>
            <ath-panel slot="panel"></ath-panel>
            <ath-tab id="tab2" label="Tab 2"></ath-tab>
            <ath-panel slot="panel"></ath-panel>
            <ath-tab id="tab3" label="Tab 3"></ath-tab>
            <ath-panel slot="panel"></ath-panel>
            <ath-tab id="tab4" label="Tab 4"></ath-tab>
            <ath-panel slot="panel"></ath-panel>
            <ath-tab id="tab5" label="Tab 5"></ath-tab>
            <ath-panel slot="panel"></ath-panel>
            <ath-tab id="tab6" label="Tab 6"></ath-tab>
            <ath-panel slot="panel"></ath-panel>
          </ath-tabs>
        </div>`);

      const div = page.body.querySelector('div');
      div.style.maxWidth = '250px';
    });
  });
});
