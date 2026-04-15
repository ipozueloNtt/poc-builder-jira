import { Component, ComponentInterface, JSX, Host, Prop, h, Element, Listen, Event, EventEmitter, AttachInternals, Watch } from '@stencil/core';
import { ChipChoiceSize, ChipChoiceSizes } from '../chip-choice.model';

@Component({
  tag: 'ath-chip-choice-group',
  styleUrls: ['chip-choice-group.scss'],
  shadow: true,
  formAssociated: true,
})
export class AthChipChoiceGroup implements ComponentInterface {
  @Element() el: HTMLAthChipChoiceGroupElement;

  @AttachInternals() internals: ElementInternals;

  /**
   * Weather the chips are disabled
   */
  @Prop() disabled = false;

  /**
   * Allow multiple selection of chips
   */
  @Prop() multiple = false;

  /**
   * The generic name for the chips
   */
  @Prop() name: string;

  /**
   * The generic size of the chips
   */
  @Prop() size: ChipChoiceSizes = ChipChoiceSize.Medium;

  /**
   * The width of the group
   */
  @Prop() width: string;

  /**
   * The value for not multiple (use chip-choice-group as radio-group)
   */
  @Prop({ mutable: true }) value: string;

  @Watch('value')
  watchValueHandler(newValue: string) {
    this.selectByValue(newValue);
  }

  /**
   * Event to emit the current chips checked
   */
  @Event() athChangeValue: EventEmitter<HTMLAthChipChoiceElement[]>;

  @Listen('athChange')
  handleChange(e: CustomEvent) {
    e.stopPropagation();
    if (this.multiple) {
      this.selectedChip = this.getChipIndex(e.detail);
    } else {
      this.selectByValue(e.detail.value);
      this.setValue();
    }
    this.emitCheckedChips();
  }

  @Listen('keydown')
  handleMouseDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowLeft':
        this.movePreviousChip();
        break;

      case 'ArrowRight':
        this.moveNextChip();
        break;

      case 'Home':
        this.selectFocusChip(this.firstEnabledChip);
        break;
      case 'End':
        this.selectFocusChip(this.lastEnabledChip);
        break;

      default:
        break;
    }
  }

  private chips: Array<HTMLAthChipChoiceElement> = [];
  private selectedChip: number;
  private firstEnabledChip: number;
  private lastEnabledChip: number;
  private initialValue: string;

  componentDidLoad(): void {
    this.loadChips();
    this.propagateAttributes();
    this.initialValue = this.value;

    if (this.value) {
      this.selectByValue(this.value);
      this.setInputValue(this.value);
    } else {
      this.setFocusFirstChip();
    }
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.selectByValue(this.value);
    this.setInputValue(this.initialValue);
    this.emitCheckedChips();
  }

  private loadChips(): void {
    this.chips = this.getChips();
    this.firstEnabledChip = this.getFirstEnabledChip();
    this.lastEnabledChip = this.getLastEnabledChip();
  }

  private setFocusFirstChip() {
    const firstChecked = this.getFirstCheckedChip();
    this.selectFocusChip(firstChecked > -1 ? firstChecked : this.firstEnabledChip);
  }

  private getChips(): Array<HTMLAthChipChoiceElement> {
    const chipsElements = this.el.querySelectorAll('ath-chip-choice');
    const chips = [];

    if (chipsElements) {
      chipsElements.forEach(chip => {
        chips.push(chip);
      });
    }

    return chips;
  }

  private propagateAttributes() {
    if (this.chips) {
      this.chips.forEach(chip => {
        this.propagateAttribute(chip);
      });
    }
  }

  private propagateAttribute(chip: HTMLAthChipChoiceElement) {
    if (!chip) {
      return;
    }

    chip.role = this.multiple ? 'checkbox' : 'radio';

    // Boolean attibute propagate only for true
    if (this.disabled) {
      chip.disabled = true;
    }

    if (this.size && !chip.hasAttribute('size')) {
      chip.setAttribute('size', this.size);
    }

    if (this.name && this.multiple) {
      chip.setAttribute('name', this.name);
    } else {
      chip.removeAttribute('name');
    }
  }

  private getFirstEnabledChip(): number {
    return this.chips.findIndex(chip => !chip.disabled);
  }

  private getLastEnabledChip(): number {
    for (let index = this.chips.length - 1; index >= 0; index--) {
      if (!this.chips[index].disabled) {
        return index;
      }
    }

    return -1;
  }

  private getFirstCheckedChip(): number {
    const index = this.chips.findIndex(chip => chip.selected && !chip.disabled);
    return index;
  }

  private getChipIndex(chip: HTMLAthChipChoiceElement) {
    return this.chips.findIndex(item => item === chip);
  }

  private getHostStyles() {
    return {
      width: this.width || undefined,
    };
  }

  private moveNextChip() {
    const next = this.chips.findIndex((chip, index) => index > this.selectedChip && !chip.disabled);
    this.selectFocusChip(next === -1 ? this.firstEnabledChip : next);
  }

  private movePreviousChip() {
    let prevIndex = this.selectedChip - 1;

    while (prevIndex >= 0 && this.chips[prevIndex].disabled) {
      prevIndex--;
    }

    this.selectFocusChip(prevIndex === -1 ? this.lastEnabledChip : prevIndex);
  }

  private selectFocusChip(index: number) {
    this.selectedChip = index;
    this.chips.forEach(chip => {
      chip.unselect();
    });
    this.chips[this.selectedChip].select();
  }

  private selectByValue(value: string): void {
    if (!this.multiple) {
      this.unCheckAllChips();
      const selectedIndex = this.chips.findIndex(chip => chip.value === value);
      this.selectedChip = selectedIndex;
      if (selectedIndex !== -1) {
        this.chips[selectedIndex].selected = true;
        this.chips[selectedIndex].select();
      }
    }
  }

  private unCheckAllChips() {
    this.chips.forEach(chip => {
      chip.selected = false;
      chip.unselect();
    });
  }

  private emitCheckedChips(): void {
    const chips = this.chips.filter(chip => chip.selected);
    this.athChangeValue.emit(chips);
  }

  private setValue() {
    if (!this.multiple) {
      const value = this.selectedChip > -1 ? this.chips[this.selectedChip].value : '';
      this.value = value;
      this.setInputValue(value);
    }
  }

  private setInputValue(value: string): void {
    if (!this.multiple && this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(value);
      this.internals.checkValidity();
    }
  }

  render(): JSX.Element {
    return (
      <Host role={this.multiple ? 'group' : 'radiogroup'} style={this.getHostStyles()}>
        <slot />
      </Host>
    );
  }
}
