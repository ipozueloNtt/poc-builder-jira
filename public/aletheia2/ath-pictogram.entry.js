import { r as registerInstance, a as getElement, f as getAssetPath, h, d as Host } from './index-Bf9CG7gQ.js';

const PictogramSizeType = {
    Extrasmall: 'xs',
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
    ExtraLarge: 'xl',
    DoubleExtraLarge: '2xl'
};

const pictogramCss = ":host{display:inline-flex;height:fit-content;width:fit-content}:host .ath-pictogram--xs img{width:var(--ath-size-pictogram-xs);height:auto}:host .ath-pictogram--sm img{width:var(--ath-size-pictogram-sm);height:auto}:host .ath-pictogram--md img{width:var(--ath-size-pictogram-md);height:auto}:host .ath-pictogram--lg img{width:var(--ath-size-pictogram-lg);height:auto}:host .ath-pictogram--xl img{width:var(--ath-size-pictogram-xl);height:auto}:host .ath-pictogram--2xl img{width:var(--ath-size-pictogram-2xl);height:auto}";

const AthPictogram = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    theme;
    get el() { return getElement(this); }
    /**
     * The pictogram name
     */
    name;
    /**
     * The size of the pictogram
     */
    size = PictogramSizeType.Medium;
    /**
     * The aria-label attribute of the pictogram
     */
    ariaLabel;
    /**
     * The aria-labelledby attribute of the pictogram
     */
    ariaLabelledby;
    componentWillLoad() {
        this.theme = document.body.dataset.theme || 'core';
    }
    hasAriaLabel() {
        return !!this.ariaLabel?.trim();
    }
    hasAriaLabelledBy() {
        return !this.hasAriaLabel() && !!this.ariaLabelledby?.trim();
    }
    getHostAttributes() {
        const hasLabel = this.hasAriaLabel() || this.hasAriaLabelledBy();
        return {
            'aria-hidden': !hasLabel ? 'true' : undefined,
            'aria-label': this.hasAriaLabel() ? this.ariaLabel.trim() : undefined,
            'aria-labelledby': this.hasAriaLabelledBy() ? this.ariaLabelledby.trim() : undefined,
            'role': hasLabel ? 'img' : undefined,
        };
    }
    classNames = () => ({
        'ath-pictogram': true,
        [`ath-pictogram--${this.size}`]: !!this.size,
    });
    render() {
        const assetsPath = getAssetPath(`assets/images/pictograms/${this.theme}`);
        console.log('assetsPath', assetsPath);
        return (h(Host, { key: 'c4fcde27285dcace8e11d9757e769e5d220bdb1d', ...this.getHostAttributes() }, h("div", { key: '3fc6994fd8cd65f5c1243506d2df1717f29aeecd', class: this.classNames() }, h("img", { key: 'd92a17efefbf188ebd38f07fd3797a48f49f931c', src: `${assetsPath}/${this.name}.svg`, alt: "" }))));
    }
};
AthPictogram.style = pictogramCss;

export { AthPictogram as ath_pictogram };
//# sourceMappingURL=ath-pictogram.entry.esm.js.map
