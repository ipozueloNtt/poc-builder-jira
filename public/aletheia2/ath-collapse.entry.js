import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

const collapseCss = ":host .ath-collapse{transition:height 0.5s;color:var(--ath-color-fg-default)}:host .ath-collapse--overflow-hidden{overflow:hidden}";

const AthCollapse = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athCollapseState = createEvent(this, "athCollapseState", 7);
    }
    timeoutHideContent;
    timeoutChangeOverflow;
    animationtime = 500;
    get el() { return getElement(this); }
    /**
     * If the component is expanded by default
     */
    show = false;
    isExpanded;
    collapseHeight;
    overflowHidden = true;
    /**
     * Event to emit if the component is expanded or collapsed.
     */
    athCollapseState;
    handleCollapse(event) {
        const targetId = event.detail;
        if (!targetId || targetId !== this.el?.id)
            return;
        this.isExpanded = !this.isExpanded;
        this.athCollapseState.emit({ id: this.el.id, isExpanded: this.isExpanded });
        clearTimeout(this.timeoutHideContent);
        clearTimeout(this.timeoutChangeOverflow);
        if (this.isExpanded) {
            this.show = true;
            this.timeoutChangeOverflow = setTimeout(() => {
                this.overflowHidden = false;
            }, this.animationtime);
        }
        else {
            this.timeoutHideContent = setTimeout(() => (this.show = false), this.animationtime);
            this.overflowHidden = true;
        }
    }
    handleResize() {
        this.getCollapseHeight();
    }
    async handleExpanded() {
        await this.getCollapseHeight();
    }
    getClassNames = () => ({
        'ath-collapse': true,
        'ath-collapse--expanded': this.isExpanded,
        'ath-collapse--collapsed': !this.isExpanded,
        'ath-collapse--overflow-hidden': this.overflowHidden,
    });
    getCollapseHeight = async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
        await new Promise(resolve => requestAnimationFrame(resolve));
        const collapseElement = this.el.shadowRoot?.querySelector('.ath-collapse');
        if (collapseElement && this.isExpanded) {
            const prevHeight = collapseElement.style.height;
            collapseElement.style.height = 'auto';
            const newHeight = collapseElement.scrollHeight;
            collapseElement.style.height = prevHeight;
            await new Promise(resolve => requestAnimationFrame(resolve));
            this.collapseHeight = `${newHeight}px`;
        }
        else {
            this.collapseHeight = '0px';
        }
    };
    componentWillLoad() {
        this.isExpanded = this.show;
        this.athCollapseState.emit({ id: this.el?.id, isExpanded: this.isExpanded });
    }
    componentDidLoad() {
        this.getCollapseHeight();
    }
    disconnectedCallback() {
        clearTimeout(this.timeoutHideContent);
        clearTimeout(this.timeoutChangeOverflow);
    }
    render() {
        return (h(Host, { key: '5de2cb68f66aa5a7a64eb655e4eee7ca614bf0bb' }, h("div", { key: '38272820d6abff93375e0ba3b6603333350f8c07' }, h("div", { key: '561fa375ecc29eeaf1ffc2bf35128f7a05639fe5', class: this.getClassNames(), style: { height: this.collapseHeight } }, this.show && h("slot", { key: '22c5f20c7eb139f9148026db3e4e96717bb7302d' })))));
    }
    static get watchers() { return {
        "isExpanded": ["handleExpanded"]
    }; }
};
AthCollapse.style = collapseCss;

export { AthCollapse as ath_collapse };
//# sourceMappingURL=ath-collapse.entry.esm.js.map
