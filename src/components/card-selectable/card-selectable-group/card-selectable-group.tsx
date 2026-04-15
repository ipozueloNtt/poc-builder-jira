import { Component, ComponentInterface, Host, Prop, h, Event, EventEmitter, Listen, Element } from '@stencil/core';
import { CardSelectableGroupSize, CardSelectableGroupSizes } from './card-selectable-group.model';

@Component({
  tag: 'ath-card-selectable-group',
})
export class AthCardSelectableGroup implements ComponentInterface {
  @Element() el: HTMLAthCardSelectableGroupElement;

  /**
   * Indicates whether the card selectable group is disabled
   **/
  @Prop() disabled = false;

  /**
   * Indicates whether the group is multi selection
   **/
  @Prop() multiple = false;

  /**
   * Size for the cards
   */
  @Prop() size: CardSelectableGroupSizes = CardSelectableGroupSize.Small;

  @Event() athValueChanged: EventEmitter<HTMLAthCardSelectableElement[]>;

  private cards: Array<HTMLAthCardSelectableElement> = [];
  private selectedCard: number;
  private firstEnabledCard: number;
  private lastEnabledCard: number;

  private firstTimeLoad = true;

  @Listen('keydown')
  handleKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        this.movePreviousCard();
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        this.moveNextCard();
        break;

      case 'Home':
        e.preventDefault();
        this.selectFocusCard(this.firstEnabledCard);
        break;
      case 'End':
        e.preventDefault();
        this.selectFocusCard(this.lastEnabledCard);
        break;

      default:
        break;
    }
  }

  @Listen('athChange')
  handleChange(e: CustomEvent) {
    if (!this.multiple) {
      this.removePreviousCheckedCards(e.detail);
    }
    e.detail.select(this.firstTimeLoad);

    this.cards.forEach((card, index) => {
      if (card === e.detail) {
        this.selectedCard = index;
      } else {
        card.tabIndex = -1;
      }
    });

    this.emitCheckedCards();
  }

  private emitCheckedCards(): void {
    const cards = this.cards.filter(card => card.selected);
    this.athValueChanged.emit(cards);
  }

  private removePreviousCheckedCards(currentCard: HTMLAthCardSelectableElement) {
    this.cards.forEach(card => {
      if (card.selected && card !== currentCard) {
        card.unselect();
        card.tabIndex = -1;
        card.selected = false;
      }
    });
  }

  private moveNextCard() {
    const next = this.cards.findIndex((card, index) => index > this.selectedCard && !card.disabled);
    this.selectFocusCard(next === -1 ? this.firstEnabledCard : next);
  }

  private movePreviousCard() {
    let prevIndex = this.selectedCard - 1;

    while (prevIndex >= 0 && this.cards[prevIndex].disabled) {
      prevIndex--;
    }

    this.selectFocusCard(prevIndex === -1 ? this.lastEnabledCard : prevIndex);
  }

  private getFirstEnabledCard(): number {
    return this.cards.findIndex(card => !card.disabled);
  }

  private getLastEnabledCard(): number {
    for (let index = this.cards.length - 1; index >= 0; index--) {
      if (!this.cards[index].disabled) {
        return index;
      }
    }

    return -1;
  }

  private getFirstCheckedCard(): number {
    const index = this.cards.findIndex(card => card.selected && !card.disabled);
    return index;
  }

  private selectFocusCard(index: number) {
    this.selectedCard = index;
    this.cards.forEach(card => {
      card.unselect();
      card.tabIndex = -1;
    });
    if (this.cards.length > 0) {
      this.cards[this.selectedCard].select(this.firstTimeLoad);
      this.cards[this.selectedCard].tabIndex = 0;
      this.firstTimeLoad = false;
    }
  }

  private loadCards(): void {
    this.cards = this.getCards();
    this.firstEnabledCard = this.getFirstEnabledCard();
    this.lastEnabledCard = this.getLastEnabledCard();

    const firstChecked = this.getFirstCheckedCard();
    this.selectFocusCard(firstChecked > -1 ? firstChecked : this.firstEnabledCard);
  }

  private getCards(): Array<HTMLAthCardSelectableElement> {
    const cardsElements = this.el.querySelectorAll('ath-card-selectable');
    const cards = [];

    if (cardsElements) {
      cardsElements.forEach(card => {
        cards.push(card);
      });
    }

    return cards;
  }

  private propagateAttributes() {
    if (this.cards.length > 0) {
      this.cards.forEach(card => {
        this.propagateAttribute(card);
      });
    }
  }

  private propagateAttribute(card: HTMLAthCardSelectableElement) {
    if (this.disabled !== null && !card.hasAttribute('disabled')) {
      card.setAttribute('disabled', this.disabled.toString());
    }

    if (this.size && !card.hasAttribute('size')) {
      card.setAttribute('size', this.size);
    }

    if (this.multiple) {
      card.type = 'multiselect';
    }
  }

  componentDidLoad(): void {
    this.loadCards();
    this.propagateAttributes();
  }

  render() {
    return (
      <Host role={this.multiple ? 'group' : 'radiogroup'}>
        <slot />
      </Host>
    );
  }
}
