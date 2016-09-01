import React from 'react';

import {StyleSheet} from 'react-native';
import Button from 'react-native-button';

// A props object is passed to this function and destructured.
const TodoButton = ({children, onPress}) =>
  <Button
    style={styles.button}
    onPress={onPress}>
    {children}
  </Button>;

const {func, node} = React.PropTypes;
TodoButton.propTypes = {
  children: node.isRequired,
  onPress: func.isRequired
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightgray',
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden', // hides background color outside rounded corners
    paddingHorizontal: 9,
    paddingVertical: 5
  }
});

export default TodoButton;
