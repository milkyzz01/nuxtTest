import { defineNuxtPlugin } from '#app';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://countries.trevorblades.com', // Your GraphQL API endpoint
});

// Cache implementation
const cache = new InMemoryCache();

// Create the Apollo Client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

// Provide Apollo Client globally
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
});
