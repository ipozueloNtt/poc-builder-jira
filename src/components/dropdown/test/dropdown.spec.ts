import { SpecPage, newSpecPage } from '@stencil/core/testing';
import { AthDropdown } from '../dropdown';
import { AthDropdownOption } from '../dropdown-option/dropdownOption';
import { AthIcon } from '../../icon/icon';
import { AthChipDismiss } from '../../chip-dismiss/chip-dismiss';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthDropdown, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

const testPageOption = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthDropdownOption, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

//Dropdown
describe('ath-dropdown', () => {
  describe('render', () => {
    //Texts & icon tests
    it('should have Label with text', async () => {
      const labelText = 'Label text';
      const page = await testPage(`<ath-dropdown label="${labelText}"></ath-dropdown>`);
      const label = page.root.querySelector('label.ath-input__label__wrapper');
      expect(label).toEqualText(labelText);
    });

    it('should have helper-text with text', async () => {
      const helperText = 'Helper text';
      const page = await testPage(`<ath-dropdown helper-text="${helperText}"><ath-dropdown-option text="test"></ath-dropdown-option></ath-dropdown>`);
      const div = page.root.querySelector('div.ath-input__helper-text');
      expect(div).toEqualText(helperText);
    });

    it('should have feedback with text', async () => {
      const feedbackText = 'Feedback text';
      const page = await testPage(`<ath-dropdown feedback="error" feedback-text="${feedbackText}"><ath-dropdown-option text="test"></ath-dropdown-option></ath-dropdown>`);
      const div = page.root.querySelector('div.ath-input__feedback');
      expect(div).toEqualText(feedbackText);
    });

    it('should have icon chevron_down when default (closed dropdown)', async () => {
      const page = await testPage(`<ath-dropdown></ath-dropdown>`, [AthIcon]);
      const icon = page.root.querySelector('ath-icon');
      expect(icon).toBeDefined();
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#chevron_down');
    });

    //Required test
    it('should have required to be defined', async () => {
      const labelText = 'Label text';
      const page = await testPage(`<ath-dropdown label="${labelText}" required><ath-dropdown-option text="test"></ath-dropdown-option></ath-dropdown>`);
      const span = page.root.querySelector('span.required');
      expect(span).toBeDefined();
    });

    //Search
    it('should have search input when search is true', async () => {
      const labelText = 'Label text';
      const page = await testPage(`<ath-dropdown label="${labelText}" search><ath-dropdown-option text="test"></ath-dropdown-option></ath-dropdown>`);
      const searchInput = page.root.querySelector('input[type="search"]');
      expect(searchInput).toBeDefined();
    });

    it('Should not have ath-dropdown-option--hidden when option text includes the input value', async () => {
      const labelText = 'Label text';
      const page = await testPage(
        `<ath-dropdown label="${labelText}" search><ath-dropdown-option text="test" option-group><ath-dropdown-option text="test-1"></ath-dropdown-option><ath-dropdown-option text="test-2"></ath-dropdown-option></ath-dropdown-option></ath-dropdown>`,
        [AthDropdownOption],
      );

      const combobox = page.root.querySelector('span');
      combobox.focus();
      const Openevent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
      });
      combobox.dispatchEvent(Openevent);

      const searchInput = page.root.querySelector('input');

      const inputEvent = new Event('input', { bubbles: true });

      searchInput.value += '1'; // Simulate value change
      searchInput.dispatchEvent(inputEvent);

      const option = page.root.querySelectorAll('ath-dropdown-option')[1];
      expect(option.classList.contains('ath-dropdown-option--hidden')).toBe(false);
    });

    it('The active descendant of the input should be the id of the second option when arrowDown is pressed', async () => {
      const page = await testPage(
        `<ath-dropdown search><ath-dropdown-option text="textOption"></ath-dropdown-option><ath-dropdown-option text="textOption2"></ath-dropdown-option></ath-dropdown>`,
        [AthDropdownOption],
      );

      const searchInput = page.root.querySelector('.ath-input__text--value') as HTMLInputElement;
      const combobox = page.root.querySelector('span');

      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        code: 'Space',
        bubbles: true,
      });

      combobox.dispatchEvent(event);

      searchInput.focus();
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        code: 'ArrowDown',
        bubbles: true,
      });

      searchInput.dispatchEvent(arrowDownEvent);
      const id = page.root.querySelectorAll('ath-dropdown-option')[1].id;
      expect(combobox.getAttribute('aria-activedescendant')).toBe(id);
    });

    it('Should the activedescendant of the input be the third selection when pressing arrowDown and the second option is disabled', async () => {
      const page = await testPage(
        `<ath-dropdown search>
        <ath-dropdown-option text="textOption"></ath-dropdown-option>
        <ath-dropdown-option text="textOption2" disabled></ath-dropdown-option>
        <ath-dropdown-option text="textOption3"></ath-dropdown-option>
        </ath-dropdown>`,
        [AthDropdownOption],
      );

      const searchInput = page.root.querySelector('.ath-input__text--value') as HTMLInputElement;
      const combobox = page.root.querySelector('span');

      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        code: 'Space',
        bubbles: true,
      });

      combobox.dispatchEvent(event);

      searchInput.focus();
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        code: 'ArrowDown',
        bubbles: true,
      });

      searchInput.dispatchEvent(arrowDownEvent);
      const id = page.root.querySelectorAll('ath-dropdown-option')[2].id;
      expect(combobox.getAttribute('aria-activedescendant')).toBe(id);
    });

    it('Should the activedescendant of the input be the first selection when pressing arrowUp', async () => {
      const page = await testPage(
        `<ath-dropdown search><ath-dropdown-option text="textOption"></ath-dropdown-option><ath-dropdown-option text="textOption2"></ath-dropdown-option></ath-dropdown>`,
        [AthDropdownOption],
      );

      const searchInput = page.root.querySelector('.ath-input__text--value') as HTMLInputElement;
      const combobox = page.root.querySelector('span');

      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        code: 'Space',
        bubbles: true,
      });

      combobox.dispatchEvent(event);

      searchInput.focus();
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });

      searchInput.dispatchEvent(arrowDownEvent);
      const id = page.root.querySelectorAll('ath-dropdown-option')[0].id;
      expect(combobox.getAttribute('aria-activedescendant')).toBe(id);
    });

    it('Should close when clicking outside', async () => {
      const page = await testPage(`<ath-dropdown multiselect show-chips><ath-dropdown-option text="textOption"></ath-dropdown-option></ath-dropdown>`, [AthDropdownOption]);

      const combobox = page.root.querySelector('span');

      expect(combobox.getAttribute('aria-expanded')).toBe('false');
      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
      });
      combobox.dispatchEvent(event);
      expect(combobox.getAttribute('aria-expanded')).toBe('true');

      const outsideArea = document.createElement('div');
      outsideArea.style.width = '100px';
      outsideArea.style.height = '100px';
      outsideArea.style.position = 'absolute';
      outsideArea.style.top = '50px';
      outsideArea.style.left = '50px';

      page.body.appendChild(outsideArea);

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        clientX: 60,
        clientY: 60,
      });
      outsideArea.dispatchEvent(clickEvent);
      expect(combobox.getAttribute('aria-expanded')).toBe('false');
    });

    //chips
    it('should have chips when multichoice is true, show-chips is true and option is selected', async () => {
      const page = await testPage(`<ath-dropdown multiselect show-chips><ath-dropdown-option text="textOption" selected></ath-dropdown-option></ath-dropdown>`, [
        AthChipDismiss,
        AthDropdownOption,
      ]);
      const chip = page.root.querySelector('ath-chip-dismiss');
      expect(chip).toBeDefined();
      const headintext = chip.shadowRoot.querySelector('span.ath-chip-dismiss__text');
      expect(headintext).toEqualText('textOption');
    });

    it('should show placeholder when clicked a selected one', async () => {
      const page = await testPage(
        `<ath-dropdown multiselect show-chips placeholder="placeholder"><ath-dropdown-option text="textOption" selected></ath-dropdown-option></ath-dropdown>`,
        [AthChipDismiss, AthDropdownOption],
      );

      const option = page.root.querySelector('ath-dropdown-option');
      option.click();
      const fieldPlaceholder = page.root.querySelector('span.ath-dropdown__field');
      expect(fieldPlaceholder).toEqualText('placeholder');
    });

    it('should show placeholder when clicked a selected one & multiselect false', async () => {
      const page = await testPage(`<ath-dropdown placeholder="placeholder"><ath-dropdown-option text="textOption" selected></ath-dropdown-option></ath-dropdown>`, [
        AthChipDismiss,
        AthDropdownOption,
      ]);

      const option = page.root.querySelector('ath-dropdown-option');
      option.click();
      const fieldPlaceholder = page.root.querySelector('span.ath-dropdown__field');
      expect(fieldPlaceholder).toEqualText('textOption');
    });

    it('should not have chips when the cross button of chip is clicked', async () => {
      const page = await testPage(`<ath-dropdown multiselect show-chips><ath-dropdown-option text="textOption" selected></ath-dropdown-option></ath-dropdown>`, [
        AthChipDismiss,
        AthDropdownOption,
      ]);
      const chip = page.root.querySelector('ath-chip-dismiss');
      expect(chip).toBeDefined();

      const cross = chip.shadowRoot.querySelector('button');
      const crossClick = jest.fn();
      page.root.addEventListener('athDismiss', crossClick);
      cross.click();
      expect(crossClick).toHaveBeenCalled();

      const chipCheck = page.root.querySelector('ath-chip-dismiss');
      expect(chipCheck).toBeNull();
    });

    it('should show nochip-text when is multiselect and no selected', async () => {
      const page = await testPage(`<ath-dropdown multiselect nochips-Text="selected"><ath-dropdown-option text="textOption" selected></ath-dropdown-option></ath-dropdown>`, [
        AthDropdownOption,
      ]);

      const fieldPlaceholder = page.root.querySelector('span.ath-dropdown__field');
      expect(fieldPlaceholder.innerHTML).toEqualText('1 selected');
    });

    it('should have icon on chips and chip size md', async () => {
      const page = await testPage(
        `<ath-dropdown multiselect show-chips size="lg"><ath-dropdown-option text="textOption" selected icon="accident"></ath-dropdown-option></ath-dropdown>`,
        [AthDropdownOption],
      );

      const chip = page.root.querySelector('ath-chip-dismiss');
      expect(chip).toBeDefined();
    });

    it('should have 1 chip when the cross button of chip is clicked', async () => {
      const page = await testPage(
        `<ath-dropdown multiselect show-chips>
          <ath-dropdown-option text="Option 1" value="op1" selected></ath-dropdown-option>
          <ath-dropdown-option text="Option 2" value="op2" selected></ath-dropdown-option>
        </ath-dropdown>`,
        [AthChipDismiss, AthDropdownOption],
      );

      await page.waitForChanges();

      const chip = page.root.querySelector('ath-chip-dismiss');
      expect(chip).toBeDefined();

      const cross = chip.shadowRoot.querySelector('button');
      const crossClick = jest.fn();
      page.root.addEventListener('athDismiss', crossClick);
      cross.click();
      expect(crossClick).toHaveBeenCalled();

      const chipCheck = page.root.querySelector('ath-chip-dismiss');
      expect(chipCheck.getAttribute('heading-text')).toBe('Option 2');
    });

    it('should have chips when an option is clicked', async () => {
      const page = await testPage(`<ath-dropdown multiselect show-chips><ath-dropdown-option text="textOption"></ath-dropdown-option></ath-dropdown>`, [
        AthChipDismiss,
        AthDropdownOption,
      ]);
      const option = page.root.querySelector('ath-dropdown-option');
      expect(option).toBeDefined();

      const optionClick = jest.fn();
      page.root.addEventListener('optSelected', optionClick);
      option.click();
      expect(optionClick).toHaveBeenCalled();

      const chipCheck = page.root.querySelector('ath-chip-dismiss');
      expect(chipCheck).toBeDefined();
    });

    //Keyboard Events
    it('Should open combo box when spacebar is pushed', async () => {
      const page = await testPage(`<ath-dropdown multiselect show-chips><ath-dropdown-option text="textOption"></ath-dropdown-option></ath-dropdown>`, [AthDropdownOption]);

      const combobox = page.root.querySelector('span');

      expect(combobox.getAttribute('aria-expanded')).toBe('false');
      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
      });
      combobox.dispatchEvent(event);
      expect(combobox.getAttribute('aria-expanded')).toBe('true');
    });

    it('Should not open combo box when click and readonly', async () => {
      const page = await testPage(`<ath-dropdown readonly><ath-dropdown-option text="textOption"></ath-dropdown-option></ath-dropdown>`, [AthDropdownOption]);

      const combobox = page.root.querySelector('span');
      combobox.click();

      expect(combobox.getAttribute('aria-expanded')).toBe('false');
    });

    it('Should  open combo box when click', async () => {
      const page = await testPage(`<ath-dropdown ><ath-dropdown-option text="textOption"></ath-dropdown-option></ath-dropdown>`, [AthDropdownOption]);

      const combobox = page.root.querySelector('span');
      combobox.click();

      expect(combobox.getAttribute('aria-expanded')).toBe('true');
    });

    it('Should close combo box when escape is pushed', async () => {
      const page = await testPage(`<ath-dropdown multiselect show-chips open><ath-dropdown-option text="textOption"></ath-dropdown-option></ath-dropdown>`, [AthDropdownOption]);

      const combobox = page.root.querySelector('span');

      expect(combobox.getAttribute('aria-expanded')).toBe('true');
      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        code: 'Escape',
        bubbles: true,
      });
      combobox.dispatchEvent(event);
      expect(combobox.getAttribute('aria-expanded')).toBe('false');
    });

    it('Should the activedescendant of combo box the first selection when open', async () => {
      const page = await testPage(`<ath-dropdown multiselect show-chips><ath-dropdown-option text="textOption"></ath-dropdown-option></ath-dropdown>`, [AthDropdownOption]);
      const combobox = page.root.querySelector('span');
      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        code: 'Space',
        bubbles: true,
      });
      combobox.dispatchEvent(event);
      const id = page.root.querySelector('ath-dropdown-option').id;
      expect(combobox.getAttribute('aria-activedescendant')).toBe(id);
    });

    it('Should the activedescendant of combo box the second selection when press arrowDown', async () => {
      const page = await testPage(
        `<ath-dropdown multiselect show-chips><ath-dropdown-option text="textOption"></ath-dropdown-option><ath-dropdown-option text="textOption2"></ath-dropdown-option></ath-dropdown>`,
        [AthDropdownOption],
      );
      const combobox = page.root.querySelector('span');
      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        code: 'Space',
        bubbles: true,
      });
      combobox.dispatchEvent(event);

      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        code: 'ArrowDown',
        bubbles: true,
      });
      combobox.dispatchEvent(arrowDownEvent);
      const id = page.root.querySelectorAll('ath-dropdown-option')[1].id;
      expect(combobox.getAttribute('aria-activedescendant')).toBe(id);
    });

    it('Should option be selected when using space with no input search', async () => {
      const page = await testPage(
        `<ath-dropdown multiselect show-chips><ath-dropdown-option text="textOption"></ath-dropdown-option><ath-dropdown-option text="textOption2"></ath-dropdown-option></ath-dropdown>`,
        [AthChipDismiss, AthDropdownOption],
      );
      const combobox = page.root.querySelector('span');
      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        code: 'Space',
        bubbles: true,
      });
      combobox.dispatchEvent(event);

      const selectEvent = new KeyboardEvent('keydown', {
        code: 'Space',
        bubbles: true,
      });
      combobox.dispatchEvent(selectEvent);
      const chipCheck = page.root.querySelector('ath-chip-dismiss');
      expect(chipCheck).toBeDefined();
    });

    it('Should the activedescendant of combo box the first selection when press arrowUp', async () => {
      const page = await testPage(
        `<ath-dropdown multiselect show-chips><ath-dropdown-option text="textOption"></ath-dropdown-option><ath-dropdown-option text="textOption2"></ath-dropdown-option></ath-dropdown>`,
        [AthDropdownOption],
      );
      const combobox = page.root.querySelector('span');
      combobox.focus();
      const event = new KeyboardEvent('keydown', {
        code: 'Space',
        bubbles: true,
      });
      combobox.dispatchEvent(event);

      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });
      combobox.dispatchEvent(arrowDownEvent);
      const id = page.root.querySelector('ath-dropdown-option').id;
      expect(combobox.getAttribute('aria-activedescendant')).toBe(id);
    });

    //Disabled, readonly & error test
    it('should have disabled class', async () => {
      const page = await testPage(`<ath-dropdown disabled><ath-dropdown-option text="test"></ath-dropdown-option></ath-dropdown>`);
      const span = page.root.querySelector('span.ath-dropdown__wrapper--field');
      expect(span).toHaveClass('disabled');
    });

    it('should have readonly class', async () => {
      const page = await testPage(`<ath-dropdown readonly><ath-dropdown-option text="test"></ath-dropdown-option></ath-dropdown>`);
      const span = page.root.querySelector('span.ath-dropdown__wrapper--field');
      expect(span).toHaveClass('readonly');
    });

    it('should have error class when feedback is error', async () => {
      const page = await testPage(`<ath-dropdown feedback="error"><ath-dropdown-option text="test"></ath-dropdown-option></ath-dropdown>`);
      const span = page.root.querySelector('span.ath-dropdown__wrapper--field');
      expect(span).toHaveClass('error');
    });
  });

  describe('action', () => {
    let page: SpecPage;
    let dropdown;
    let selectOption;

    beforeEach(async () => {
      page = await testPage('<ath-dropdown><ath-dropdown-option></ath-dropdown-option></ath-dropdown>', [AthDropdownOption]);
      dropdown = page.root.querySelector('span.ath-dropdown__wrapper--field');
      selectOption = page.root.querySelector('ath-dropdown-option');
    });

    it('should emit the athFocus event when focused', async () => {
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      dropdown.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('should emit the athBlur event when blurred', async () => {
      const athBlur = jest.fn();
      page.root.addEventListener('athBlur', athBlur);
      dropdown.focus();
      dropdown.blur();
      expect(athBlur).toHaveBeenCalled();
    });

    it('should emit the optSelected event when clicked option', async () => {
      const optSelected = jest.fn();
      page.root.addEventListener('optSelected', optSelected);
      selectOption.click();
      expect(optSelected).toHaveBeenCalled();
    });

    it('should emit the athChange event when clicked option', async () => {
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);
      selectOption.click();
      expect(athChange).toHaveBeenCalled();
    });
  });
});

