import { Component, ComponentInterface, Element, h, Host, JSX, Listen, Prop, State } from '@stencil/core';
import { TooltipColors, TooltipColor, TooltipPositions, TooltipPosition, TooltipTriggers, TooltipTrigger } from './tooltip.model';

let tooltipSequence = 0;

@Component({
  tag: 'ath-tooltip',
  styleUrl: 'tooltip.scss',
  scoped: true,
})
export class AthTooltip implements ComponentInterface {
  private hostId = ++tooltipSequence;
  private tooltipId = `tooltip-${this.hostId}`;

  /**
   * Whether the tooltip has an arrow
   */
  @Prop() hasArrow = true;

  /**
   * The position of the tooltip
   */
  @Prop() position: TooltipPositions = TooltipPosition.Right;

  /**
   * The variant of the tooltip
   */
  @Prop() color: TooltipColors = TooltipColor.Primary;

  /**
   * Whether the tooltip has a maximum width, and if so, the maximum width
   */
  @Prop() maxWidth = 240;

  /**
   * The action that will show the tooltip
   */
  @Prop() trigger: TooltipTriggers = TooltipTrigger.Hover;

  /**
   * The text in the tooltip
   */
  @Prop() headingText = '';

  @State() isVisible = false;

  @Element() el: HTMLElement;

  @Listen('athFocus')
  handleFocus() {
    if (this.trigger === TooltipTrigger.Hover) {
      this.showTooltip();
    }
  }

  @Listen('athBlur')
  handleBlur() {
    if (this.trigger === TooltipTrigger.Hover) {
      this.hideTooltip();
    }
  }

  @Listen('athClick')
  handleClick() {
    if (this.trigger === TooltipTrigger.Click) {
      if (this.isVisible) {
        this.hideTooltip();
      } else {
        this.showTooltip();
        document.addEventListener('focusout', this.hideTooltip);
      }
    }
  }

  @Listen('mouseenter')
  handleMouseEnter() {
    if (this.trigger === TooltipTrigger.Hover) {
      this.showTooltip();
    }
  }

  @Listen('mouseleave')
  handleMouseLeave() {
    if (this.trigger === TooltipTrigger.Hover) {
      this.hideTooltip();
    }
  }

  handleKeyDown(ev: KeyboardEvent) {
    if (this.isVisible && ev.code === 'Escape') {
      this.hideTooltip();
    }
  }

  private showTooltip = () => {
    this.isVisible = true;
    this.calculateTooltipPosition();
  };

  private calculateTooltipPosition = () => {
    const container = this.el.querySelector('.ath-tooltip-container');
    const tooltip = this.el.querySelector('[role="tooltip"]') as HTMLElement;
    let containerPosition;
    let tooltipPosition;
    if (container) {
      containerPosition = container.getBoundingClientRect();
      tooltipPosition = tooltip.getBoundingClientRect();
    }

    if (!tooltip) {
      return;
    }

    const minimumContainerSize = 40;
    const combinedXtranslation = container.clientWidth < minimumContainerSize ? container.clientWidth / 2 + 20 : 40;

    const gap = 12;

    switch (this.position) {
      case 'top':
        tooltip.style.top = `-${tooltipPosition.height + 8 + gap}px`;
        tooltip.style.left = `${containerPosition.width / 2 - tooltipPosition.width / 2}px`;
        break;
      case 'left':
        tooltip.style.top = `-${tooltipPosition.height / 2 - containerPosition.height / 2}px`;
        tooltip.style.left = `-${tooltip.clientWidth + 8 + gap}px`;
        break;
      case 'bottom':
        tooltip.style.bottom = `-${tooltipPosition.height + 8 + gap}px`;
        tooltip.style.left = `${containerPosition.width / 2 - tooltipPosition.width / 2}px`;
        break;
      case 'right':
        tooltip.style.top = `-${tooltipPosition.height / 2 - containerPosition.height / 2}px`;
        tooltip.style.left = `${containerPosition.width + 8 + gap}px`;
        break;

      case 'top-left':
        tooltip.style.top = `-${tooltipPosition.height + 8 + gap}px`;
        tooltip.style.left = `-${tooltip.clientWidth - combinedXtranslation}px`;
        break;
      case 'top-right':
        tooltip.style.top = `-${tooltipPosition.height + 8 + gap}px`;
        tooltip.style.right = `-${tooltipPosition.width - combinedXtranslation}px`;
        break;

      case 'bottom-left':
        tooltip.style.bottom = `-${tooltipPosition.height + 8 + gap}px`;
        tooltip.style.left = `-${tooltip.clientWidth - combinedXtranslation}px`;
        break;
      case 'bottom-right':
        tooltip.style.bottom = `-${tooltipPosition.height + 8 + gap}px`;
        tooltip.style.right = `-${tooltipPosition.width - combinedXtranslation}px`;
        break;
    }
  };

  private hideTooltip = () => {
    this.isVisible = false;
    document.removeEventListener('focusout', this.hideTooltip);
  };

  private classNames = () => ({
    'ath-tooltip': true,
    [`ath-tooltip--${this.position}`]: !!this.position,
    [`ath-tooltip--${this.color}`]: !!this.color,
    'ath-tooltip--no-arrow': !this.hasArrow,
    'ath-tooltip--visible': this.isVisible,
  });

  componentDidLoad(): void {
    const topWindow = window.top || window;
    topWindow.addEventListener('keydown', this.handleKeyDown.bind(this));

    const trigger = this.el.querySelector('ath-button') ?? this.el.querySelector('ath-tooltip-trigger');

    if (trigger) {
      trigger.setAttribute('aria-describedby', this.tooltipId);
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class="ath-tooltip-container">
          <slot></slot>
          {this.headingText !== '' && (
            <span
              id={this.tooltipId}
              role="tooltip"
              class={this.classNames()}
              style={{
                '--max-width': this.maxWidth === 0 ? 'none' : `${this.maxWidth}px`,
              }}
            >
              {this.headingText}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
