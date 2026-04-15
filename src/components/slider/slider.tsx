import { Component, EventEmitter, h, Host, Prop, State, Watch, Event, AttachInternals } from '@stencil/core';
import { FcInputLabel, FcInputLabelType } from 'sharedfc/input/label/fc-label';
import { SliderFeedbackErrorCounterType, SliderFeedbackErrorCounterTypes, SliderFeedbackType, SliderFeedbackTypes, SliderType, SliderTypes } from './slider.model';
import { FcInputHelperText, FcInputHelperTextType } from 'sharedfc/input/helper/fc-helper';
import { FcInputFeedback, FcInputFeedbackType } from 'sharedfc/input/feedback/fc-feedback';
import { FcHelpDescription } from 'sharedfc/tooltip';

let sliderSequence = 0;

@Component({
  tag: 'ath-slider',
  styleUrl: 'slider.scss',
  shadow: true,
  formAssociated: true,
})
export class AthSlider {
  private sliderId = `ath-slider-${sliderSequence++}`;
  private sliderHintId: string;
  private sliderFeedbackId: string;
  private initialValue: string;

  @AttachInternals() internals: ElementInternals;

  /**
   * The aria-label attribute of the first input-counter.
   */
  @Prop() fromAriaLabel: string;
  /**
   * The aria-label attribute of the slider.
   */
  @Prop() groupAriaLabel: string;
  /**
   * The aria-label attribute of the second input-counter.
   */
  @Prop() toAriaLabel: string;
  /**
   * Detail text at the left of the slider
   */
  @Prop() detailFirst: string;
  /**
   * Detail text at the right of the slider
   */
  @Prop() detailLast: string;
  /**
   * If true, the user cannot interact with the slider and the inputs.
   */
  @Prop() disabled = false;
  /**
   * The type of the feedback. If 'error' the error feedback will be shown.
   */
  @Prop() feedback: SliderFeedbackType = SliderFeedbackTypes.None;
  /**
   * The ath-input-counter width.
   */
  @Prop() counterWidth: string = 'auto';
  /**
   * Feedback error for input counter if is from, to, both or none.
   */
  @Prop() feedbackCounter: SliderFeedbackErrorCounterType = SliderFeedbackErrorCounterTypes.None;
  /**
   * The message for the feedback.
   */
  @Prop() feedbackText: string;
  /**
   * Message to help the user fill the input value.
   */
  @Prop() helperText: string;
  /**
   * Label slider
   */
  @Prop() labelGroup: string;
  /**
   * Represents the maximum number of the input & slider.
   */
  @Prop() max: number = 100;
  /**
   * Represents the minimum number of the input & slider.
   */
  @Prop() min: number = 0;
  /**
   * The name of the slider. Submitted with the form as part of a name/value pair
   */
  @Prop() name: string;
  /**
   * If true, the user cannot modify the value.
   */
  @Prop() readonly = false;
  /**
   * If true, the user must fill in a value before submitting a form.
   */
  @Prop() required = false;
  /**
   * If true, the * asterisk will be show when required = true.
   */
  @Prop() showRequired = true;
  /**
   * Specifies the interval between legal numbers in an <input> element & slider.
   */
  @Prop() step: number = 1;
  /**
   * If true show step marks.
   */
  @Prop() stepped = false;
  /**
   * The type of slider. if range shows two handles to select between two numbers.
   */
  @Prop() type: SliderType = SliderTypes.Default;
  /**
   * Specifies text for tooltip.
   */
  @Prop() tooltipText: string;
  /**
   * Specifies the unit for the input.
   */
  @Prop() unit: string;
  /**
   * Current value of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop({ mutable: true }) value: string = this.min.toString();
  /**
   * The aria-valuetext attribute for slider.
   */
  @Prop() valueText: string;
  /**
   * Specifies the width for slider.
   */
  @Prop() width: string;
  /**
   * Emitted when the value has changed.
   */
  @Event() athChange: EventEmitter<string>;

