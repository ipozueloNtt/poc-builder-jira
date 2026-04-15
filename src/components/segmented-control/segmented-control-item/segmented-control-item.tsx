import { Component, ComponentInterface, EventEmitter, Host, Prop, h, Event, Method, Listen, Element, State } from '@stencil/core';
import {
  SegmentedControlSize,
  SegmentedControlColor,
  SegmentedControlItemChangeSelect,
  SegmentedControlItemIconPositions,
  SegmentedControlItemIconPosition,
  SegmentedControlType,
  SegmentedControlTypes,
  SegmentedControlColors,
  SegmentedControlSizes,
} from '../segmented-control.model';
import { transformIconSize, IconType } from '../../../utils/helper';

@Component({
  tag: 'ath-segmented-control-item',
  styleUrl: 'segmented-control-item.scss',
  shadow: true,
})
export class AthSegmentedControlItem implements ComponentInterface {
  @Element() htmlEl: HTMLElement;

  /**
   * Size of the segmented control item
   **/
  @Prop() color: SegmentedControlColor = SegmentedControlColors.Primary;

  /**
   * Size of the segmented control item
   **/
  @Prop() size: SegmentedControlSize = SegmentedControlSizes.Medium;

  /**
   * Icon position of the segmented control item
   */
  @Prop({ reflect: true }) iconPosition: SegmentedControlItemIconPosition = SegmentedControlItemIconPositions.None;

  /**
   * The code of the button's icon (used with iconPosition)
   */
  @Prop() icon: string;

  /**
   * The segmented control item is selected
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * The segmented control is disabled
   */
  @Prop() disabled = false;

  /**
   * The type of the control
   */
  @Prop() type: SegmentedControlType = SegmentedControlTypes.Select;

  /**
   * The value for a Segmented Control with type select (role radio)
   */
  @Prop() value: string;

  /**
   * Emitted when the segmented control item is focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the segmented control item is selected
   */
  @Event() athChange: EventEmitter<SegmentedControlItemChangeSelect>;

  @Method() async unSelectItem() {
    this.selected = false;
    this.tabindex = -1;
  }

  @Method() public async setFocus() {
    if (this.htmlEl) {
      this.htmlEl.focus();
    }
  }

  @Method() async setTabindex(index: number) {
    this.tabindex = index;
  }

  @State() tabindex: number;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (!this.disabled && (event.key === ' ' || event.key === 'Enter')) {
      event.preventDefault();
      this.handleClick();
    }
  }

  componentWillLoad(): Promise<void> | void {
    this.tabindex = this.selected ? 0 : -1;
  }

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleClick = () => {
    if (!this.disabled && !this.selected) {
      this.selected = true;
      this.tabindex = 0;
      this.handleChange();
    }
  };

  private handleChange = () => {
    const detail: SegmentedControlItemChangeSelect = {
      selected: this.selected,
    };
    this.athChange.emit(detail);
  };

  private renderIcon = () => {
    const isIconOnly = this.iconPosition === SegmentedControlItemIconPositions.IconOnly;
    const iconSize = isIconOnly ? transformIconSize(IconType.SegmentedControlItemIconOnly, this.size) : transformIconSize(IconType.SegmentedControlItem, this.size);
    return <ath-icon class="ath-segmented-control-item__icon" icon={this.icon} size={iconSize} color="inherit"></ath-icon>;
  };

  private getHostAttributes = () => {
    const isAction = this.type === SegmentedControlTypes.Action;
    const isSelect = this.type === SegmentedControlTypes.Select;
    return {
      'role': isAction ? 'button' : 'radio',
      ...(isAction && { 'aria-pressed': this.selected ? 'true' : 'false' }),
      ...(isSelect && { 'aria-checked': this.selected ? 'true' : 'false' }),
      'tabindex': this.disabled ? -1 : this.tabindex,
      'onClick': this.handleClick,
      'onFocus': this.handleFocus,
      'aria-disabled': this.disabled ? 'true' : 'false',
    };
  };

  private getClassNames = () => ({
    'ath-segmented-control-item': true,
    [`ath-segmented-control-item--${this.size}`]: !!this.size,
    [`ath-segmented-control-item--${this.color}`]: !!this.color,
    [`ath-segmented-control-item--icon-${this.iconPosition}`]:
      this.iconPosition !== SegmentedControlItemIconPositions.None && this.iconPosition !== SegmentedControlItemIconPositions.IconOnly,
    [`ath-segmented-control-item--${this.iconPosition}`]: this.iconPosition === SegmentedControlItemIconPositions.IconOnly,
    'selected': this.selected,
    'disabled': this.disabled,
  });

  render() {
    return (
      <Host {...this.getHostAttributes()}>
        <div class={this.getClassNames()}>
          {this.icon && this.iconPosition !== SegmentedControlItemIconPositions.None && this.renderIcon()}
          {this.iconPosition != SegmentedControlItemIconPositions.IconOnly && <slot></slot>}
        </div>
      </Host>
    );
  }
}
