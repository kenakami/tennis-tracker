/**
 * Utility functions
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const convert = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
  4: 'Ad',
}

const last = (arr) => {
  return arr[arr.length - 1];
}

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
    console.log(e);
  }
}


const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
    console.log(e);
  }
}

const loadMatches = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('matches')
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch(e) {
    // error reading value
    console.log(e);
  }
}

const saveMatches = async (matches) => {
  try {
    const jsonValue = JSON.stringify(matches)
    await AsyncStorage.setItem('matches', jsonValue)
  } catch (e) {
    // saving error
    console.log(e);
  }
}

export default { convert, last, storeData, getData, saveMatches, loadMatches }
