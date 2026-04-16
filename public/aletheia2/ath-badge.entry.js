import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

var BadgeColor;
(function (BadgeColor) {
    BadgeColor["Accent"] = "accent";
    BadgeColor["Danger"] = "danger";
    BadgeColor["Success"] = "success";
    BadgeColor["Warning"] = "warning";
    BadgeColor["Info"] = "info";
    BadgeColor["Disabled"] = "disabled";
})(BadgeColor || (BadgeColor = {}));
const BADGE_DEFAULT_COLOR = BadgeColor.Accent;
const BADGE_DEFAULT_TYPE = 'numeric';
const MAX_VALUE = 999;

const badgeCss = ":host .ath-badge--accent{background-color:var(--ath-color-bg-accent-default);color:var(--ath-color-badge-fg-accent)}:host .ath-badge--danger{background-color:var(--ath-color-bg-danger-default);color:var(--ath-color-badge-fg-danger)}:host .ath-badge--success{background-color:var(--ath-color-bg-success-default);color:var(--ath-color-badge-fg-success)}:host .ath-badge--warning{background-color:var(--ath-color-bg-warning-default);color:var(--ath-color-badge-fg-warning)}:host .ath-badge--info{background-color:var(--ath-color-bg-info-default);color:var(--ath-color-badge-fg-info)}:host .ath-badge--disabled{background-color:var(--ath-color-bg-alpha-disabled);color:var(--ath-color-fg-disabled)}.ath-visibility-hidden,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host{display:inline-block}:host .ath-badge{outline:1px solid var(--ath-color-badge-border)}:host .ath-badge--container{position:relative;display:flex;align-items:center;gap:var(--ath-spacing-badge-item-right-gap)}:host .ath-badge--dot{width:var(--ath-sizing-badge-dot-width);height:var(--ath-sizing-badge-dot-height);border-radius:var(--ath-border-radius-circle);display:block}:host .ath-badge--numeric{padding:var(--ath-spacing-badge-padding-y) var(--ath-spacing-badge-padding-x);border-radius:var(--ath-border-radius-circle);text-align:center;font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-comp-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-comp-sm)}:host .ath-badge--top-right{position:absolute;top:-4px;left:calc(100% - 10px)}:host .ath-badge--top-right.ath-badge--dot{left:calc(100% - 5px)}:host .ath-badge--right{position:static}";

const AthBadge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * The badge can display a value or be a decorative element
     **/
    type = BADGE_DEFAULT_TYPE;
    /**
     * Badge color accompanying the purpose of the message
     **/
    color = BADGE_DEFAULT_COLOR;
    /**
     * Value displayed within the badge if it is "numeric"
     **/
    value = 0;
    /**
     * Value from which a + will be added once exceeded by the "value"
     **/
    max = MAX_VALUE;
    /**
     *  Accessibility label describing the message
     **/
    label;
    /**
     * Positioning of the badge relative to the slot
     **/
    position;
    /**
     * Custom horizontal distance of the badge from its default position
     **/
    distanceX = 0;
    /**
     * Custom vertical distance of the badge from its default position
     **/
    distanceY = 0;
    _position;
    handlePosition() {
        this.setPosition();
    }
    get maxValue() {
        return this.max > MAX_VALUE ? MAX_VALUE : this.max;
    }
    getBadgeStyle = () => ({
        transform: `translate(${this.distanceX}px, ${this.distanceY}px)`,
    });
    getBadgeValue = () => (this.maxValue < this.value ? `+${this.maxValue}` : `${this.value}`);
    getClassNames = () => ({
        'ath-badge': true,
        [`ath-badge--${this.type}`]: !!this.type,
        [`ath-badge--${this._position}`]: !!this._position,
        [`ath-badge--${this.color}`]: !!this.color,
    });
    setPosition = () => {
        if (this.type === 'dot') {
            this._position = this.position || 'right';
        }
        else {
            this._position = this.position || 'top-right';
        }
    };
    get el() { return getElement(this); }
    componentWillLoad() {
        this.setPosition();
        const children = this.el.children;
        if (children.length > 1) {
            console.warn('<ath-badge> sólo acepta un elemento como slot.');
        }
    }
    render() {
        return (h(Host, { key: '9b87bee8e768702dc9ef682e727d2c025ac70f92' }, h("div", { key: '82c0714225abce54f3f9f557abbb02bf639cfb93', class: "ath-badge--container" }, h("slot", { key: 'f03a63b2d887de3cbb1b462581c8ed1bba6be34e' }), h("span", { key: '49fb57325d9d1ef1ad389d87780d2ba53ec9f40b', class: this.getClassNames(), style: this.getBadgeStyle() }, this.type == 'numeric' && this.getBadgeValue()), h("div", { key: 'f20b4451e5407d4137bbe54d47f290b9b2fa70ea', class: "sr-only" }, this.label))));
    }
    static get watchers() { return {
        "type": ["handlePosition"],
        "position": ["handlePosition"]
    }; }
};
AthBadge.style = badgeCss;

export { AthBadge as ath_badge };
//# sourceMappingURL=ath-badge.entry.esm.js.map
