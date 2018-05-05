function addfixtureDOM() {
  const body = document.querySelector('body');
  const catClickerDOMElements = document.createDocumentFragment();

  const catClicker = document.createElement('div');
  catClicker.setAttribute('id', 'cat-clicker');
  const clickNumber = document.createElement('p');
  clickNumber.setAttribute('id', 'clicks-number');

  const catImageickNumber = document.createElement('img');
  catImageickNumber.setAttribute('id', 'cat-image');
  catImageickNumber.setAttribute('src', '../src/img/images/cat.jpg');

  catClicker.appendChild(clickNumber);
  catClicker.appendChild(catImageickNumber);
  catClickerDOMElements.appendChild(catClicker);
  body.appendChild(catClickerDOMElements);
}

function delfixtureDOM() {
  const catClicker = document.querySelector('#cat-clicker');
  catClicker.remove();
}

beforeEach(addfixtureDOM);
afterEach(delfixtureDOM);
