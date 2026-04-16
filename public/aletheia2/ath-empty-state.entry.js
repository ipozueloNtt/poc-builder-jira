import { r as registerInstance, h, d as Host } from './index-Bf9CG7gQ.js';
import { b as FcPictogram } from './index-8mh0qKYc.js';
import './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

const EmptyStateType = {
    Empty: 'empty',
    SearchNoResults: 'search-no-results',
    Error: 'error',
    Loading: 'loading',
};
const HeadingSize = {
    Sm: 'sm',
    Md: 'md',
    Lg: 'lg',
};

const emptyStateCss = ".ath-h1{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-heading-1);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-1)}.ath-h2{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-heading-2);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-2)}.ath-h3{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-heading-3);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-3)}.ath-h4{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-heading-4);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-4)}.ath-h5{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-heading-5);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-5)}.ath-h6{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-heading-6);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-6)}.ath-display-md{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-display-md);font-style:normal;font-weight:var(--ath-font-weight-display);line-height:var(--ath-font-line-height-display)}.ath-display-sm{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-display-sm);font-style:normal;font-weight:var(--ath-font-weight-display);line-height:var(--ath-font-line-height-display)}.ath-body--xs{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-xs);font-style:normal;font-weight:var(--ath-font-weight-body);line-height:var(--ath-font-line-height-body)}.ath-body--sm{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body);line-height:var(--ath-font-line-height-body)}.ath-body--md{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-md);font-style:normal;font-weight:var(--ath-font-weight-body);line-height:var(--ath-font-line-height-body)}.ath-body--lg{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-lg);font-style:normal;font-weight:var(--ath-font-weight-body);line-height:var(--ath-font-line-height-body)}.ath-body--light{font-weight:var(--ath-font-weight-light)}.ath-body--regular{font-weight:var(--ath-font-weight-regular)}.ath-body--medium{font-weight:var(--ath-font-weight-medium)}.ath-body--bold{font-weight:var(--ath-font-weight-bold)}.ath-numeric--xs{font-family:var(--ath-font-family-numeric);font-size:var(--ath-font-size-numeric-xs);font-style:normal;font-weight:var(--ath-font-weight-numeric-medium);line-height:var(--ath-font-line-height-numeric-xs)}.ath-numeric--sm{font-family:var(--ath-font-family-numeric);font-size:var(--ath-font-size-numeric-sm);font-style:normal;font-weight:var(--ath-font-weight-numeric-medium);line-height:var(--ath-font-line-height-numeric-sm)}.ath-numeric--md{font-family:var(--ath-font-family-numeric);font-size:var(--ath-font-size-numeric-md);font-style:normal;font-weight:var(--ath-font-weight-numeric-medium);line-height:var(--ath-font-line-height-numeric-md)}.ath-numeric--lg{font-family:var(--ath-font-family-numeric);font-size:var(--ath-font-size-numeric-lg);font-style:normal;font-weight:var(--ath-font-weight-numeric-medium);line-height:var(--ath-font-line-height-numeric-lg)}.ath-numeric--xl{font-family:var(--ath-font-family-numeric);font-size:var(--ath-font-size-numeric-xl);font-style:normal;font-weight:var(--ath-font-weight-numeric-medium);line-height:var(--ath-font-line-height-numeric-xl)}.ath-numeric--display{font-family:var(--ath-font-family-numeric);font-size:var(--ath-font-size-numeric-display);font-style:normal;font-weight:var(--ath-font-weight-numeric-regular);line-height:var(--ath-font-line-height-numeric-display)}.ath-text--align-left{text-align:left}.ath-text--align-right{text-align:right}.ath-text--align-center{text-align:center}.ath-text--align-justify{text-align:justify}.ath-text--underline{text-decoration:var(--ath-font-text-decoration-underline)}.ath-text--line-through{text-decoration:var(--ath-font-text-decoration-line-through)}.ath-visibility-hidden,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host{display:block;padding:var(--ath-spacing-empty-state-padding-y) var(--ath-spacing-empty-state-padding-x)}:host .ath-empty-state{display:flex;width:100%;height:100%;flex-direction:column;align-items:center;gap:var(--ath-spacing-empty-state-row-gap-md);flex-shrink:0}:host .ath-empty-state--image{display:flex;width:120px;height:120px;justify-content:center;align-items:center;flex-shrink:0;background-repeat:no-repeat;background-position:center;background-size:contain}:host .ath-empty-state--image img{width:100%;height:100%}:host .ath-empty-state--loading{display:flex;flex-direction:column;align-items:center;gap:8px}:host .ath-empty-state--loading-gif{width:148px;height:120px}:host .ath-empty-state-info{display:flex;flex-direction:column;text-align:center}:host .ath-empty-state-info .heading,:host .ath-empty-state-info .description{align-self:stretch;color:var(--ath-color-fg-default);font-style:normal}:host .ath-empty-state-info .heading{margin:0}:host .ath-empty-state-info .description{font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-lg);font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}";

