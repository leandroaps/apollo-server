const { ApolloServer, gql } = require("apollo-server");

// This will be our GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    superpowers: [Superpower]!
  }

  type Superpower {
    id: ID!
    text: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }
`;

// This will be our mock data to query
const users = [
  {
    id: "1",
    name: "Peter Parker",
    superpowers: [
      {
        id: "1",
        text: "Web slinging"
      },
      {
        id: "2",
        text: "Spidey sense"
      }
    ]
  },
  {
    id: "2",
    name: "Tony Stark",
    superpowers: [
      {
        id: "3",
        text: "Industrial design"
      },
      {
        id: "4",
        text: "Robotic fashion"
      }
    ]
  }
];

// This will be a map of functions to return the data described by our schema
const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    user: (root, { id }) => {
      return users.find(user => user.id === id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Apollo server started at ${url}`);
});
