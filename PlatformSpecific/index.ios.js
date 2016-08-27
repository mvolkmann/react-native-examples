import React from 'react';
import Foo from './foo';
import {AppRegistry, View} from 'react-native';

const PlatformSpecific = () =>
  <View style={{padding: 30}}><Foo/></View>;

AppRegistry.registerComponent('PlatformSpecific', () => PlatformSpecific);
