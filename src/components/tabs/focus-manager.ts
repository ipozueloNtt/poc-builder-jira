export const moveFocusToTab = (
  tabs: { id: string; disabled?: boolean }[],
  direction: number,
  activeTabId: string,
  toEnd: boolean = false,
): string | undefined => {
  const activeTabElement = document.activeElement as HTMLElement;

  if (!activeTabElement) return activeTabId;

  const currentTab = tabs.find(tab => tab.id === activeTabElement?.id);

  if (currentTab) {
    let currentIndex = tabs.findIndex(tab => tab.id === currentTab.id);
    let nextIndex = currentIndex + direction;

    if (toEnd) {
      for (let i = tabs.length - 1; i >= 0; i--) {
        if (!tabs[i].disabled) {
          nextIndex = i;
          break;
        }
      }
    } else if (direction === 0) {
      nextIndex = tabs.findIndex(tab => !tab.disabled);
    } else {
      nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
      while (tabs[nextIndex] && tabs[nextIndex].disabled) {
        nextIndex = (nextIndex + direction + tabs.length) % tabs.length;
      }
    }

    const nextTab = tabs[nextIndex];

    // No loop
    if (nextTab && !nextTab.disabled) {
      if (direction === -1 && currentIndex === 0) {
        return activeTabId;
      }
      if (direction === 1 && currentIndex === tabs.length - 1) {
        return activeTabId;
      }

      return nextTab.id;
    }
  }

  return activeTabId;
};

export const focusTab = (tabId: string, el: HTMLElement) => {
  const tabElement = el.querySelector(`span#${tabId}`);
  if (tabElement) {
    (tabElement as HTMLElement).focus();
  }
};
