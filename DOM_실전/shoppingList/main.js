const items = document.querySelector('.items');
const form = document.querySelector('.new-form');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onAdd();
});

function onAdd() {
  const text = input.value;
  if (text === '') {
    input.focus();
    alert('내용을 입력하세요');
    return;
  }

  const item = createItem(text);

  items.appendChild(item);

  item.scrollIntoView({ behavior: 'smooth', block: 'end' });

  input.value = '';
  input.focus();
}

let id = 0;
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item" data-id=${id}>
      <span class="item__name">${text}</span>
      <button class="item__delete">
        <i class="fa-solid fa-trash-can" data-id=${id}></i>
      </button>
    </div>
    <div class="item__divider"></div>`;
  id++;
  return itemRow;
}

items.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
