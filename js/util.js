const getRandomInteger = (a, b) => {
  const from = Math.ceil(Math.min(a, b));
  const to = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createCustomLengthArray = (length = 0, callback = () => {}) =>
  Array.from({ length }, (_, i) => callback(i + 1));

export {getRandomInteger, getRandomArrayElement, createCustomLengthArray};
