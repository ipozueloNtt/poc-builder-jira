import { r as registerInstance, h, d as Host } from './index-Bf9CG7gQ.js';

const DividerOrientation = {
    Horizontal: 'horizontal',
    Vertical: 'vertical',
};
const DividerSize = {
    Medium: 'md',
    Small: 'sm',
};
const DividerColor = {
    Bold: 'bold',
    Bolder: 'bolder',
    Boldest: 'boldest',
};
const DIVIDER_DEFAULT_ORIENTATION = DividerOrientation.Horizontal;
const DIVIDER_DEFAULT_SIZE = DividerSize.Medium;
const DIVIDER_DEFAULT_COLOR = DividerColor.Bold;

const dividerCss = ":host .ath-divider.ath-divider--color-bold{border-color:var(--ath-color-border-alpha-bold-default)}:host .ath-divider.ath-divider--color-bolder{border-color:var(--ath-color-border-alpha-bolder-default)}:host .ath-divider.ath-divider--color-boldest{border-color:var(--ath-color-border-alpha-boldest-default)}:host{display:block}:host .ath-divider{width:fit-content}:host .ath-divider--orientation-horizontal{width:100%;border-bottom-style:solid}:host .ath-divider--orientation-vertical{height:100%;border-left-style:solid}:host .ath-divider--size-md{border-width:2px}:host .ath-divider--size-sm{border-width:1px}";

const AthDivider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Orientation of the divider
     **/
    orientation = DIVIDER_DEFAULT_ORIENTATION;
    /**
     * Size of the divider
     **/
    size = DIVIDER_DEFAULT_SIZE;
    /**
     * Color of the divider
     **/
    color = DIVIDER_DEFAULT_COLOR;
    getAttributes = () => ({
        'role': 'separator',
        'aria-orientation': this.orientation,
    });
    getClassNames = () => ({
        'ath-divider': true,
        [`ath-divider--orientation-${this.orientation}`]: !!this.orientation,
        [`ath-divider--size-${this.size}`]: !!this.size,
        [`ath-divider--color-${this.color}`]: !!this.color,
    });
    render() {
        return (h(Host, { key: '1cef4ff98210cd8013a7e6ce39f420dfdd6b77df', ...this.getAttributes() }, h("div", { key: '6b64f2c12758f2ea9555403c6394d4a43383ebcd', class: this.getClassNames() })));
    }
};
AthDivider.style = dividerCss;

export { AthDivider as ath_divider };
//# sourceMappingURL=ath-divider.entry.esm.js.map
