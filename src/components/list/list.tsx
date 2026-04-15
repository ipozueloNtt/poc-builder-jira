import { Component, Host, Prop, h, Element, State } from '@stencil/core';
import { ListOrientation, ListOrientationType, ListSizes, ListSizeType } from './list.model';

@Component({
  tag: 'ath-list',
  styleUrl: 'list.scss',
  scoped: true,
})
export class AthList {
  @Element() el: HTMLElement;

  /** List spacings size*/
  @Prop() size: ListSizeType = ListSizes.Medium;

  /** Define the list orientation*/
  @Prop() orientation: ListOrientationType = ListOrientation.Vertical;

  /** Define if the list contains dividers between items*/
  @Prop() hasDivider: boolean;

  /** List state disabled, only works if clickable is true */
  @Prop() disabled: boolean = false;

  /** List is clickable */
  @Prop() clickable: boolean = false;

  @State() slottedItems: HTMLAthListItemElement[] = [];

  private getHostAttributes = () => ({
    role: 'list',
  });

  private getListClassNames = () => ({
    'ath-list': true,
    [`ath-list--${this.orientation}`]: !!this.orientation,
    'disabled': this.disabled,
    'clickable': this.clickable,
  });

  componentWillLoad() {
    this.slottedItems = Array.from(this.el.querySelectorAll('ath-list-item'));
    this.slottedItems.forEach((item, index) => {
      item.hasDivider = !!this.hasDivider && this.hasDivider && index < this.slottedItems.length - 1;
      item.orientation = this.orientation;
      item.size = this.size;

      if (this.disabled) {
        item.disabled = this.disabled;
      }

      if (this.clickable) {
        item.clickable = this.clickable;
      }
    });
  }

  render() {
    return (
      <Host class={this.getListClassNames()} {...this.getHostAttributes()}>
        <slot></slot>
      </Host>
    );
  }
}
