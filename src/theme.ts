/**
 * @see https://material.io/design/color/the-color-system.html#tools-for-picking-colors
 */
const enum ColorPalette {
  PRIMARY = '#388E3C',
  PRIMARY_VARIANT = '#1B5E20',
  SECONDARY = '#039BE5',
  SECONDARY_VARIANT = '#01579B',
  BLACK = '#000000',
  WHITE = '#FFFFFF',
}

export interface ThemeInterface {
  headerColorBg: ColorPalette;
  headerColorFg: ColorPalette;
  fontSize: {
    small: string;
    default: string;
    large: string;
  };
  space: number;
}

export const theme: ThemeInterface = {
  headerColorBg: ColorPalette.PRIMARY,
  headerColorFg: ColorPalette.WHITE,
  fontSize: {
    small: '1.2rem',
    default: '1.6rem',
    large: '2rem',
  },
  space: 8,
};
