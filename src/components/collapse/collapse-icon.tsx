import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ath-collapse-icon',
  styleUrl: 'collapse-icon.scss',
  shadow: true,
})
export class AthCollapseIcon {
  /** Current expanded state */
  @Prop({ reflect: true, mutable: true }) expanded: boolean = false;

  private getHostClasses = () => ({
    'ath-collapse-icon': true,
    'ath-collapse-icon--rotate': this.expanded,
  });

  render() {
    return (
      <Host class={this.getHostClasses()}>
        <ath-icon class="ath-collapse-icon__chevron" icon="chevron_down"></ath-icon>
      </Host>
    );
  }
}
