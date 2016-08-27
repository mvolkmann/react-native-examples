/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class FlexboxDemo extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.child}>T1</Text>
        <Text style={[styles.child, {alignSelf: 'flex-end'}]}>T2</Text>
        <Text style={styles.child}>T3</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    //flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  child: {
    borderColor: 'red',
    borderWidth: 1
  },
});

AppRegistry.registerComponent('FlexboxDemo', () => FlexboxDemo);
