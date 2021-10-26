const colorSection = document.querySelector('.colors');
const generateButton = document.querySelector('#generate-colors');
const saveButton = document.querySelector('#save-colors');
const paletteStorage = document.querySelector('.palette-storage');

const url = 'http://colormind.io/api/';
const data = {
  method: 'POST',
  body: JSON.stringify({
    model: 'default',
  }),
};

const rgbToHex = (rgbCode) => {
  const hexColor = ['#'];
  rgbCode.forEach((color) => {
    const hex = color.toString(16).toUpperCase();
    hexColor.push(hex);
  });
  return hexColor.join('');
};

const createColorDiv = (color) => {
  const hexCode = rgbToHex(color);

  const colorDiv = document.createElement('div');
  const colorSquare = document.createElement('div');
  const colorCode = document.createElement('p');

  colorDiv.className = 'color';
  colorSquare.className = 'color-square';
  colorCode.className = 'color-code';

  colorSquare.style.backgroundColor = hexCode;
  colorCode.innerText = hexCode;

  colorDiv.appendChild(colorSquare);
  colorDiv.appendChild(colorCode);
  colorSection.appendChild(colorDiv);
};

const setColors = (colors) => {
  colors.forEach((color) => {
    createColorDiv(color);
  });
};

const generateColorPalette = () => {
  const colors = fetch(url, data)
    .then((response) => response.json());
  return colors;
};

const getColors = () => {
  while (colorSection.children.length > 0) {
    const first = colorSection.children[0];
    colorSection.removeChild(first);
  }
  generateColorPalette()
    .then((data) => setColors(data.result));
};

generateButton.addEventListener('click', getColors);

window.onload = () => {
  getColors();
}
