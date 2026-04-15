import { Component, ComponentInterface, Host, Prop, h } from '@stencil/core';
import { DividerOrientationType, DIVIDER_DEFAULT_ORIENTATION, DividerColorType, DIVIDER_DEFAULT_SIZE, DIVIDER_DEFAULT_COLOR, DividerSizeType } from './divider.model';

@Component({
  tag: 'ath-divider',
  styleUrl: 'divider.scss',
  shadow: true,
})
export class AthDivider implements ComponentInterface {
  /**
   * Orientation of the divider
   **/
  @Prop() orientation: DividerOrientationType = DIVIDER_DEFAULT_ORIENTATION;

  /**
   * Size of the divider
   **/
  @Prop() size: DividerSizeType = DIVIDER_DEFAULT_SIZE;

  /**
   * Color of the divider
   **/
  @Prop() color: DividerColorType = DIVIDER_DEFAULT_COLOR;

  private getAttributes = () => ({
    'role': 'separator',
    'aria-orientation': this.orientation,
  });

  private getClassNames = () => ({
    'ath-divider': true,
    [`ath-divider--orientation-${this.orientation}`]: !!this.orientation,
    [`ath-divider--size-${this.size}`]: !!this.size,
    [`ath-divider--color-${this.color}`]: !!this.color,
  });

  render() {
    return (
      <Host {...this.getAttributes()}>
        <div class={this.getClassNames()}></div>
      </Host>
    );
  }
}
