import { Component, ComponentInterface, Prop } from '@stencil/core';

@Component({
  tag: 'ath-card-header',
  scoped: true,
})
export class AthCardHeader implements ComponentInterface {
  /**
   * Title of the card header
   **/
  @Prop() headingText: string;

  /**
   * date of the card header
   **/
  @Prop() date: string;

  /**
   * Overline of the card header
   **/
  @Prop() overline: string;

  /**
   * Subtitle of the card
   **/
  @Prop() subtitle: string;
}
