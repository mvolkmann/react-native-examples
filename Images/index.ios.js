import React from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  View
} from 'react-native';

const Images = () =>
  <View style={styles.container}>
    <Image
      source={require('./giraffes.jpg')}
      style={styles.myImage}/>
  </View>;

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 1,
    flex: 1 // to fill screen
  },
  myImage: {
    flex: 1, // why?
    resizeMode: 'contain', // can also use Image.resizeMode.contain
    height: null, // why?
    width: null // why?
  }
});

AppRegistry.registerComponent('Images', () => Images);
