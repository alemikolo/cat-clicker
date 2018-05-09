const CatClicker = (() => {
  const priv = new WeakMap();

  const _ = instance => priv.get(instance);

  const createCatLink = (cat, index) => {
    const newItem = document.createElement('li');
    const newLink = document.createElement('button');
    newLink.classList.add('cat-button');
    newLink.setAttribute('type', 'button');
    newLink.setAttribute('data-index', index);
    newLink.textContent = cat.name;

    newItem.appendChild(newLink);

    return newItem;
  };

  const prepareCatsList = (instance) => {
    const { cats, catsContainer } = _(instance);
    const list = catsContainer.querySelector('.cat-list');
    const catsDOMElements = document.createDocumentFragment();
    cats.forEach((cat, index) => {
      const newCat = createCatLink(cat, index);
      catsDOMElements.appendChild(newCat);
    });
    list.appendChild(catsDOMElements);
  };

  const prepareCatImgBox = (instance) => {
    const { catsContainer } = _(instance);

    const catImgBox = document.createElement('div');
    catImgBox.classList.add('cat-box');
    const newCat = document.createElement('figure');
    newCat.classList.add('cat');
    const newCatImg = document.createElement('img');
    newCatImg.classList.add('cat-img');
    newCatImg.setAttribute('src', '');
    newCatImg.setAttribute('data-index', '');
    const newCatInfo = document.createElement('figcaption');
    newCatInfo.classList.add('cat-info');
    const newCatName = document.createElement('span');
    newCatName.classList.add('cat-name');
    newCatName.textContent = 'Cat name';
    const newCatClicks = document.createElement('span');
    newCatClicks.classList.add('cat-clicks');
    newCatClicks.textContent = 'Clicks: 0';

    newCatInfo.appendChild(newCatName);
    newCatInfo.appendChild(newCatClicks);
    newCat.appendChild(newCatImg);
    newCat.appendChild(newCatInfo);
    catImgBox.appendChild(newCat);

    catsContainer.appendChild(catImgBox);
  };

  const prepareCatsProp = (cats) => {
    const newCats = cats.map(cat => ({
      name: cat,
      url: `img//images//${cat}.jpg`,
      clickNumber: 0,
    }));
    return newCats;
  };

  const setCatTagProp = (instance) => {
    const { catsContainer } = _(instance);
    _(instance).catImgTag = catsContainer.querySelector('.cat-img');
    _(instance).catNameTag = catsContainer.querySelector('.cat-name');
    _(instance).catClickTag = catsContainer.querySelector('.cat-clicks');
  };

  const updateCatInfo = (instance, name, clickNumber) => {
    _(instance).catNameTag.textContent = name;
    _(instance).catClickTag.textContent = `Clicks: ${clickNumber}`;
  };

  const increaseClickNumber = (instance, index) => {
    if (index >= 0 && index < _(instance).cats.length) {
      _(instance).cats[index].clickNumber++;
    }
  };

  const clickCountHandler = (instance, index) => {
    const cat = _(instance).cats[index];
    increaseClickNumber(instance, index);
    updateCatInfo(instance, cat.name, cat.clickNumber);
  };

  const loadCat = (instance, index) => {
    const { catImgTag } = _(instance);
    const cat = _(instance).cats[index];
    catImgTag.setAttribute('src', `img//images//${cat.name}.jpg`);
    catImgTag.setAttribute('data-index', index);
    updateCatInfo(instance, cat.name, cat.clickNumber);
  };

  const setActiveButton = (element) => {
    const previous = document.querySelector('.active-cat');
    if (previous) {
      previous.classList.remove('active-cat');
    }
    element.classList.add('active-cat');
  };

  class CatClickerClass {
    constructor(cats, catsContainer) {
      const privateProps = {
        cats: prepareCatsProp(cats),
        catsContainer,
        catImgTag: null,
        catNameTag: null,
        catClickTag: null,
      };

      priv.set(this, privateProps);

      prepareCatsList(this);
      prepareCatImgBox(this);
      setCatTagProp(this);
      loadCat(this, 0);
      setActiveButton(document.querySelector('button[data-index="0"]'));

      this.catsContainer.addEventListener('click', (event) => {
        const { target } = event;
        if (target.nodeName === 'IMG') {
          const catIndex = target.dataset.index;
          clickCountHandler(this, catIndex);
        } else if (target.nodeName === 'BUTTON') {
          const catIndex = target.dataset.index;
          loadCat(this, catIndex);
          setActiveButton(target);
        }
      });
    }

    get cats() {
      return _(this).cats;
    }
    get catsContainer() {
      return _(this).catsContainer;
    }
    get catImgTag() {
      return _(this).catImgTag;
    }
    get catNameTag() {
      return _(this).catNameTag;
    }
    get catClickTag() {
      return _(this).catClickTag;
    }
  }

  return CatClickerClass;
})();

const cats = [
  'archibald',
  'banjo',
  'benjamin',
  'bingo',
  'chewie',
  'duke',
  'fabio',
  'flash',
  'homer',
  'simba',
  'swift',
  'tiberius',
];

const catClicker = new CatClicker( // eslint-disable-line no-unused-vars
  cats,
  document.querySelector('#cat-clicker'),
);
