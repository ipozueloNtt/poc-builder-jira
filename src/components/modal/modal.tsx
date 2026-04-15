import { Component, Prop, Element, h, JSX, Host, ComponentInterface, Event, EventEmitter, Method, Listen } from '@stencil/core';
import { ModalSize, ModalAppearance, ModalAppearanceType, ModalSizeType } from './modal.model';
import { FcButtonComp, FcPictogram } from 'sharedfc/input';
import { ButtonIconPosition } from 'components/button/button.model';
import { IconSize } from '@utils/helper';
import { getHeading } from '@utils/helper/heading';

@Component({
  tag: 'ath-modal',
  styleUrls: ['modal.scss'],
  shadow: true,
})
export class AthModal implements ComponentInterface {
  @Element() el: HTMLElement;
  /**
   * Indicates the illustration used when the prop isAlert is set to true
   */
  @Prop() appearance: ModalAppearanceType = ModalAppearance.Error;

  /**
   * Indicates whether the modal should automatically focus the first interactive element
   */
  @Prop() autofocus: boolean = true;

  /**
   * Indicates whether the modal should close when clicking outside
   */
  @Prop() clickOutsideClose: boolean = false;

  /**
   * Indicates whether the modal will occupy the full screen
   */
  @Prop() fullScreen: boolean = false;

  /**
   * Indicates whether the modal has a close (X) button
   */
  @Prop() hasClose: boolean = true;

  /**
   * Indicates whether there is a divider between the header and the slots
   */
  @Prop() hasDivider: boolean = false;

  /**
   * Indicates the heading level of the title
   */
  @Prop() headingLevel = 2;

  /**
   * Indicates the title text
   */
  @Prop() headingText: string;

  /**
   * Indicates whether the modal has role "Alert", and interrupts the screen reader flow
   */
  @Prop() isAlert: boolean = false;

  /**
   * Indicates the maximum height of the modal
   */
  @Prop() maxHeight: string;

  /**
   * Indicates the maximum width of the modal
   */
  @Prop() maxWidth: string;

  /**
   * Indicates whether the modal is displayed by default
   */
  @Prop({ mutable: true }) open = false;

  /**
   * Differentiates the modal size between sm and md
   */
  @Prop() size: ModalSizeType = ModalSize.Medium;

  /**
   * Indicates the subtitle text
   */
  @Prop() subtitleText: string;

  // ACCESSIBILITY
  /**
   * Accessible text for the close (X) button
   */
  @Prop() closeAriaLabel: string;

  // EVENTS
  /**
   * Emitted when the modal is opened
   */
  @Event() athOpened: EventEmitter<void>;

  // EVENTS
  /**
   * Emitted when the modal is closed
   */
  @Event() athClosed: EventEmitter<void>;

  /**
   * Method to open the modal
   */
  @Method()
  async openModal() {
    this.open = true;
    this.previouslyFocusedElement = this.getDeepActiveElement() as HTMLElement;

    requestAnimationFrame(() => {
      this.focusableElements = this.findFocusableElements();

      if (this.autofocus) {
        this.focusFirstElement();
      } else {
        this.blurOuterElement();
      }

      this.athOpened.emit();
    });
  }

  /**
   * Method to close the modal
   */
  @Method()
  async closeModal() {
    this.open = false;
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }

