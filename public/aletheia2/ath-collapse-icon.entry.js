import { r as registerInstance, h, d as Host } from './index-Bf9CG7gQ.js';

const collapseIconCss = ":host(.ath-collapse-icon){display:flex}.ath-collapse-icon__chevron{transition:transform 0.3s ease-in-out}:host(.ath-collapse-icon--rotate) .ath-collapse-icon__chevron{transform:rotate(180deg)}";

const AthCollapseIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** Current expanded state */
    expanded = false;
    getHostClasses = () => ({
        'ath-collapse-icon': true,
        'ath-collapse-icon--rotate': this.expanded,
    });
    render() {
        return (h(Host, { key: '13ea33f5b50496269d1b37248c37ef904136f43f', class: this.getHostClasses() }, h("ath-icon", { key: '8a80a018973510ee96592d71ec0fcbeb6a8a548e', class: "ath-collapse-icon__chevron", icon: "chevron_down" })));
    }
};
AthCollapseIcon.style = collapseIconCss;

export { AthCollapseIcon as ath_collapse_icon };
//# sourceMappingURL=ath-collapse-icon.entry.esm.js.map
