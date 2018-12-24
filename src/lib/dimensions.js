import {
  Dimensions,
  Platform
} from 'react-native';

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;
export const isIpad = Platform.OS === "ios" && height / width < 1.6;

const scale = Dimensions.get('window').scale;

export const widthPercent = (percentOfWidth) => {
  return (percentOfWidth * width) / 100;
};

export const heightPercent = (percent) => {
  return (percent * height) / 100;
};
