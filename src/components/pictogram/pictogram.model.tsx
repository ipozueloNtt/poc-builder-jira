import { ValueOf } from "@utils/helper";

export type PictogramSizeTypes = ValueOf<typeof PictogramSizeType>;

export const PictogramSizeType = {
    Extrasmall: 'xs',
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
    ExtraLarge: 'xl',
    DoubleExtraLarge: '2xl'
} as const;