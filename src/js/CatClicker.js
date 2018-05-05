const CatClicker = (() => {
  const priv = new WeakMap();

  const _ = instance => priv.get(instance);

  const increaseClickNumber = (instance) => {
    _(instance).clickCounter++;
  };

  const displayClickNumber = (instance) => {
    _(instance).clickResultContainer.textContent = _(instance).clickCounter;
  };

  const clickCountHandler = (instance) => {
    increaseClickNumber(instance);
    displayClickNumber(instance);
  };

  class CatClickerClass {
    constructor(catImg, clickResultContainer) {
      const privateProps = {
        clickCounter: 0,
        catImg,
        clickResultContainer,
      };
      priv.set(this, privateProps);

      displayClickNumber(this);

      catImg.addEventListener('click', () => {
        clickCountHandler(this);
      });
    }

    get clickCounter() {
      return _(this).clickCounter;
    }
    get catImg() {
      return _(this).catImg;
    }
    get clickResultContainer() {
      return _(this).clickResultContainer;
    }
  }

  return CatClickerClass;
})();

const catClicker = new CatClicker(
  document.querySelector('#cat-image'),
  document.querySelector('#clicks-number'),
);
