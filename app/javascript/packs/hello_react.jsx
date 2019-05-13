import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import gql from 'graphql-tag';
import styled from 'styled-components';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, Query } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

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

const Styled = styled.div`
  color: #ff3636;
  font-family: monospace;
  font-size: 20px;
`;

const TEST_FIELD_QUERY = gql`
  query TEST_FIELD_QUERY {
    testField
  }
`;

const Hello = () => (
  <Styled>
    <Query query={TEST_FIELD_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return 'Loading...';
        if (error) return error;

        return <Styled>{data.testField}</Styled>
      }}
    </Query>
  </Styled>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Hello name="React" />
    </ApolloProvider>,
    document.body.appendChild(document.createElement('div')),
  )
})
