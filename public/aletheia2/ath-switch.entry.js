import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

const SwitchSvgIcons = {
    Selected: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none" class="ath-switch-icon ath-switch-icon--selected">
  <path d="M9.49213 0.501286C9.77798 0.768147 9.79338 1.21621 9.52652 1.50206L4.48831 6.89879C4.07826 7.33802 3.38579 7.34991 2.9609 6.925L0.365579 4.32954C0.0890673 4.05301 0.0890795 3.60468 0.365606 3.32817C0.642133 3.05166 1.09046 3.05167 1.36697 3.3282L3.7032 5.66456L8.49136 0.535671C8.75822 0.24982 9.20628 0.234425 9.49213 0.501286Z" fill="currentColor"/>
</svg>`,
    Unselected: `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" class="ath-switch-icon ath-switch-icon--unselected">
  <path d="M0.714299 0.485173C1.00719 0.19228 1.48293 0.19228 1.77582 0.485173L3.94867 2.65802L6.09906 0.50861L6.1557 0.457829C6.45029 0.21736 6.88593 0.233948 7.16059 0.50861C7.43501 0.783213 7.4516 1.218 7.21137 1.51252L7.16059 1.56916L5.00922 3.71955L7.18403 5.89435L7.23578 5.95099C7.47579 6.24557 7.45852 6.68041 7.18403 6.9549C6.90939 7.22929 6.47461 7.24597 6.18012 7.00568L6.12348 6.9549L3.94867 4.78009L1.75141 6.97834C1.45857 7.27117 0.983769 7.27105 0.690861 6.97834C0.397968 6.68544 0.397968 6.21068 0.690861 5.91779L2.88813 3.71955L0.714299 1.54572C0.421674 1.25289 0.421712 0.778023 0.714299 0.485173Z" fill="currentColor"/>
</svg>`,
};

const switchCss = ":host .ath-switch{display:flex;width:var(--ath-sizing-switch-width);min-width:var(--ath-sizing-switch-width);max-width:var(--ath-sizing-switch-width);height:var(--ath-sizing-switch-height);padding:var(--ath-spacing-switch-padding-around);align-items:center;border-radius:var(--ath-border-radius-300);box-sizing:border-box}:host .ath-switch:hover{cursor:pointer}:host .ath-switch__selected{border-color:var(--ath-color-switch-bg-selected-default);background:var(--ath-color-switch-bg-selected-default);justify-content:flex-end}:host .ath-switch__selected:hover{background:var(--ath-color-switch-bg-selected-hovered)}:host .ath-switch__selected:active{background:var(--ath-color-switch-bg-selected-pressed)}:host .ath-switch__unselected{border-radius:var(--ath-border-radius-300);background:var(--ath-color-switch-bg-default)}:host .ath-switch__unselected:hover{background:var(--ath-color-switch-bg-hovered)}:host .ath-switch__unselected:active{background:var(--ath-color-switch-bg-pressed)}:host .ath-switch__readonly{border:var(--ath-border-width-xs) solid var(--ath-color-switch-border-readonly);background:var(--ath-color-switch-bg-readonly)}:host .ath-switch__readonly:hover{background:var(--ath-color-switch-bg-readonly);cursor:not-allowed}:host .ath-switch__disabled{align-items:center;border-radius:var(--ath-border-radius-300);background:var(--ath-color-switch-bg-disabled);cursor:not-allowed}:host .ath-switch__disabled:hover{background:var(--ath-color-switch-bg-disabled);cursor:not-allowed}:host .ath-switch-controller{display:flex;width:var(--ath-sizing-switch-controller-width);height:var(--ath-sizing-switch-controller-height);justify-content:center;align-items:center;flex-shrink:0;aspect-ratio:1/1}:host .ath-switch-controller__selected{border-radius:var(--ath-border-radius-controller);background:var(--ath-color-switch-controller-bg-selected);color:var(--ath-color-switch-icon-selected)}:host .ath-switch-controller__unselected{border-radius:var(--ath-border-radius-controller);background:var(--ath-color-switch-controller-bg-default);color:var(--ath-color-icon-inverse-default)}:host .ath-switch-controller__readonly{border-radius:var(--ath-border-radius-controller);background:var(--ath-color-switch-controller-bg-readonly);color:var(--ath-color-switch-icon-readonly)}:host .ath-switch-controller__readonly:focus-visible{box-shadow:0 0 0 2px var(--ath-color-drop-shadow-focus), 0 0 0 4px var(--ath-color-border-focus)}:host .ath-switch-controller__disabled{border-radius:var(--ath-border-radius-controller);background:var(--ath-color-switch-controller-bg-disabled);cursor:not-allowed;color:var(--ath-color-icon-disabled)}:host(:focus-visible){outline:none}:host(:focus-visible) .ath-switch{box-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-border-focus);border-radius:var(--ath-border-radius-300)}";

const AthSwitch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
        this.athChange = createEvent(this, "athChange", 7);
    }
    /**
     * Determines if the switch is disabled and cannot be interacted with
     * @default false
     */
    disabled = false;
    /**
     * Controls the selected/unselected state of the switch
     * @default false
     */
    selected = false;
    /**
     * Makes the switch read-only, preventing user interaction while still being focusable
     * @default false
     */
    readonly = false;
    /**
     * Name to identify the switch
     */
    name;
    /**
     * Event emitted when the switch receives focus
     */
    athFocus;
    /**
     * Event emitted when the switch loses focus
     */
    athBlur;
    /**
     * Event emitted when the switch state changes
     */
    athChange;
    get el() { return getElement(this); }
    get isReadonly() {
        return !this.disabled && this.readonly;
    }
    getClassNames = () => ({
        'ath-switch': true,
        [`ath-switch__${this.selected ? 'selected' : 'unselected'}`]: true,
        'ath-switch__readonly': this.isReadonly,
        'ath-switch__disabled': this.disabled,
    });
    getSwitchControllerClassNames = () => ({
        'ath-switch-controller': true,
        'ath-switch-controller__readonly': this.isReadonly,
        [`ath-switch-controller__${this.selected ? 'selected' : 'unselected'}`]: true,
        'ath-switch-controller__disabled': this.disabled,
    });
    async setFocus() {
        if (!this.disabled) {
            this.el.focus();
        }
    }
    handleClick = () => {
        this.changeStatus();
    };
    handleFocus = () => {
        this.athFocus.emit();
    };
    handleBlur = () => {
        this.athBlur.emit();
    };
    handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.changeStatus();
        }
    }
    changeStatus() {
        if (this.disabled || this.readonly) {
            return;
        }
        this.selected = !this.selected;
        this.athChange.emit({ name: this.name, selected: this.selected });
    }
    getSwitchIcon = () => {
        return this.selected ? SwitchSvgIcons.Selected : SwitchSvgIcons.Unselected;
    };
    getHostAttributes = () => {
        return {
            'role': 'switch',
            'aria-disabled': this.disabled ? 'true' : 'false',
            'aria-checked': this.selected ? 'true' : 'false',
            'aria-readonly': this.isReadonly ? 'true' : 'false',
            'tabindex': this.disabled ? -1 : 0,
            'onFocus': this.handleFocus,
            'onBlur': this.handleBlur,
            'onClick': this.handleClick,
            'onKeyDown': event => this.handleKeyDown(event),
        };
    };
    render() {
        return (h(Host, { key: 'da5bdafd178703c02c3d6712d17e713194950a60', ...this.getHostAttributes() }, h("span", { key: '54156b3ed2d917f41290bee85d15c13f02610661', class: this.getClassNames() }, h("div", { key: 'b064961f0174e7fec624a19b7d22f391b1aecd44', class: this.getSwitchControllerClassNames(), innerHTML: this.getSwitchIcon() }))));
    }
};
AthSwitch.style = switchCss;

export { AthSwitch as ath_switch };
//# sourceMappingURL=ath-switch.entry.esm.js.map
