import { Component, Prop, h, JSX, ComponentInterface, Element, Listen, Event, EventEmitter } from '@stencil/core';
import { StepperOrientation, StepperOrientationType, StepperSize, StepperSizeType } from './stepper-model';
import { StepAlignment, StepRole, StepRoleType, StepSize } from './step/step-model';

let stepperSequence = 0;

@Component({
  tag: 'ath-stepper',
  styleUrls: ['stepper.scss'],
  shadow: true,
})
export class AthStepper implements ComponentInterface {
  private hostId = ++stepperSequence;
  private headingId = `tab-${this.hostId}`;
  private timeoutProgressBarComp: NodeJS.Timeout;

  @Element() el: HTMLElement;

  /**
   * Indicates if the steps are interactive
   */
  @Prop() clickable = true;

  /**
   * Indicates the custom accessible text for the chevron to collapse
   */
  @Prop() collapseLabel: string = 'Colapsar paso [number]';

  /**
   * Specifies the accessible text for the CHECK indicator of completion, which will be injected into the steps
   */
  @Prop() completedLabel = 'Completado';

  /**
   * Defines the accessible text for the step
   */
  @Prop() athAriaLabel: string;

  /**
   * Defines the message for screen readers when changing the step. Only applied on non-interactive steps
   */
  @Prop() ariaLiveMessage: string = 'Paso actual [number]';

  /**
   * Indicates the role of the step
   */
  @Prop() athRole: StepRoleType = StepRole.Button;

  /**
   * Specifies the accessible text for the error indicator in steps
   */
  @Prop() errorLabel = 'Error';

  /**
   * Indicates the custom accessible text for the chevron to expand
   */
  @Prop() expandLabel: string = 'Expandir paso [number]';

  /**
   * Indicates the icon to use in the title
   */
  @Prop() headingIcon: string;

  /**
   * Indicates the title of the stepper
   */
  @Prop() headingText: string;

  /**
   * Indicates the orientation of the stepper
   */
  @Prop() orientation: StepperOrientationType = StepperOrientation.Horizontal;

  /**
   * Indicates if the all the steps are read-only
   */
  @Prop() readonly = false;

  /**
   * Indicates the size of the steps
   */
  @Prop() size: StepperSizeType = StepperSize.Medium;

  /**
   * Indicates the number of the first step
   */
  @Prop() startFrom = 1;

  @Event() athSelect: EventEmitter<HTMLAthStepElement>;

  componentWillLoad() {
    this.injectToSteps();
  }

  componentDidLoad() {
    this.manageDividers();
    this.manageProgressBar();
  }

  private getValidAriaValue(value: string | undefined | null): string | undefined {
    return value && value.trim() !== '' ? value : undefined;
  }

  private injectToSteps = () => {
    const steps = Array.from(this.el.querySelectorAll('ath-step'));
    steps.forEach((stepElement, index) => {
      if (this.clickable) {
        stepElement.clickable = this.clickable;
      }
      if (this.collapseLabel) {
        stepElement.collapseLabel = this.collapseLabel;
      }
      if (!stepElement.completedLabel && this.completedLabel) {
        stepElement.completedLabel = this.completedLabel;
      }

      if (this.errorLabel) {
        stepElement.errorLabel = this.errorLabel;
      }
      if (this.expandLabel) {
        stepElement.expandLabel = this.expandLabel;
      }
      if (this.readonly) {
        stepElement.readonly = this.readonly;
      }
      if (!stepElement.number) {
        stepElement.number = this.startFrom + index;
      }
      if (!stepElement.athAriaLabel) {
        stepElement.athAriaLabel = this.getValidAriaValue(this.athAriaLabel);
      }
      if (!stepElement.ariaLiveMessage) {
        stepElement.ariaLiveMessage = this.getValidAriaValue(this.ariaLiveMessage);
      }

      stepElement.athRole = this.athRole || StepRole.Button;
      stepElement.alignment = this.orientation === StepperOrientation.Horizontal ? StepAlignment.Center : StepAlignment.Left;
      stepElement.athId = index;
      stepElement.size = !(this.size === StepperSize.Medium) ? StepSize.Sm : StepSize.Md;
      stepElement.total = steps.length;
    });
  };

