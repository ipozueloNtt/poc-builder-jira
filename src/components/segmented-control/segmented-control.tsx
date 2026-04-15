import { Component, ComponentInterface, Host, Element, Listen, Prop, h, Event, EventEmitter, Watch, AttachInternals } from '@stencil/core';
import {
  SegmentedControlSize,
  SegmentedControlType,
  SegmentedControlColor,
  SegmentedControlFeedback,
  SegmentedControlItemChangeSelect,
  SegmentedControlTypes,
  SegmentedControlFeedbackType,
  SegmentedControlSizes,
  SegmentedControlColors,
} from './segmented-control.model';

import { FcInputFeedback, FcInputFeedbackType, FcInputHelperText, FcInputHelperTextType, FcInputLabel, FcInputLabelType } from '../../sharedfc/input/index';

let segmentedControlSequence = 0;

@Component({
  tag: 'ath-segmented-control',
  styleUrl: 'segmented-control.scss',
  shadow: true,
  formAssociated: true,
})
export class AthSegmentedControl implements ComponentInterface {
  private hostId = `segmentedControl-${++segmentedControlSequence}`;
  private labelId = `${this.hostId}-label`;
  private helperTextId = `${this.hostId}-helper-text`;
  private feedbackId = `${this.hostId}-feedback`;
  private requiredLabelId = `${this.hostId}-req-label`;
  private initialValue: string;

  @Element() htmlEl: HTMLElement | null;

  @AttachInternals() internals: ElementInternals;

  /**
   * Types of the segmented control
   **/
  @Prop({ mutable: true }) type: SegmentedControlType = SegmentedControlTypes.Select;

  /**
   * Size of the segmented control
   **/
  @Prop({ mutable: true }) size: SegmentedControlSize = SegmentedControlSizes.Medium;

  /**
   * Color of the segmented control
   */
  @Prop({ mutable: true }) color: SegmentedControlColor = SegmentedControlColors.Primary;

  /**
   * The segmented control is disabled
   */
  @Prop({ mutable: true }) disabled = false;

  /**
   * Label text for the segmented control
   */
  @Prop({ mutable: true }) label: string;

  /**
   * The name of the segmented control to use with forms
   */
  @Prop() name: string;

  /**
   * Text to show when the label of segmented control its not visible
   */
  @Prop({ mutable: true }) ariaLabel: string | null;

  /**
   * Helper text for the segmented control
   */
  @Prop({ mutable: true }) helperText: string;

  /**
   * Type of feedback to show
   */
  @Prop({ mutable: true }) feedback: SegmentedControlFeedback = SegmentedControlFeedbackType.None;

  /**
   * Feedback text
   */
  @Prop({ mutable: true }) feedbackText: string;

  /**
   * Show if is required
   */
  @Prop({ mutable: true }) required = false;

  /**
   * Show if is required in the label
   */
  @Prop({ mutable: true }) hideRequired = false;

  /**
   * Show if is required in the label
   */
  @Prop({ mutable: true }) requiredAriaLabel;

  /**
   * Show the tooltip text
   */
  @Prop({ mutable: true }) tooltipText: string;

  /**
   * Show the width of the tooltip
   */
  @Prop({ mutable: true }) tooltipWidth = 0;

  /**
   * Set the value to select the checked ath-radio-button
   */
  @Prop({ mutable: true }) value: string;

  @Watch('value')
  watchValue(newValue: string) {
    this.selectSegmentedItemByValue(newValue);
  }

  @Event() athChangeValue: EventEmitter<HTMLAthSegmentedControlItemElement>;

  componentWillLoad(): Promise<void> | void {
    this.initialValue = this.value;
    if (this.value == null) {
      const items = Array.from(this.htmlEl.querySelectorAll('ath-segmented-control-item')) as HTMLAthSegmentedControlItemElement[];
      const preselected = items.find(i => i.selected);
      if (preselected) {
        this.value = preselected.value;
      }
    }
  }

