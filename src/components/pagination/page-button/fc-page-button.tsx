import { FunctionalComponent, h } from '@stencil/core';

export type FcPageButtonType = {
  selected: boolean;
  disabled: boolean;
  pageNumber: number;
  onClick?: () => void;
  pageButtonRef?: (el: HTMLButtonElement | null) => void;
};

export const FcPageButton: FunctionalComponent<FcPageButtonType> = props => {
  const getPageButtonClass = () => {
    return {
      'ath-pagination-page-button': true,
      ...(props.selected && { 'ath-pagination-page-button--selected': true }),
      ...(props.disabled && { 'ath-pagination-page-button--disabled': true }),
    };
  };

  const handleClick = () => {
    if (!props.disabled && props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      ref={props.pageButtonRef}
      class={{ ...getPageButtonClass() }}
      onClick={handleClick}
      aria-label={`Página ${props.pageNumber}`}
      disabled={props.disabled}
      aria-disabled={props.disabled ? 'true' : 'false'}
      aria-current={props.selected ? 'page' : undefined}
    >
      <span class="ath-pagination-page-button-number">{props.pageNumber}</span>
    </button>
  );
};
