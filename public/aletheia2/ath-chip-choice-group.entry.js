import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { a as ChipChoiceSize } from './chip-choice.model-B-mKsPHZ.js';

const chipChoiceGroupCss = ":host{display:flex;align-items:center;align-content:center;gap:var(--ath-spacing-chip-group-row-gap) var(--ath-spacing-chip-group-col-gap);flex-wrap:wrap;width:100%}";

const AthChipChoiceGroup = class {
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
    get el() { return getElement(this); }
    internals;
    /**
     * Weather the chips are disabled
     */
    disabled = false;
    /**
     * Allow multiple selection of chips
     */
    multiple = false;
    /**
     * The generic name for the chips
     */
    name;
    /**
     * The generic size of the chips
     */
    size = ChipChoiceSize.Medium;
    /**
     * The width of the group
     */
    width;
    /**
     * The value for not multiple (use chip-choice-group as radio-group)
     */
    value;
    watchValueHandler(newValue) {
        this.selectByValue(newValue);
    }
    /**
     * Event to emit the current chips checked
     */
    athChangeValue;
    handleChange(e) {
        e.stopPropagation();
        if (this.multiple) {
            this.selectedChip = this.getChipIndex(e.detail);
        }
        else {
            this.selectByValue(e.detail.value);
            this.setValue();
        }
        this.emitCheckedChips();
    }
    handleMouseDown(e) {
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
    chips = [];
    selectedChip;
    firstEnabledChip;
    lastEnabledChip;
    initialValue;
    componentDidLoad() {
        this.loadChips();
        this.propagateAttributes();
        this.initialValue = this.value;
        if (this.value) {
            this.selectByValue(this.value);
            this.setInputValue(this.value);
        }
        else {
            this.setFocusFirstChip();
        }
    }
    formResetCallback() {
        this.value = this.initialValue;
        this.selectByValue(this.value);
        this.setInputValue(this.initialValue);
        this.emitCheckedChips();
    }
    loadChips() {
        this.chips = this.getChips();
        this.firstEnabledChip = this.getFirstEnabledChip();
        this.lastEnabledChip = this.getLastEnabledChip();
    }
    setFocusFirstChip() {
        const firstChecked = this.getFirstCheckedChip();
        this.selectFocusChip(firstChecked > -1 ? firstChecked : this.firstEnabledChip);
    }
    getChips() {
        const chipsElements = this.el.querySelectorAll('ath-chip-choice');
        const chips = [];
        if (chipsElements) {
            chipsElements.forEach(chip => {
                chips.push(chip);
            });
        }
        return chips;
    }
    propagateAttributes() {
        if (this.chips) {
            this.chips.forEach(chip => {
                this.propagateAttribute(chip);
            });
        }
    }
    propagateAttribute(chip) {
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
        }
        else {
            chip.removeAttribute('name');
        }
    }
    getFirstEnabledChip() {
        return this.chips.findIndex(chip => !chip.disabled);
    }
    getLastEnabledChip() {
        for (let index = this.chips.length - 1; index >= 0; index--) {
            if (!this.chips[index].disabled) {
                return index;
            }
        }
        return -1;
    }
    getFirstCheckedChip() {
        const index = this.chips.findIndex(chip => chip.selected && !chip.disabled);
        return index;
    }
    getChipIndex(chip) {
        return this.chips.findIndex(item => item === chip);
    }
    getHostStyles() {
        return {
            width: this.width || undefined,
        };
    }
    moveNextChip() {
        const next = this.chips.findIndex((chip, index) => index > this.selectedChip && !chip.disabled);
        this.selectFocusChip(next === -1 ? this.firstEnabledChip : next);
    }
    movePreviousChip() {
        let prevIndex = this.selectedChip - 1;
        while (prevIndex >= 0 && this.chips[prevIndex].disabled) {
            prevIndex--;
        }
        this.selectFocusChip(prevIndex === -1 ? this.lastEnabledChip : prevIndex);
    }
    selectFocusChip(index) {
        this.selectedChip = index;
        this.chips.forEach(chip => {
            chip.unselect();
        });
        this.chips[this.selectedChip].select();
    }
    selectByValue(value) {
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
    unCheckAllChips() {
        this.chips.forEach(chip => {
            chip.selected = false;
            chip.unselect();
        });
    }
    emitCheckedChips() {
        const chips = this.chips.filter(chip => chip.selected);
        this.athChangeValue.emit(chips);
    }
    setValue() {
        if (!this.multiple) {
            const value = this.selectedChip > -1 ? this.chips[this.selectedChip].value : '';
            this.value = value;
            this.setInputValue(value);
        }
    }
    setInputValue(value) {
        if (!this.multiple && this.internals && 'setFormValue' in this.internals) {
            this.internals.setFormValue(value);
            this.internals.checkValidity();
        }
    }
    render() {
        return (h(Host, { key: 'ba6f195dfa59a2c3a65cd5f8966720badf97f9d6', role: this.multiple ? 'group' : 'radiogroup', style: this.getHostStyles() }, h("slot", { key: 'b69c7eea5613fb5d942f0612537f23b0842288c9' })));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["watchValueHandler"]
    }; }
};
AthChipChoiceGroup.style = chipChoiceGroupCss;

export { AthChipChoiceGroup as ath_chip_choice_group };
//# sourceMappingURL=ath-chip-choice-group.entry.esm.js.map
