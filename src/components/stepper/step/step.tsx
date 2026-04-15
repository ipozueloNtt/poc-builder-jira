import { Component, Prop, h, JSX, Host, ComponentInterface, Element, EventEmitter, Event, State } from '@stencil/core';
import { StepAlignment, StepAlignmentType, StepFeedback, StepFeedbackType, StepRoleType, StepSizeType, StepSize, StepRole } from './step-model';
import { IconSize } from '@utils/helper';
import { FcButtonComp } from 'sharedfc/input';
import { ButtonIconPosition } from 'components/button/button.model';
import { IconColor } from 'components/icon/icon.model';
import { StepperSize } from '../stepper-model';

let stepSequence = 0;

@Component({
  tag: 'ath-step',
  styleUrls: ['step.scss'],
  shadow: true,
})
export class AthStep implements ComponentInterface {
  private hostId = `step-${++stepSequence}`;
  private titleId = `title-${this.hostId}`;
  private panelId = `panel-${this.hostId}`;

  /**
   * Defines the action text
   */
  @Prop() actionText: string;

  /**
   * Indicates the alignment of the step
   */
  @Prop() alignment: StepAlignmentType;

  /**
   * Indicates if the step is interactive
   */
  @Prop() clickable: boolean;

  /**
   * Defines the accessible text for the chevron when its function is to collapse
   */
  @Prop() collapseLabel: string;

  /**
   * Defines the accessible text for the completed state
   */
  @Prop() completedLabel: string;

  /**
   * Indicates if the step is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Defines the accessible text for the step
   */
  @Prop() athAriaLabel: string;

  /**
   * Defines the accessible message announced when the step changes to selected.Only applied on non-interactive steps
   */
  @Prop() ariaLiveMessage: string;

  /**
   * Identifies the step by its position in the list
   */
  @Prop() athId: number;

  /**
   * Indicates if the step is a button or a link
   */
  @Prop({ mutable: true }) athRole: StepRoleType = StepRole.Button;

  /**
   * Specifies the accessible text for the error indicator
   */
  @Prop() errorLabel: string;

  /**
   * Indicates the custom accessible text for the chevron to expand
   */
  @Prop() expandLabel: string;

  /**
   * Indicates if the step contains an error
   */
  @Prop() feedback: StepFeedbackType = StepFeedback.None;

  /**
   * Defines the title of the step
   */
  @Prop() headingText: string;

  /**
   * Indicates if the step is collapsable
   */
  @Prop() isCollapsable: boolean = false;

  /**
   * Indicates if the step is completed
   */
  @Prop() isComplete: boolean = false;

  /**
   * Indicates if the slot is expanded
   */
  @Prop({ mutable: true }) isExpanded = false;

  /**
   * Indicates the number of the step
   */
  @Prop() number: number;

  /**
   * Indicates that the step is read-only
   */
  @Prop() readonly: boolean = false;

  /**
   * Indicates that the step is in progress
   */
  @Prop() selected: boolean;

  /**
   * Sets the size of the step
   */
  @Prop({ mutable: true, reflect: true }) size: StepSizeType;

  /**
   * Indicates the total number of steps in the stepper
   */
  @Prop() total: number;

  @Event() athClick: EventEmitter<number>;

  @Element() el: HTMLElement;

  @State() isHover: boolean;

  @State() buttonAriaLive: string;

  private isActionVisible: boolean;
  private buttonAriaLabel: string;
  private finalcollapseLabel: string;
  private finalexpandLabel: string;

  private getValidAriaValue(value: string | undefined | null): string | undefined {
    return value && value.trim() !== '' ? value : undefined;
  }

  componentWillLoad(): Promise<void> | void {
    this.isActionVisible = this.actionText && this.clickable && !this.disabled && !this.readonly && !this.selected;
    this.getStepAria('label');
    this.getStepAria('live');
    this.getChevronAriaLabels();
  }

  componentWillUpdate(): Promise<void> | void {
    this.isActionVisible = this.actionText && this.clickable && !this.disabled && !this.readonly && !this.selected;
  }

  private getClassNames = () => ({
    'ath-step': true,
    [`ath-step--${this.alignment}--${this.size}`]: !!this.alignment && !!this.size,
    [`ath-step--complete`]: this.isComplete === true,
    [`ath-step--disabled`]: this.disabled === true,
    [`ath-step--error`]: this.feedback === StepFeedback.Error && !this.disabled,
    [`ath-step--readonly`]: this.readonly === true,
    [`ath-step--selected`]: this.selected === true,
    [`ath-step--clickable`]: this.clickable === true,
  });

  private renderIndicator = () => {
    const iconSize = this.size === StepperSize.Medium ? IconSize.Medium : IconSize.Extrasmall;
    return (
      <div class="ath-step-indicator">
        <div class="ath-step__number">
          {this.isComplete ? (
            <ath-icon icon="completed" color={!this.disabled ? IconColor.Inverse : IconColor.Disabled} size={iconSize}></ath-icon>
          ) : this.feedback === StepFeedback.Error ? (
            <ath-icon icon="failed" color={this.disabled ? IconColor.Disabled : this.selected || this.isHover ? IconColor.Inverse : IconColor.Error} size={iconSize}></ath-icon>
          ) : (
            <div class="text">{this.number || 0}</div>
          )}
        </div>

        {this.alignment === StepAlignment.Left && (
          <div class="ath-step__divider">
            <div class="line"></div>
          </div>
        )}
      </div>
    );
  };

