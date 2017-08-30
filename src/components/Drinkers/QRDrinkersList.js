/* @flow */
import * as React from 'react';
import { graphql } from 'react-relay';
import QueryRenderer from '../../relay/QR';
import env from '../../relay/env';
import DrinkersList from './DrinkersList';
import type { QRDrinkersListQueryResponse } from './__generated__/QRDrinkersListQuery.graphql';

const query = graphql.experimental`
  query QRDrinkersListQuery {
    drinkers {
      ...DrinkersList_drinkers
    }
  }
`;

export default () =>
  <QueryRenderer
    environment={env}
    query={query}
    variables={{}}
    render={({
      error,
      props,
    }: {
      error: { message: string },
      props: QRDrinkersListQueryResponse,
    }) => {
      if (error)
        return (
          <div>
            {error.message}
          </div>
        );

      // provide null so internal routes can be loaded even with some defaults
      return <DrinkersList drinkers={(props && props.drinkers) || null} />;
    }}
  />;
