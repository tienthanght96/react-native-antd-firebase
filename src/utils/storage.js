import { AsyncStorage } from "react-native";

export const storeDataToLocalStorage = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    console.log('error storeDataToLocalStorage', error)
    // Error saving data
  }
};

export const retrieveDataLocalStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    // throw value;
    return null;
  } catch (error) {
    console.log('error', error)
    return null;
    // Error retrieving data
  }
};

export const removeDataLocalStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};


export const removeAllDataLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};
