import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthActionBar } from '../action-bar';
import { AthButton } from 'components/button/button';
import { AthDivider } from 'components/divider/divider';
import { AthBadge } from 'components/badge/badge';
import { AthTooltip } from 'components/tooltip/tooltip';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthActionBar, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-action-bar render', () => {
  it('should have default properties', async () => {
    const page = await testPage(`<ath-action-bar></ath-action-bar>`);
    expect(page.root.getAttribute('role')).toBe('toolbar');
  });

  it('should have default classes', async () => {
    const page = await testPage(`<ath-action-bar></ath-action-bar>`);
    const athActionBar = page.root.shadowRoot.querySelector('div');
    expect(athActionBar).toHaveClass('ath-action-bar');
    expect(athActionBar).toHaveClass('ath-action-bar--alignment-left');
  });

  it('should have ath-action-bar--alignment-center class', async () => {
    const page = await testPage(`<ath-action-bar alignment="center"></ath-action-bar>`);
    const athActionBar = page.root.shadowRoot.querySelector('div');
    expect(athActionBar).toHaveClass('ath-action-bar--alignment-center');
  });

  it('should have ath-action-bar--alignment-right class', async () => {
    const page = await testPage(`<ath-action-bar alignment="right"></ath-action-bar>`);
    const athActionBar = page.root.shadowRoot.querySelector('div');
    expect(athActionBar).toHaveClass('ath-action-bar--alignment-right');
  });

  it('should inject size to slotted components', async () => {
    const html = `<ath-action-bar alignment="center" size="lg">
      <ath-button color="primary" size="md">Continuar</ath-button>
    </ath-action-bar>`;
    const page = await testPage(html, [AthButton]);
    const athButton = page.root.querySelector('ath-button');

    expect(athButton.size).toBe('lg');
  });

  it('should inject attributes to dividers', async () => {
    const html = `<ath-action-bar alignment="center" size="lg">
      <ath-divider></ath-divider>
    </ath-action-bar>`;
    const page = await testPage(html, [AthDivider]);
    const athDivider = page.root.querySelector('ath-divider');

    expect(athDivider.color).toBe('boldest');
    expect(athDivider.orientation).toBe('vertical');
    expect(athDivider.size).toBe('sm');
    expect(athDivider.style.height).toBe('var(--ath-sizing-action-bar-divider-height-lg)');
  });

  it('should inject size to badge', async () => {
    const html = `<ath-action-bar alignment="center" size="lg">
      <ath-badge color="accent" label="Mensajes pendientes" type="numeric" value="5">
        <ath-button>Button</ath-button>
      </ath-badge>
    </ath-action-bar>`;
    const page = await testPage(html, [AthBadge, AthButton]);
    const athBadge = page.root.querySelector('ath-badge');
    const athButton = athBadge.querySelector('ath-button');

    expect(athButton.getAttribute('size')).toBe('lg');
  });

  it('should inject size to tooltip', async () => {
    const html = `<ath-action-bar alignment="center" size="lg">
      <ath-tooltip heading-text="This is a tooltip" position="bottom" has-arrow="true" color="primary" trigger="hover">
        <ath-button>Button</ath-button>
      </ath-tooltip>
    </ath-action-bar>`;
    const page = await testPage(html, [AthTooltip, AthButton]);
    const athTooltip = page.root.querySelector('ath-tooltip');
    const athButton = athTooltip.querySelector('ath-button');

    expect(athButton.getAttribute('size')).toBe('lg');
  });
});
