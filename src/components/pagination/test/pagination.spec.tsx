import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthPagination } from '../pagination';
import { AthDropdown } from 'components/dropdown/dropdown';
import { AthDropdownOption } from 'components/dropdown/dropdown-option/dropdownOption';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthPagination, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
  });
};

describe('Renderizado general', () => {
  it('should render with default props', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="100"></ath-pagination>');
    expect(page.root).toBeTruthy();
    expect(page.root).toHaveProperty('noEndButtons', false);
    expect(page.root).toHaveProperty('noJumpButtons', false);
    expect(page.root).toHaveProperty('totalItems', 100);

    const itemsCount = page.root.querySelector('.ath-pagination-items-count');
    expect(itemsCount).toBeTruthy();
    expect(itemsCount.textContent).toContain('1 - 5 de 100 elementos');

    const itemsSelector = page.root.querySelector('.ath-pagination-items-selector');
    expect(itemsSelector).toBeTruthy();

    await page.waitForChanges();
    const currentPageAfterFirst = page.rootInstance.currentPageState;
    expect(currentPageAfterFirst).toBe(1);

    const totalPages = page.rootInstance.totalPages;
    expect(totalPages).toBe(20);
  });

  it('should disable buttons when disabled prop is true', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="100" disabled></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();
    const disabled = paginator.hasAttribute('disabled');
    expect(disabled).toBe(true);
  });

  it('should display correct items count', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="100"></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();

    const itemsCount = paginator.querySelector('.ath-pagination-items-count');
    expect(itemsCount).toBeTruthy();
    expect(itemsCount.textContent).toContain('1 - 5 de 100 elementos');
  });

  it('should hide items selector when noItemsSelector is true', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="100" no-items-selector="true"></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();
    const itemsSelector = paginator.querySelector('.ath-pagination-items-selector');
    expect(itemsSelector).toBeNull();
  });

  it('should hide items count when noItemsCount is true', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="100" no-items-count="true"></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();
    const itemsCount = paginator.querySelector('.ath-pagination-items-count');
    expect(itemsCount).toBeNull();
  });

  it('should disable "first" button on first page', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="100"></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();
    const firstBtn = paginator.querySelector('ath-button[icon="chevron_left"]');
    expect(firstBtn).not.toBeNull();
    expect(firstBtn).toHaveAttribute('disabled');
  });

  it('should disable "last" button on last page', async () => {
    const page = await testPage('<ath-pagination current-page="10" total-items="50"></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();
    const lastButton = paginator.querySelector('ath-button[icon="chevron_right"]');
    expect(lastButton).not.toBeNull();
    expect(lastButton).toHaveAttribute('disabled');
  });
});

describe('Navegabilidad', () => {
  it('should navigate between blocks correctly', async () => {
    const page = await testPage('<ath-pagination current-page="12" total-items="200"></ath-pagination>');
    const paginator = page.root;

    const jumpButtons = paginator.querySelectorAll('ath-button[icon="menu_horizontal"]');
    expect(jumpButtons.length).toBe(2); // Debe haber botones para saltar adelante y atrás
    jumpButtons[0].dispatchEvent(new CustomEvent('athClick', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.currentPageState).toBe(6);
    jumpButtons[1].dispatchEvent(new CustomEvent('athClick', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.currentPageState).toBe(11);
  });

  it('should navigate between pages (next, previous, first, last)', async () => {
    const page = await testPage('<ath-pagination current-page="12" total-items="200"></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();

    // Navegar a la pagina siguiente
    const nextButton = paginator.querySelector('ath-button[icon="chevron_right"]');
    nextButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true }));
    await page.waitForChanges();
    const currentPageAfterNext = page.rootInstance.currentPageState;
    expect(currentPageAfterNext).toBe(13);

    // Navegar a la pagina anterior
    const prevButton = paginator.querySelector('ath-button[icon="chevron_left"]');
    prevButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true }));
    await page.waitForChanges();
    const currentPageAfterPrev = page.rootInstance.currentPageState;
    expect(currentPageAfterPrev).toBe(12);

    // Navegar a la ultima pagina
    const lastButton = paginator.querySelector('ath-button[icon="last"]');
    lastButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true }));
    await page.waitForChanges();
    const currentPageAfterLast = page.rootInstance.currentPageState;
    expect(currentPageAfterLast).toBe(40);

    // Navegar a la primera pagina
    const firstButton = paginator.querySelector('ath-button[icon="first"]');
    firstButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true }));
    await page.waitForChanges();
    const currentPageAfterFirst = page.rootInstance.currentPageState;
    expect(currentPageAfterFirst).toBe(1);
  });

  it('should navigate to a specific page when page button is clicked', async () => {
    const page = await testPage('<ath-pagination current-page="12" total-items="200"></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();

    const pageButtons = paginator.querySelectorAll('.ath-pagination-page-button');
    expect(pageButtons.length).toBe(5);

    // Click en el botón de la página 14
    const button14 = Array.from(pageButtons).find(btn => btn.textContent.trim() === '14');
    button14.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();
    expect(button14).toHaveClass('ath-pagination-page-button--selected');
  });
});

