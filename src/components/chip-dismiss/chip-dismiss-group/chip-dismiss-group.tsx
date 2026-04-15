import { Component, ComponentInterface, JSX, Host, Prop, h, Element, Listen } from '@stencil/core';
import { ChipDismissSize, ChipDismissSizes } from '../chip-dismiss.model';

@Component({
  tag: 'ath-chip-dismiss-group',
  styleUrls: ['chip-dismiss-group.scss'],
  shadow: true,
})
export class AthChipDismissGroup implements ComponentInterface {
  /**
   * Weather the chips are disabled
   */
  @Prop() disabled: boolean;

  /**
   * The generic size of the chips
   */
  @Prop() size: ChipDismissSizes = ChipDismissSize.Medium;

  /**
   * The width of the group
   */
  @Prop() width: string;

  @Listen('athDismiss')
  handleChipDismiss(event: CustomEvent) {
    const chipEl = event.target as HTMLElement;
    chipEl.remove();
  }

  @Element() host: HTMLElement;

  componentDidLoad(): void {
    this.setChipsDisabled();
    this.setChipsSize();
  }

  setChipsDisabled() {
    if (this.disabled !== undefined) {
      const chips = this.host.querySelectorAll('ath-chip-dismiss');
      if (!chips) return;

      chips.forEach(chip => {
        const currentDisabled = chip.getAttribute('disabled');
        if (currentDisabled === null) {
          chip.setAttribute('disabled', this.disabled.toString());
        }
      });
    }
  }

  setChipsSize() {
    if (!!this.size) {
      const chips = this.host.querySelectorAll('ath-chip-dismiss');
      if (!chips) return;
      chips.forEach((chip: HTMLAthChipDismissElement) => {
        const currentSize = chip.getAttribute('size');
        if (!currentSize && this.size) {
          chip.size = this.size;
        }
      });
    }
  }

  render(): JSX.Element {
    return (
      <Host role="group" style={this.width ? { width: this.width } : undefined}>
        <slot />
      </Host>
    );
  }
}
