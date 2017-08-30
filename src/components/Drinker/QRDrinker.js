/* @ flow */
import * as React from 'react';
import { graphql } from 'react-relay';
import QueryRenderer from '../../relay/QR';
import env from '../../relay/env';
import Drinker from './Drinker';
// import type { QRDrinkersListQueryResponse } from './__generated__/QRDrinkersListQuery.graphql';

const query = graphql.experimental`
  query QRDrinkerQuery($drinkerId: ID!) {
    node(id: $drinkerId) {
      ...Drinker_drinker
    }
  }
`;

export default ({ history, match: { params: { drinkerId, reportType } } }) =>
  <QueryRenderer
    environment={env}
    query={query}
    variables={{ drinkerId }}
    render={({ error, props }) => {
      if (error)
        return (
          <div>
            {error.message}
          </div>
        );

      // provide null so internal routes can be loaded even with some defaults
      return <Drinker drinker={(props && props.node) || null} />;
    }}
  />;
