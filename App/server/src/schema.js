import { gql } from "apollo-server-express";
import { find, remove } from "lodash";

const people = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

const typeDefs = gql`
  type AllPerson {
    id: String!
    firstName: String!
    lastName: String!
  }

  type AllCar {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String!
  }

  type Query {
    person(id: String!): AllPerson
    people: [AllPerson]
    car(id: String!): AllCar
    cars: [AllCar]
  }

  type Mutation {
    addPeople(
      id: String,
      firstName: String!,
      lastName: String!
    ): AllPerson
    updatePeople(
      id: String!,
      firstName: String,
      lastName: String
    ): AllPerson
    removePeople(id: String!): AllPerson

    addAllCar(
      id: String
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: String!
    ): AllCar
    updateAllCar(
      id: String!
      year: Int
      make: String
      model: String
      price: Float
      personId: String
    ): AllCar
    removeAllCar(id: String!): AllCar
  }
`;

const resolvers = {
  Query: {
    people: () => people,
    person(parent, args, context, info) {
      return find(people, { id: args.id });
    },
    cars: () => cars,
    car(parent, args, context, info) {
      return find(cars, { id: args.id });
    },
  },

  Mutation: {
    addPeople(root, args) {
      const newPeople = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      people.push(newPeople);
      return newPeople;
    },

    updatePeople: (root, args) => {
      const updatePeople = find(people, { id: args.id });
      if (!updatePeople) {
        throw new Error(`Not able to find the person with id ${args.id}`);
      }
      updatePeople.firstName = args.firstName;
      updatePeople.lastName = args.lastName;
      return updatePeople;
    },

    removePeople: (root, args) => {
      const deletedPerson = find(people, { id: args.id });
      if (!deletedPerson) {
        throw new Error(`Not able to find the person with id ${args.id}`);
      }
      remove(people, { id: args.id });
      return deletedPerson;
    },

    addAllCar(root, args) {
      const addAllCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars.push(addAllCar);
      return addAllCar;
    },

    updateAllCar: (root, args) => {
      const updateAllCar = find(cars, { id: args.id });
      if (!updateAllCar) {
        throw new Error(`Not able to find the car with id ${args.id}`);
      }
      updateAllCar.year = args.year;
      updateAllCar.make = args.make;
      updateAllCar.model = args.model;
      updateAllCar.price = args.price;
      updateAllCar.personId = args.personId;
      return updateAllCar;
    },

    removeAllCar: (root, args) => {
      const removeAllCar = find(cars, { id: args.id });
      if (!removeAllCar) {
        throw new Error(`Not able to find the car with id ${args.id}`);
      }
      remove(cars, { id: args.id });
      return removeAllCar;
    },
  },
};

export { typeDefs, resolvers }