  /**
   * Call method to update the children props, and event listener
   */
  componentDidLoad() {
    this.updateChildrenProps();
    if (this.value) {
      this.selectSegmentedItemByValue(this.value);
    } else {
      this.selectSegmentedItemBySelected();
      this.forceFirstTabFocusIfNoItemsSelected();
    }

    // For action type, ensure there's always a selected option
    // Use requestAnimationFrame to ensure child components are fully rendered
    if (this.type === SegmentedControlTypes.Action) {
      requestAnimationFrame(() => {
        this.ensureSelection();
      });
    }
  }

  /**
   * Update the segmented control items props
   */
  componentDidUpdate() {
    this.updateChildrenProps();

    // For action type, ensure selection after updates
    if (this.type === SegmentedControlTypes.Action) {
      requestAnimationFrame(() => {
        this.ensureSelection();
      });
    }
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.selectSegmentedItemByValue(this.initialValue);
  }

  /**
   * Update the segmented control items props
   */
  handlePropsChange() {
    this.updateChildrenProps();
  }

  /**
   * Listen for selects in the segmented control items
   */
  @Listen('athChange')
  handleValueChange(event: CustomEvent<SegmentedControlItemChangeSelect>) {
    const selectedItem = event.target as HTMLAthSegmentedControlItemElement;

    // Prevent having no selection once user has made a selection
    const segmentedControlItems = this.getSegmentedControlItems();
    const selectedItems = segmentedControlItems.filter(item => item.selected);

    // If no items are selected after this change, revert the change
    if (selectedItems.length === 0) {
      selectedItem.selected = true;
      return;
    }

    // Unselect other items (radio button behavior)
    this.unSelect(selectedItem);
    this.value = selectedItem.value;
    this.athChangeValue.emit(selectedItem);

    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(this.value);
      this.internals.checkValidity();
    }
  }

  private selectSegmentedItemBySelected(): boolean {
    const segmentedControlItems = this.getSegmentedControlItems();
    const selectedItem = segmentedControlItems.find(item => item.selected);

    if (!selectedItem) {
      return false;
    }

    this.value = selectedItem.value;
    this.initialValue = this.value;

    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(this.value);
      this.internals.checkValidity();
    }

    return true;
  }

  private forceFirstTabFocusIfNoItemsSelected(): boolean {
    const segmentedControlItems = this.getSegmentedControlItems();
    const selectedItem = segmentedControlItems.find(item => item.selected);
    const firstItemEnabled = segmentedControlItems.find(item => !item.disabled);
    const firstItem = segmentedControlItems.length > 0 ? segmentedControlItems[0] : undefined;

    const focusItem = !selectedItem && (firstItemEnabled ?? firstItem);

    if (focusItem) {
      focusItem.setTabindex(0);
      return true;
    }

    return false;
  }

  private ensureSelection() {
    if (!this.htmlEl) return;

    const segmentedControlItems = this.getSegmentedControlItems();
    const hasSelected = segmentedControlItems.some(item => item.selected);

    // If no item is selected, select the first one (for action type)
    if (!hasSelected && segmentedControlItems.length > 0) {
      const firstItem = segmentedControlItems[0];
      if (firstItem) {
        firstItem.selected = true;
      }
    }
  }

  private unSelect(selectedItem) {
    const segmentedControlItems = this.getSegmentedControlItems();

    segmentedControlItems.forEach(item => {
      if (item !== selectedItem) {
        item.unSelectItem();
      }
    });
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (navigationKeys.includes(event.key)) {
      event.preventDefault();

      const items = this.getSegmentedControlItems();
      const currentIndex = items.findIndex(item => item === document.activeElement);

      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      const totalItems = items.length;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIndex = this.getNextIndex(items, currentIndex, -1, totalItems);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          nextIndex = this.getNextIndex(items, currentIndex, 1, totalItems);
          break;
        case 'Home':
          nextIndex = this.getNextIndex(items, -1, 1, totalItems);
          break;
        case 'End':
          nextIndex = this.getNextIndex(items, totalItems, -1, totalItems);
          break;
      }

      const nextItem = items[nextIndex];
      if (nextItem) {
        nextItem.setFocus();
      }
    }
  }

  private getSegmentedControlItems(): HTMLAthSegmentedControlItemElement[] {
    return Array.from(this.htmlEl.querySelectorAll('ath-segmented-control-item'));
  }

  private getNextIndex(items: HTMLAthSegmentedControlItemElement[], currentIndex: number, direction: number, totalItems: number): number {
    let newIndex = (currentIndex + direction + totalItems) % totalItems;
    const itemsArray = items;

    // Skip disabled items
    while (itemsArray[newIndex]?.disabled) {
      newIndex = (newIndex + direction + totalItems) % totalItems;
    }

    return newIndex;
  }

  private updateChildrenProps() {
    if (!this.htmlEl) return;
    const items = this.htmlEl.querySelectorAll('ath-segmented-control-item');
    items.forEach(item => {
      if (this.color) item.color = this.color;
      if (this.size) item.size = this.size;
      if (this.disabled) item.disabled = this.disabled;
      if (this.type) item.type = this.type;
    });
  }

  private selectSegmentedItemByValue(value: string) {
    const items = this.getSegmentedControlItems();
    const selectedItem = items.find(item => item.value === value);

    if (selectedItem) {
      selectedItem.selected = true;

      if (!selectedItem.disabled) selectedItem.setFocus();
    }

    this.unSelect(selectedItem);
    this.forceFirstTabFocusIfNoItemsSelected();

    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(value);
      this.internals.checkValidity();
    }
  }

  private getHelperTextProps = (): FcInputHelperTextType => {
    return {
      id: this.helperTextId,
      text: !!this.helperText ? this.helperText.trim() : '',
    };
  };

  private getFeedbackProps = (): FcInputFeedbackType => ({
    id: this.feedbackId,
    type: this.feedback,
    text: this.feedbackText,
  });

  private getLabelProps = (): FcInputLabelType => ({
    id: this.labelId,
    htmlForId: undefined,
    label: this.label,
    required: this.required,
    showRequired: !this.hideRequired,
    tooltipText: this.tooltipText,
    tooltipWidth: this.tooltipWidth,
  });

  private getAriaDescribedBy = (): string | undefined => {
    const descriptions: string[] = [];

    if (this.helperText !== undefined) {
      descriptions.push(this.helperTextId);
    }

    if (this.feedback !== SegmentedControlFeedbackType.None) {
      descriptions.push(this.feedbackId);
    }

    return descriptions.length > 0 ? descriptions.join(' ') : undefined;
  };

  private getHostAttributes = () => {
    const ariaLabelledByIds = !this.hideRequired ? `${this.labelId} ${this.requiredLabelId}` : this.labelId;
    const ariaDescribedByIds = this.getAriaDescribedBy();

    return {
      'role': this.isActionType() ? 'group' : 'radiogroup',
      'aria-labelledby': ariaLabelledByIds,
      'aria-describedby': ariaDescribedByIds,
      'aria-required': !this.isActionType() && this.required ? 'true' : undefined,
    };
  };

  private getClassNames = () => ({
    'ath-segmented-control': true,
    [`ath-segmented-control--${this.color}`]: !!this.color,
    [`ath-segmented-control--${this.size}`]: !!this.size,
    [`ath-segmented-control--${this.type}`]: !!this.type,
    'disabled': this.disabled,
  });

  private isActionType() {
    return this.type === SegmentedControlTypes.Action;
  }

  render() {
    const labelProps = this.getLabelProps();
    const feedbackProps = this.getFeedbackProps();
    const helperTextProps = this.getHelperTextProps();
    const isActionType = this.type === SegmentedControlTypes.Action;

    return (
      <Host>
        <div {...this.getHostAttributes()} class="ath-input">
          {!isActionType && !!this.label && <FcInputLabel {...labelProps}></FcInputLabel>}
          {this.required && !this.hideRequired && (
            <div id={this.requiredLabelId} class="sr-only">
              {this.requiredAriaLabel}
            </div>
          )}
          <div class="wrapper">
            <div class={this.getClassNames()}>
              <slot></slot>
            </div>
            {!isActionType && this.helperText && <FcInputHelperText {...helperTextProps}></FcInputHelperText>}
            {!isActionType && this.feedback === 'error' && !this.disabled && <FcInputFeedback {...feedbackProps}></FcInputFeedback>}
          </div>
        </div>
      </Host>
    );
  }
}
