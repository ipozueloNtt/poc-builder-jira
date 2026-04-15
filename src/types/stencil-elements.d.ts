import type * as React from 'react';

type AthElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  Record<string, unknown>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: `ath-${string}`]: AthElementProps;
    }
  }
}
