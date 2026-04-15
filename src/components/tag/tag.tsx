import { Component, ComponentInterface, Host, Prop, h, Element } from '@stencil/core';
import { TAG_DEFAULT_COLOR, TAG_DEFAULT_SIZE, TagColorTypes, TagSizes } from './tag.model';

@Component({
  tag: 'ath-tag',
  styleUrls: ['tag.scss'],
  shadow: true,
})
export class AthTag implements ComponentInterface {
  /**
   * Color del tag acompañando al propósito del mensaje
   **/
  @Prop({ reflect: true }) color: TagColorTypes = TAG_DEFAULT_COLOR;

  /**
   * Tamaño del tag
   **/
  @Prop({ reflect: true }) size: TagSizes = TAG_DEFAULT_SIZE;

  /**
   * Icono
   */
  @Prop() icon: string;

  /**
   * Texto que se visualiza dentro del tag
   **/
  @Prop() headingText: string;

  private getClassNames = () => ({
    'ath-tag': true,
    [`ath-tag--${this.color}`]: !!this.color,
    [`ath-tag--${this.size}`]: !!this.size,
  });

  @Element() el: HTMLElement;

  render() {
    return (
      <Host>
        <div class="ath-tag-container">
          <span class={this.getClassNames()}>
            {this.icon && <ath-icon size="xs" icon={this.icon} color="inherit"></ath-icon>}
            <span>{this.headingText ?? <slot></slot>}</span>
          </span>
        </div>
      </Host>
    );
  }
}
