import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'ath-panel',
  styleUrl: './panel.scss',
  scoped: true,
})
export class AthPanel {
  /**
   * Etiqueta accesible para el panel
   */
  @Prop() label: string;

  /**
   * Si el panel puede recibir el foco o no
   */
  @Prop() focusable = false;

  render() {
    return (
      <Host role="tabpanel" tabindex={this.focusable ? '0' : '-1'}>
        <div class="ath-tab-panel">
          <div class="ath-tab-panel__header">
            {this.label && <div class="title">{this.label}</div>}
            <div class="ath_tab__actions-group">
              <slot name="actions"></slot>
            </div>
          </div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
