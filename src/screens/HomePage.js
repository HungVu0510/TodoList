/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

const COLORS = {primary: '#1f145c', white: '#fff'};
const HomePage = ({navigation}) => {
  const [textInput, setTextInput] = useState('');
  const [todos, setTodos] = useState([
    {id: 1, task: 'Do Homework', completed: false},
    {id: 2, task: 'Do Housework', completed: true},
    {id: 3, task: 'Do Exercise', completed: false},
  ]);

  const ListItem = ({todo}) => {
    return (
      <View style={style.listItem}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            navigation.navigate('Detail', {
              todoTask: todo.task,
              isCompleted: todo.completed,
            })
          }>
          <Text
            style={{
              fontWeight: 'bold',
              padding: 5,
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: todo.completed ? 'line-through' : 'none',
              //   backgroundColor: todo.completed ? 'green' : 'COLOR.white',
            }}>
            {todo.task}
          </Text>
        </TouchableOpacity>
        {!todo.completed && (
          <TouchableOpacity
            style={style.actionIcon}
            onPress={() => markTodoComplete(todo.id)}>
            <Image source={require('../Icon/done.png')} style={style.done} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={style.actionIcon}
          onPress={() => deleteTodo(todo.id)}>
          <Image source={require('../Icon/delete.png')} style={style.delete} />
        </TouchableOpacity>
      </View>
    );
  };
  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('You must input task');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };
  const markTodoComplete = todoId => {
    const newTodos = todos.map(item => {
      if (item.id == todoId) {
        return {...item, completed: true};
      }
      return item;
    });
    setTodos(newTodos);
  };

  const deleteTodo = todoId => {
    const newTodos = todos.filter(item => item.id != todoId);
    setTodos(newTodos);
  };

  const clearTodos = () => {
    Alert.alert('Confirm', 'Clear todo?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {text: 'No'},
    ]);
  };
  return (
    <View style={{position: 'relative', flex: 1}}>
      <View style={style.header}>
        <Text style={style.title}>TODO APP</Text>
        <Text>Total Task: {todos.length}</Text>
        <TouchableOpacity onPress={clearTodos}>
          <Image source={require('../Icon/delete.png')} style={style.delete} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={({item}) => <ListItem todo={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
      />
      <View style={style.footer}>
        <View style={style.inputContainer}>
          <TextInput
            placeholder="Add New Todo"
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={style.iconContainer}>
            <Image source={require('../Icon/addIcon.png')} style={style.add} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.primary,
    textAlign: 'center',
  },
  delete: {
    width: 25,
    height: 25,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    color: COLORS.white,
  },
  inputContainer: {
    elevation: 40,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    width: '80%',
  },
  iconContainer: {
    // height: 50,
    // width: 50,
    // backgroundColor: COLORS.primary,
    // borderRadius: 25,
    // elevation: 40,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  add: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },

  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },

  done: {
    width: 20,
    height: 20,
  },
});

export default HomePage;
