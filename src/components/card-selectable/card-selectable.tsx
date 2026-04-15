import { Component, ComponentInterface, Host, Prop, h, Event, EventEmitter, State, Method, Element } from '@stencil/core';
import { CardSelectableSize, CardSelectableSizes, CardSelectableTypes, CardSelectableType } from './card-selectable.model';

let cardSelectableSequence = 0;

@Component({
  tag: 'ath-card-selectable',
  styleUrls: ['card-selectable.scss'],
  scoped: true,
})
export class AthCardSelectable implements ComponentInterface {
  private hostId = `card-selectable-${++cardSelectableSequence}`;
  private headlineId;
  private subheadlineId;
  private tagId;

  @Element() el: HTMLAthCardSelectableElement;

  /**
   * Size of the card
   **/
  @Prop() size: CardSelectableSizes = CardSelectableSize.Small;

  /**
   * headline of the card
   **/
  @Prop() headingText: string;

  /**
   * subtitle of the card
   **/
  @Prop() subtitle: string;

  /**
   * overline of the card
   **/
  @Prop() overline: string;

  /**
   * type of card
   **/
  @Prop() type: CardSelectableTypes = CardSelectableType.Single;

  /**
   * Indicates whether the card is selected
   **/
  @Prop({ mutable: true }) selected = false;

  /**
   * Indicates whether the card is disabled
   **/
  @Prop() disabled = false;

  /**
   * tag of the card
   **/
  @Prop() tag: string;

  @Event() athChange: EventEmitter<any>;
  @Event() athFocus: EventEmitter<void>;
  @Event() athBlur: EventEmitter<void>;

  @State() visualSelected = false;

  @Method()
  async select(firstLoad: boolean) {
    if (!this.disabled) {
      this.visualSelected = true;
      if (!firstLoad) this.el.focus();
    }
  }

  @Method()
  async unselect() {
    if (!this.disabled) {
      this.visualSelected = false;
      this.el.blur();
    }
  }

  private handleClick = () => {
    if (this.disabled) return;
    this.selected = this.type === CardSelectableType.Single ? true : !this.selected;
    this.visualSelected = this.type === CardSelectableType.Single ? true : !this.selected;
    this.athChange.emit(this.el);
  };

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleBlur = () => {
    this.athBlur.emit();
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    switch (ev.code) {
      case 'Space':
      case 'Enter':
        ev.preventDefault();
        this.handleClick();
        break;
      default:
        break;
    }
  };

  private getHostAttributes = () => ({
    role: this.type === CardSelectableType.Single ? 'radio' : 'checkbox',
    tabindex: this.visualSelected && !this.disabled ? '0' : '-1',
    onFocus: this.handleFocus,
    onBlur: this.handleBlur,
    onClick: this.handleClick,
    onkeydown: this.handleKeyDown,
  });

  private getAriaAttributes = (): { [key: string]: unknown } => {
    const describedBy = [this.tagId, this.subheadlineId].filter(Boolean).join(' ');
    return {
      'aria-labelledby': !!this.headingText ? this.headlineId : undefined,
      'aria-describedby': describedBy != '' ? describedBy : undefined,
      'aria-disabled': this.disabled ? 'true' : undefined,
      'aria-checked': this.selected ? 'true' : 'false',
    };
  };

  private getCheckClassNames = () => ({
    'ath-card-selectable_check': true,
  });

  private getCardClassNames = () => ({
    'ath-card-selectable': true,
    'ath-card-selectable--disabled': this.disabled,
    [`ath-card-selectable--${this.type}`]: true,
    [`ath-card-selectable--${this.size}`]: true,
    'ath-card-selectable--selected': this.selected,
    'ath-color-text--disabled': this.disabled,
  });

  componentWillLoad(): Promise<void> | void {
    if (this.headingText) this.headlineId = `${this.hostId}-headline`;
    if (this.subtitle) this.subheadlineId = `${this.hostId}-subheadline`;
    if (this.tag) this.tagId = `${this.hostId}-tag`;
  }

  private renderIcon = () => {
    const icon = this.type === CardSelectableType.Single ? 'check' : 'completed';
    const size = this.type === CardSelectableType.Single ? 'md' : 'sm';
    return <ath-icon icon={icon} size={size} color="inherit"></ath-icon>;
  };

  render() {
    const tagColor = this.disabled ? 'disabled' : 'primary';
    return (
      <Host {...this.getHostAttributes()} {...this.getAriaAttributes()}>
        <div class={this.getCardClassNames()}>
          <div class="ath-card-selectable_content">
            <div class="ath-card-selectable_header">
              <div class="ath-card-selectable_headlines">
                {!!this.tag && <ath-tag id={this.tagId} size="md" color={tagColor} headingText={this.tag}></ath-tag>}
                {!!this.overline && <span class="ath-card-selectable_overline">{this.overline}</span>}
                <div class="ath-card-selectable_wrapper">
                  <span id={this.headlineId} class="ath-card-selectable_headline">
                    {this.headingText}
                  </span>
                  <span id={this.subheadlineId} class="ath-card-selectable_subheadline">
                    {this.subtitle}
                  </span>
                </div>
              </div>
              <div class={this.getCheckClassNames()}>{this.selected && this.renderIcon()}</div>
            </div>
            <slot name="body"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
