import { Component, ComponentInterface, Host, Prop, h, Element } from '@stencil/core';
import { AvatarSize, AvatarSizes, AvatarType, AvatarTypes } from './avatar.model';

@Component({
  tag: 'ath-avatar',
  styleUrls: ['avatar.scss'],
  shadow: true,
})
export class AthAvatar implements ComponentInterface {
  /**
   * Initials to display in the avatar.
   */
  @Prop() initials: string;

  /**
   * Size of the avatar.
   */
  @Prop() size: AvatarSize = AvatarSizes.Medium;

  /**
   * Type of avatar (image or initials).
   */
  @Prop() type: AvatarType;

  /**
   * Name used to generate initials if none are provided.
   */
  @Prop() avatarName: string;

  /**
   * The aria-labelledby attribute of the icon
   */
  @Prop() ariaLabelledby?: string;

  @Element() el: HTMLElement;

  private avatarClassType: string;

  private getClassNames = (): { [key: string]: boolean } => ({
    'ath-avatar': true,
    [`ath-avatar--${this.size}`]: true,
  });

  private hasImage(): boolean {
    return !!this.el.querySelector('img');
  }

  private getInitials = () => {
    if (this.initials) {
      this.avatarClassType = 'initials';
      return <span class="ath-avatar--initials">{this.initials.toUpperCase().slice(0, 2)}</span>;
    } else if (this.avatarName) {
      this.avatarClassType = 'initials';
      const initials = this.avatarName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
      return <span class="ath-avatar--initials">{initials}</span>;
    }
    return null;
  };

  private renderContent = () => {
    // If type is defined and is image, Check for image
    if (this.type === AvatarTypes.Image && this.hasImage()) {
      this.avatarClassType = 'image';
      return <slot name="img"></slot>;
    }

    // If type is defined and is initials, check for initials
    if (this.type === AvatarTypes.Initials) {
      return this.getInitials() || this.renderDefaultImg();
    }

    // If type is undefined, check in priority order (image>initials).
    if (!this.type) {
      if (this.hasImage()) {
        this.avatarClassType = 'image';
        return <slot name="img"></slot>;
      }
      const initialsContent = this.getInitials();
      if (initialsContent) {
        return initialsContent;
      }
    }

    // Fallback to default image
    return this.renderDefaultImg();
  };

  componentDidLoad(): void {
    const athAvatar = this.el.shadowRoot.querySelector('.ath-avatar');
    athAvatar.classList.add('ath-avatar--' + (this.avatarClassType || 'default'));
  }

  private renderDefaultImg = () => {
    const theme = document.body.dataset.theme || 'core';
    const assetsPath = `assets/images/pictograms/${theme}/`;
    return (
      <svg focusable="false" aria-hidden="true" viewBox="0 0 32 32">
        <use xlinkHref={`${assetsPath}illu_male.svg`}></use>
      </svg>
    );
  };

  private hasAriaLabel() {
    const ariaLabel = this.el.getAttribute('aria-label');
    return !!ariaLabel?.trim();
  }

  private hasAriaLabelledBy() {
    return !this.hasAriaLabel() && !!this.ariaLabelledby?.trim();
  }

  private getHostAttributes() {
    const ariaLabel = this.el.getAttribute('aria-label');
    const hasLabel = this.hasAriaLabel() || this.hasAriaLabelledBy();
    const currentAriaLabel = this.hasAriaLabel() ? ariaLabel.trim() : !!this.avatarName ? this.avatarName : undefined;
    return {
      'aria-label': currentAriaLabel,
      'role': hasLabel ? 'img' : !!this.avatarName ? 'img' : undefined,
    };
  }

  render() {
    return (
      <Host {...this.getHostAttributes()}>
        <div class={this.getClassNames()}>{this.renderContent()}</div>
      </Host>
    );
  }
}
