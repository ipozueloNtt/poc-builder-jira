import { Component, Prop } from '@stencil/core';
import { TargetType, TargetTypes } from '../menu-horizontal.model';

@Component({
  tag: 'ath-menu-horizontal-item',
  scoped: true,
})
export class AthMenuHorizontalItem {
  /**
   * The accessible text of the badge
   */
  @Prop() badgeLabel: string;

  /**
   * The value of the badge
   */
  @Prop() badgeValue: number = undefined;

  /**
   * The maximum value inside the badge
   */
  @Prop() badgeMax: number;

  /**
   * Whether the item is disabled or not
   */
  @Prop() disabled: boolean;

  /**
   * Additional text to be appended to the aria-label to indicate that this is an external link
   */
  @Prop() externalLabel = '(Se abre en una nueva ventana)';

  /**
   * The URL of the item
   */
  @Prop() href: string;

  /**
   * The label of the item
   */
  @Prop() label: string;

  /**
   * Whether the item is selected or not
   */
  @Prop({ reflect: true }) selected: boolean;

  /**
   * Specifies the relationship of the linked URL
   */
  @Prop() rel: string;

  /**
   * The target of the link
   */
  @Prop() target: TargetTypes = TargetType.Self;

  /*
   * Value of the item
   */
  @Prop() value: any;
}
