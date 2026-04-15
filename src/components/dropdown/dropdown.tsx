import { AttachInternals, Component, Host, Prop, h, JSX, Listen, State, Element, EventEmitter, Event, ComponentInterface, Watch } from '@stencil/core';
import { ActionListItem, dropdownFeedbackType, dropdownFeedbackTypes, dropdownSize, dropdownSizes } from './dropdown.model';
import {
  FcInputElement,
  FcInputElementType,
  FcInputFeedback,
  FcInputFeedbackType,
  FcInputHelperText,
  FcInputHelperTextType,
  FcInputLabel,
  FcInputLabelType,
} from '../../sharedfc/input/index';

let dropdownSequence = 0;
@Component({
  tag: 'ath-dropdown',
  styleUrls: ['dropdown.scss'],
  scoped: true,
  formAssociated: true,
})
export class AthDropdown implements ComponentInterface {
  private dropdownId = `dropdown-${++dropdownSequence}`;
  private labelId = `${this.dropdownId}-label`;
  private optionPanelId = `${this.dropdownId}-option-panel`;
  private listBoxId = `${this.dropdownId}-list-box`;
  private inputSearchId = `${this.dropdownId}-input-search`;
  private helperId = `${this.dropdownId}-helper-text`;
  private feedbackId = `${this.dropdownId}-feedback`;
  private searchInputComponent: HTMLInputElement;
  private timeoutSearchInpComp: NodeJS.Timeout;
  private initialValue = '';

  @Element() el: HTMLElement;

  @AttachInternals() internals: ElementInternals;

  /**
   * Nombre accesible para el dropdown
   */
  @Prop() dropdownAriaLabel: string;

  /**
   * The name of the combobox. Submitted with the form as part of a name/value pair
   */
  @Prop() name: string;

  /**
   * Current value of the form control. Submitted with the form as part of a name/value pair
   */
  @Prop({ mutable: true }) value: string;

  /**
   * Label dropdown
   */
  @Prop() label?: string;

  /**
   * Si dropdown es obligatorio
   */
  @Prop() required = false;

  /**
   * If true, Do no show required mark for required input
   */
  @Prop() hideRequired = false;

  /**
   * Tamaño dropdown
   */
  @Prop() size: dropdownSizes = dropdownSize.Md;

  /**
   * Texto del tooltip
   */
  @Prop() tooltipText: string;

  /**
   * Tipo feedback
   */
  @Prop() feedback: dropdownFeedbackTypes = dropdownFeedbackType.None;

  /**
   * Texto feedback
   */
  @Prop() feedbackText: string;

  /**
   * Texto de ayuda
   */
  @Prop() helperText: string;

  /**
   * Si dropdown es solo lectura
   */
  @Prop() readonly = false;

  /**
   * Si dropdown esta deshabilitado
   */
  @Prop() disabled = false;

  /**
   * Si dropdown es multiseleccion
   */
  @Prop() multiselect = false;

  /**
   * Mostrar chips
   */
  @Prop() showChips = false;

  /**
   * Ancho dropdown
   */
  @Prop() width: string;

  /**
   * Altura del overlay del dropdown
   */
  @Prop() overlayMaxHeight: string;

  /**
   * Si dropdown tiene bloque de busqueda
   */
  @Prop() search = false;

  /**
   * Texto placeholder del bloque de busqueda
   */
  @Prop() searchPlaceholder: string = '';

  /**
   * Texto placeholder del bloque de busqueda
   */
  @Prop() searchAriaLabel: string = 'Buscar';

  /**
   * Si dropdown esta abierto
   */
  @Prop({ mutable: true }) open = false;

  /**
   * Ancho del tooltip
   */
  @Prop() tooltipWidth = 0;

  /**
   * Placeholder
   */
  @Prop() placeholder: string;

  /**
   * texto cuando multiselect es true, showChips es false y se selecciona una opcion
   */
  @Prop() nochipsText: string;

  /**
   * no result text
   */
  @Prop() noresultText: string;

  /**
   * Text to announce the items found in search input
   */
  @Prop() announceResultText = 'Hay [total] elementos en la lista';

  @Watch('value')
  WatchValue(newValue: string) {
    if (this.lastValue !== newValue) {
      this.selectOptionByValue(newValue);
    }
  }

