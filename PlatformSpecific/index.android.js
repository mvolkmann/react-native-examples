import React from 'react';
import Foo from './foo';
import {AppRegistry} from 'react-native';

const PlatformSpecific = () => <Foo/>;

AppRegistry.registerComponent('PlatformSpecific', () => PlatformSpecific);
