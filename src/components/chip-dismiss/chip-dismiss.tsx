import { Component, ComponentInterface, Element, Event, EventEmitter, Host, JSX, Prop, h } from '@stencil/core';
import { ChipDismissSize, ChipDismissSizes } from './chip-dismiss.model';

@Component({
  tag: 'ath-chip-dismiss',
  styleUrls: ['chip-dismiss.scss'],
  shadow: true,
})
export class AthChipDismiss implements ComponentInterface {
  @Element() el: HTMLElement | null;

  /**
   * The button is disabled
   */
  @Prop() disabled = false;

  /**
   * The icon to the left
   */
  @Prop() icon: string;

  /**
   * The text in the chip
   */
  @Prop() headingText: string;

  /**
   * The accesible label-dismiss attribute in chip dismiss
   */
  @Prop() labelDismiss = 'Eliminar';

  /**
   * The size of the chip dismiss
   */
  @Prop({ mutable: true }) size: ChipDismissSizes = ChipDismissSize.Medium;

  /**
   * Emitted when the x icon is clicked
   */
  @Event() athDismiss: EventEmitter<void>;

  private handleDismiss = () => {
    if (!this.disabled) {
      this.athDismiss.emit();
    }
  };

  private getSpanClassNames = () => ({
    'ath-chip-dismiss__container': true,
    [`ath-chip-dismiss__container--${this.size}`]: !!this.size,
    'ath-chip-dismiss__container--disabled': this.disabled,
  });

  private renderIcon = () => {
    if (this.icon != 'null') {
      return <ath-icon icon={this.icon} size="xs" color="inherit"></ath-icon>;
    }
  };

  render(): JSX.Element {
    return (
      <Host>
        <span class={this.getSpanClassNames()}>
          {this.icon && this.renderIcon()}
          <span class="ath-chip-dismiss__text">{this.headingText}</span>
          <button aria-label={this.labelDismiss} disabled={this.disabled} class="ath-chip-dismiss__button" type="button" onClick={this.handleDismiss}>
            <ath-icon icon="close_small" size="xs" color="inherit"></ath-icon>
          </button>
        </span>
      </Host>
    );
  }
}
