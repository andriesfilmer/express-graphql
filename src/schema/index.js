const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Query {
    hello: String,
    products: [Product],
    people: [Person],
    product(id: Int!): Product,
    rollDice(numDice: Int!, numSides: Int): [Int],
  },
  type Mutation {
    createProduct(name: String!, description: String!): String,
    createPerson(person: PersonInput!): String
  },
  type Product {
    name: String,
    id: Int
  },
  type Person {
    id: Int,
    name: String
  },
  input PersonInput {
    name: String
  },
`);
