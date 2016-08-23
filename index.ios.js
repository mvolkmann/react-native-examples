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
    count: PropTypes.number.isRequired,
    navigator: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  }

  constructor() {
    super();
  }

  getDay() {
    return [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'][this.props.count];
  }

  render() {
    return (
      <View style={styles.scene}>
        <Text>{this.getDay()}</Text>
      </View>
    );
  }
}

class NavButton extends Component { // eslint-disable-line no-unused-vars
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
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
    const route = {title: 'Initial Route', count: 0};

    const navBar =
      <Navigator.NavigationBar
        routeMapper={{
          LeftButton(route, navigator, index, navState) {
            return index === 0 ? null :
              <NavButton text="Back"
                onPress={() => navigator.pop()}/>;
          },
          RightButton(route, navigator, index, navState) {
            return <NavButton text="Forward"
              onPress={() => {
                const route = {title: 'Route ' + (index + 1), count: index + 1};
                navigator.push(route);
              }}/>;
          },
          Title(route /*, navigator, index, navState*/) {
            return <Text style={styles.title}>{route.title}</Text>;
          },
        }}
        style={{backgroundColor: 'gray'}}
      />;

    return <Navigator
      style={styles.container}
      navigationBar={navBar}
      initialRoute={route}
      renderScene={this.renderScene}
    />;
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 15
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  container: {
    flex: 1
  },
  scene: {
    //alignItems: 'center',
    backgroundColor: '#EAEAEA',
    flex: 1,
    justifyContent: 'center',
    marginTop: 50
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent('NavigatorDemo', () => NavigatorDemo);
