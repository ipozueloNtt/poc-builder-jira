import { moveFocusToItem, focusItem } from '../focus-manager';

describe('focus-manager', () => {
  let items;
  let container;

  beforeEach(() => {
    items = [
      { id: 'item-1', disabled: false },
      { id: 'item-2', disabled: true },
      { id: 'item-3', disabled: false },
      { id: 'item-4', disabled: true },
      { id: 'item-5', disabled: false },
    ];

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  function setActiveElement(id) {
    const el = document.createElement('a');
    el.id = id;
    container.appendChild(el);
    el.focus();
    return el;
  }

  it('returns the active id if the current item is not in the list', () => {
    setActiveElement('item-x');
    expect(moveFocusToItem(items, 1, 'item-x')).toBe('item-x');
  });

  it('navigates to the right (enabled item)', () => {
    setActiveElement('item-1');
    expect(moveFocusToItem(items, 1, 'item-1')).toBe('item-3');
  });

  it('navigates to the right skipping disabled items', () => {
    setActiveElement('item-3');
    expect(moveFocusToItem(items, 1, 'item-3')).toBe('item-5');
  });

  it('navigates to the left (enabled item)', () => {
    setActiveElement('item-3');
    expect(moveFocusToItem(items, -1, 'item-3')).toBe('item-1');
  });

  it('navigates to the left skipping disabled items', () => {
    setActiveElement('item-5');
    expect(moveFocusToItem(items, -1, 'item-5')).toBe('item-3');
  });

  it('does not navigate to the left if it is at the first item', () => {
    setActiveElement('item-1');
    expect(moveFocusToItem(items, -1, 'item-1')).toBe('item-1');
  });

  it('does not navigate to the right if it is at the last item', () => {
    setActiveElement('item-5');
    expect(moveFocusToItem(items, 1, 'item-5')).toBe('item-5');
  });

  it('navigates to the first enabled item with direction=0', () => {
    setActiveElement('item-3');
    expect(moveFocusToItem(items, 0, 'item-3')).toBe('item-1');
  });

  it('navigates to the last enabled item with toEnd=true', () => {
    setActiveElement('item-1');
    expect(moveFocusToItem(items, 1, 'item-1', true)).toBe('item-5');
  });

  it('returns the active id if all items are disabled', () => {
    const disableditems = [
      { id: 'item-1', disabled: true },
      { id: 'item-2', disabled: true },
    ];
    setActiveElement('item-1');
    expect(moveFocusToItem(disableditems, 1, 'item-1')).toBe('item-1');
  });

  it('returns the active id if the list of items is empty', () => {
    setActiveElement('item-1');
    expect(moveFocusToItem([], 1, 'item-1')).toBe('item-1');
  });

  it('returns the active id if the current item is disabled', () => {
    setActiveElement('item-2');
    expect(moveFocusToItem(items, 1, 'item-2')).toBe('item-2');
  });

  describe('focusItem', () => {
    it('focuses the item if it exists', () => {
      const el = document.createElement('div');
      const a = document.createElement('a');
      a.id = 'item-1';
      el.appendChild(a);
      document.body.appendChild(el);

      const focusSpy = jest.spyOn(a, 'focus');
      focusItem('item-1', el);
      expect(focusSpy).toHaveBeenCalled();

      document.body.removeChild(el);
    });

    it('does nothing if the item does not exist', () => {
      const el = document.createElement('div');
      expect(() => focusItem('no-existe', el)).not.toThrow();
    });
  });
});
export { moveFocusToItem };
