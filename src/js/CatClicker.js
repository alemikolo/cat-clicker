const CatClickerModel = (() => {
  const priv = new WeakMap();

  const _ = instance => priv.get(instance);

  const increaseClickNumber = (instance, index) => {
    _(instance).cats[index].clickNumber++;
  };

  class Model {
    constructor() {
      const privateProps = {
        cats: [
          { name: 'archibald', clickNumber: 0 },
          { name: 'banjo', clickNumber: 0 },
          { name: 'benjamin', clickNumber: 0 },
          { name: 'bingo', clickNumber: 0 },
          { name: 'chewie', clickNumber: 0 },
          { name: 'duke', clickNumber: 0 },
          { name: 'fabio', clickNumber: 0 },
          { name: 'flash', clickNumber: 0 },
          { name: 'homer', clickNumber: 0 },
          { name: 'simba', clickNumber: 0 },
          { name: 'swift', clickNumber: 0 },
          { name: 'tiberius', clickNumber: 0 },
        ],
        currentCat: null,
      };

      priv.set(this, privateProps);
    }

    get cats() {
      return _(this).cats;
    }

    get currentCat() {
      return _(this).currentCat;
    }

    getCurrentCat() {
      const index = this.currentCat;
      return { ..._(this).cats[index], index };
    }

    setCurrentCat(index) {
      _(this).currentCat = index;
    }

    updateCat(index) {
      increaseClickNumber(this, index);
    }
  }
  return Model;
})();

const CatClickerListView = (() => {
  const priv = new WeakMap();

  const _ = instance => priv.get(instance);

  const createCatButton = (cat, index) => {
    const newItem = document.createElement('li');
    const newButton = document.createElement('button');
    newButton.classList.add('cat-button');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('data-index', index);
    newButton.textContent = cat.name;

    newItem.appendChild(newButton);

    return newItem;
  };

  const createCatList = (cats) => {
    const catsDOMElements = document.createDocumentFragment();
    cats.forEach((cat, index) => {
      const newCat = createCatButton(cat, index);
      catsDOMElements.appendChild(newCat);
    });

    return catsDOMElements;
  };

  class ListView {
    constructor() {
      const privateProps = { catList: document.querySelector('.cat-list') };
      priv.set(this, privateProps);

      this.catList.addEventListener('click', (event) => {
        if (event.target.nodeName === 'BUTTON') {
          controller.currentCatHandler(event.target.dataset.index);
        }
      });
    }

    get catList() {
      return _(this).catList;
    }

    render() {
      const cats = controller.getCats();
      this.catList.appendChild(createCatList(cats));
    }
  }

  return ListView;
})();

const CatClickerCatView = (() => {
  const priv = new WeakMap();

  const _ = instance => priv.get(instance);

  const prepareCatImgBox = (catsContainer) => {
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

  class CatView {
    constructor() {
      const catsContainer = document.querySelector('.cat-clicker');
      prepareCatImgBox(catsContainer);
      const privateProps = {
        catTags: {
          img: document.querySelector('.cat-img'),
          name: document.querySelector('.cat-name'),
          click: document.querySelector('.cat-clicks'),
        },
      };
      priv.set(this, privateProps);
      catsContainer.addEventListener('click', (event) => {
        if (event.target.nodeName === 'IMG') {
          controller.clickCountHandler(event.target.dataset.index);
        }
      });
    }

    render() {
      const cat = controller.getCurrentCat();
      if (cat.index !== this.catTags.img.getAttribute('data-index')) {
        this.catTags.img.setAttribute('src', `img//images//${cat.name}.jpg`);
        this.catTags.img.setAttribute('data-index', cat.index);
        this.catTags.name.textContent = cat.name;
      }
      this.catTags.click.textContent = `Clicks: ${cat.clickNumber}`;
    }

    get catTags() {
      return _(this).catTags;
    }
  }
  return CatView;
})();

const CatClickerController = (() => {
  const priv = new WeakMap();

  const _ = instance => priv.get(instance);

  class Controller {
    constructor() {
      const privateProps = {
        model: new CatClickerModel(),
        listView: new CatClickerListView(),
        catView: new CatClickerCatView(),
      };

      priv.set(this, privateProps);

      this.model.setCurrentCat(0);
    }

    get model() {
      return _(this).model;
    }

    get listView() {
      return _(this).listView;
    }

    get catView() {
      return _(this).catView;
    }

    getCats() {
      return this.model.cats;
    }

    getCurrentCat() {
      return this.model.getCurrentCat();
    }

    currentCatHandler(index) {
      this.model.setCurrentCat(index);
      this.catView.render();
    }

    clickCountHandler(index) {
      this.model.updateCat(index);
      this.catView.render();
    }

    init() {
      this.listView.render();
      this.catView.render();
    }
  }
  return Controller;
})();

const controller = new CatClickerController();
controller.init();
