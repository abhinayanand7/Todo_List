function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.innerHTML = `${text} <button class="delete" onclick="deleteTodo(this)">X</button>`;
  document.getElementById('todo-list').appendChild(li);

  input.value = '';
}

function deleteTodo(button) {
  const li = button.parentElement;
  li.remove();
}
