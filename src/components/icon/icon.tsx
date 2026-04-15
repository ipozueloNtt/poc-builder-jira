import { Component, ComponentInterface, Element, Host, JSX, Prop, h } from '@stencil/core';
import { IconSize, IconSizeTypes } from '../../utils/helper';
import { IconColor, IconColorTypes } from './icon.model';

@Component({
  tag: 'ath-icon',
  styleUrls: ['icon.scss'],
  shadow: true,
})
export class AthIcon implements ComponentInterface {
  private theme: string;

  @Element() el: HTMLElement | null;

  /**
   * The icon name
   */
  @Prop() icon: string;

  /**
   * The size of the icon
   */
  @Prop({ reflect: true }) size: IconSizeTypes = IconSize.Medium;

  /**
   * Color del icon
   **/
  @Prop() color: IconColorTypes;

  /**
   * The aria-label attribute of the icon
   */
  @Prop() ariaLabel: string | null;

  /**
   * The aria-labelledby attribute of the icon
   */
  @Prop() ariaLabelledby?: string;

  componentWillLoad() {
    this.theme = document.body.dataset.theme || 'core';
  }

  private hasAriaLabel() {
    return !!this.ariaLabel?.trim();
  }

  private hasAriaLabelledBy() {
    return !this.hasAriaLabel() && !!this.ariaLabelledby?.trim();
  }

  private getHostAttributes() {
    const hasLabel = this.hasAriaLabel() || this.hasAriaLabelledBy();

    return {
      'aria-hidden': !hasLabel ? 'true' : undefined,
      'aria-label': this.hasAriaLabel() ? this.ariaLabel.trim() : undefined,
      'aria-labelledby': this.hasAriaLabelledBy() ? this.ariaLabelledby.trim() : undefined,
      'role': hasLabel ? 'img' : undefined,
    };
  }

  private readonly classNames = () => ({
    'ath-icon': true,
    [`ath-icon--${this.size}`]: !!this.size,
    [`ath-icon--${this.getColor()}`]: !!this.getColor(),
  });

  private getColor(): IconColorTypes {
    if (this.color === IconColor.Inherit) {
      return undefined;
    }
    return this.color || IconColor.Default;
  }

  render(): JSX.Element {
    const assetsPath = `assets/images/sprites/${this.theme}/sprites.svg`;

    return (
      <Host {...this.getHostAttributes()}>
        <svg width="1em" height="1em" focusable="false" aria-hidden="true" class={this.classNames()}>
          <use xlinkHref={`${assetsPath}#${this.icon}`}></use>
        </svg>
      </Host>
    );
  }
}
