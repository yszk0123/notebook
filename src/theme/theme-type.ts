/**
 * @see https://material.io/design/color/the-color-system.html#tools-for-picking-colors
 */
export const enum ColorPalette {
  PRIMARY = '#388E3C',
  PRIMARY_VARIANT = '#1B5E20',
  SECONDARY = '#039BE5',
  SECONDARY_VARIANT = '#01579B',
  BLACK = '#000000',
  WHITE = '#FFFFFF',
}

export const enum FontSize {
  SMALL = 'small',
  DEFAULT = 'default',
  LARGE = 'large',
}

export interface ThemeInterface {
  headerColorBg: ColorPalette;
  headerColorFg: ColorPalette;
  buttonColorBg: ColorPalette;
  buttonColorFg: ColorPalette;
  loadingColorFg: ColorPalette;
  fontSize: Record<FontSize, string>;
  fontWeight: {
    normal: string;
    bold: string;
  };
  space: number;
}
