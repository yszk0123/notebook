import { ColorPalette, FontSize, ThemeInterface } from './theme-type';

export const defaultTheme: ThemeInterface = {
  activeOpacity: 1,
  borderColorBg: ColorPalette.GRAY,
  buttonColorBg: ColorPalette.SECONDARY,
  buttonColorFg: ColorPalette.WHITE,
  dropDownMenuColorBg: ColorPalette.SECONDARY,
  dropDownMenuColorFg: ColorPalette.WHITE,
  dropDownMenuShadow: ColorPalette.BLACK,
  fontSize: {
    [FontSize.SMALL]: '1.2rem',
    [FontSize.DEFAULT]: '1.6rem',
    [FontSize.LARGE]: '2rem',
  },
  fontWeight: {
    bold: 'bold',
    normal: 'normal',
  },
  headerColorBg: ColorPalette.PRIMARY,
  headerColorFg: ColorPalette.WHITE,
  headerHeight: 34,
  inactiveOpacity: 0.4,
  loadingColorFg: ColorPalette.SECONDARY,
  radius: 4,
  roundButtonRadius: 24,
  roundButtonSize: 48,
  space: 8,
  thinSpace: 4,
  transition: '0.25s ease-in-out',
};
