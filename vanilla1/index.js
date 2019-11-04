import './index.css';

let state = [
  { text: 'Hey', done: false, id: 1 },
  { text: 'There', done: false, id: 2 },
  { text: 'Jack', done: false, id: 3 }
];
let nextId = 4;

const addTodo = (todo) => {
  const todoEl = document.createElement('div');
  todoEl.className = 'todo';
  todoEl.setAttribute('data-id', todo.id);

  const checkEl = document.createElement('input');
  checkEl.type = 'checkbox';
  checkEl.checked = todo.done;
  checkEl.addEventListener('click', (evt) => {
    const id = parseInt(evt.target.parentElement.getAttribute('data-id'), 10);
    state = state.map(todo => ({
      ...todo,
      done: id === todo.id ? !todo.done : todo.done,
    }));
  });
  todoEl.appendChild(checkEl);

  const textEl = document.createElement('input');
  textEl.type = 'text';
  textEl.value = todo.text;
  textEl.addEventListener('change', (evt) => {
    const id = parseInt(evt.target.parentElement.getAttribute('data-id'), 10);
    state = state.map(todo => ({
      ...todo,
      text: id === todo.id ? evt.target.value : todo.text,
    }));
  });
  todoEl.appendChild(textEl);

  const btnEl = document.createElement('button');
  btnEl.appendChild(document.createTextNode('Delete'));
  btnEl.addEventListener('click', (evt) => {
    const id = parseInt(evt.target.parentElement.getAttribute('data-id'), 10);
    state = state.filter(t => t.id !== id);
    document.querySelector('.todos').removeChild(
      evt.target.parentElement
    );
  });
  todoEl.appendChild(btnEl);

  document.querySelector('.todos').insertBefore(
    todoEl,
    document.getElementById('newTodoContainer')
  );
};

document.getElementById('btnAddTodo')
  .addEventListener('click', () => {
    const newTodo = {
      text: document.getElementById('newTodo').value,
      done: false,
      id: nextId++,
    };
    state.push(newTodo);
    addTodo(newTodo);
    document.getElementById('newTodo').value = '';
  });

document.getElementById('btnSave')
  .addEventListener('click', () => {
    console.log(state.map(t => `${t.done ? 'x' : ' '} ${t.text}`).join("\n"))
  });

state.forEach(todo => addTodo(todo));
