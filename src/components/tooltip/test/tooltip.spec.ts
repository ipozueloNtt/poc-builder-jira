import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthTooltip } from '../tooltip';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { TooltipTrigger } from '../tooltip-trigger';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthTooltip, TooltipTrigger, ...othersComponents];
  return newSpecPage({ components, html, supportsShadowDom: false });
};

describe('ath-tooltip', () => {
  it('should build', () => {
    expect(new AthTooltip()).toBeTruthy();
  });

  describe('render', () => {
    it('should render tooltip', async () => {
      const page = await testPage(`<ath-tooltip></ath-tooltip>`);
      expect(page.root).toBeInTheDocument();
    });

    it('should use default values for props', async () => {
      const page = await testPage(`<ath-tooltip></ath-tooltip>`);
      const instance = page.rootInstance;
      expect(instance.hasArrow).toBe(true);
      expect(instance.position).toBe('right');
      expect(instance.color).toBe('primary');
      expect(instance.athMaxWidth).toBe(undefined);
      expect(instance.trigger).toBe('hover');
    });

    it('should render slot content', async () => {
      const text = 'Hover me';
      const page = await testPage(`<ath-tooltip>${text}</ath-tooltip>`);
      expect(page.root).toEqualText(text);
    });

    it('should set tooltip heading-text', async () => {
      const headingText = 'Tooltip label';
      const text = 'Hover me';
      const page = await testPage(`<ath-tooltip heading-text="${headingText}">${text}</ath-tooltip>`);
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.innerHTML).toEqualText(headingText);
    });

    it('should set the position property to top', async () => {
      const page = await testPage(`<ath-tooltip position="top" heading-text="Tooltip text"></ath-tooltip>`);
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.classList.contains('ath-tooltip--top')).toBeTruthy();
    });

    it('should set the position property to bottom', async () => {
      const page = await testPage(`<ath-tooltip position="bottom" heading-text="Tooltip text"></ath-tooltip>`);
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.classList.contains('ath-tooltip--bottom')).toBeTruthy();
    });

    it('should set the position property to left', async () => {
      const page = await testPage(`<ath-tooltip position="left" heading-text="Tooltip text"></ath-tooltip>`);
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.classList.contains('ath-tooltip--left')).toBeTruthy();
    });

    it('should set the position property to right', async () => {
      const page = await testPage(`<ath-tooltip position="right" heading-text="Tooltip text"></ath-tooltip>`);
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.classList.contains('ath-tooltip--right')).toBeTruthy();
    });

    it('should apply the primary color class', async () => {
      const page = await testPage(`<ath-tooltip color="primary" heading-text="Tooltip text"></ath-tooltip>`);
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.classList.contains('ath-tooltip--primary')).toBeTruthy();
    });

    it('should apply the secondary color class', async () => {
      const page = await testPage(`<ath-tooltip color="secondary" heading-text="Tooltip text"></ath-tooltip>`);
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.classList.contains('ath-tooltip--secondary')).toBeTruthy();
    });

    it('should add ath-tooltip--no-arrow class when hasArrow is false', async () => {
      const page = await testPage(`<ath-tooltip has-arrow="false" heading-text="Tooltip text"></ath-tooltip>`);
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.classList.contains('ath-tooltip--no-arrow')).toBeTruthy();
    });

    it('should apply max-width default when maxWidth is not specified', async () => {
      const page = await testPage('<ath-tooltip heading-text="Tooltip text"></ath-tooltip>');
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.getAttribute('style')).toContain('--max-width: 240px');
    });

    it('should apply max-width when maxWidth is set', async () => {
      const page = await testPage('<ath-tooltip heading-text="Tooltip text" max-width="300"></ath-tooltip>');
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.getAttribute('style')).toContain('--max-width: 300px');
    });

    it('should listen to hover events', async () => {
      const page = await testPage(
        `<ath-tooltip trigger="hover" heading-text="This is a tooltip">
          <button>Trigger</button>
        </ath-tooltip>`,
      );
      const button = page.root.querySelector('button');
      button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await page.waitForChanges();
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.className).toContain('ath-tooltip--visible');
    });

    it('should listen to athClick events', async () => {
      const page = await testPage(
        `<ath-tooltip trigger="click" heading-text="This is a tooltip">
          <ath-button>Trigger</ath-button>
        </ath-tooltip>`,
      );
      const button = page.root.querySelector('ath-button');
      button.dispatchEvent(new CustomEvent('athClick', { bubbles: true }));
      await page.waitForChanges();
      const tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.className).toContain('ath-tooltip--visible');
    });

    it('should listen to athFocus and athBlur events and toggle tooltip visibility', async () => {
      const page = await testPage(
        `<ath-tooltip heading-text="This is a tooltip">
          <ath-button>Trigger</ath-button>
        </ath-tooltip>`,
      );
      const button = page.root.querySelector('ath-button');
      button.dispatchEvent(new CustomEvent('athFocus', { bubbles: true }));
      await page.waitForChanges();
      let tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.className).toContain('ath-tooltip--visible');
      button.dispatchEvent(new CustomEvent('athBlur', { bubbles: true }));
      await page.waitForChanges();
      tooltip = page.root.querySelector('.ath-tooltip');
      expect(tooltip.className).not.toContain('ath-tooltip--visible');
    });
  });
});

describe('tooltip trigger', () => {
  it('should render tooltip and tooltip trigger', async () => {
    const page = await testPage(
      `<ath-tooltip heading-text="This is a tooltip">
        <ath-tooltip-trigger></ath-tooltip-trigger>
      </ath-tooltip>`,
    );
    const trigger = page.root.querySelector('ath-tooltip-trigger');
    expect(trigger).toHaveProperty('icon', 'info');
    expect(trigger).toHaveProperty('size', 'md');
  });

  it('should render tooltip and tooltip trigger with specified props', async () => {
    const page = await testPage(
      `<ath-tooltip heading-text="This is a tooltip">
        <ath-tooltip-trigger icon="chevron_up" size="lg"></ath-tooltip-trigger>
      </ath-tooltip>`,
    );
    const trigger = page.root.querySelector('ath-tooltip-trigger');
    expect(trigger).toHaveProperty('icon', 'chevron_up');
    expect(trigger).toHaveProperty('size', 'lg');
  });
  it('should listen tooltip trigger events to toggle visibility', async () => {
    const page = await testPage(
      `<ath-tooltip heading-text="This is a tooltip">
        <ath-tooltip-trigger></ath-tooltip-trigger>
      </ath-tooltip>`,
    );
    const trigger = page.root.querySelector('ath-tooltip-trigger');
    trigger.dispatchEvent(new CustomEvent('athFocus', { bubbles: true }));
    await page.waitForChanges();
    const tooltip = page.root.querySelector('.ath-tooltip');
    expect(tooltip.className).toContain('ath-tooltip--visible');
    trigger.dispatchEvent(new CustomEvent('athBlur', { bubbles: true }));
    await page.waitForChanges();
    expect(tooltip.className).not.toContain('ath-tooltip--visible');
    trigger.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter', bubbles: true }));
    await page.waitForChanges();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Space', bubbles: true }));
    await page.waitForChanges();
    expect(tooltip.className).not.toContain('ath-tooltip--visible');
  });
});
