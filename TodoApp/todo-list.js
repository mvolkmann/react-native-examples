// @flow

import React from 'react';
import ASW from './asw.js';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import TodoButton from './todo-button';

import Todo from './todo';

const TODO_KEY_PREFIX = 'todo-';

function getTodoKey(id) {
  return TODO_KEY_PREFIX + id;
}

class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {todoText: '', todos: {}};

    // Pre-bind event handling methods.
    this.onArchiveCompleted = this.onArchiveCompleted.bind(this);
    this.onAddTodo = this.onAddTodo.bind(this);
    this.onTextChange = this.onTextChange.bind(this);

    //ASW.clear();
    this.loadTodos();
  }

  getUncompletedCount() {
    const {todos} = this.state;
    return Object.keys(todos).reduce(
      (count, id) => todos[id].done ? count : count + 1,
      0);
  }

  async loadTodos() { // from AsyncStorage
    const promises = [];
    this.lastId = 0;

    try {
      const keys = await ASW.getAllKeys();
      console.log('todo-list.js loadTodos: keys =', keys);
      for (const key of keys) {
        if (key.startsWith(TODO_KEY_PREFIX)) {
          promises.push(ASW.get(key));
        }
      }

      const todoArray = await Promise.all(promises);
      const todos = {};
      for (const todo of todoArray) {
        const {id} = todo;
        todos[id] = todo;
        this.lastId = Math.max(this.lastId, id);
      }
      this.setState({todos});
    } catch (e) {
      console.error('loadTodos promise error:', e);
    }
  }

  onAddTodo() {
    const {todoText} = this.state;
    const todo = {id: ++this.lastId, text: todoText, done: false};
    this.setState(
      {
        todoText: '',
        todos: {...this.state.todos, [todo.id]: todo}
      },
      () => ASW.set(getTodoKey(todo.id), todo));
    /* Why doesn't this work instead of using setTime>
    }, () => {
      this.refs.todoInput.focus();
    });
    */
    setTimeout(() => this.refs.todoInput.focus());
  }

  onArchiveCompleted() {
    console.log('todo-list.js onArchiveCompleted: entered');
    const {todos} = this.state;
    const archiveIds = [];
    const newTodos = {};

    Object.keys(todos).forEach(id => {
      const todo = todos[id];
      if (todo.done) {
        archiveIds.push(id);
      } else {
        newTodos[id] = todos[id];
      }
    });
    console.log('todo-list.js x: archiveIds =', archiveIds);

    this.setState(
      {todos: newTodos},
      () => archiveIds.forEach(id => ASW.remove(getTodoKey(id))));
  }

  onDeleteTodo(deleteId) {
    const {todos} = this.state;
    const newTodos = {};
    Object.keys(todos).forEach(id => {
      if (id !== deleteId) newTodos[id] = todos[id];
    });

    this.setState({todos: newTodos},
      () => ASW.remove(getTodoKey(deleteId)));
  }

  onTextChange(todoText) { // not passed an event object!
    this.setState({todoText});
  }

  onToggleDone(todo) {
    const newTodo = {...todo, done: !todo.done};
    const todos = {...this.state.todos, [newTodo.id]: newTodo};
    this.setState(
      {todos},
      () => ASW.set(getTodoKey(todo.id), newTodo));
  }

  render() {
    const {todos} = this.state;
    const todoElements = Object.keys(todos).map(id => {
      const todo = todos[id];
      return <Todo todo={todo}
        key={id}
        onDeleteTodo={this.onDeleteTodo.bind(this, id)}
        onToggleDone={this.onToggleDone.bind(this, todo)}/>;
    });

    return (
      <View style={styles.container}>
        {/*<Image source={require('image!backdrop')}*/}
        <Image source={require('./backdrop.jpg')}
          style={styles.backdrop}>
          <View style={styles.header}>
            <Text style={styles.title}>Todo List</Text>

            <View style={styles.statsRow}>
              <Text style={styles.stats}>
                {this.getUncompletedCount()} of{' '}
                {Object.keys(todos).length} remaining
              </Text>
              <TodoButton
                onPress={this.onArchiveCompleted}>
                Archive Completed
              </TodoButton>
            </View>

            <View style={styles.addRow}>
              <TextInput ref="todoInput"
                style={styles.todoInput}
                autoFocus
                onChangeText={this.onTextChange}
                onSubmitEditing={this.onAddTodo}
                value={this.state.todoText}
              />
              <TodoButton
                disabled={!this.state.todoText}
                onPress={this.onAddTodo}>
                +
              </TodoButton>
            </View>
          </View>

          <ScrollView style={styles.list}>
            {todoElements}
          </ScrollView>
        </Image>
      </View>
    );
  }
}

const space = 10;

const styles = StyleSheet.create({
  addRow: {
    //flex: 1,
    flexDirection: 'row',
    marginBottom: space * 2
  },
  backdrop: {
    alignSelf: 'stretch',
    flex: 1,
    resizeMode: 'cover',
    height: null, // why?
    padding: space,
    width: null // why?
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  header: {
  },
  list: {
    height: 400 //TODO: Can you avoid specifying this?
  },
  stats: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: 'white',
    marginRight: space
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: space * 2
  },
  todoInput: {
    backgroundColor: 'white',
    flex: 1,
    fontSize: 20,
    borderWidth: 2,
    height: 40,
    marginRight: space,
    paddingLeft: space,
    paddingRight: space
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: space,
    textAlign: 'center',
    marginBottom: space * 2
  }
});

export default TodoList;
