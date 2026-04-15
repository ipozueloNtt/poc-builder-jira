import { Component, Prop, h, Element, Host, Watch } from '@stencil/core';
import { ActionBarAlignment, ActionBarAlignments, ActionBarSize, ActionBarSizes } from './action-bar.model';

@Component({
  tag: 'ath-action-bar',
  styleUrl: 'action-bar.scss',
  shadow: true,
})
export class AthActionBar {
  @Element() el: HTMLElement;

  /**
   * Indicates the alignment of the inner components
   */
  @Prop() alignment: ActionBarAlignment = ActionBarAlignments.Left;

  /**
   * Indicates the size of the inner components
   */
  @Prop() size: ActionBarSize = ActionBarSizes.Medium;

  componentDidLoad() {
    this.injectToChildren();
  }

  @Watch('size')
  handlePropChange() {
    this.injectToChildren();
  }

  private injectToChildren() {
    const slot = this.el.shadowRoot.querySelector('slot');
    if (!slot) return;

    const assignedElements = slot.assignedElements ? slot.assignedElements() : [];

    assignedElements.forEach(child => {
      const tag = child.tagName.toLowerCase();

      if (tag === 'ath-badge') {
        child.children[0] && ((child.children[0] as any).size = this.size);
      }
      if (tag === 'ath-divider') {
        (child as HTMLAthDividerElement).style.height = this.getDividerHeightToken();
        (child as HTMLAthDividerElement).color = 'boldest';
        (child as HTMLAthDividerElement).orientation = 'vertical';
        (child as HTMLAthDividerElement).size = 'sm';
      } else if (
        tag === 'ath-button' ||
        tag === 'ath-button-expandable' ||
        tag === 'ath-button-link' ||
        tag === 'ath-link' ||
        tag === 'ath-menu-button' ||
        tag === 'ath-segmented-control'
      ) {
        (child as any).size = this.size;
      } else if (tag === 'ath-tooltip') {
        child.children[0] && child.children[0].children[0] && ((child.children[0].children[0] as any).size = this.size);
      }
    });
  }

  private getDividerHeightToken = () => {
    return `var(--ath-sizing-action-bar-divider-height-${this.size})`;
  };

  private getClassNames = () => ({
    'ath-action-bar': true,
    [`ath-action-bar--alignment-${this.alignment}`]: !!this.alignment,
  });

  render() {
    return (
      <Host role="toolbar">
        <div class={this.getClassNames()}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