  /**
   * Emitted when the slider gains focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the slider loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  @State() isFocused: boolean = false;

  @State() currentValue: number | number[];

  @Watch('currentValue')
  updateCurrentValue() {
    this.checkValues();

    if (Array.isArray(this.currentValue)) {
      this.value = `[${this.currentValue.join(',')}]`;
    } else {
      this.value = this.currentValue.toString();
    }
    if (this.isFocused) {
      this.handleChange();
    }
  }

  @Watch('value')
  updateValue() {
    this.parseValue();
    this.setInputValue(this.value);
  }

  private sliderTrack: HTMLElement;
  private activeHandle: 'handle1' | 'handle2' | 'slider-track' | null;

  private handleChange = () => this.athChange.emit(this.value);

  private handleFocus = event => {
    event.stopPropagation();
    if (!this.isFocused) {
      this.isFocused = true;
      this.athFocus.emit();
      document.addEventListener('focusout', this.handleBlur);
    }
  };

  private handleBlur = () => {
    this.isFocused = false;
    this.athBlur.emit();
    document.removeEventListener('focusout', this.handleBlur);
  };

  private preventBlurSubcomponent = event => event.stopPropagation();

  private checkNearPosition(event: MouseEvent) {
    const rect = this.sliderTrack.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percent = offsetX / rect.width;
    const newValue = Math.round((this.min + percent * (this.max - this.min)) / this.step) * this.step;

    if (this.type === SliderTypes.Range) {
      const leftHandleValue = this.currentValue[0];
      const rightHandleValue = this.currentValue[1];

      const leftDistance = Math.abs(newValue - leftHandleValue);
      const rightDistance = Math.abs(newValue - rightHandleValue);

      if (leftDistance < rightDistance) {
        this.currentValue = [Math.min(newValue, this.currentValue[1]), this.currentValue[1]];
        const handle1 = this.sliderTrack.querySelector('.ath-slider-handle-range') as HTMLSpanElement;
        handle1.focus();
        this.activeHandle = 'handle1';
      } else {
        this.currentValue = [this.currentValue[0], Math.max(newValue, this.currentValue[0])];
        const handle2 = this.sliderTrack.querySelector('.ath-slider-handle-range2') as HTMLSpanElement;
        handle2.focus();
        this.activeHandle = 'handle2';
      }
    } else {
      this.currentValue = Math.min(Math.max(newValue, this.min), this.max);
      const handle1 = this.sliderTrack.querySelector('.ath-slider-handle-range') as HTMLSpanElement;
      handle1.focus();
      this.activeHandle = 'handle1';
    }

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.updateSliderPosition();
  }

  private parseValue() {
    if (this.value && !this.value.includes('NaN')) {
      const parsedValue = JSON.parse(this.value);
      if ((Array.isArray(parsedValue) && this.type === SliderTypes.Range) || (!Array.isArray(parsedValue) && this.type === SliderTypes.Default)) {
        this.currentValue = parsedValue;
      } else if (!Array.isArray(parsedValue) && this.type === SliderTypes.Range) {
        this.currentValue = [parsedValue, this.max];
      }
    }
  }

  private checkValues() {
    if (this.type === SliderTypes.Default) {
      if (+this.currentValue < this.min) this.currentValue = this.min;
      if (+this.currentValue > this.max) this.currentValue = this.max;
    } else {
      if (this.currentValue[0] < this.min) this.currentValue[0] = this.min;
      if (this.currentValue[0] > this.max) this.currentValue[0] = this.max;
      if (this.currentValue[1] > this.max) this.currentValue[1] = this.max;

      if (this.currentValue[1] < this.currentValue[0]) this.currentValue[1] = this.currentValue[0];
    }
  }

  private setInputValue(value: string) {
    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(value);
      this.internals.checkValidity();
    }
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.parseValue();
    this.updateSliderPosition();
    this.setInputValue(this.value);
    this.handleChange();
  }

  componentWillLoad() {
    this.parseValue();
    this.sliderHintId = `${this.sliderId}-hint`;
    this.sliderFeedbackId = `${this.sliderId}-feedback`;
  }

  componentDidLoad() {
    this.initialValue = this.value;
    this.updateSliderPosition();
    if (this.stepped) this.checkStepsIsSelected();
  }

  private handleathChangeListen(ev, input) {
    if (input === 'counter1') {
      if (this.type === SliderTypes.Range) {
        this.currentValue = [Number.parseInt(ev.detail), this.currentValue[1]];
        if (this.currentValue[0] > this.currentValue[1]) {
          this.currentValue = [this.currentValue[1], this.currentValue[1]];
        }
      } else {
        this.currentValue = Number.parseInt(ev.detail);
      }
    } else {
      this.currentValue = [this.currentValue[0], Number.parseInt(ev.detail)];
      if (this.currentValue[1] < this.currentValue[0]) {
        this.currentValue = [this.currentValue[0], this.currentValue[0]];
      }
    }
    this.updateSliderPosition();
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.calculateValue(event);
  };

  private handleMouseUp = () => {
    this.activeHandle = null;
    const handle1 = this.sliderTrack.querySelector('.ath-slider-handle-range') as HTMLSpanElement;
    handle1.blur();
    const handle2 = this.sliderTrack.querySelector('.ath-slider-handle-range2') as HTMLSpanElement;
    if (handle2) handle2.blur();
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    this.handleChange();
  };

  private handleMouseDown = (event: MouseEvent) => {
    if (this.disabled || this.readonly) return;

    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;

    if (target.classList.contains('ath-slider-handle-range')) {
      this.activeHandle = 'handle1';
    } else if (target.classList.contains('ath-slider-handle-range2')) {
      this.activeHandle = 'handle2';
    } else if (target.classList.contains('ath-slider__filler__steps') || target.classList.contains('ath-slider__filler__filled') || target.classList.contains('ath-slider__step')) {
      this.activeHandle = 'slider-track';
    }

    if (this.activeHandle != 'slider-track') {
      this.calculateValue(event);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    } else {
      this.checkNearPosition(event);
    }
  };

  private calculateValue(event: MouseEvent) {
    if (!this.sliderTrack || this.activeHandle === null) return;
    const rect = this.sliderTrack.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percent = offsetX / rect.width;
    let newValue = Math.round((percent * (this.max - this.min)) / this.step) * this.step + this.min;

    if (this.activeHandle === 'handle1') {
      if (this.type === SliderTypes.Range) {
        this.currentValue = [Math.min(Math.max(newValue, this.min), this.currentValue[1]), this.currentValue[1]];
      } else {
        this.currentValue = Math.min(Math.max(newValue, this.min), this.max);
      }
    } else if (this.activeHandle === 'handle2') {
      if (this.type === SliderTypes.Range) {
        this.currentValue = [this.currentValue[0], Math.max(Math.min(newValue, this.max), this.currentValue[0])];
      }
    }

    this.updateSliderPosition();
  }

  private updateSliderPosition() {
    const handle1 = this.sliderTrack.querySelector('.ath-slider-handle-range') as HTMLSpanElement;
    const handle2 = this.sliderTrack.querySelector('.ath-slider-handle-range2') as HTMLSpanElement;
    const trackBar = this.sliderTrack.querySelector('.ath-slider__filler__filled') as HTMLDivElement;

    if (this.type === SliderTypes.Range && this.currentValue instanceof Array) {
      const percentage1 = ((this.currentValue[0] - this.min) / (this.max - this.min)) * 100;
      const percentage2 = ((this.currentValue[1] - this.min) / (this.max - this.min)) * 100;

      if (trackBar) {
        trackBar.style.left = `${percentage1}%`;
        trackBar.style.width = `${percentage2 + 0.3 - percentage1}%`;
      }

      if (handle1) {
        handle1.style.left = `${percentage1}%`;
      }
      if (handle2) {
        handle2.style.left = `${percentage2}%`;
      }
    } else {
      const valueHandle1 = +this.currentValue;
      const percentage = ((valueHandle1 - this.min) / (this.max - this.min)) * 100;
      if (handle1) {
        handle1.style.left = `${percentage}%`;
      }

      if (trackBar) {
        trackBar.style.left = `0%`;

        trackBar.style.width = `${percentage}%`;
      }
    }

    if (this.stepped) this.checkStepsIsSelected();
  }

  private getPreviousValue = (value): number => {
    if (value > this.max) {
      return this.max;
    }
    const rest = (value - (this.min || 0)) % this.step;
    const previous = value - (rest === 0 ? this.step : rest);
    const currentValue = previous < this.min ? this.min : previous;

    return currentValue;
  };

  private getNextValue = (value): number => {
    if (value < this.min) {
      return this.min;
    }

    const rest = (value - (this.min || 0)) % this.step;
    const next = value + (this.step - rest);
    const currentValue = next > this.max ? +this.value : next < this.min ? this.min : next;

    return currentValue;
  };

  private handleKeydown(event: KeyboardEvent, handle: string) {
    if (this.disabled || this.readonly) return;

    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      if (handle === 'handle1') {
        if (this.type === SliderTypes.Range) {
          if (this.currentValue[0] < this.currentValue[1]) {
            this.currentValue = [this.getNextValue(this.currentValue[0]), this.currentValue[1]];
          }
        } else {
          if (+this.currentValue < this.max) {
            this.currentValue = this.getNextValue(this.currentValue);
          }
        }
      } else {
        if (+this.currentValue[1] < this.max) {
          this.currentValue = [this.currentValue[0], this.getNextValue(this.currentValue[1])];
        }
      }
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      if (handle === 'handle1') {
        if (this.type === SliderTypes.Range) {
          if (this.currentValue[0] > this.min) {
            this.currentValue = [this.getPreviousValue(this.currentValue[0]), this.currentValue[1]];
          }
        } else {
          if (+this.currentValue > this.min) {
            this.currentValue = this.getPreviousValue(this.currentValue);
          }
        }
      } else {
        if (this.currentValue[1] > this.currentValue[0]) {
          this.currentValue = [this.currentValue[0], this.getPreviousValue(this.currentValue[1])];
        }
      }
    }
    this.updateSliderPosition();
  }

  private getLabelProps = (): FcInputLabelType => ({
    htmlForId: this.sliderId,
    label: this.labelGroup,
    tooltipText: this.tooltipText,
    required: this.required,
    showRequired: this.showRequired,
  });

  private getHelperTextProps = (): FcInputHelperTextType => {
    return {
      id: this.sliderHintId,
      text: !!this.helperText ? this.helperText.trim() : '',
    };
  };

  private getFeedbackProps = (): FcInputFeedbackType => ({
    id: this.sliderFeedbackId,
    type: this.feedback,
    text: this.feedbackText,
  });

  private getValueText(handle) {
    const valueText = !!this.valueText ? ' ' + this.valueText : '';
    const text =
      handle === 'handle1'
        ? this.type === SliderTypes.Range
          ? this.currentValue[0].toString() + valueText
          : this.currentValue.toString() + valueText
        : this.currentValue[1].toString() + valueText;
    return text;
  }

  private getSliderHandleAttributes(handle) {
    const valuetext = this.getValueText(handle);
    return {
      'tabindex': this.disabled || this.readonly ? -1 : 0,
      'aria-label': `${handle === 'handle1' ? (this.type != 'range' ? this.valueText : this.fromAriaLabel) : this.toAriaLabel}`,
      'aria-valuemin': handle === 'handle1' ? this.min : this.currentValue[0],
      'aria-valuemax': handle === 'handle1' ? (this.type === SliderTypes.Range ? this.currentValue[1] : this.max) : this.max,
      'aria-valuenow': handle === 'handle1' ? (this.type === SliderTypes.Range ? this.currentValue[0] : this.currentValue) : this.currentValue[1],
      'aria-valuetext': valuetext,
      'aria-disabled': this.disabled ? 'true' : undefined,
      'aria-readonly': this.readonly ? 'true' : undefined,
      'role': 'slider',
    };
  }

  private getContainerHandleClassNames = classname => ({
    [`${classname}__container`]: true,
    [`disabled`]: this.disabled,
  });

  private renderSliderHandles(handle: string) {
    const style = handle === 'handle1' ? { left: '0%' } : { left: '100%' };
    const className = handle === 'handle1' ? 'ath-slider-handle-range' : 'ath-slider-handle-range2';
    const ariaAttributes = this.getSliderHandleAttributes(handle);
    const tooltipValue =
      handle === 'handle1' ? (this.type === SliderTypes.Range ? this.currentValue[0].toString() : this.currentValue.toString()) : this.currentValue[1].toString();
    const tooltipContent = tooltipValue.concat(!!this.unit ? ' ' + this.unit : '');
    return (
      <span {...ariaAttributes} class={className} style={style} onFocus={this.handleFocus} onKeyDown={(event: KeyboardEvent) => this.handleKeydown(event, handle)}>
        <div role="presentation" class={this.getContainerHandleClassNames(className)}>
          {/* <div class="ath-slider__tooltip">{tooltipContent}</div> */}
          <FcHelpDescription text={tooltipContent} position="bottom" hasArrow></FcHelpDescription>
        </div>
      </span>
    );
  }

  private checkStepsIsSelected() {
    const steps = this.sliderTrack.querySelectorAll('.ath-slider__step');
    const percentage1 =
      this.type === SliderTypes.Range ? ((this.currentValue[0] - this.min) / (this.max - this.min)) * 100 : ((+this.currentValue - this.min) / (this.max - this.min)) * 100;
    const percentage2 = ((this.currentValue[1] - this.min) / (this.max - this.min)) * 100;

    if (this.type === SliderTypes.Range) {
      steps.forEach(step => {
        const stepElement = step as HTMLDivElement;
        const stepPercentage = Number.parseInt(stepElement.style.left.replace('%', ''));

        if (stepPercentage >= percentage1 && stepPercentage <= percentage2) {
          stepElement.classList.add('ath-slider__step--selected');
        } else {
          stepElement.classList.remove('ath-slider__step--selected');
        }
      });
    } else {
      steps.forEach(step => {
        const stepElement = step as HTMLDivElement;
        const stepPercentage = Number.parseInt(stepElement.style.left.replace('%', ''));
        if (stepPercentage <= percentage1) {
          stepElement.classList.add('ath-slider__step--selected');
        } else {
          stepElement.classList.remove('ath-slider__step--selected');
        }
      });
    }
  }

  private createSteps() {
    const stepsArray = [];
    const totalSteps = (this.max - this.min) / this.step;

    for (let i = 0; i <= totalSteps; i++) {
      const stepValue = this.min + i * this.step;
      const positionPercentage = ((stepValue - this.min) / (this.max - this.min)) * 100;
      if (i != 0 && i != totalSteps) {
        stepsArray.push(<div class="ath-slider__step" style={{ left: `${positionPercentage}%` }} key={i}></div>);
      }
    }
    return stepsArray;
  }

  private renderSliderSteps() {
    const stepsArray = this.stepped ? this.createSteps() : '';
    return <div class="ath-slider__filler__steps">{stepsArray}</div>;
  }

  private ariaDescribedBy = () => {
    const descriptions: { [key: string]: string } = {};

    if (!!this.helperText) descriptions[this.sliderHintId] = this.sliderHintId;
    if (this.feedback != SliderFeedbackTypes.None) descriptions[this.sliderFeedbackId] = this.sliderFeedbackId;

    return descriptions;
  };

  private getSliderAttributes() {
    const describedByIds = Object.keys(this.ariaDescribedBy()).join(' ') == '' ? undefined : Object.keys(this.ariaDescribedBy()).join(' ');
    return {
      'id': this.sliderId,
      'aria-label': !!this.labelGroup ? this.labelGroup : this.groupAriaLabel,
      'aria-invalid': this.feedback === SliderFeedbackTypes.Error ? 'true' : undefined,
      'aria-describedby': describedByIds,
      'aria-disabled': this.disabled ? 'true' : undefined,
      'role': 'group',
    };
  }

  private getSliderClassNames = () => ({
    'ath-slider__filler': true,
    'ath-slider__filler--range': this.type === SliderTypes.Range,
    'ath-slider__filler--disabled': this.disabled,
    'ath-slider__filler--readonly': this.readonly,
  });

  private renderSliderFiller() {
    const ariaAttributes = this.getSliderAttributes();
    return (
      <div {...ariaAttributes} class={this.getSliderClassNames()} onMouseDown={this.handleMouseDown}>
        <div class="ath-slider__filler__filled"></div>
        {this.renderSliderSteps()}
        {this.renderSliderHandles('handle1')}
        {this.type === SliderTypes.Range && this.renderSliderHandles('handle2')}
      </div>
    );
  }

  private manageFeedbackCounter(counter) {
    let feedback = SliderFeedbackTypes.None;
    if (this.feedback === SliderFeedbackTypes.Error) {
      if (
        (this.feedbackCounter === SliderFeedbackErrorCounterTypes.From || this.feedbackCounter === SliderFeedbackErrorCounterTypes.Both || this.type === SliderTypes.Default) &&
        counter === 'counter1'
      ) {
        feedback = SliderFeedbackTypes.Error;
      } else if ((this.feedbackCounter === SliderFeedbackErrorCounterTypes.To || this.feedbackCounter === SliderFeedbackErrorCounterTypes.Both) && counter === 'counter2') {
        feedback = SliderFeedbackTypes.Error;
      }
    }
    return feedback;
  }

  private renderAthInputCounter(counter) {
    const describedByIds = Object.keys(this.ariaDescribedBy()).join(' ') == '' ? undefined : Object.keys(this.ariaDescribedBy()).join(' ');
    const value = counter === 'counter1' ? (this.type === SliderTypes.Range ? this.currentValue[0] : this.currentValue) : this.currentValue[1];
    const ariaLabel =
      counter === 'counter1' ? (this.type === SliderTypes.Default ? (!!this.groupAriaLabel ? this.groupAriaLabel : this.labelGroup) : this.fromAriaLabel) : this.toAriaLabel;
    const feedback = this.manageFeedbackCounter(counter);
    const min = counter === 'counter1' ? this.min : this.currentValue[0];
    const max = counter === 'counter1' ? (this.type === SliderTypes.Range ? this.currentValue[1] : this.max) : this.max;

    return (
      <ath-input-counter
        style={{ width: `${this.counterWidth}` }}
        value={value}
        min={min}
        max={max}
        step={this.step}
        onAthChange={ev => this.handleathChangeListen(ev, counter)}
        feedback={feedback}
        aria-describedby={describedByIds}
        inputAriaLabel={ariaLabel}
        unit={this.unit}
        disabled={this.disabled}
        readonly={this.readonly}
        name={this.name}
        size="sm"
        onAthFocus={(event: Event) => this.handleFocus(event)}
        onAthBlur={(event: Event) => this.preventBlurSubcomponent(event)}
      ></ath-input-counter>
    );
  }

  private renderSlider() {
    const labelProps = this.getLabelProps();
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();
    const style = !!this.width ? { width: this.width } : { width: '100%' };

    return (
      <div class="ath-slider" ref={el => (this.sliderTrack = el as HTMLElement)} style={style}>
        <div class="ath-slider__header">
          {!!this.labelGroup && <FcInputLabel {...labelProps}></FcInputLabel>}
          <div class="ath-slider__header-inputs">
            {this.renderAthInputCounter('counter1')}
            {this.type === SliderTypes.Range && this.renderAthInputCounter('counter2')}
          </div>
        </div>
        <div class="ath-slider__slider">
          <div class="ath-slider__slider-wrapper">
            <div class="ath-slider__slider-wrapper__slider">{this.renderSliderFiller()}</div>
            {!!this.detailFirst && !!this.detailLast && (
              <div class="ath-slider__slider-wrapper__details">
                <span>{this.detailFirst}</span>
                <span>{this.detailLast}</span>
              </div>
            )}
          </div>
          {!!this.helperText && <FcInputHelperText {...helperTextProps}></FcInputHelperText>}

          {this.feedback !== SliderFeedbackTypes.None && !this.disabled && !this.readonly && <FcInputFeedback {...feedbackProps}></FcInputFeedback>}
        </div>
      </div>
    );
  }

  render() {
    return <Host>{this.renderSlider()}</Host>;
  }
}
