const CatClicker = (() => {
  const priv = new WeakMap();

  const _ = instance => priv.get(instance);

  const increaseClickNumber = (instance, index) => {
    if (index >= 0 && index < _(instance).cats.length) {
      _(instance).cats[index].clickNumber++;
    }
  };

  const dispalyClikNumber = (instance, index, box) => {
    const clickNumberContainer = box;
    const newClickNumber = _(instance).cats[index].clickNumber;
    clickNumberContainer.textContent = `Clicks: ${newClickNumber}`;
  };

  const clickCountHandler = (instance, index, box) => {
    increaseClickNumber(instance, index);
    dispalyClikNumber(instance, index, box);
  };

  const createCat = (cat, index) => {
    const newCatContainer = document.createElement('li');
    const newCat = document.createElement('figure');
    newCat.classList.add('cat');
    const newCatImg = document.createElement('img');
    newCatImg.classList.add('cat-img');
    newCatImg.setAttribute('src', cat.url);
    newCatImg.setAttribute('data-index', index);
    const newCatInfo = document.createElement('figcaption');
    newCatInfo.classList.add('cat-info');
    const newCatName = document.createElement('span');
    newCatName.classList.add('cat-name');
    newCatName.textContent = cat.name;
    const newCatClicks = document.createElement('span');
    newCatClicks.classList.add('cat-clicks');
    newCatClicks.textContent = `Clicks: ${cat.clickNumber}`;

    newCatInfo.appendChild(newCatName);
    newCatInfo.appendChild(newCatClicks);
    newCat.appendChild(newCatImg);
    newCat.appendChild(newCatInfo);
    newCatContainer.appendChild(newCat);

    return newCatContainer;
  };

  const prepareCatsDOM = (instance) => {
    const { cats, catsContainer } = _(instance);
    const catsDOMElements = document.createDocumentFragment();
    cats.forEach((cat, index) => {
      const newCat = createCat(cat, index);
      catsDOMElements.appendChild(newCat);
    });
    catsContainer.appendChild(catsDOMElements);
  };

  const prepareCatsProp = (cats) => {
    const newCats = cats.map(cat => ({ ...cat, clickNumber: 0 }));
    return newCats;
  };

  class CatClickerClass {
    constructor(cats, catsContainer) {
      const privateProps = {
        cats: prepareCatsProp(cats),
        catsContainer,
      };
      priv.set(this, privateProps);
      prepareCatsDOM(this);

      this.catsContainer.addEventListener('click', (event) => {
        const { target } = event;
        if (target.nodeName === 'IMG') {
          const catIndex = target.dataset.index;
          const clickBox = target.parentElement.querySelector('.cat-clicks');
          clickCountHandler(this, catIndex, clickBox);
        }
      });
    }

    get cats() {
      return _(this).cats;
    }
    get catsContainer() {
      return _(this).catsContainer;
    }
  }

  return CatClickerClass;
})();

const cats = [
  {
    url: 'img/images/bingo.jpg',
    name: 'Bingo',
  },
  {
    url: 'img/images/Archibald.jpg',
    name: 'Archibald',
  },
];

const catClicker = new CatClicker( // eslint-disable-line no-unused-vars
  cats,
  document.querySelector('#cat-clicker'),
);