describe('action', () => {
  let page: SpecPage;
  let selectOption;

  beforeEach(async () => {
    page = await testPage('<ath-dropdown><ath-dropdown-option disabled></ath-dropdown-option></ath-dropdown>', [AthDropdownOption]);
    selectOption = page.root.querySelector('ath-dropdown-option');
  });

  it('should not emit the optSelected event when clicked option', async () => {
    const optSelected = jest.fn();
    page.root.addEventListener('optSelected', optSelected);
    selectOption.click();
    expect(optSelected).not.toHaveBeenCalled();
  });

  it('should not emit the athChange event when clicked option', async () => {
    const athChange = jest.fn();
    page.root.addEventListener('athChange', athChange);
    selectOption.click();
    expect(athChange).not.toHaveBeenCalled();
  });
});

describe('fix bug #466130', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await testPage(
      '<ath-dropdown><ath-dropdown-option text=" Opción 1" value=" Opción 1"></ath-dropdown-option><ath-dropdown-option text=" Opción 2" value=" Opción 2" selected></ath-dropdown-option></ath-dropdown>',
      [AthDropdownOption],
    );
  });

  it('should not emit the athChange event on first render', async () => {
    const athChange = jest.fn();
    page.root.addEventListener('athChange', athChange);
    await page.waitForChanges();
    expect(athChange).not.toHaveBeenCalled();
  });
});

