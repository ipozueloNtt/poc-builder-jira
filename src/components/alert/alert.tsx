import { Component, ComponentInterface, Host, JSX, Prop, State, h, Element, Watch } from '@stencil/core';
import { AlertColor, AlertColorClose, AlertColors, AlertColorsClose, AlertType, AlertTypes } from './alert.model';
import { getHeading } from '@utils/helper/heading';
import { FcButtonComp } from 'sharedfc/input';
import { IconSize } from '@utils/helper';
import { ButtonIconPosition } from 'components/button/button.model';

let tooltipSequence = 0;

@Component({
  tag: 'ath-alert',
  styleUrls: ['alert.scss'],
  shadow: true,
})
export class AthAlert implements ComponentInterface {
  private hostId = ++tooltipSequence;
  private titleId = `alert-title-${this.hostId}`;
  private descriptionId = `alert-description-${this.hostId}`;

  /**
   * Tipo de alert
   */
  @Prop({ reflect: true }) type: AlertTypes = AlertType.Section;

  /**
   * The color of the message
   */
  @Prop() color: AlertColors = AlertColor.Info;

  /**
   * Descripcion del alert
   */
  @Prop() description?: string;

  /**
   * Titulo del alert
   */
  @Prop() headingText?: string;

  /**
   * Titulo del alert
   */
  @Prop() isUrgent? = false;

  /**
   * Nivel de heading del título
   */
  @Prop() headingLevel = 6;

  /**
   * Has button close
   */
  @Prop() hasClose = true;

  /**
   * Close button aria-label
   */
  @Prop() closeAriaLabel = 'Cerrar alerta';

  @State() isVisible: boolean = true;

  @State() alertRole: string;

  @State() isSmall: boolean = false;

  @Watch('isUrgent')
  @Watch('hasButtonSlotElements')
  updateAlertRole() {
    this.alertRole = this.getRole();
  }

  @Element() private host!: HTMLElement;

  private hasButtonSlotElements = true;

  private closeAlert = (): void => {
    this.isVisible = false; // Hide the alert when close button is clicked
  };

  private getRole = (): string => (this.isUrgent ? 'alert' : 'status');

  private resizeObserver: ResizeObserver;

  private getAttributes = (): { [key: string]: unknown } => ({
    'aria-hidden': !this.isVisible ? 'true' : 'false',
    'role': this.alertRole,
    'aria-labelledby': this.headingText ? this.titleId : undefined,
    'aria-describedby': this.description ? this.descriptionId : undefined,
  });

  private getClassNames = (): { [key: string]: boolean } => ({
    'ath-alert': true,
    [`ath-alert--${this.color}`]: !!this.color,
    'ath-alert--hidden': !this.isVisible,
    [`ath-alert__${this.type}`]: !!this.type,
  });

  private getIcon = (): string => {
    if (this.color == AlertColor.Info) {
      return 'info_solid';
    } else if (this.color == AlertColor.Warning) {
      return 'exclamation_solid';
    } else if (this.color == AlertColor.Success) {
      return 'check_2_solid';
    } else {
      return 'error_solid';
    }
  };

  private renderIcon = (): JSX.Element => {
    return <ath-icon size="md" icon={this.getIcon()} color="inherit"></ath-icon>;
  };

  private getIconColor = (): AlertColorsClose => {
    if (this.color === AlertColor.Danger) {
      return AlertColorClose.Danger;
    }
    return this.color as AlertColorsClose;
  };

  private renderCloseButton = (): JSX.Element => {
    return (
      <FcButtonComp
        icon="close_small"
        color={this.getIconColor()}
        iconPosition={ButtonIconPosition.IconOnly}
        size={IconSize.Extrasmall}
        onClick={this.closeAlert}
        buttonAriaLabel={this.closeAriaLabel}
      ></FcButtonComp>
    );
  };

  private renderDivIcon = (): JSX.Element => {
    return <div class="ath-alert__icon">{this.renderIcon()}</div>;
  };

  private renderDivCloseButton = (): JSX.Element => {
    return <div class="ath-alert__close">{this.renderCloseButton()}</div>;
  };

  private renderDivTitle = (): JSX.Element => {
    const HeadingTitle = getHeading(this.headingLevel);
    return (
      <HeadingTitle class="ath-alert__title" id={this.titleId}>
        {this.headingText}
      </HeadingTitle>
    );
  };

  private renderDivDescription = (): JSX.Element => {
    return (
      <div class="ath-alert__description" id={this.descriptionId}>
        {this.description}
      </div>
    );
  };

  componentDidLoad() {
    const container = this.host.shadowRoot.querySelector('.ath-alert__container');
    if (container) {
      this.resizeObserver = new ResizeObserver(([entry]) => {
        this.isSmall = entry.contentRect.width < 440;
      });
      this.resizeObserver.observe(container);
    }
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  componentDidRender() {
    const buttonSlot = this.host.shadowRoot?.querySelector('slot[name="button"]') as HTMLSlotElement;
    if (buttonSlot) {
      const assignedElements = buttonSlot.assignedElements();
      assignedElements.forEach(el => {
        if (el.tagName.toLowerCase() === 'ath-button') {
          (el as any).fullWidth = this.isSmall;
        }
      });
    }
  }

  private renderSection = () => (
    <div class="ath-alert__container">
      <div class={this.getClassNames()}>
        <div class="ath-alert__content">
          {this.renderDivIcon()}
          <div class="ath-alert__wrapper">
            {this.headingText && this.renderDivTitle()}
            {this.description && this.renderDivDescription()}
            <slot></slot>
          </div>
          {this.hasClose && this.renderDivCloseButton()}
        </div>
        {this.hasButtonSlotElements && <slot name="button"></slot>}
      </div>
    </div>
  );

  private renderPage = () => (
    <div class="ath-alert__container">
      <div class={this.getClassNames()}>
        {this.renderDivIcon()}
        <div class="ath-alert__wrapper">
          <div class="ath-alert__frame">
            {this.headingText && this.renderDivTitle()}
            {this.description && this.renderDivDescription()}
            <slot></slot>
          </div>
          {this.hasButtonSlotElements && (
            <div class="ath-alert__button">
              <slot name="button"></slot>
            </div>
          )}
        </div>
        {this.hasClose && this.renderDivCloseButton()}
      </div>
    </div>
  );

  public componentWillLoad(): void | Promise<void> {
    this.hasButtonSlotElements = !!this.host.querySelector('[slot="button"]');
    this.updateAlertRole();
  }

  render(): JSX.Element {
    if (this.type === 'section') {
      return <Host {...this.getAttributes()}>{this.isVisible && this.renderSection()}</Host>;
    } else {
      return <Host {...this.getAttributes()}>{this.isVisible && this.renderPage()}</Host>;
    }
  }
}
