/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* eslint-disable no-unused-vars */
import React, {Component, PropTypes} from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
/* eslint-enable no-unused-vars */

class MyScene extends Component { // eslint-disable-line no-unused-vars
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.forward = this.forward.bind(this);
    this.back = this.back.bind(this);
  }

  forward() {
    const nextCount = this.props.count + 1;
    const route = {title: 'Route ' + nextCount, count: nextCount};
    this.props.navigator.push(route);
  }

  back() {
    this.props.navigator.pop();
  }

  render() {
    console.log('index.ios.js render: this.props =', this.props);
    const backBtn = this.props.count === 1 ? null :
      <TouchableHighlight onPress={this.back}>
        <Text>Back</Text>
      </TouchableHighlight>;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.welcome}>{this.props.title}</Text>
        <Text>count = {this.props.count}</Text>
        <TouchableHighlight onPress={this.forward}>
          <Text>Forward</Text>
        </TouchableHighlight>
        {backBtn}
      </View>
    );
  }
}

class NavigatorDemo extends Component {
  renderScene(route, navigator) {
    //TODO: Add conditional logic to choose
    //TODO: the next component based on route prperties.
    return <MyScene navigator={navigator} {...route}/>;
  }

  render() {
    const route = {title: 'Initial Route', count: 1};

    return <Navigator
      style={styles.container}
      initialRoute={route}
      renderScene={this.renderScene}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80
  }
});

AppRegistry.registerComponent('NavigatorDemo', () => NavigatorDemo);
