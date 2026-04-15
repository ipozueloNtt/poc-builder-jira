import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthChipDismissGroup } from '../chip-dismiss-group';
import { AthChipDismiss } from 'components/chip-dismiss/chip-dismiss';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthChipDismissGroup, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: true });
};

describe('ath-chip-dismiss-group', () => {
  it('should display chip-dismiss elements', async () => {
    const page = await testPage(
      `<ath-chip-dismiss-group>
            <ath-chip-dismiss heading-text="chip1" ></ath-chip-dismiss>
        </ath-chip-dismiss-group>`,
      [AthChipDismiss],
    );
    const chipDismiss = page.root.querySelector('ath-chip-dismiss');
    expect(chipDismiss).toBeTruthy();
    expect(chipDismiss.getAttribute('heading-text')).toBe('chip1');
  });

  it('should have a width of 100% by default', async () => {
    const page = await testPage(
      `<ath-chip-dismiss-group style="width:300px;">
            <ath-chip-dismiss heading-text="chip1" ></ath-chip-dismiss>
            <ath-chip-dismiss heading-text="chip2" ></ath-chip-dismiss>
            <ath-chip-dismiss heading-text="chip3" ></ath-chip-dismiss>
            <ath-chip-dismiss heading-text="chip4" ></ath-chip-dismiss>
        </ath-chip-dismiss-group>`,
    );
    expect(page.root.style.width).toBe('300px');
  });

  it('should set sizes to chip-dismiss components', async () => {
    const page = await testPage(
      `<ath-chip-dismiss-group size="sm">
            <ath-chip-dismiss heading-text="chip1" ></ath-chip-dismiss>
            <ath-chip-dismiss heading-text="chip2" ></ath-chip-dismiss>
        </ath-chip-dismiss-group>`,
      [AthChipDismiss],
    );
    const chipDismiss = page.root.querySelector('ath-chip-dismiss');
    expect(chipDismiss.size).toBe('sm');
  });

  it('should disable chips', async () => {
    const page = await testPage(
      `<ath-chip-dismiss-group disabled>
            <ath-chip-dismiss heading-text="chip1" ></ath-chip-dismiss>
            <ath-chip-dismiss heading-text="chip2" ></ath-chip-dismiss>
        </ath-chip-dismiss-group>`,
      [AthChipDismiss],
    );
    const chipDismiss = page.root.querySelectorAll('ath-chip-dismiss');
    chipDismiss.forEach(cd => {
      expect(cd.getAttribute('disabled')).toBe('true');
    });
  });

  // Events
  it('should listen the event athDismiss', async () => {
    const page = await testPage(
      `<ath-chip-dismiss-group>
        <ath-chip-dismiss heading-text="chip1"></ath-chip-dismiss>
        <ath-chip-dismiss heading-text="chip2"></ath-chip-dismiss>
      </ath-chip-dismiss-group>`,
      [AthChipDismissGroup, AthChipDismiss],
    );

    const chip = page.root.querySelector('ath-chip-dismiss[heading-text="chip1"]');
    const button = chip.shadowRoot.querySelector('button');

    expect(button).toBeTruthy();

    const athDismiss = jest.fn();
    chip.addEventListener('athDismiss', athDismiss);
    button.click();
    expect(athDismiss).toHaveBeenCalled();
  });

  it('should remove the chip', async () => {
    const page = await testPage(
      `<ath-chip-dismiss-group>
        <ath-chip-dismiss heading-text="chip1"></ath-chip-dismiss>
        <ath-chip-dismiss heading-text="chip2"></ath-chip-dismiss>
      </ath-chip-dismiss-group>`,
      [AthChipDismissGroup, AthChipDismiss],
    );

    let chip = page.root.querySelector('ath-chip-dismiss[heading-text="chip1"]');
    const button = chip.shadowRoot.querySelector('button');

    expect(button).toBeTruthy();

    const athDismiss = jest.fn();
    chip.addEventListener('athDismiss', athDismiss);
    button.click();
    expect(athDismiss).toHaveBeenCalled();

    let chipAfter = page.root.querySelector('ath-chip-dismiss[heading-text="chip1"]');
    expect(chipAfter).toBeNull();
  });

  // Testear accesibilidad
  describe('render', () => {
    it('should set default properties to chip-dismiss-group', async () => {
      const page = await testPage(`<ath-chip-dismiss-group></ath-chip-dismiss-group>`);
      expect(page.root).toBeTruthy();
      expect(page.root.getAttribute('role')).toBe('group');
    });
  });
});
