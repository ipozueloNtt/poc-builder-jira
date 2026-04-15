import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ath-table-body',
  styleUrl: 'table-body.scss',
  shadow: true,
})
export class AthTableBody {
  render() {
    return (
      <Host slot="body" role="rowgroup">
        <slot></slot>
      </Host>
    );
  }
}
