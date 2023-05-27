import {Dimensions, Platform} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const platForm = Platform.OS;

export const COLORS_PALETTE = {
  ALICEBLUE: '#f0f8ff',
  ANTIQUEWHITE: '#faebd7',
  AQUA: '#00ffff',
  AQUAMARINE: '#7fffd4',
  AZURE: '#f0ffff',
  BEIGE: '#f5f5dc',
  BISQUE: '#ffe4c4',
  BLACK: '#000000',
  BLANCHEDAMOND: '#ffebcd',
  BLUE: '#0000ff',
  BLUEVIOLET: '#8a2be2',
  BROWN: '#a52a2a',
};

export const FONT_SIZE = {
  BUTTON_TITLE_T1_SIZE: 18,
  BUTTON_TITLE_T2_SIZE: 14,

  TEXT_LABEL1_SIZE: 12,
  TEXT_LABEL2_SIZE: 9,

  TEXTINPUT_PLACE_HOLDER1_SIZE: 16,
  TEXTINPUT_PLACE_HOLDER2_SIZE: 12,
};

export const FONT_FAMILY = {
  APP_FONT_FAMILY: 'OpenSans-Regular',
  SEC_FONT_FAMILY: 'Oswald-Regular',
};

export const DEVICE_CONSTANTS = {
  windowWidth: windowWidth > windowHeight ? windowHeight : windowWidth,
  windowHeight: windowWidth < windowHeight ? windowHeight : windowWidth,
  platForm: platForm,
};

export default {
  COLORS_PALETTE,
  FONT_SIZE,
  DEVICE_CONSTANTS,
  FONT_FAMILY,
};
