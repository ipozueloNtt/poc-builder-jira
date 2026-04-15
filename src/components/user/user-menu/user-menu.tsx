import { Component, ComponentInterface, Host, Prop, h, Element, Listen, Event, EventEmitter, Watch } from '@stencil/core';
import { UserMenuType, UserMenuTypes } from './user-menu.model';
import { AvatarSizes } from 'components/avatar/avatar.model';

let userMenuSequence = 0;

@Component({
  tag: 'ath-user-menu',
  styleUrls: ['user-menu.scss'],
  shadow: true,
})
export class AthUserMenu implements ComponentInterface {
  private hostId = `user-menu${++userMenuSequence}`;
  private menuOverlayId = `${this.hostId}-overlay`;

  /**
   * Initials to display in the avatar.
   */
  @Prop() initials: string;
  /**
   * Indica si user-menu esta abierto
   */
  @Prop({ mutable: true }) open: boolean = false;
  /**
   * Define la src para imagen avatar
   */
  @Prop() srcImage: string;
  /**
   * Define el nombre del usuario
   */
  @Prop() userName: string;
  /**
   * Define el tipo de avatar
   */
  @Prop() type: UserMenuType = undefined;

  /**
   * Emitted when an item is clicked
   */
  @Event() athAction: EventEmitter<{ item: HTMLAthMenuButtonItemElement }>;

  @Element() el: HTMLElement;
  private buttonLinkEl: HTMLAthButtonLinkElement;
  private currentIndex = 0;
  private firstTimeOpen = true;

  handleOutsideClick(event: MouseEvent) {
    if (!this.el.contains(event.target as Node)) {
      this.open = false;
    }
  }
  @Watch('open')
  watchOpenState() {
    if (this.open) {
      document.addEventListener('mousedown', this.handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', this.handleOutsideClick);
    }
  }

  private handleClick = ev => {
    ev.stopPropagation();
    this.toggleMenu();
  };

  private toggleMenu() {
    this.open = !this.open;
    this.buttonLinkEl.setAttribute('aria-expanded', String(this.open));
    if (!this.open) {
      this.firstTimeOpen = true;
    }
  }

  @Listen('athSelected')
  onClick(ev: CustomEvent) {
    this.open = false;
    this.currentIndex = -1;
    this.buttonLinkEl.setAttribute('aria-expanded', 'false');
    this.firstTimeOpen = true;
    this.setFocusToAthButtonLink();
    if (ev.detail) {
      this.athAction.emit(ev.detail.target);
    }
    ev.stopPropagation();
  }

  private getClassNames = () => ({
    'ath-user-menu': true,
  });

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault();
    }
    if (ev.key === 'Escape' && this.open) {
      ev.preventDefault();
      this.open = false;
      this.buttonLinkEl.setAttribute('aria-expanded', 'false');
      this.firstTimeOpen = true;
      this.currentIndex = -1;
      this.setFocusToAthButtonLink();
    }
    if (ev.key === 'Tab' && this.open) {
      this.open = false;
      this.buttonLinkEl.setAttribute('aria-expanded', 'false');
      this.firstTimeOpen = true;
      this.currentIndex = -1;
    }

    this.focusManager(ev);
  }

  private focusManager(ev) {
    const eventKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (eventKeys.includes(ev.key)) {
      const items = Array.from(this.el.querySelectorAll<HTMLElement>('ath-menu-button-item'));
      const totalItems = items.length;
      let nextIndex = this.currentIndex;

      if (items.length > 0) {
        if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
          !this.firstTimeOpen ? (nextIndex = this.getNextIndex(items, nextIndex, -1, totalItems)) : (nextIndex = this.getNextIndex(items, totalItems, -1, totalItems));
        } else if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
          !this.firstTimeOpen ? (nextIndex = this.getNextIndex(items, nextIndex, 1, totalItems)) : (nextIndex = 0);
        } else if (ev.key === 'Home') {
          nextIndex = this.getNextIndex(items, -1, 1, totalItems);
        } else if (ev.key === 'End') {
          nextIndex = this.getNextIndex(items, totalItems, -1, totalItems);
        }

        if (this.firstTimeOpen) this.firstTimeOpen = false;

        this.currentIndex = nextIndex;
        const nextItem = items[nextIndex] as any;

        items.forEach(item => {
          (item as any).itemTabIndex = item === nextItem ? 0 : -1;
        });

        nextItem.focus();
      }
    }
  }

  private getNextIndex = (items: any[], currentIndex: number, direction: number, totalItems: number): number => {
    let newIndex = (currentIndex + direction + totalItems) % totalItems;
    while (items[newIndex].disabled) {
      newIndex = (newIndex + direction + totalItems) % totalItems;
    }
    return newIndex;
  };

  private setFocusToAthButtonLink() {
    const athButtonLink = this.el.shadowRoot.querySelector('ath-button-link') as HTMLElement;
    athButtonLink.focus();
    return;
  }

  private imgTag = () => {
    if (!!this.srcImage) {
      const src = this.srcImage;
      return <img slot="img" src={src} alt={this.userName} />;
    } else {
      return;
    }
  };

  private getOverlayClassNames = () => ({
    'ath-user-menu-overlay': true,
  });

  private getContainerClassNames = () => ({
    'ath-user-menu-container': true,
  });

  constructor() {
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  disconnectedCallback() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  componentDidRender(): void {
    if (this.open) {
      const items = Array.from(this.el.querySelectorAll('ath-menu-button-item')) as HTMLElement[];
      const firstItem = items.find(i => !i.hasAttribute('disabled')) as HTMLAthMenuButtonItemElement;
      if (firstItem) {
        items.forEach(item => {
          (item as any).itemTabIndex = item === firstItem ? 0 : -1;
        });
      }
    }
  }

  private getAvatarAttributes = () => ({
    'avatar-name': !!this.userName ? this.userName : undefined,
    'initials': !!this.initials ? this.initials.substring(0, 2) : undefined,
    'type': this.type !== UserMenuTypes.HideAvatar ? this.type : undefined,
    'size': AvatarSizes.ExtraSmall,
  });

  render() {
    const icon = this.open ? 'chevron_up' : 'chevron_down';
    return (
      <Host>
        <div class={this.getClassNames()}>
          {this.type !== UserMenuTypes.HideAvatar && <ath-avatar {...this.getAvatarAttributes()}>{this.imgTag()}</ath-avatar>}
          <ath-button-link
            ref={(el: HTMLAthButtonLinkElement) => (this.buttonLinkEl = el)}
            onAthClick={this.handleClick}
            size="md"
            icon={icon}
            icon-position="right"
            aria-controls={this.menuOverlayId}
            aria-expanded={String(this.open)}
            aria-haspopup="true"
          >
            {this.userName}
          </ath-button-link>
        </div>

        {this.open && (
          <div class={this.getContainerClassNames()}>
            <div class={this.getOverlayClassNames()} role="menu" tabindex="-1" id={this.menuOverlayId} aria-hidden={this.open ? 'false' : 'true'}>
              <slot></slot>
            </div>
          </div>
        )}
      </Host>
    );
  }
}