const AthEmptyState = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Indicates the type of empty state
     */
    type = EmptyStateType.Empty;
    /**
     * Indicates if the image will be hidden
     * Does not apply when type is 'loading'
     */
    hideImage = false;
    /**
     * Text to empty state heading
     */
    headingText;
    /**
     * Indicates the heading level for the empty state.
     */
    headingLevel = 4;
    /**
     * Indicates the heading size for the heading text.
     */
    headingSize = HeadingSize.Sm;
    /**
     * Text to empty state description.
     */
    description;
    /**
     * Accesibility label for loading state (only when type is 'loading')
     */
    loadingLabel;
    announcedLoadingText = '';
    liveTimer;
    componentDidLoad() {
        if (this.type === EmptyStateType.Loading) {
            this.scheduleLiveAnnounce();
        }
    }
    disconnectedCallback() {
        this.clearLiveTimer();
    }
    scheduleLiveAnnounce() {
        this.clearLiveTimer();
        this.liveTimer = window.setTimeout(() => {
            this.announcedLoadingText = this.loadingLabel || 'Cargando…';
        }, 150);
    }
    clearLiveTimer() {
        if (this.liveTimer) {
            clearTimeout(this.liveTimer);
            this.liveTimer = undefined;
        }
    }
    getPictogramName() {
        switch (this.type) {
            case EmptyStateType.Empty:
                return 'illu_empty';
            case EmptyStateType.SearchNoResults:
                return 'illu_search';
            case EmptyStateType.Error:
                return 'illu_error_connection';
            default:
                return this.type;
        }
    }
    transformHeadingSize() {
        const transform = {
            sm: '4',
            md: '3',
            lg: '2',
        };
        return transform[this.headingSize] || transform.sm;
    }
    getClassNames = () => ({
        'ath-empty-state': true,
        'ath-empty-state--hide-image': this.hideImage && this.type !== EmptyStateType.Loading,
    });
    render() {
        const HeadingTag = `h${this.headingLevel}`;
        const headingSizeClass = this.transformHeadingSize();
        if (this.type === EmptyStateType.Loading) {
            return (h(Host, null, h("div", { class: "ath-empty-state--loading", role: "status" }, h("div", { class: "sr-only" }, this.announcedLoadingText), h("img", { class: "ath-empty-state--loading-gif", src: "./assets/images/loading.gif", alt: "" }))));
        }
        return (h(Host, null, h("div", { class: this.getClassNames() }, !this.hideImage && (h("div", { class: `ath-empty-state--image ${this.type}` }, h(FcPictogram, { name: this.getPictogramName() }))), h("div", { class: "ath-empty-state-info" }, this.headingText && h(HeadingTag, { class: `ath-h${headingSizeClass} heading` }, this.headingText), this.description && h("p", { class: "description" }, this.description), h("slot", { name: "body" })), h("slot", { name: "footer" }))));
    }
};
AthEmptyState.style = emptyStateCss;

export { AthEmptyState as ath_empty_state };
//# sourceMappingURL=ath-empty-state.entry.esm.js.map