    this.athClosed.emit();
  }

  private previouslyFocusedElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  @Listen('keydown')
  handleKeyDown(e: KeyboardEvent) {
    if (this.open) {
      if (e.key === 'Escape') {
        this.closeModal();
      }

      if (e.key === 'Tab') {
        if (this.focusableElements.length !== 0) {
          this.trapFocus(e);
        } else {
          e.preventDefault();
        }
      }
    }
  }

  private findFocusableElements(): HTMLElement[] {
    const results = new Set<HTMLElement>();
    const focusableSelector = [
      'button:not([disabled]):not([tabindex="-1"])',
      'a[href]:not([tabindex="-1"])',
      'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      'details:not([tabindex="-1"])',
      'area[href]:not([tabindex="-1"])',
      '[contentEditable=true]:not([tabindex="-1"])',
      'iframe:not([tabindex="-1"])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const visited = new WeakSet<Node>();

    const traverse = (node: Node) => {
      if (!node || visited.has(node)) return;
      visited.add(node);

      if (node instanceof HTMLElement) {
        const style = window.getComputedStyle(node);
        const isVisible = style.display !== 'none' && style.visibility !== 'hidden';

        if (isVisible && node.matches(focusableSelector)) {
          results.add(node);
        }

        if (node.shadowRoot) {
          traverse(node.shadowRoot);
        }

        const shadow = (node as HTMLElement).shadowRoot;
        if (shadow) {
          shadow.querySelectorAll(focusableSelector).forEach(el => {
            if (el instanceof HTMLElement && window.getComputedStyle(el).display !== 'none') {
              results.add(el);
            }
          });
        }
      }

      node.childNodes.forEach(traverse);

      if (typeof HTMLSlotElement !== 'undefined' && node instanceof HTMLSlotElement) {
        node.assignedNodes({ flatten: true }).forEach(traverse);
      }
    };

    traverse(this.el.shadowRoot ?? this.el);

    return Array.from(results);
  }

  private focusFirstElement = () => {
    if (this.focusableElements.length > 0) {
      if (this.focusableElements.length > 1 && this.hasClose) {
        this.focusableElements[1].focus();
      } else {
        this.focusableElements[0].focus();
      }
    }
  };

  private blurOuterElement = () => {
    const modal = this.el.shadowRoot?.querySelector('.ath-modal') as HTMLElement;
    modal?.focus();
  };

  componentDidLoad(): void {
    if (this.open) {
      this.openModal();
    }
  }

  private trapFocus = e => {
    if (this.focusableElements.length === 0) return;

    const first = this.focusableElements[0];
    const last = this.focusableElements[this.focusableElements.length - 1];
    const realActiveElement = this.getDeepActiveElement();

    if (e.shiftKey) {
      if (realActiveElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (realActiveElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  private getDeepActiveElement(doc: Document | ShadowRoot = document): Element | null {
    let active = doc.activeElement;
    while (active?.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active;
  }

  private handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget && this.clickOutsideClose) {
      this.closeModal();
    }
  };

  private getAccesibilityAttributes = () => ({
    'role': this.isAlert ? 'alertdialog' : 'dialog',
    'aria-describedby': this.subtitleText ? 'subtitleTextId' : undefined,
    'aria-labelledby': this.headingText ? 'headlineTextId' : undefined,
    'aria-modal': 'true',
    'tabindex': '-1',
  });

  private getDialogClassNames = () => ({
    'ath-modal': true,
    'ath-modal--fullscreen': this.fullScreen,
    [`ath-modal--${this.size}`]: !!this.size,
  });

  private getHeaderClassNames = () => ({
    'ath-modal-header': true,
    'ath-modal-header--alert': this.isAlert,
  });

  private getDialogStyle = () => ({
    maxHeight: this.maxHeight || 'unset',
    maxWidth: this.maxWidth || 'unset',
  });

  private renderHeading = (): JSX.Element => {
    const HeadingTitle = getHeading(this.headingLevel);
    return (
      <HeadingTitle class="ath-modal-header-text-title" id="headlineTextId">
        {this.headingText}
      </HeadingTitle>
    );
  };

  private renderHeadingSubtitle = (): JSX.Element => {
    return (
      <div class="ath-modal-header-text-subtitle" id="subtitleTextId">
        {this.subtitleText}
      </div>
    );
  };

  render(): JSX.Element {
    if (!this.open) {
      return <Host></Host>;
    }

    return (
      <Host>
        <div class="backdrop" onClick={this.handleBackdropClick}>
          <div {...this.getAccesibilityAttributes()} class={this.getDialogClassNames()} style={this.getDialogStyle()}>
            <div class={this.getHeaderClassNames()}>
              {this.isAlert && <FcPictogram name={`illu_${this.appearance}_msg`}></FcPictogram>}
              <div class="ath-modal-header-text">
                {this.headingText && this.renderHeading()}
                {this.subtitleText && this.renderHeadingSubtitle()}
              </div>
              {this.hasClose && (
                <div class="ath-modal-header-close">
                  <FcButtonComp
                    icon="close_small"
                    color="default"
                    iconPosition={ButtonIconPosition.IconOnly}
                    size={IconSize.Small}
                    onClick={() => this.closeModal()}
                    buttonAriaLabel={this.closeAriaLabel}
                  ></FcButtonComp>
                </div>
              )}
            </div>
            {this.hasDivider && <ath-divider></ath-divider>}
            <div class="scrollable-slot ath-scroll">
              <slot name="body"></slot>
            </div>
            <slot name="footer"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
