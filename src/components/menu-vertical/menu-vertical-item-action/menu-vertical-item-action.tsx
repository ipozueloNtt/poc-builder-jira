import { Component, ComponentInterface, Prop } from '@stencil/core';

@Component({
  tag: 'ath-menu-vertical-item-action',
  scoped: true,
})
export class AthMenuVerticalItemAction implements ComponentInterface {
  /**
   * Whether the item is disabled
   */
  @Prop() disabled = false;

  /**
   * Icon of the item
   **/
  @Prop() icon: string;

  /**
   * Whether an item with children is open by default.
   */
  @Prop() open = false;

  /**
   * Whether the item is selected
   */
  @Prop() selected = false;

  /**
   * Title of the item
   **/
  @Prop() text: string;

  /**
   * Value of the item, in order to identify it.
   **/
  @Prop() value: string;
}
