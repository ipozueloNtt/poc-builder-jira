import { Component, Prop, Element, h, JSX, Host, Event, EventEmitter, ComponentInterface } from '@stencil/core';
import { linkSizes, linkSize, linkTargets, linkTarget } from './link.model';
import { IconType, transformIconSize } from '@utils/helper';

@Component({
  tag: 'ath-link',
  styleUrls: ['link.scss'],
  scoped: true,
})
export class AthLink implements ComponentInterface {
  /**
   * aria-describedby para link
   */
  @Prop() ariaDescribedby: string;

  /**
   * aria-label para link
   */
  @Prop() ariaLabel: string | null;

  /**
   * aria-labelledby para link
   */
  @Prop() ariaLabelledby: string | null;

  /**
   * Indica si el link esta deshabilitado
   */
  @Prop() disabled: boolean;

  /**
   * Indica el icono a usar
   */
  @Prop() icon: string;

  /**
   * Indica el aria-label para icono
   */
  @Prop() iconAriaLabel: string;

  /**
   * Url del destino
   */
  @Prop() linkHref: string;

  /**
   * Target para indicar donde se abrira
   */
  @Prop() linkTarget: linkTargets = linkTarget.Blank;

  /**
   * Tamaño link
   */
  @Prop() size: linkSizes = linkSize.Md;

  /**
   * Opcion del subrayado
   */
  @Prop() underline = true;

  /**
   * Additional text to be appended to the aria-label to indicate that this is an external link
   */
  @Prop() externalLabel?: string;

  /**
   * Emitted when the link is clicked
   */
  @Event() athClick: EventEmitter<void>;

  /**
   * Emitted when the lin gains focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the link loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  @Element() el: HTMLElement;

  private handleClick = () => {
    this.athClick.emit();
  };

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleBlur = () => {
    this.athBlur.emit();
  };

  private setAriaLabel(baseLabel?: string) {
    let label = baseLabel?.trim() || '';

    if (this.linkTarget === linkTarget.Blank) {
      const extra = this.externalLabel || '(enlace externo)';
      label = label ? `${label} ${extra}` : extra;
    } else if (this.externalLabel) {
      label = label ? `${label} ${this.externalLabel}` : this.externalLabel;
    }

    return label;
  }

  private getClassNames = () => ({
    'ath-link': true,
    [`ath-link--${this.size}`]: !!this.size,
    'ath-link--disabled': this.disabled,
    'ath-link--underline': this.icon ? this.underline : true,
  });

  private renderIcon = () => {
    const iconSize = transformIconSize(IconType.Link, this.size);
    return <ath-icon icon={this.icon} size={iconSize} aria-label={this.iconAriaLabel} color="inherit"></ath-icon>;
  };

  render(): JSX.Element {
    const target = '_' + this.linkTarget;
    const linkTabindex = this.el.getAttribute('tabindex') === '-1' || this.disabled ? '-1' : '0';
    return (
      <Host>
        <a
          class={this.getClassNames()}
          href={this.linkHref}
          target={target}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          tabindex={linkTabindex}
          aria-label={this.setAriaLabel(this.ariaLabel)}
          aria-labelledby={this.ariaLabelledby}
          aria-describedby={this.ariaDescribedby}
          aria-disabled={this.disabled ? 'true' : 'false'}
        >
          <slot></slot>
          {!!this.icon && this.renderIcon()}
        </a>
      </Host>
    );
  }
}
