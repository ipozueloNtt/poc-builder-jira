import { r as registerInstance, h, d as Host } from './index-Bf9CG7gQ.js';

var ThumbnailType;
(function (ThumbnailType) {
    ThumbnailType["Default"] = "default";
    ThumbnailType["Highlight"] = "highlight";
    ThumbnailType["Avatar"] = "avatar";
})(ThumbnailType || (ThumbnailType = {}));

const cardThumbnailCss = ":host{--object-fit:cover}:host .fluid{--object-fit:fill}:host .vertical{--thumbanail-min-width:402px;--thumbanail-min-height:226.132px;--img-position:absolute;--img-top:50%;--img-left:50%;--img-transform:translate(-50%, -50%);--img-width:100%}:host .vertical:not(.fixed){--aspect-ratio:16/9}:host .horizontal{--thumbanail-min-height:226px;--thumbanail-min-width:345px;--img-position:absolute;--img-top:50%;--img-left:50%;--img-transform:translate(-50%, -50%);--img-width:auto}:host .horizontal:not(.fixed){--thumbanail-min-width:226px;--aspect-ratio:1/1}:host{display:flex;width:100%;height:100%}:host .ath-card-thumbnail{aspect-ratio:var(--aspect-ratio);width:100%;height:100%;position:relative}:host .ath-card-thumbnail_highlight{display:flex;padding:var(--ath-spacing-card-thumbnail-highlight-padding-around);justify-content:center;align-items:flex-start;top:0px;width:100%;position:absolute;background:var(--ath-color-card-thumbnail-highlight-bg);color:var(--ath-color-card-thumbnail-highlight-fg);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-heading-4);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-4);box-sizing:border-box}:host .ath-card-thumbnail_image{min-width:var(--thumbanail-min-width);min-height:var(--thumbanail-min-height);width:100%;height:100%;display:flex;flex-direction:column;align-items:flex-start;align-self:stretch;flex-shrink:0;position:relative;overflow:hidden}:host .ath-card-thumbnail_avatar{display:flex;width:var(--ath-sizing-card-thumbnail-avatar-width);height:var(--ath-sizing-card-thumbnail-avatar-height);flex-direction:column;justify-content:center;align-items:center;overflow:auto;position:absolute;left:24px;bottom:-13.488px;border-radius:1600px}:host .ath-card-thumbnail_bottom-tag{display:flex;padding:var(--ath-spacing-tag-padding-y-sm) var(--ath-spacing-tag-padding-x);align-items:center;gap:var(--ath-spacing-tag-col-gap);position:absolute;left:24px;bottom:24.132px}:host .ath-card-thumbnail_top-tag{display:flex;padding:var(--ath-spacing-tag-padding-y-sm) var(--ath-spacing-tag-padding-x);justify-content:flex-end;align-items:flex-start;gap:var(--ath-spacing-tag-col-gap);position:absolute;right:24px;top:24px}:host ::slotted([slot=img-thumbnail]){position:var(--img-position);object-fit:var(--object-fit);top:var(--img-top);left:var(--img-left);transform:var(--img-transform);width:var(--img-width);height:100%}";

const AthCardThumbnail = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Text for top tag
     **/
    topTag;
    /**
     * Text for bottom tag
     **/
    bottomTag;
    /**
     * type of thumnail
     **/
    type = ThumbnailType.Default;
    /**
     * text highlight
     **/
    highlightText;
    isFluid = false;
    isVertical = true;
    async updateTypeCard(isFluid, isVertical) {
        this.isFluid = isFluid;
        this.isVertical = isVertical;
    }
    getClassNames = () => ({
        'ath-card-thumbnail': true,
        'fluid': this.isFluid,
        'fixed': !this.isFluid,
        'horizontal': !this.isVertical,
        'vertical': this.isVertical,
    });
    renderTag(position) {
        const tagLabel = position === 'top' ? this.topTag : this.bottomTag;
        const color = position === 'top' ? 'secondary' : 'primary';
        return h("ath-tag", { "heading-text": tagLabel, color: color });
    }
    render() {
        return (h(Host, { key: '6f0b58d55f2828b6a731445f9c59767a0773637f' }, h("div", { key: '47ca9c712ffa5fbb56a0617c8436b885657f528f', class: this.getClassNames() }, h("div", { key: 'd6002c7ce95de6cc3f525f67e7db1439c2199e28', class: "ath-card-thumbnail_image" }, h("slot", { key: '07407ec71f3ed0041be4440973fa9a851a07f831', name: "img-thumbnail" })), !!this.topTag && this.type === ThumbnailType.Default && h("div", { key: '8ebe41b2a875e0e24db8c2be004ffc10b6a91d91', class: "ath-card-thumbnail_top-tag" }, this.renderTag('top')), !!this.bottomTag && this.type === ThumbnailType.Default && h("div", { key: '55bd412ffd380b642d3273e74f9f595ffcd3f271', class: "ath-card-thumbnail_bottom-tag" }, this.renderTag('bottom')), this.type === ThumbnailType.Highlight && h("div", { key: 'c075ebac7882508eddf935cba0b939c32784b7f2', class: "ath-card-thumbnail_highlight" }, this.highlightText), this.type === ThumbnailType.Avatar && (h("div", { key: 'f521f03bf128f0bd8454db0ca05b0bc9234dc57a', class: "ath-card-thumbnail_avatar" }, h("slot", { key: '78eebcb4b069a6d95db7e8437668ee2e65054bd2', name: "avatar" }))))));
    }
};
AthCardThumbnail.style = cardThumbnailCss;

export { AthCardThumbnail as ath_card_thumbnail };
//# sourceMappingURL=ath-card-thumbnail.entry.esm.js.map
