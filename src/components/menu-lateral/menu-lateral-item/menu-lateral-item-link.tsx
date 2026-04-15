import { Component, Prop, ComponentInterface } from '@stencil/core';
import { TargetType } from '../menu-lateral.model';

@Component({
  tag: 'ath-menu-lateral-item-link',
  scoped: true,
})
export class AthMenuLateralItemLink implements ComponentInterface {
  /**
   * The aria-label of the item
   */
  @Prop() ariaLabel: string | null;

  /**
   * The accesible label of the badge
   */
  @Prop() badgeLabel: string;

  /**
   * The maximum value inside the badge
   */
  @Prop() badgeMax: number;

  /**
   * The value inside the badge
   */
  @Prop() badgeValue: number;

  /**
   * Weather the button is disabled
   */
  @Prop() disabled = false;

  /**
   * The icon of the menu-button-item-link
   */
  @Prop() icon: string;

  /**
   * The name of the item, usefull in order to identify the selected item
   */
  @Prop() name: string;

  /**
   * Weather the button is selected
   */
  @Prop() selected = false;

  /**
   * Tooltip text
   */
  @Prop() tooltipText: string;

  /**
   * The text that indicates that the link open a new window
   */
  @Prop() externalLabel = 'Se abre en una nueva ventana';

  /**
   * The URL of the link
   */
  @Prop() href: string;

  /**
   * The rel of the link
   */
  @Prop() rel: string;

  /**
   * The target of the link
   */
  @Prop() target = TargetType.Self;
}
