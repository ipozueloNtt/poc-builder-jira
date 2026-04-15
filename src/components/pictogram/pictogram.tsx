import { Component, ComponentInterface, Host, h, Element, Prop, getAssetPath } from '@stencil/core';
import { PictogramSizeTypes, PictogramSizeType } from './pictogram.model';

@Component({
  tag: 'ath-pictogram',
  styleUrls: ['pictogram.scss'],
  shadow: true,
})
export class AthPictogram implements ComponentInterface {
  private theme: string;

  @Element() el: HTMLElement | null;

  /**
   * The pictogram name
   */
  @Prop() name: string;

  /**
   * The size of the pictogram
   */
  @Prop({ reflect: true }) size: PictogramSizeTypes = PictogramSizeType.Medium;

  /**
   * The aria-label attribute of the pictogram
   */
  @Prop() ariaLabel: string | null;

  /**
   * The aria-labelledby attribute of the pictogram
   */
  @Prop() ariaLabelledby?: string;

  componentWillLoad() {
    this.theme = document.body.dataset.theme || 'core';
  }

  private hasAriaLabel() {
    return !!this.ariaLabel?.trim();
  }

  private hasAriaLabelledBy() {
    return !this.hasAriaLabel() && !!this.ariaLabelledby?.trim();
  }

  private getHostAttributes() {
    const hasLabel = this.hasAriaLabel() || this.hasAriaLabelledBy();
    return {
      'aria-hidden': !hasLabel ? 'true' : undefined,
      'aria-label': this.hasAriaLabel() ? this.ariaLabel.trim() : undefined,
      'aria-labelledby': this.hasAriaLabelledBy() ? this.ariaLabelledby.trim() : undefined,
      'role': hasLabel ? 'img' : undefined,
    };
  }

  private readonly classNames = () => ({
    'ath-pictogram': true,
    [`ath-pictogram--${this.size}`]: !!this.size,
  });

  render() {
    const assetsPath = getAssetPath(`assets/images/pictograms/${this.theme}`);
    console.log('assetsPath', assetsPath);

    return (
      <Host {...this.getHostAttributes()}>
        <div class={this.classNames()}>
          <img src={`${assetsPath}/${this.name}.svg`} alt=""></img>
        </div>
      </Host>
    );
  }
}
