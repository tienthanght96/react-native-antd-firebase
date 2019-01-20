import {
  Platform
} from 'react-native';

export const platform = Platform.OS === 'ios' ? 'iOS' : Platform.OS === 'android' ? 'Android' : Platform.OS;


export class assets {
  static testImage = require('../../assets/hoa_hau_0.jpg');
  static noImage = require('../../assets/no_image_available.jpg');
}

export const styleFlexRow = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const styleFlexRowSpaceBetween = {
  justifyContent: 'space-between',
};


export const violetColor = "#030921";
export const fontColor = "rgb(72, 72, 72)";
// export const redColor = "#fa4a4d";
export const redColor = "#f65451";
export const yellowColor = "#fac917";
