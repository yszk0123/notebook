import { ColorPalette, FontSize, ThemeInterface } from './theme-type';

export const defaultTheme: ThemeInterface = {
  activeOpacity: 1,
  borderActiveColorBg: ColorPalette.SECONDARY,
  borderColorBg: ColorPalette.GRAY,
  buttonColorBg: ColorPalette.SECONDARY,
  buttonColorFg: ColorPalette.WHITE,
  dropDownMenuColorBg: ColorPalette.WHITE,
  dropDownMenuColorFg: ColorPalette.BLACK,
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
  headerHeight: '34px',
  inactiveOpacity: 0.4,
  loadingColorFg: ColorPalette.SECONDARY,
  radius: '4px',
  roundButtonRadius: '24px',
  roundButtonSize: '48px',
  space: '8px',
  thinSpace: '4px',
  transition: '0.25s ease-in-out',
};
