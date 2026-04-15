import { Component, ComponentInterface, Prop } from '@stencil/core';
import { menuItemLinkTarget, menuItemLinkTargets } from './menu-vertical-item-link.model';

@Component({
  tag: 'ath-menu-vertical-item-link',
  scoped: true,
})
export class AthMenuVerticalItemLink implements ComponentInterface {
  /**
   * Whether the link is selected
   */
  @Prop() selected = false;

  /**
   * Whether the link is disabled
   */
  @Prop() disabled = false;

  /**
   * Icon of the item
   **/
  @Prop() icon: string;

  /**
   * Title of the link
   **/
  @Prop() text: string;

  /**
   * Value of the item, in order to identify it.
   **/
  @Prop() value: string;

  /**
   * URL of the link
   **/
  @Prop() href: string;

  /**
   * target of the link: blank | self
   **/
  @Prop() target: menuItemLinkTarget = menuItemLinkTargets.Blank;

  /**
   * rel of the link
   **/
  @Prop() rel: string;

  /**
   * The text that indicates that the link open a new window
   **/
  @Prop() externalLabel = 'Se abre en una nueva ventana';
}
