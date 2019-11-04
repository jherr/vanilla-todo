import './index.css';

const state = [
  { text: 'Hey', done: false },
  { text: 'There', done: false },
  { text: 'Jack', done: false }
];

const addTodo = (todo) => {
  const todoEl = document.createElement('div');
  todoEl.className = 'todo';

  const checkEl = document.createElement('input');
  checkEl.type = 'checkbox';
  checkEl.checked = todo.done;
  todoEl.appendChild(checkEl);

  const textEl = document.createElement('input');
  textEl.type = 'text';
  textEl.value = todo.text;
  todoEl.appendChild(textEl);

  const btnEl = document.createElement('button');
  btnEl.appendChild(document.createTextNode('Delete'));
  btnEl.addEventListener('click', (evt) => {
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
    addTodo(
      document.getElementById('newTodo').value
    );
    document.getElementById('newTodo').value = '';
  });

document.getElementById('btnSave')
  .addEventListener('click', () => {
    console.log(
      Array.from(document.querySelectorAll('.todo'))
        .filter(el => el.id !== 'newTodoContainer')
        .map(el =>
          `${el.querySelector('input[type="checkbox"]').checked ? 'x' : ' '} ${el.querySelector('input[type="text"]').value}`
        )
        .join("\n")
    );
  });

state.forEach(todo => addTodo(todo));