  /**
   * Emitted when option changed
   */
  @Event() athChange: EventEmitter<ActionListItem[]>;

  /**
   * Emitted when the combobox gains focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the combobox loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  @State() placeHolder?: any;
  @State() selectedOptions: ActionListItem[] = [];
  @State() foundResults = true;
  @State() activeId = '';
  @State() index = 0;
  @State() liveMessage = '';

  private increaseIndex() {
    this.index = Math.min(this.optionList.length - 1, this.index + 1);
  }

  private decreaseIndex() {
    this.index = Math.max(0, this.index - 1);
  }

  @Watch('open')
  async handleClose() {
    clearTimeout(this.timeoutSearchInpComp);
    if (!this.open) {
      this.index = 0;
      this.firstOpenKey = true;
      this.cleanActivaOption();
    } else if (this.search) {
      requestAnimationFrame(() => {
        this.timeoutSearchInpComp = setTimeout(() => {
          this.searchInputComponent?.focus();
        }, 0);
      });
    }
  }

  @Listen('athDismiss')
  handleDismiss() {
    const chipLabel = this.selectedOptions[0].text;
    this.options.forEach(option => {
      if (option.text === chipLabel) {
        option.selected = false;
        this.submitSelected(option, true);
      }
    });
    if (this.selectedOptions.length > 0) {
      this.spanTextEl.innerHTML = this.addChips();
    } else {
      this.addDefaultPlaceholderText();
    }
    this.dropdownEl.focus();
  }

  @Listen('click', { target: 'window' })
  checkForClickOutside(event) {
    if (this.el.contains(event.target)) return;
    if (!this.dropdownEl) return;
    this.open = false;
    this.dropdownEl.setAttribute('aria-expanded', 'false');
  }

  @Listen('optSelected')
  handleSelected(event) {
    if (event.detail?.source !== 'user') return;
    this.submitSelected(event.target);
    if (!this.multiselect) {
      if (event.target.selected) {
        this.refreshList(event.target);
        this.spanTextEl.innerHTML = event.target.text;
      } else {
        this.addDefaultPlaceholderText();
      }
      this.open = false;
      this.dropdownEl.focus();
    } else {
      if (this.selectedOptions.length > 0) {
        this.spanTextEl.innerHTML = this.showChips ? this.addChips() : this.selectedOptions.length + ' ' + this.nochipsText;
      } else {
        this.addDefaultPlaceholderText();
      }
    }
  }

  private options: HTMLAthDropdownOptionElement[] = [];
  private optionList: HTMLAthDropdownOptionElement[] = [];
  private spanTextEl: HTMLSpanElement;
  private dropdownEl: HTMLSpanElement;
  private firstOpenKey = true;
  private lastValue: string;

  private addChips = () => {
    const chipCount = this.selectedOptions.length > 1 ? `+${this.selectedOptions.length - 1}` : '';
    const chipSize = this.size === dropdownSize.Lg ? 'md' : 'sm';
    const icon = !!this.selectedOptions[0].icon ? "icon='" + this.selectedOptions[0].icon + "'" : undefined;
    return `<ath-chip-dismiss heading-text="${this.selectedOptions[0].text}" ${icon} size="${chipSize}"></ath-chip-dismiss><span>${chipCount}</span>`;
  };

  private updateSelectedOptions(option, dismiss = false) {
    if (dismiss || this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter(opt => opt !== option);
    } else if (!this.multiselect && this.selectedOptions.length > 0) {
      this.selectedOptions = [option];
    } else {
      this.selectedOptions = [...this.selectedOptions, option];
    }
  }

  private submitSelected(option, dismiss = false) {
    this.updateSelectedOptions(option, dismiss);
    const valuesSelected = this.selectedOptions.map(obj => obj.value).join(',');
    this.lastValue = valuesSelected;
    this.value = valuesSelected;

    this.athChange.emit(this.selectedOptions);
    this.setInputValue(this.value);
  }

  private selectOptionByValue(values: string) {
    this.unselectAllOptions(true);
    const valueList = values.split(',');
    valueList.forEach(value => {
      const index = this.optionList.findIndex(option => option.value === value);
      if (index > -1) {
        this.optionList[index].setSelected(true, { silent: true, source: 'programmatic' });
      }
    });
    this.setInputValue(values);
  }

  private unselectAllOptions(silent = false) {
    this.optionList.forEach(option => {
      if (option.selected) option.setSelected(false, { silent, source: 'programmatic' });
    });
  }

  private setInputValue(value: string): void {
    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(value);
      this.internals.checkValidity();
    }
  }

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleBlur = event => {
    if (!this.firstOpenKey) {
      const related = event.relatedTarget ? event.relatedTarget.id : undefined;
      if (!this.search || related == undefined) {
        this.open = false;
      } else if (related == '') {
        this.open = false;
      }
    }
    this.athBlur.emit();
  };

  private handleClick = event => {
    if (this.readonly) return;
    if (event.target.tagName.includes('ath-CHIP-DISMISS')) return;
    this.open = !this.open;
    this.dropdownEl.setAttribute('aria-expanded', this.open ? 'true' : 'false');
  };

  private navigationList(isArrowDown) {
    isArrowDown ? this.increaseIndex() : this.decreaseIndex();
    if (this.optionList[this.index].disabled || this.optionList[this.index].optionGroup) {
      isArrowDown ? this.increaseIndex() : this.decreaseIndex();
    }
    this.setActiveOption();
  }

  private keydownFirstOption() {
    this.activeId = this.optionList[this.index].id;
    this.options[this.index].activeDropdownOption();
  }

  private handleKeyDown = (key: KeyboardEvent) => {
    const isArrowUp = key.code === 'ArrowUp';
    const isArrowDown = key.code === 'ArrowDown';

    if (isArrowUp || isArrowDown) {
      if (!this.firstOpenKey) {
        key.preventDefault();
        if (this.optionList.length > 0) {
          this.navigationList(isArrowDown);
        }
      } else {
        this.firstOpenKey = false;
        this.open = true;
        this.keydownFirstOption();
      }
      this.dropdownEl.setAttribute('aria-activedescendant', this.activeId);
    }

    if (key.code === 'Enter' || key.code === 'Space') {
      if (!this.open) {
        this.firstOpenKey = false;
        this.open = !this.open;
        this.dropdownEl.setAttribute('aria-expanded', 'true');
        this.keydownFirstOption();
        this.dropdownEl.setAttribute('aria-activedescendant', this.activeId);
        if (this.search) {
          this.searchInputComponent.setAttribute('aria-activedescendant', this.activeId);
        }
      } else {
        const selectionValue = this.multiselect ? !this.optionList[this.index].selected : true;
        this.optionList[this.index].setSelected(selectionValue, { source: 'user' });
        this.dropdownEl.focus();
      }
    }

    if (key.code === 'Escape') {
      this.open = false;
      this.dropdownEl.setAttribute('aria-expanded', 'false');
      this.dropdownEl.focus();
    }
  };

  private handleInput = (ev: InputEvent) => {
    this.handleFilterChange((ev.target as HTMLInputElement).value || '');
  };

  private async cleanActivaOption() {
    this.optionList.forEach(option => {
      option.noActiveDropdownOption();
    });
  }

  private async setActiveOption() {
    this.optionList.forEach((option, i) => {
      if (this.index === i) {
        option.activeDropdownOption();
        this.activeId = option.id;
        option.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        option.noActiveDropdownOption();
      }
    });
  }

  private handleKeyDownInput = (key: KeyboardEvent) => {
    const isArrowUp = key.code === 'ArrowUp';
    const isArrowDown = key.code === 'ArrowDown';

    if (isArrowUp || isArrowDown) {
      key.preventDefault();
      if (this.optionList.length > 0) {
        this.navigationList(isArrowDown);
      }
      this.dropdownEl.setAttribute('aria-activedescendant', this.activeId);
      if (this.search) {
        this.searchInputComponent.setAttribute('aria-activedescendant', this.activeId);
      }
    }

    if (key.code === 'Escape') {
      this.open = false;
      this.dropdownEl.focus();
    }

    if (key.code === 'Enter') {
      this.optionList[this.index].selectOption();
    }
  };

  private handleFilterChange(inputText: string) {
    let haveResults = false;
    if (inputText === '') {
      this.options.forEach(option => {
        option.filterFound();
      });
      this.optionList = this.options;
      haveResults = true;
    } else {
      this.optionList = [];
      this.options.forEach(option => {
        if (option.text.toLowerCase().includes(inputText.toLowerCase()) && !option.optionGroup) {
          option.filterFound();
          this.optionList.push(option);
          haveResults = true;
        } else {
          option.filterNotFound(inputText.toLowerCase());
        }
      });
    }
    this.index = 0;
    this.activeId = '';
    this.foundResults = haveResults;
    this.setActiveOption();
    this.announceMessage();
  }

  private refeshListMultiselect() {
    this.options.forEach(option => {
      option.updateMultiselect();
    });
  }

  private refreshList(activeOption) {
    this.optionList.forEach(option => {
      if (option !== activeOption && option.selected) {
        option.selected = false;
      }
    });
  }

  private announceMessage() {
    if (this.foundResults) {
      const message = this.announceResultText.replace('[total]', String(this.optionList.length));
      this.liveMessage = message;
    } else {
      this.liveMessage = this.noresultText;
    }
  }

  private getFieldClassNames = () => ({
    'ath-dropdown__wrapper--field': true,
    'readonly': this.readonly,
    'disabled': this.disabled,
    'error': this.feedback == dropdownFeedbackType.Error && !this.disabled,
    'open': this.open,
    [`size-${this.size}`]: true,
  });

  private getTextClassNames = () => ({
    'ath-dropdown__field': true,
    'ath-dropdown__field-placeholder': this.selectedOptions.length === 0,
    'ath-dropdown__field-filled': this.selectedOptions.length > 0,
  });

  private getListClassNames = () => ({
    'ath-dropdown-overlay--single-select': true,
    [`size-${this.size}`]: true,
    'hidden': !this.open,
  });

  private ariaDescribedBy = () => {
    const descriptions: { [key: string]: string } = {};

    if (this.helperText != undefined) descriptions[this.helperId] = this.helperId;
    if (this.feedback != dropdownFeedbackType.None) descriptions[this.feedbackId] = this.feedbackId;

    return descriptions;
  };

  private getAriaAttributes() {
    const describedByIds = Object.keys(this.ariaDescribedBy()).join(' ') == '' ? undefined : Object.keys(this.ariaDescribedBy()).join(' ');
    return {
      'aria-label': !!this.label ? undefined : this.dropdownAriaLabel,
      'aria-labelledby': !!this.label ? this.labelId : undefined,
      'aria-disabled': this.disabled,
      'aria-required': this.required,
      'aria-invalid': this.feedback === dropdownFeedbackType.Error ? 'true' : undefined,
      'aria-controls': this.search ? this.optionPanelId : this.listBoxId,
      'aria-describedby': describedByIds,
      'aria-expanded': this.open ? 'true' : 'false',
      'aria-haspopup': !this.search ? 'listbox' : 'dialog',
    };
  }

  private getFeedbackProps = (): FcInputFeedbackType => ({
    id: this.feedbackId,
    type: this.feedback,
    text: this.feedbackText,
  });

  private getHelperTextProps = (): FcInputHelperTextType => {
    return {
      id: this.helperId,
      text: !!this.helperText ? this.helperText.trim() : '',
    };
  };

  private getLabelProps = (): FcInputLabelType => ({
    htmlForId: this.dropdownId,
    label: this.label,
    required: this.required,
    showRequired: !this.hideRequired,
    tooltipText: this.tooltipText,
    tooltipWidth: this.tooltipWidth,
  });

  private renderDropdown = () => {
    const ariaAttributes = this.getAriaAttributes();
    const icon = this.open ? 'chevron_up' : 'chevron_down';
    const spanText = this.placeholder;
    return (
      <span
        ref={(el: HTMLSpanElement) => (this.dropdownEl = el)}
        role="combobox"
        class={this.getFieldClassNames()}
        {...ariaAttributes}
        id={this.dropdownId}
        onClick={this.handleClick}
        tabIndex={this.disabled ? -1 : 0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        aria-activedescendant={this.open ? this.activeId : undefined}
      >
        <span class={this.getTextClassNames()} ref={(el: HTMLSpanElement) => (this.spanTextEl = el)}>
          {!this.placeHolder && spanText}
        </span>
        <ath-icon icon={icon} aria-hidden="true"></ath-icon>
      </span>
    );
  };

  private renderInputSearchNew = () => {
    const props: FcInputElementType = {
      inputId: this.inputSearchId,
      type: 'search',
      placeholder: this.searchPlaceholder,
      value: '',
      onKeyDown: this.handleKeyDownInput,
      onBlur: this.handleBlur,
      onInputRef: el => (this.searchInputComponent = el),
      onInput: this.handleInput,
      onFocus: () => {},
      onChange: () => {},
      inputAriaLabel: this.searchAriaLabel,
      ariaActiveDescendant: this.open ? this.activeId : undefined,
      size: 'md',
    };

    return <FcInputElement {...props}></FcInputElement>;
  };

  private renderList = () => {
    const styleHeight = this.overlayMaxHeight ? { maxHeight: this.overlayMaxHeight } : { maxHeight: '236px' };
    return (
      <div
        class={this.getListClassNames()}
        role="dialog"
        id={this.optionPanelId}
        aria-hidden={!this.open ? 'true' : undefined}
        aria-labelledby={this.label ? this.labelId : undefined}
        aria-label={this.dropdownAriaLabel ?? undefined}
        style={styleHeight}
      >
        {this.search && (
          <div class="ath-input">
            <div class="wrapper">{this.renderInputSearchNew()}</div>
          </div>
        )}
        <div class="ath-dropdown-option-group ath-scroll" tabindex="-1">
          <div role="listbox" class="ath-dropdown-option__list" id={this.listBoxId} aria-label={this.dropdownAriaLabel}>
            <slot></slot>
          </div>
          {!this.foundResults && <div class="noResult"> {this.noresultText} </div>}
        </div>
      </div>
    );
  };

  private renderAddons = () => {
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();
    return [
      !!this.helperText && <FcInputHelperText {...helperTextProps} />,
      this.feedback === 'error' && !this.disabled && !this.readonly && <FcInputFeedback {...feedbackProps} />,
    ];
  };

  private addDefaultPlaceholderText() {
    this.spanTextEl.innerHTML = this.placeholder || '';
  }

  private assignOptionIds() {
    let optionSecuence = 0;
    this.optionList.forEach(option => {
      if (option.id == '') {
        option.id = `${this.dropdownId}-option-${++optionSecuence}`;
      }
    });
  }

  componentWillLoad(): Promise<void> | void {
    this.options = Array.from(this.el.querySelectorAll('ath-dropdown-option'));
    this.optionList = this.options;
    this.assignOptionIds();
    if (this.multiselect) this.refeshListMultiselect();
  }

  componentDidLoad(): void {
    this.initialValue = this.value;
    if (this.value) {
      this.selectOptionByValue(this.value);
    } else {
      const preSelected = this.optionList.filter(option => option.selected);
      if (preSelected.length) {
        this.selectedOptions = preSelected;
        this.lastValue = preSelected.map(o => o.value).join(',');
        this.value = this.lastValue;
        this.setInputValue(this.value);
        this.spanTextEl.innerHTML = this.multiselect ? (this.showChips ? this.addChips() : `${preSelected.length} ${this.nochipsText}`) : preSelected[0].text;
      } else {
        this.addDefaultPlaceholderText();
      }
    }
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.athChange.emit(this.selectedOptions);
    this.setInputValue(this.initialValue);
  }

  disconnectedCallback() {
    clearTimeout(this.timeoutSearchInpComp);
  }

  render(): JSX.Element {
    const style = this.width ? { width: this.width } : { width: '100%' };
    const labelProps = this.getLabelProps();
    return (
      <Host>
        <div class="ath-dropdown" style={style}>
          {!!this.label && (
            <div class="ath-dropdown__label" id={this.labelId}>
              <FcInputLabel {...labelProps}></FcInputLabel>
            </div>
          )}
          <div class="ath-dropdown__wrapper">
            {this.renderDropdown()}
            {this.renderList()}
            {this.renderAddons()}
          </div>
        </div>
        <div class="sr-only" role="status">
          {this.liveMessage}
        </div>
      </Host>
    );
  }
}
