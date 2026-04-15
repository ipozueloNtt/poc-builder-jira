import { Component, ComponentInterface, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';
import { UserDetailType, UserDetailTypes } from './user-detail.model';

let userDetailSequence = 0;

@Component({
  tag: 'ath-user-detail',
  styleUrls: ['user-detail.scss'],
  shadow: true,
})
export class AthUserDetail implements ComponentInterface {
  private userDetailId = `user-detail-${++userDetailSequence}`;
  private descriptionId = `${this.userDetailId}-description`;

  /**
   * If true, the user can click the button-link.
   */
  @Prop() clickable = false;

  /**
   * Avatar SRC image.
   */
  @Prop() srcImage: string;

  /**
   * User Name.
   */
  @Prop() userName: string;

  /**
   * Type of avatar.
   */
  @Prop() type: UserDetailType = undefined;

  /**
   * User initials.
   */
  @Prop() initials: string;

  /**
   * User Description.
   */
  @Prop() description: string;

  /**
   * The aria-label attribute of the button-link.
   */
  @Prop() buttonAriaLabel: string;

  /**
   * Emmitted when button-link is clicked.
   */
  @Event() athAction: EventEmitter<void>;

  private imgTag = () => {
    if (!!this.srcImage) {
      const src = this.srcImage;
      return <img slot="img" src={src} alt={this.userName} />;
    } else {
      return;
    }
  };

  @Listen('athClick')
  handleClick(ev) {
    ev.stopPropagation();
    this.athAction.emit();
  }

  private renderLabel = () => {
    if (this.clickable) {
      return (
        <ath-button-link icon-position="right" icon="edit_2" aria-label={this.buttonAriaLabel}>
          {this.userName}
        </ath-button-link>
      );
    } else {
      return <span class="ath-user-detail__label">{this.userName}</span>;
    }
  };

  private getAttributes = () => ({
    'avatar-name': !!this.userName ? this.userName : undefined,
    'initials': !!this.initials ? this.initials.substring(0, 2) : undefined,
  });

  render() {
    const avatarAttributes = this.getAttributes();
    return (
      <Host>
        <div class="ath-user-detail">
          {this.type !== UserDetailTypes.HideAvatar && (
            <ath-avatar size="lg" type={this.type} {...avatarAttributes}>
              {this.imgTag()}
            </ath-avatar>
          )}
          <div class="ath-user-detail__content">
            {this.renderLabel()}
            {!!this.description && (
              <span id={this.descriptionId} class="ath-user-detail__content__description">
                {this.description}
              </span>
            )}
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
