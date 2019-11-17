import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Map from './Map';

const MAP_DATA_QUERY = gql`
  query MapData {
    allProperties {
      lat
      long
      use
      org
    }
  }
`;


const MapContext = () => {
  const { loading, error, data } = useQuery(MAP_DATA_QUERY)
  if (loading) return 'loading...';
  if (error) return error.message;

  return(
    <Map properties={data.allProperties} />
  )
}

export default MapContext;