  private manageDividers = () => {
    const steps = Array.from(this.el.querySelectorAll('ath-step'));
    steps.forEach((stepElement, index) => {
      if (this.orientation === StepperOrientation.Horizontal) {
        if (index < steps.length - 1) {
          const div = document.createElement('div');
          div.innerHTML = '<ath-divider></ath-divider>';
          div.role = 'listitem';
          div.style.width = '100%';
          div.style.transform = 'translateY(24px)';
          stepElement.insertAdjacentElement('afterend', div);
          if (this.readonly) {
            div.style.visibility = 'hidden';
            div.style.opacity = '0';
          }
        }
      } else {
        const line = steps[index].shadowRoot.querySelector('.line') as HTMLElement;
        if (line) {
          if (this.readonly) {
            line.classList.add('hidden');
          } else {
            if (index + 1 === steps.length) {
              line.classList.add('hidden');
            }
          }
        }
      }
    });
  };

  private checkDetailData(ev: CustomEvent<number>) {
    if (ev.detail != null || ev.detail != undefined) {
      if (ev.detail || ev.detail == 0) {
        return true;
      }
    }
    return false;
  }

  @Listen('athClick')
  manageSelectedStepId(ev: CustomEvent<number>) {
    if (this.checkDetailData(ev)) {
      const stepPosition = ev.detail;
      this.manageSelection(stepPosition);
      const steps = Array.from(this.el.querySelectorAll('ath-step'));
      this.athSelect.emit(steps[stepPosition]);
      this.manageProgressBar();
      ev.stopPropagation();
    }
  }

  disconnectedCallback() {
    if (this.timeoutProgressBarComp) clearTimeout(this.timeoutProgressBarComp);
  }

  private manageProgressBar() {
    if (this.timeoutProgressBarComp) clearTimeout(this.timeoutProgressBarComp);
    const progressBars = Array.from(this.el.shadowRoot.querySelectorAll('ath-progress-bar')) as any[];
    const steps = Array.from(this.el.querySelectorAll('ath-step'));
    const stepIndex = steps.findIndex(item => item.selected === true);

    let progress = 0;
    progressBars.forEach((progressElement, index) => {
      progressElement.athAriaLabel = `Progreso del paso ${index + 1} de ${steps.length}`;
      if (index <= stepIndex) {
        progressElement.valueText = index === stepIndex ? 'Actual' : this.completedLabel;
        if ((progressElement as any).value !== 1) {
          this.timeoutProgressBarComp = setTimeout(() => {
            progressElement.value = 1;
          }, 240 * progress);
          ++progress;
        }
      } else {
        progressElement.value = 0;
        progressElement.valueText = 'Pendiente';
      }
    });
  }

  private manageSelection = id => {
    const steps = Array.from(this.el.querySelectorAll('ath-step'));
    steps.forEach(stepElement => {
      stepElement.selected = false;
    });

    steps[id].selected = true;
  };

  private getClassNames = () => ({
    'ath-stepper': true,
    [`ath-stepper--${this.orientation}`]: !!this.orientation,
  });

  private renderProgressBar() {
    const progressBarArray = [];
    const steps = Array.from(this.el.querySelectorAll('ath-step'));
    const totalSteps = steps.length - 1;

    for (let i = 0; i <= totalSteps; i++) {
      progressBarArray.push(<ath-progress-bar infinite={false} label-alignment="stack" max={1} min={0} value={0}></ath-progress-bar>);
    }
    return progressBarArray;
  }

  private renderStepGroup = () => {
    return (
      <div role="list" class="ath-step_group" aria-labelledby={this.headingId}>
        <slot></slot>
      </div>
    );
  };

  private renderSteps = () => {
    if (this.orientation === StepperOrientation.Horizontal) {
      const progressBarArray = this.orientation === StepperOrientation.Horizontal ? this.renderProgressBar() : '';
      return (
        <div class="ath-step_steps">
          <div class="ath-step_progressbar">{progressBarArray}</div>
          {this.renderStepGroup()}
        </div>
      );
    } else {
      return this.renderStepGroup();
    }
  };

  render(): JSX.Element {
    return (
      <section>
        <div class={this.getClassNames()}>
          {this.headingText && (
            <div class="ath-stepper_heading">
              {this.headingIcon && (
                <div class="ath-stepper_heading-icon">
                  <ath-icon icon={this.headingIcon} size="lg" color="primary" aria-hidden="true"></ath-icon>
                </div>
              )}
              <div class="ath-stepper_heading-text" id={this.headingId}>
                {this.headingText}
              </div>
            </div>
          )}
          {this.renderSteps()}
        </div>
      </section>
    );
  }
}
