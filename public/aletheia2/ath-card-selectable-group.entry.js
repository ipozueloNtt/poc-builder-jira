import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

var CardSelectableGroupSize;
(function (CardSelectableGroupSize) {
    CardSelectableGroupSize["Small"] = "sm";
    CardSelectableGroupSize["Medium"] = "md";
})(CardSelectableGroupSize || (CardSelectableGroupSize = {}));

const AthCardSelectableGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athValueChanged = createEvent(this, "athValueChanged", 7);
    }
    get el() { return getElement(this); }
    /**
     * Indicates whether the card selectable group is disabled
     **/
    disabled = false;
    /**
     * Indicates whether the group is multi selection
     **/
    multiple = false;
    /**
     * Size for the cards
     */
    size = CardSelectableGroupSize.Small;
    athValueChanged;
    cards = [];
    selectedCard;
    firstEnabledCard;
    lastEnabledCard;
    firstTimeLoad = true;
    handleKeyDown(e) {
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
    handleChange(e) {
        if (!this.multiple) {
            this.removePreviousCheckedCards(e.detail);
        }
        e.detail.select(this.firstTimeLoad);
        this.cards.forEach((card, index) => {
            if (card === e.detail) {
                this.selectedCard = index;
            }
            else {
                card.tabIndex = -1;
            }
        });
        this.emitCheckedCards();
    }
    emitCheckedCards() {
        const cards = this.cards.filter(card => card.selected);
        this.athValueChanged.emit(cards);
    }
    removePreviousCheckedCards(currentCard) {
        this.cards.forEach(card => {
            if (card.selected && card !== currentCard) {
                card.unselect();
                card.tabIndex = -1;
                card.selected = false;
            }
        });
    }
    moveNextCard() {
        const next = this.cards.findIndex((card, index) => index > this.selectedCard && !card.disabled);
        this.selectFocusCard(next === -1 ? this.firstEnabledCard : next);
    }
    movePreviousCard() {
        let prevIndex = this.selectedCard - 1;
        while (prevIndex >= 0 && this.cards[prevIndex].disabled) {
            prevIndex--;
        }
        this.selectFocusCard(prevIndex === -1 ? this.lastEnabledCard : prevIndex);
    }
    getFirstEnabledCard() {
        return this.cards.findIndex(card => !card.disabled);
    }
    getLastEnabledCard() {
        for (let index = this.cards.length - 1; index >= 0; index--) {
            if (!this.cards[index].disabled) {
                return index;
            }
        }
        return -1;
    }
    getFirstCheckedCard() {
        const index = this.cards.findIndex(card => card.selected && !card.disabled);
        return index;
    }
    selectFocusCard(index) {
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
    loadCards() {
        this.cards = this.getCards();
        this.firstEnabledCard = this.getFirstEnabledCard();
        this.lastEnabledCard = this.getLastEnabledCard();
        const firstChecked = this.getFirstCheckedCard();
        this.selectFocusCard(firstChecked > -1 ? firstChecked : this.firstEnabledCard);
    }
    getCards() {
        const cardsElements = this.el.querySelectorAll('ath-card-selectable');
        const cards = [];
        if (cardsElements) {
            cardsElements.forEach(card => {
                cards.push(card);
            });
        }
        return cards;
    }
    propagateAttributes() {
        if (this.cards.length > 0) {
            this.cards.forEach(card => {
                this.propagateAttribute(card);
            });
        }
    }
    propagateAttribute(card) {
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
    componentDidLoad() {
        this.loadCards();
        this.propagateAttributes();
    }
    render() {
        return (h(Host, { key: '4bf930428624a6466c55030f72ee9fef7de2d548', role: this.multiple ? 'group' : 'radiogroup' }, h("slot", { key: '91fb128ba030f359acc9c1d9e0aba6c82fe12d92' })));
    }
};

export { AthCardSelectableGroup as ath_card_selectable_group };
//# sourceMappingURL=ath-card-selectable-group.entry.esm.js.map
