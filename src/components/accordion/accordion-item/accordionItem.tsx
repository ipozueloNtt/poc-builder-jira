import { Component, Prop, h, Event, EventEmitter, JSX, Host, Method, Watch } from '@stencil/core';
let accordionItemsequence = 0;

/**
 * @slot default - Contenido del elemento de acordeón
 * @slot header-detail - Contenido a mostrar dentro de la cabecera
 */
@Component({
  tag: 'ath-accordion-item',
  styleUrl: 'accordionItem.scss',
  shadow: true,
})
export class AthAccordionItem {
  private hostId = `item-${++accordionItemsequence}`;
  private panelId = `panel-${this.hostId}`;

  /**
   * Title of heading item
   */
  @Prop() headingText: string;

  /**
   * Descriprion of heading item
   */
  @Prop() description: string;

  /**
   * The accordion item is disabled
   */
  @Prop() disabled = false;

  /**
   * The accordion item is expanded
   */
  @Prop({ mutable: true }) expanded = false;

  /**
   * The accordion item aria-level
   */
  @Prop() headingLevel = '2';

  /**
   * The accordion item divider bottom
   */
  @Prop() noDivider = false;

  /**
   * The code of the accordion item's icon
   */
  @Prop() icon: string;

  @Watch('expanded')
  handleDisabled(expanded: boolean) {
    if (expanded) {
      this.opened.emit();
    }
  }

  @Method() async close() {
    if (!this.disabled) {
      this.expanded = false;
    }
  }

  @Event() opened: EventEmitter<void>;

  private handleToggle() {
    if (!this.disabled) {
      this.expanded = !this.expanded;
    }
  }

  private handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleToggle();
    }
  }

  private getParentClassNames = () => ({
    'ath-accordion-item': true,
    'ath-accordion-item-divider': !this.noDivider,
  });

  private getPanelClassNames = () => ({
    'ath-accordion-item--panel': true,
    'expanded': this.expanded && !this.disabled,
  });

  private getHeaderClassNames = () => ({
    'ath-accordion-item--header': true,
    'disabled': this.disabled,
  });

  private getChevronClasses = () => ({
    'ath-accordion-item--chevron': true,
    [`ath-accordion-item--chevron-rotate`]: !!this.expanded,
  });

  async componentWillLoad() {
    if (this.disabled) {
      this.expanded = false;
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class={this.getParentClassNames()}>
          <div
            role="button"
            aria-expanded={this.expanded ? 'true' : 'false'}
            aria-controls={this.panelId}
            aria-disabled={this.disabled ? 'true' : 'false'}
            tabindex={this.disabled ? '-1' : '0'}
            onClick={() => this.handleToggle()}
            onKeyDown={event => this.handleKeydown(event)}
            class={this.getHeaderClassNames()}
          >
            <span id={this.hostId} class={`ath-accordion-item--header__button`} role="heading" aria-level={this.headingLevel}>
              <div class="ath-accordion-item--header__wrapper">
                <div class="ath-accordion-item--header__content">
                  {this.icon && <ath-icon icon={this.icon}></ath-icon>}
                  <div class="ath-accordion-item--header__text">
                    {this.headingText && <span class="ath-accordion-item--header__title">{this.headingText}</span>}
                    {this.description && <span class="ath-accordion-item--header__subtitle">{this.description}</span>}
                  </div>
                </div>
                <slot name="header-detail"></slot>
                <div class={this.getChevronClasses()}>
                  <ath-icon icon="chevron_down"></ath-icon>
                </div>
              </div>
            </span>
          </div>

          <div id={this.panelId} class={this.getPanelClassNames()}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
