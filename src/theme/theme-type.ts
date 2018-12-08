/**
 * @see https://material.io/design/color/the-color-system.html#tools-for-picking-colors
 */
export const enum ColorPalette {
  PRIMARY = '#388E3C',
  PRIMARY_VARIANT = '#1B5E20',
  SECONDARY = '#039BE5',
  SECONDARY_VARIANT = '#01579B',
  BLACK = '#000000',
  GRAY = '#BBBBBB',
  WHITE = '#FFFFFF',
}

export const enum FontSize {
  SMALL = 'small',
  DEFAULT = 'default',
  LARGE = 'large',
}

export interface ThemeInterface {
  activeOpacity: number;
  borderColorBg: ColorPalette;
  buttonColorBg: ColorPalette;
  buttonColorFg: ColorPalette;
  dropDownMenuColorBg: ColorPalette;
  dropDownMenuColorFg: ColorPalette;
  dropDownMenuShadow: ColorPalette;
  fontSize: Record<FontSize, string>;
  fontWeight: {
    normal: string;
    bold: string;
  };
  headerColorBg: ColorPalette;
  headerColorFg: ColorPalette;
  headerHeight: number;
  inactiveOpacity: number;
  loadingColorFg: ColorPalette;
  radius: number;
  roundButtonRadius: number;
  roundButtonSize: number;
  space: number;
  thinSpace: number;
  transition: string;
}
