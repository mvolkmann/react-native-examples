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
import Icon from 'react-native-vector-icons/FontAwesome';
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
    const {leftIcon, rightIcon} = this.props;
    const iconColor = 'blue';
    const iconSize = 30;
    const iconStyle = {lineHeight: 24};

    const leftIconEl = leftIcon ?
      <Icon style={iconStyle} name={leftIcon}
        size={iconSize} color={iconColor}/> :
      null;
    const rightIconEl = rightIcon ?
      <Icon style={iconStyle} name={rightIcon}
        size={iconSize} color={iconColor}/> :
      null;

    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <View style={styles.navBtnView}>
          {leftIconEl}
          <Text style={styles.buttonText}> {this.props.text} </Text>
          {rightIconEl}
        </View>
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
          LeftButton(route, navigator, index/*, navState*/) {
            if (index === 0) return null;

            const btnText = navigator.state.routeStack[index - 1].title;
            return <NavButton style="styles.backBtn"
              leftIcon="angle-left" text={btnText}
              onPress={() => navigator.pop()}/>;
          },
          RightButton(route, navigator, index/*, navState*/) {
            return <NavButton rightIcon="angle-right" text="Forward"
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
  backBtn: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: 'white',
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 15
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  container: {
    flex: 1
  },
  navBtnView: {
    flexDirection: 'row'
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
