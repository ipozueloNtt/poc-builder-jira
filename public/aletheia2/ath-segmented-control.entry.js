import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { S as SegmentedControlTypes, a as SegmentedControlSizes, b as SegmentedControlColors, c as SegmentedControlFeedbackType } from './segmented-control.model-CLdnVYDE.js';
import './index-8mh0qKYc.js';
import { F as FcInputLabel, a as FcInputHelperText, b as FcInputFeedback } from './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

const segmentedControlCss = ".ath-segmented-control{display:flex;justify-content:space-between;border:1px solid;border-radius:var(--ath-border-radius-segmented-control-group);width:100%;align-items:center;box-sizing:border-box}.ath-segmented-control.disabled{border-color:var(--ath-color-segmented-control-border-disabled)}:host .ath-input{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;flex-wrap:wrap;row-gap:var(--ath-spacing-input-row-gap);width:100%}:host .wrapper{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-addons-row-gap);align-self:stretch;width:100%}:host .ath-input__label{display:flex;flex-direction:row;align-items:flex-start;gap:var(--ath-spacing-label-col-gap);font-family:var(--ath-font-family-primary);color:var(--ath-color-fg-default);font-weight:var(--ath-font-weight-medium);font-size:var(--ath-font-size-input-label);line-height:var(--ath-font-line-height-input-label)}:host .ath-input__label__wrapper{display:flex;align-items:center;gap:var(--ath-spacing-label-required-col-gap)}:host .ath-input__label ath-icon{color:var(--ath-color-fg-default)}:host .ath-input__label .required{color:var(--ath-color-fg-feedback-danger);padding-left:4px}:host .ath-input__label ath-button{display:flex;flex-direction:row;align-items:center;justify-content:center;width:24px;height:24px}:host .ath-input__feedback{display:flex;align-items:flex-start;gap:var(--ath-spacing-feedback-text-col-gap);align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback--error{color:var(--ath-color-fg-feedback-danger)}:host .ath-input__feedback--success{color:var(--ath-color-fg-feedback-success)}:host .ath-input__feedback--warning{color:var(--ath-color-fg-feedback-warning)}:host .padding{display:flex;padding-top:var(--ath-spacing-feedback-text-padding-top);align-items:center}:host .ath-input__helper-text{display:flex;justify-content:flex-start;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}.ath-segmented-control--primary{border-color:var(--ath-color-segmented-control-border-primary)}.ath-segmented-control--secondary{border-color:var(--ath-color-segmented-control-border-secondary)}.ath-segmented-control--sm{padding:var(--ath-spacing-segmented-control-group-padding-sm)}.ath-segmented-control--md{padding:var(--ath-spacing-segmented-control-group-padding-md)}.ath-segmented-control--lg{padding:var(--ath-spacing-segmented-control-group-padding-lg)}.ath-segmented-control--xl{padding:var(--ath-spacing-segmented-control-group-padding-xl)}";

