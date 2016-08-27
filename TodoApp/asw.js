import {AsyncStorage} from 'react-native';

function makeKey(key) {
  return typeof key === 'string' ? key : JSON.stringify(key);
}

// AsyncStorage wrapper that automates
// calling JSON.stringify on non-string values.
export default {
  clear() {
    AsyncStorage.clear();
  },
  get(key) {
    return AsyncStorage.getItem(makeKey(key)).
      then(value => JSON.parse(value));
  },
  getAllKeys() {
    return AsyncStorage.getAllKeys();
  },
  merge(key, value) {
    return AsyncStorage.mergeItem(makeKey(key), JSON.stringify(value));
  },
  remove(key) {
    return AsyncStorage.removeItem(makeKey(key));
  },
  set(key, value) {
    return AsyncStorage.setItem(makeKey(key), JSON.stringify(value));
  }
};
