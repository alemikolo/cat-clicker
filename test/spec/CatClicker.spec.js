/* eslint-env node, jasmine */
/* eslint-disable no-undef */
describe('CatClicker', () => {
  const catClicker = CatClicker;
  let catClickerObject;

  it('is a constructor function', () => {
    expect(typeof catClicker).toBe('function');
  });

  it('is a object and instance of CatClicker', () => {
    catClickerObject = new CatClicker(
      document.querySelector('#cat-image'),
      document.querySelector('#clicks-number'),
    );
    expect(typeof catClickerObject).toBe('object');
    expect(catClickerObject instanceof CatClicker).toBe(true);
  });
});

describe('CatClicker Props', () => {
  let catClickerObject;

  beforeEach(() => {
    catClickerObject = new CatClicker(
      document.querySelector('#cat-image'),
      document.querySelector('#clicks-number'),
    );
  });

  it('clickCounter prop is defined', () => {
    expect(catClickerObject.clickCounter).toBeDefined();
  });

  it('clickCounter prop is equal 0 on start', () => {
    expect(catClickerObject.clickCounter).toBe(0);
  });

  it('clickCounter prop is private', () => {
    const value = catClickerObject.clickCounter;
    catClickerObject.clickCounter = 2;
    expect(catClickerObject.clickCounter).toBe(value);
  });

  it('catImg prop is defined', () => {
    expect(catClickerObject.catImg).toBeDefined();
  });

  it('catImg prop is private', () => {
    const value = catClickerObject.catImg;
    catClickerObject.catImg = false;
    expect(catClickerObject.catImg).toBe(value);
  });

  it('clickResultContainer prop is defined', () => {
    expect(catClickerObject.clickResultContainer).toBeDefined();
  });

  it('clickResultContainer prop is private', () => {
    const value = catClickerObject.clickResultContainer;
    catClickerObject.clickResultContainer = false;
    expect(catClickerObject.clickResultContainer).toBe(value);
  });
});

describe('CatClicker methods', () => {
  let catClickerObject;

  beforeEach(() => {
    catClickerObject = new CatClicker(
      document.querySelector('#cat-image'),
      document.querySelector('#clicks-number'),
    );
  });

  it('init value (0) of click number is displayed', () => {
    const value = catClickerObject.clickResultContainer.textContent;
    expect(parseInt(value, 10)).toBe(0);
  });

  it('countClicker changes on click', () => {
    const value = catClickerObject.clickCounter;
    catClickerObject.catImg.click();
    expect(catClickerObject.clickCounter).toBe(value + 1);
  });

  it('new value of countClicker is displayed on click', () => {
    const prevValue = catClickerObject.clickResultContainer.textContent;
    catClickerObject.catImg.click();
    const newValue = catClickerObject.clickResultContainer.textContent;
    expect(parseInt(newValue, 10)).toBe(parseInt(prevValue, 10) + 1);
  });
});