  private renderContent = () => {
    return (
      <div class="ath-step-content">
        <div class="ath-step_content-info">
          <div class="header-text" id={this.titleId}>
            {this.headingText}
          </div>
          {this.isActionVisible && <div class="action-text">{this.actionText}</div>}
          <div
            aria-labelledby={this.titleId}
            aria-hidden={!this.isExpanded ? 'true' : 'false'}
            class={this.alignment === StepAlignment.Left && !this.isExpanded && 'ath-visibility-hidden'}
            id={this.panelId}
          >
            <slot></slot>
          </div>
        </div>
      </div>
    );
  };

  private collapseButton = () => {
    const size = this.size === StepSize.Sm ? 'xs' : 'md';
    return (
      <div
        class={{
          'ath-collapse-button': true,
          'ath-collapse-button--open': this.isExpanded,
        }}
      >
        <FcButtonComp
          icon="chevron_down"
          color={this.disabled ? IconColor.Disabled : IconColor.Default}
          iconPosition={ButtonIconPosition.IconOnly}
          size={size}
          onClick={this.handleCollapse}
          buttonAriaLabel={this.isExpanded ? this.finalcollapseLabel : this.finalexpandLabel}
          aria-controls={this.isCollapsable ? this.panelId : undefined}
          aria-expanded={this.isExpanded}
          disabled={this.disabled}
        ></FcButtonComp>
      </div>
    );
  };

  private handleClick = () => {
    if (this.isActionVisible) {
      this.athClick.emit(this.athId);
    }
  };

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.handleClick();
    }
  }

  private handleCollapse = () => {
    this.isExpanded = !this.isExpanded;
  };

  private getStepAria(labelType: 'label' | 'live') {
    const ariaProperty = labelType === 'label' ? this.athAriaLabel : this.ariaLiveMessage;
    const replacements = {
      '[number]': this.number ? this.number.toString() : '',
      '[total]': this.total ? this.total.toString() : '',
      '[heading-text]': this.headingText ? this.headingText : '',
      '[action-text]': this.actionText ? this.actionText : '',
      '[completed]': this.completedLabel ? this.completedLabel : '',
      '[error]': this.errorLabel ? this.errorLabel : '',
    };

    let statelessButtonAria: string;
    if (ariaProperty) {
      statelessButtonAria = ariaProperty.replace(/\[number\]|\[total\]|\[heading-text\]|\[action-text\]|\[completed\]|\[error\]/g, match => replacements[match]);
    }

    let stateButtonAria: string = statelessButtonAria;
    if (ariaProperty && ariaProperty.includes('[state-label]')) {
      if (this.isComplete && this.completedLabel) {
        stateButtonAria = statelessButtonAria.replace('[state-label]', this.completedLabel);
      } else if (this.feedback === StepFeedback.Error && this.errorLabel) {
        stateButtonAria = statelessButtonAria.replace('[state-label]', this.errorLabel);
      } else {
        stateButtonAria = statelessButtonAria.replace('[state-label]', '');
      }
    }

    if (labelType === 'label') {
      this.buttonAriaLabel = stateButtonAria;
    } else {
      this.buttonAriaLive = stateButtonAria;
    }
  }

  private getChevronAriaLabels = () => {
    if (this.collapseLabel) {
      this.finalcollapseLabel = this.collapseLabel.replace('[number]', this.number.toString()).replace('[heading-text]', this.headingText);
    }
    if (this.expandLabel) {
      this.finalexpandLabel = this.expandLabel.replace('[number]', this.number.toString()).replace('[heading-text]', this.headingText);
    }
  };

  render(): JSX.Element {
    return (
      <Host role="listitem">
        <div
          class={this.getClassNames()}
          onMouseEnter={() => {
            if (!this.disabled && this.clickable) {
              this.isHover = true;
            }
          }}
          onMouseLeave={() => {
            this.isHover = false;
          }}
        >
          <div
            class="ath-step-wrapper"
            tabindex={this.isActionVisible ? 0 : -1}
            onClick={this.handleClick}
            onKeyDown={e => this.handleKeyDown(e as KeyboardEvent)}
            role={this.isActionVisible ? this.athRole : undefined}
            aria-current={this.selected ? 'step' : undefined}
            aria-describedby={this.getValidAriaValue(this.panelId)}
            aria-disabled={this.disabled}
            aria-label={this.isActionVisible ? this.getValidAriaValue(this.buttonAriaLabel) : undefined}
          >
            {this.renderIndicator()}
            {this.renderContent()}

            {!this.isActionVisible && (
              <div class="ath-visibility-hidden" role="status" aria-live="polite" aria-atomic="true">
                {this.selected && this.getValidAriaValue(this.buttonAriaLive)}
              </div>
            )}
          </div>
          {this.isCollapsable && this.alignment === StepAlignment.Left && this.collapseButton()}
        </div>
      </Host>
    );
  }
}
