import React from 'react';

import {
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import TodoButton from './todo-button';

// A props object is passed to this function and destructured.
const Todo = ({onDeleteTodo, onToggleDone, todo}) =>
  <View style={styles.container}>
    <Switch style={styles.switch}
      value={todo.done}
      onValueChange={onToggleDone}/>
    <Text style={[styles.todoText, styles['done-' + todo.done]]}>
      {todo.text}
    </Text>
    <TodoButton style={styles.button} onPress={onDeleteTodo}>
      -
    </TodoButton>
  </View>;

const {bool, func, shape, string} = React.PropTypes;
Todo.propTypes = {
  onDeleteTodo: func.isRequired,
  onToggleDone: func.isRequired,
  todo: shape({
    done: bool.isRequired,
    text: string.isRequired
  }).isRequired
};

const space = 10;

const styles = StyleSheet.create({
  button: {
    marginLeft: space,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space
  },
  'done-true': {
    color: 'pink',
    textDecorationLine: 'line-through'
  },
  switch: {
    marginRight: space
  },
  todoText: {
    backgroundColor: 'transparent',
    color: 'white',
    flex: 1, // grow to fill width
    textAlign: 'left'
  }
});

export default Todo;
