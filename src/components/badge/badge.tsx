import { Component, ComponentInterface, Host, JSX, Prop, h, Element, State, Watch } from '@stencil/core';
import { BADGE_DEFAULT_COLOR, BADGE_DEFAULT_TYPE, BadgeColorTypes, BadgePositions, BadgeTypes, MAX_VALUE } from './badge.model';

@Component({
  tag: 'ath-badge',
  styleUrls: ['badge.scss'],
  shadow: true,
})
export class AthBadge implements ComponentInterface {
  /**
   * The badge can display a value or be a decorative element
   **/
  @Prop({ reflect: true }) type: BadgeTypes = BADGE_DEFAULT_TYPE;

  /**
   * Badge color accompanying the purpose of the message
   **/
  @Prop({ reflect: true }) color: BadgeColorTypes = BADGE_DEFAULT_COLOR;

  /**
   * Value displayed within the badge if it is "numeric"
   **/
  @Prop() value = 0;

  /**
   * Value from which a + will be added once exceeded by the "value"
   **/
  @Prop({ reflect: true }) max = MAX_VALUE;

  /**
   *  Accessibility label describing the message
   **/
  @Prop() label;

  /**
   * Positioning of the badge relative to the slot
   **/
  @Prop() position: BadgePositions;

  /**
   * Custom horizontal distance of the badge from its default position
   **/
  @Prop() distanceX = 0;

  /**
   * Custom vertical distance of the badge from its default position
   **/
  @Prop() distanceY = 0;

  @State() _position: BadgePositions;

  @Watch('type')
  @Watch('position')
  handlePosition() {
    this.setPosition();
  }

  private get maxValue(): number {
    return this.max > MAX_VALUE ? MAX_VALUE : this.max;
  }

  private getBadgeStyle = () => ({
    transform: `translate(${this.distanceX}px, ${this.distanceY}px)`,
  });

  private getBadgeValue = () => (this.maxValue < this.value ? `+${this.maxValue}` : `${this.value}`);

  private getClassNames = () => ({
    'ath-badge': true,
    [`ath-badge--${this.type}`]: !!this.type,
    [`ath-badge--${this._position}`]: !!this._position,
    [`ath-badge--${this.color}`]: !!this.color,
  });

  private setPosition = () => {
    if (this.type === 'dot') {
      this._position = this.position || 'right';
    } else {
      this._position = this.position || 'top-right';
    }
  };

  @Element() el: HTMLElement;

  componentWillLoad() {
    this.setPosition();

    const children = this.el.children;

    if (children.length > 1) {
      console.warn('<ath-badge> sólo acepta un elemento como slot.');
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class="ath-badge--container">
          <slot></slot>
          <span class={this.getClassNames()} style={this.getBadgeStyle()}>
            {this.type == 'numeric' && this.getBadgeValue()}
          </span>
          <div class="sr-only">{this.label}</div>
        </div>
      </Host>
    );
  }
}
