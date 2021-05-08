import { ApolloClient, InMemoryCache } from "@apollo/client";

require("dotenv").config();

const client = new ApolloClient({
  uri: `${process.env.HOST}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
