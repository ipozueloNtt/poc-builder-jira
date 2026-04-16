import { r as registerInstance, h, d as Host } from './index-Bf9CG7gQ.js';

const panelCss = ".sc-ath-panel-h{width:100%}.sc-ath-panel-h .ath-tab-panel.sc-ath-panel{display:flex;padding:var(--ath-spacing-tab-panel-padding-around);flex-direction:column;align-items:flex-start;align-self:stretch;gap:var(--ath-spacing-tab-panel-row-gap);box-sizing:border-box;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-md);font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}.sc-ath-panel-h .ath-tab-panel.sc-ath-panel .ath-tab-panel__header.sc-ath-panel{display:flex;flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:var(--ath-spacing-tab-panel-header-row-gap);align-self:stretch}.sc-ath-panel-h .ath-tab-panel.sc-ath-panel .ath-tab-panel__header.sc-ath-panel .title.sc-ath-panel{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-heading-5);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-5);flex:1 0 0}.sc-ath-panel-h .ath-tab-panel.sc-ath-panel .ath-tab-panel__header.sc-ath-panel .ath_tab__actions-group.sc-ath-panel{display:flex;justify-content:flex-end;align-items:center;gap:var(--ath-spacing-tab-panel-header-actions-row-gap)}";

const AthPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Etiqueta accesible para el panel
     */
    label;
    /**
     * Si el panel puede recibir el foco o no
     */
    focusable = false;
    render() {
        return (h(Host, { key: 'f00d34a660ebe34b91765a69e92530b063369cc3', role: "tabpanel", tabindex: this.focusable ? '0' : '-1' }, h("div", { key: 'caefc31d3fc5a22d9cb0481410c5d25a6130c7b6', class: "ath-tab-panel" }, h("div", { key: '63b9c365188910ef6829f975de45bdd6a3c066d3', class: "ath-tab-panel__header" }, this.label && h("div", { key: 'd3d2a0203114d9b513ef8e99fcc57afd2306046c', class: "title" }, this.label), h("div", { key: '3277cb4254379a672328b066f43fe52bbe316099', class: "ath_tab__actions-group" }, h("slot", { key: '57a6f99fcefa42b29edbb96260e1f0f0bca0a26c', name: "actions" }))), h("slot", { key: 'c0a5bd62a1fd092ffdccdb848a6d9462a1c5c085' }))));
    }
};
AthPanel.style = panelCss;

export { AthPanel as ath_panel };
//# sourceMappingURL=ath-panel.entry.esm.js.map
