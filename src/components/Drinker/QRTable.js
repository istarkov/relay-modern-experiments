/* @ flow */
import * as React from 'react';
import { graphql } from 'react-relay';
import QueryRenderer from '../../relay/QR';
import env from '../../relay/env';
import Table from './Table';
// import type { QRTablesListQueryResponse } from './__generated__/QRTablesListQuery.graphql';

// Load all the data needed, so can be reused everywhere
const query = graphql.experimental`
  query QRTableQuery($drinkerId: ID!) {
    node(id: $drinkerId) {
      ... on Drinker {
        reportTable {
          ...Table_info
        }
      }
      ...Table_parent
    }
  }
`;

export default ({ match: { params: { drinkerId } } }) =>
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

      return (
        <Table
          parent={(props && props.node) || null}
          info={(props && props.node.reportTable) || null}
        />
      );
    }}
  />;