describe('Render especial', () => {
  it('should hide itemsPerPage and dropdown on small screens', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="50"></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();

    // Simular un cambio de tamaño de ventana
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    await page.waitForChanges();
    const itemsPerPage = paginator.querySelector('.ath-pagination-items-per-page');
    const dropdown = paginator.querySelector('.ath-pagination-dropdown');
    expect(itemsPerPage).toBeNull();
    expect(dropdown).toBeNull();
  });
});

describe('Events', () => {
  it('should emit athPaginate event when a page button is clicked', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="50"></ath-pagination>');
    const paginator = page.root;
    expect(paginator).toBeTruthy();

    const pageButtonsArray = paginator.querySelectorAll('.ath-pagination-page-button');
    expect(pageButtonsArray.length).toBe(5);

    const athPaginateHandler = jest.fn();
    paginator.addEventListener('athPaginate', athPaginateHandler);

    const button3 = Array.from(pageButtonsArray).find(btn => btn.textContent.trim() === '3');
    button3.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();
    expect(athPaginateHandler).toHaveBeenCalled();
    expect(button3).toHaveClass('ath-pagination-page-button--selected');
  });

  it('should emit optSelected event when items per page is changed', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="50"></ath-pagination>', [AthDropdown, AthDropdownOption]);
    const paginator = page.root;
    expect(paginator).toBeTruthy();
    const dropdown = paginator.querySelector('ath-dropdown');
    expect(dropdown).toBeTruthy();

    const pageButtonsArray = paginator.querySelectorAll('ath-dropdown-option');
    expect(pageButtonsArray.length).toBe(3);

    let selectOption = pageButtonsArray[2];
    const optSelected = jest.fn();
    paginator.addEventListener('optSelected', optSelected);
    selectOption.click();
    expect(optSelected).toHaveBeenCalled();
    expect(dropdown.textContent).toContain('15 elementos por página');
  });

  it('should update items count when items per page is changed', async () => {
    const page = await testPage('<ath-pagination current-page="1" total-items="50"></ath-pagination>', [AthDropdown, AthDropdownOption]);
    const paginator = page.root;
    expect(paginator).toBeTruthy();

    const pageButtonsArray = paginator.querySelectorAll('ath-dropdown-option');
    expect(pageButtonsArray.length).toBe(3);

    let selectOption = pageButtonsArray[1];
    const optSelected = jest.fn();
    paginator.addEventListener('optSelected', optSelected);
    selectOption.click();
    await page.waitForChanges();
    expect(optSelected).toHaveBeenCalled();

    const itemsCount = paginator.querySelector('.ath-pagination-items-count');
    expect(itemsCount).toBeTruthy();
    expect(itemsCount.textContent).toContain('1 - 10 de 50 elementos');
  });
});
