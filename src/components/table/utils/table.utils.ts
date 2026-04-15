export const getCellStyles = (cellWidth: string) => {
  return { width: cellWidth };
};

export const getCellRole = (isHeader: boolean) => (isHeader ? 'rowheader' : 'cell');
