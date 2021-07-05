function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export default function getRandomProducts() {
    let arr = [];
    arr.push(randomInteger(0, 3));
    arr.push(randomInteger(4, 7));
    arr.push(randomInteger(8, 13));
    arr.push(randomInteger(14, 19));
    return arr;
}