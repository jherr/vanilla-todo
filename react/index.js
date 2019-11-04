import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([
    { done: false, text: 'Hey', id: 1 },
    { done: false, text: 'There', id: 2, },
    { done: false, text: 'Jack', id: 3, },
  ]);
  const [id, setId] = useState(4);

  const onDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const onAdd = () => {
    setTodos([
      ...todos,
      {
        text: newTodo,
        id,
      }
    ]);
    setId(id + 1);
    setNewTodo('');
  };
  const updateNewTodo = (e) => setNewTodo(e.target.value);
  const toggleDone = (id) => {
    setTodos(todos.map(todo => ({
      ...todo,
      done: id === todo.id ? !todo.done : todo.done,
    })));
  };
  const updateTodo = (id, e) => {
    setTodos(todos.map(todo => ({
      ...todo,
      text: id === todo.id ? e.target.value : todo.text,
    })));
  };

  return (
    <div className="todos">
      {todos.map(todo => (
        <div key={todo.id} className="todo">
          <input type="checkbox" value={todo.done} onChange={(e) => toggleDone(todo.id)} />
          <input type="text" value={todo.text} onChange={(e) => updateTodo(todo.id, e)} />
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      ))}
      <div className="todo">
          <input type="text" value={newTodo} onChange={updateNewTodo} />
          <button onClick={() => onAdd()}>Add</button>
      </div>
      <button onClick={() =>
        console.log(todos.map(t => `${t.done ? 'x' : ' '} ${t.text}`).join("\n"))
      }>Save</button>
    </div>
  );
};

ReactDOM.render(<TodoList />, document.getElementById('todos'));
