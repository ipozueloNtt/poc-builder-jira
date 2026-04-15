import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthCollapse } from '../collapse';

describe('ath-collapse', () => {
  const testPage = (props = ''): Promise<SpecPage> => {
    return newSpecPage({
      components: [AthCollapse],
      html: `<ath-collapse ${props} id="test-collapse"></ath-collapse>`,
      supportsShadowDom: true,
    });
  };

  it('renders correctly', async () => {
    const page = await testPage();
    expect(page.root).toBeTruthy();
  });

  it('is collapsed by default', async () => {
    const page = await testPage();
    expect(page.rootInstance.isExpanded).toBe(false);
    const collapse = page.root.shadowRoot.querySelector('.ath-collapse');
    expect(collapse).toHaveClass('ath-collapse--collapsed');
    expect(collapse).not.toHaveClass('ath-collapse--expanded');
  });

  it('expands when show=true', async () => {
    const page = await testPage('show');
    expect(page.rootInstance.isExpanded).toBe(true);
    const collapse = page.root.shadowRoot.querySelector('.ath-collapse');
    expect(collapse).not.toHaveClass('ath-collapse--collapsed');
    expect(collapse).toHaveClass('ath-collapse--expanded');
  });

  it('toggles state on athToggleCollapse event', async () => {
    const page = await testPage();
    const component = page.rootInstance;
    expect(component.isExpanded).toBe(false);

    window.dispatchEvent(new CustomEvent('athToggleCollapse', { detail: 'test-collapse' }));
    await page.waitForChanges();
    expect(component.isExpanded).toBe(true);

    window.dispatchEvent(new CustomEvent('athToggleCollapse', { detail: 'test-collapse' }));
    await page.waitForChanges();
    expect(component.isExpanded).toBe(false);
  });

  it('emits AthCollapseState event on toggle', async () => {
    const page = await testPage();
    const eventSpy = jest.spyOn(page.rootInstance.AthCollapseState, 'emit');

    window.dispatchEvent(new CustomEvent('athToggleCollapse', { detail: 'test-collapse' }));
    await page.waitForChanges();
    expect(eventSpy).toHaveBeenCalledWith({ id: 'test-collapse', isExpanded: true });

    window.dispatchEvent(new CustomEvent('athToggleCollapse', { detail: 'test-collapse' }));
    await page.waitForChanges();
    expect(eventSpy).toHaveBeenCalledWith({ id: 'test-collapse', isExpanded: false });
  });
});
