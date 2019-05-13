import React from 'react'
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { render } from 'react-dom'
import { setContext } from 'apollo-link-context';

import Hello from './Hello';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = document
    .querySelector('meta[name=csrf-token]')
    .getAttribute('content');

  return {
    headers: {
      'X-CSRF-Token': token,
      ...headers,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Hello />
    </ApolloProvider>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.body.appendChild(document.createElement('div')));
});
