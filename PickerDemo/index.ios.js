import React, {Component} from 'react';
import {
  AppRegistry,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';

class PickerDemo extends Component {
  constructor() {
    super();
    this.state = {
      color: 'white',
      colors: [
        'white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black'
      ]
    };
  }

  render() {
    return <View style={styles.container}>
      <Text style={styles.label}>
        Select your favorite color.
      </Text>
      <Picker
        onValueChange={color => this.setState({color})}
        selectedValue={this.state.color}
        style={{width: 200}}>
      {
        this.state.colors.map(color =>
          <Picker.Item key={color} label={color} value={color}/>)
      }
      </Picker>
      <Text style={styles.label}>
        You selected {this.state.color}.
      </Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('PickerDemo', () => PickerDemo);
