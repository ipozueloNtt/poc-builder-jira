export const moveFocusToItem = (
  items: { id: string; disabled?: boolean }[],
  direction: number,
  activeItemId: string,
  toEnd: boolean = false,
): string | undefined => {
  if (!items || items.length === 0) return activeItemId;

  const currentIndex = items.findIndex(item => item.id === activeItemId);
  if (currentIndex === -1) return activeItemId;

  if (items[currentIndex].disabled) return activeItemId;

  if (direction === 0) {
    const firstEnabled = items.find(item => !item.disabled);
    return firstEnabled ? firstEnabled.id : activeItemId;
  }

  if (toEnd) {
    const lastEnabled = [...items].reverse().find(item => !item.disabled);
    return lastEnabled ? lastEnabled.id : activeItemId;
  }

  if (direction === 1) {
    for (let i = currentIndex + 1; i < items.length; i++) {
      if (!items[i].disabled) return items[i].id;
    }
    return activeItemId;
  }

  if (direction === -1) {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!items[i].disabled) return items[i].id;
    }
    return activeItemId;
  }

  return activeItemId;
};

export const focusItem = (itemId: string, el: HTMLElement) => {
  const itemElement = el.querySelector(`a#${itemId}`);
  if (itemElement) {
    (itemElement as HTMLElement).focus();
  }
};
