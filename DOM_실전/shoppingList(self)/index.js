const plusBtn = document.querySelector('.fa-solid');
const shoppingList = document.querySelector('.shoppingList');
plusBtn.addEventListener('click', () => {
  const goodsname = document.querySelector('.goodsName');
  if (goodsname.value === '') {
    alert('입력하세요');
    return;
  }
  const newgoods = document.createElement('div');
  newgoods.innerHTML = `
    ${goodsname.value}<i class="fa-solid fa-trash-can"></i>
  `;
  shoppingList.insertBefore(newgoods, goodsname);
  goodsname.value = '';

  const deleteBtns = document.querySelectorAll('.fa-trash-can');
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', () => {
      shoppingList.removeChild(deleteBtn.parentNode);
    });
  });
});