let segmentedControlSequence = 0;
const AthSegmentedControl = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athChangeValue = createEvent(this, "athChangeValue", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    hostId = `segmentedControl-${++segmentedControlSequence}`;
    labelId = `${this.hostId}-label`;
    helperTextId = `${this.hostId}-helper-text`;
    feedbackId = `${this.hostId}-feedback`;
    requiredLabelId = `${this.hostId}-req-label`;
    initialValue;
    get htmlEl() { return getElement(this); }
    internals;
    /**
     * Types of the segmented control
     **/
    type = SegmentedControlTypes.Select;
    /**
     * Size of the segmented control
     **/
    size = SegmentedControlSizes.Medium;
    /**
     * Color of the segmented control
     */
    color = SegmentedControlColors.Primary;
    /**
     * The segmented control is disabled
     */
    disabled = false;
    /**
     * Label text for the segmented control
     */
    label;
    /**
     * The name of the segmented control to use with forms
     */
    name;
    /**
     * Text to show when the label of segmented control its not visible
     */
    ariaLabel;
    /**
     * Helper text for the segmented control
     */
    helperText;
    /**
     * Type of feedback to show
     */
    feedback = SegmentedControlFeedbackType.None;
    /**
     * Feedback text
     */
    feedbackText;
    /**
     * Show if is required
     */
    required = false;
    /**
     * Show if is required in the label
     */
    hideRequired = false;
    /**
     * Show if is required in the label
     */
    requiredAriaLabel;
    /**
     * Show the tooltip text
     */
    tooltipText;
    /**
     * Show the width of the tooltip
     */
    tooltipWidth = 0;
    /**
     * Set the value to select the checked ath-radio-button
     */
    value;
    watchValue(newValue) {
        this.selectSegmentedItemByValue(newValue);
    }
    athChangeValue;
    componentWillLoad() {
        this.initialValue = this.value;
        if (this.value == null) {
            const items = Array.from(this.htmlEl.querySelectorAll('ath-segmented-control-item'));
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
        }
        else {
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
    handleValueChange(event) {
        const selectedItem = event.target;
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
    selectSegmentedItemBySelected() {
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
    forceFirstTabFocusIfNoItemsSelected() {
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
    ensureSelection() {
        if (!this.htmlEl)
            return;
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
    unSelect(selectedItem) {
        const segmentedControlItems = this.getSegmentedControlItems();
        segmentedControlItems.forEach(item => {
            if (item !== selectedItem) {
                item.unSelectItem();
            }
        });
    }
    handleKeyDown(event) {
        const navigationKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (navigationKeys.includes(event.key)) {
            event.preventDefault();
            const items = this.getSegmentedControlItems();
            const currentIndex = items.findIndex(item => item === document.activeElement);
            if (currentIndex === -1)
                return;
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
    getSegmentedControlItems() {
        return Array.from(this.htmlEl.querySelectorAll('ath-segmented-control-item'));
    }
    getNextIndex(items, currentIndex, direction, totalItems) {
        let newIndex = (currentIndex + direction + totalItems) % totalItems;
        const itemsArray = items;
        // Skip disabled items
        while (itemsArray[newIndex]?.disabled) {
            newIndex = (newIndex + direction + totalItems) % totalItems;
        }
        return newIndex;
    }
    updateChildrenProps() {
        if (!this.htmlEl)
            return;
        const items = this.htmlEl.querySelectorAll('ath-segmented-control-item');
        items.forEach(item => {
            if (this.color)
                item.color = this.color;
            if (this.size)
                item.size = this.size;
            if (this.disabled)
                item.disabled = this.disabled;
            if (this.type)
                item.type = this.type;
        });
    }
    selectSegmentedItemByValue(value) {
        const items = this.getSegmentedControlItems();
        const selectedItem = items.find(item => item.value === value);
        if (selectedItem) {
            selectedItem.selected = true;
            if (!selectedItem.disabled)
                selectedItem.setFocus();
        }
        this.unSelect(selectedItem);
        this.forceFirstTabFocusIfNoItemsSelected();
        if (this.internals && 'setFormValue' in this.internals) {
            this.internals.setFormValue(value);
            this.internals.checkValidity();
        }
    }
    getHelperTextProps = () => {
        return {
            id: this.helperTextId,
            text: !!this.helperText ? this.helperText.trim() : '',
        };
    };
    getFeedbackProps = () => ({
        id: this.feedbackId,
        type: this.feedback,
        text: this.feedbackText,
    });
    getLabelProps = () => ({
        id: this.labelId,
        htmlForId: undefined,
        label: this.label,
        required: this.required,
        showRequired: !this.hideRequired,
        tooltipText: this.tooltipText,
        tooltipWidth: this.tooltipWidth,
    });
    getAriaDescribedBy = () => {
        const descriptions = [];
        if (this.helperText !== undefined) {
            descriptions.push(this.helperTextId);
        }
        if (this.feedback !== SegmentedControlFeedbackType.None) {
            descriptions.push(this.feedbackId);
        }
        return descriptions.length > 0 ? descriptions.join(' ') : undefined;
    };
    getHostAttributes = () => {
        const ariaLabelledByIds = !this.hideRequired ? `${this.labelId} ${this.requiredLabelId}` : this.labelId;
        const ariaDescribedByIds = this.getAriaDescribedBy();
        return {
            'role': this.isActionType() ? 'group' : 'radiogroup',
            'aria-labelledby': ariaLabelledByIds,
            'aria-describedby': ariaDescribedByIds,
            'aria-required': !this.isActionType() && this.required ? 'true' : undefined,
        };
    };
    getClassNames = () => ({
        'ath-segmented-control': true,
        [`ath-segmented-control--${this.color}`]: !!this.color,
        [`ath-segmented-control--${this.size}`]: !!this.size,
        [`ath-segmented-control--${this.type}`]: !!this.type,
        'disabled': this.disabled,
    });
    isActionType() {
        return this.type === SegmentedControlTypes.Action;
    }
    render() {
        const labelProps = this.getLabelProps();
        const feedbackProps = this.getFeedbackProps();
        const helperTextProps = this.getHelperTextProps();
        const isActionType = this.type === SegmentedControlTypes.Action;
        return (h(Host, { key: '85ab7efebacab3eb81a118d83f3fc55358b9e270' }, h("div", { key: 'c7e9a59d7895e49a0924770eb977f2d20dd09580', ...this.getHostAttributes(), class: "ath-input" }, !isActionType && !!this.label && h(FcInputLabel, { key: '7f986969200790741cbaf26ee324f53072524933', ...labelProps }), this.required && !this.hideRequired && (h("div", { key: '47d354854d333d8fb48c5469d5dd3e1432368fc9', id: this.requiredLabelId, class: "sr-only" }, this.requiredAriaLabel)), h("div", { key: '23afbea29a30269e3cea3f1bcfdec424bb2f118f', class: "wrapper" }, h("div", { key: 'fc6e5dfbd8b385e8c5445d75f086f7b328ff6127', class: this.getClassNames() }, h("slot", { key: '97a38d16d37d16a6de2764e6fd0e797102f945bf' })), !isActionType && this.helperText && h(FcInputHelperText, { key: 'ecd7dd5a68c3750e45cd93a59c5e4edf75010cf7', ...helperTextProps }), !isActionType && this.feedback === 'error' && !this.disabled && h(FcInputFeedback, { key: '214a1fde39c8698f2fd37279725d2eb3eb05850f', ...feedbackProps })))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["watchValue"]
    }; }
};
AthSegmentedControl.style = segmentedControlCss;

export { AthSegmentedControl as ath_segmented_control };
//# sourceMappingURL=ath-segmented-control.entry.esm.js.map
