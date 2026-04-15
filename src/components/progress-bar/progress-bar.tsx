import { Component, Element, Host, Prop, h } from '@stencil/core';
import { ProgressBarLabelAlignmentType, ProgressBarLabelAlignment } from './progress-bar.model';

let inputCounterSeq = 0;
@Component({
  tag: 'ath-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true,
})
export class AthProgressBar {
  @Element() el: HTMLElement;

  /**
   * Infinite determines if the progress bar is a loop or not
   */
  @Prop() infinite: boolean = false;

  /**
   * Text of the label left
   */
  @Prop() labelLeft: string;

  /**
   * Text of the label right
   */
  @Prop() labelRight: string;

  /**
   * Change label alignment
   */
  @Prop() labelAlignment: ProgressBarLabelAlignmentType = ProgressBarLabelAlignment.Stack;

  /**
   * Number min of progress bar
   */
  @Prop() min: number = 0;

  /**
   * Number max of progress bar
   */
  @Prop() max: number = 100;

  /**
   * Value of the progress bar
   */
  @Prop() value: number;

  /**
   * Value text of the progress bar
   */
  @Prop() valueText: string;

  /**
   * Aria Label
   */
  @Prop() athAriaLabel: string;

  /**
   * Calculate the percetage of value
   */
  private get valuePercentage(): number {
    // Calcula el porcentaje relativo entre min y max
    const clampedValue = Math.max(this.min, Math.min(this.max, this.value));
    const range = this.max - this.min;
    if (range === 0) return 0;
    return ((clampedValue - this.min) / range) * 100;
  }

  //Generador de ID dinamicos para accesibilidad
  private uniqueId = (() => {
    return (prefix: string) => {
      const normalized = prefix
        .replace(/\s+/g, '-') // espacios por guiones
        .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase a kebab-case
        .toLowerCase();
      return `${normalized}-${++inputCounterSeq}`;
    };
  })();

  private getHostAtributtes = () => {
    return {
      'role': 'progressbar',
      'aria-valuenow': this.infinite ? undefined : this.value > this.max ? this.max : this.value < this.min ? this.min : this.value,
      'aria-valuemin': this.infinite ? undefined : this.min,
      'aria-valuemax': this.infinite ? undefined : this.max,
      'aria-valuetext': this.valueText ?? undefined,
      'aria-label': this.athAriaLabel || undefined,
    };
  };

  private getClassNames = () => ({
    'ath-progress-bar': true,
    [`ath-progress-bar--${this.labelAlignment}`]: !!this.labelAlignment,
  });

  private getFillerClassNames = () => ({
    'ath-progress-bar__filler': true,
    'infinite': this.infinite,
  });

  render() {
    // Genera los IDs solo si hay label
    const labelLeftId = this.labelLeft ? this.uniqueId(this.labelLeft) : undefined;
    const labelRightId = this.labelRight ? this.uniqueId(this.labelRight) : undefined;

    // Prepara aria-labelledby
    const ariaLabelledBy = !this.athAriaLabel && (labelLeftId || labelRightId) ? [labelLeftId, labelRightId].filter(Boolean).join(' ') : undefined;

    return (
      <Host>
        <div class={this.getClassNames()}>
          {this.labelLeft && this.labelAlignment === 'inline' && (
            <span id={labelLeftId} class="ath-progress-bar-label left">
              {this.labelLeft}
            </span>
          )}
          <div
            {...{
              ...this.getHostAtributtes(),
              'aria-labelledby': ariaLabelledBy,
            }}
            class="ath-progress-bar-item"
            style={{ '--progress-value': `${this.valuePercentage}` }}
          >
            <div class={this.getFillerClassNames()}></div>
          </div>
          {(this.labelLeft || this.labelRight) && this.labelAlignment === 'stack' && (
            <div class="ath-progress-bar-temporal">
              {this.labelLeft && (
                <span id={labelLeftId} class="ath-progress-bar-label left">
                  {this.labelLeft}
                </span>
              )}
              {this.labelRight && (
                <span id={labelRightId} class="ath-progress-bar-label right">
                  {this.labelRight}
                </span>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
