import { Component, Prop, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'ath-menu-lateral-item-action',
  scoped: true,
})
export class AthMenuLateralItemAction implements ComponentInterface {
  /**
   * The aria-label of the item
   */
  @Prop() ariaLabel: string | null;

  /**
   * The maximum value inside the badge
   */
  @Prop() badgeMax: number;

  /**
   * The accesible label of the badge
   */
  @Prop() badgeLabel: string;

  /**
   * The value inside the badge
   */
  @Prop() badgeValue: number;

  /**
   * Weather the button is disabled
   */
  @Prop() disabled = false;

  /**
   * The icon of the menu-button-item-action
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
}
