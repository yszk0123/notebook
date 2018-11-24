import { ColorPalette, FontSize, ThemeInterface } from './theme-type';

export const defaultTheme: ThemeInterface = {
  headerColorBg: ColorPalette.PRIMARY,
  headerColorFg: ColorPalette.WHITE,
  loadingColorFg: ColorPalette.SECONDARY,
  buttonColorBg: ColorPalette.SECONDARY,
  buttonColorFg: ColorPalette.WHITE,
  fontSize: {
    [FontSize.SMALL]: '1.2rem',
    [FontSize.DEFAULT]: '1.6rem',
    [FontSize.LARGE]: '2rem',
  },
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
  space: 8,
};
