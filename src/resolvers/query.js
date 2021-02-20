const { getProducts, addProduct } = require("../data/products")
const { getPeople, addPerson } = require("../data/person")

const throwDice = (numDice, numSides) => {
  const dices = [];
  for (var i = 0; i < numDice; i++) {
    const dice = Math.floor(numSides * Math.random());
    dices.push(dice);
  }
  return dices;
};

module.exports = {
  hello: () => {
    return "Hello world!";
  },
  rollDice: args => {
    const { numDice, numSides } = args;
    return throwDice(numDice, numSides);
  },
  products: () => {
    return getProducts();
  },
  product: ({ id }) => {
    const products = getProducts();
    return products.find(p => p.id === id);
  },
  createProduct: args => {
    const { name, description } = args;
    const newProduct = addProduct(name, description);
    return `Created id: ${newProduct.id} with name: ${newProduct.name} - ${
      newProduct.description
    }`;
  },
  people: () => {
    return getPeople();
  },
  createPerson: args => {
    const { person } = args;
    return addPerson(person);
  }
}
