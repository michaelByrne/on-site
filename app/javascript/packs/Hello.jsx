import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Query } from 'react-apollo';

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

export default function Hello() {
  return (
    <Styled>
      <Query query={TEST_FIELD_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return 'Loading...';
          if (error) return error;

          return <Styled>{data.testField}</Styled>
        }}
      </Query>
    </Styled>
  );
}