//Select option
describe('ath-dropdown-option', () => {
  describe('render', () => {
    //Text & icon tests
    it('should have Label with text', async () => {
      const labelText = 'Label text';
      const page = await testPageOption(`<ath-dropdown-option text="${labelText}"></ath-dropdown-option>`);
      const span = page.root.querySelector('span');
      expect(span).toEqualText(labelText);
    });

    it('should have checked icon when selected is true', async () => {
      const page = await testPageOption(`<ath-dropdown-option selected text="label"></ath-dropdown-option>`, [AthIcon]);
      const icon = page.root.querySelector('ath-icon');
      expect(icon).toBeDefined();
      expect(icon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('#check');
    });

    //disabled and option group
    it('should have Class disabled', async () => {
      const page = await testPageOption(`<ath-dropdown-option disabled></ath-dropdown-option>`);
      const div = page.root.querySelector('div.ath-dropdown-option-header');
      expect(div).toHaveClass('disabled');
    });

    it('should have class optGroup', async () => {
      const page = await testPageOption(`<ath-dropdown-option option-group></ath-dropdown-option>`);
      const div = page.root.querySelector('div.ath-dropdown-option-header');
      expect(div).toHaveClass('optGroup');
    });

    it('should have class level option inside group', async () => {
      const page = await testPageOption(`<ath-dropdown-option option-group><ath-dropdown-option text="option"></ath-dropdown-option></ath-dropdown-option>`, [AthDropdownOption]);

      const optionInGroup = page.root.querySelector('ath-dropdown-option') as HTMLAthDropdownOptionElement;
      const level = optionInGroup.querySelector('.level');
      expect(level).toBeDefined();
    });
  });
});
