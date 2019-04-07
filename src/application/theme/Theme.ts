/**
 * @see https://material.io/design/color/the-color-system.html#tools-for-picking-colors
 */
export const enum ColorPalette {
  PRIMARY = '#388E3C',
  PRIMARY_VARIANT = '#1B5E20',
  SECONDARY = '#039BE5',
  SECONDARY_VARIANT = '#01579B',
  BLACK = '#000000',
  LIGHT_BLACK = '#333333',
  LIGHT_GRAY = '#BBBBBB',
  GRAY = '#999999',
  WHITE = '#FFFFFF',
  PALE_WHITE = '#DDDDDD',
}

export const enum FontSize {
  SMALL = 'small',
  DEFAULT = 'default',
  LARGE = 'large',
}

export interface ThemeInterface {
  activeOpacity: number;
  borderActiveColorBg: ColorPalette;
  borderColorBg: ColorPalette;
  buttonColorBg: ColorPalette;
  buttonColorFg: ColorPalette;
  dropDownMenuColorBg: ColorPalette;
  dropDownMenuColorFg: ColorPalette;
  dropDownMenuHoverColorBg: ColorPalette;
  dropDownMenuHoverColorFg: ColorPalette;
  dropDownMenuShadow: ColorPalette;
  fontSize: Record<FontSize, string>;
  fontWeight: {
    normal: string;
    bold: string;
  };
  headerColorBg: ColorPalette;
  headerColorFg: ColorPalette;
  headerHeight: string;
  headerHoverColorBg: ColorPalette;
  headerHoverColorFg: ColorPalette;
  inactiveOpacity: number;
  loadingColorFg: ColorPalette;
  radius: string;
  roundButtonRadius: string;
  roundButtonSize: string;
  space: string;
  subtitleColorFg: ColorPalette;
  thinSpace: string;
  titleColorFg: ColorPalette;
  transition: string;
}
