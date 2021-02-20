let people = [];

const addPerson = person => {
  const nextId = people.length === 0 ? 1 : people[people.length - 1].id + 1;
  people = [...people, { ...person, id: nextId }];
  return "success";
};

const getPeople = () => {
  return people;
};

module.exports = {
  addPerson,
  getPeople
};
