/* @ flow */
import * as React from 'react';
import { graphql } from 'react-relay';
import QueryRenderer from '../../relay/QR';
import env from '../../relay/env';
import Chart from './Chart';
// import type { QRChartsListQueryResponse } from './__generated__/QRChartsListQuery.graphql';

// Load all the data needed, so can be reused everywhere
const query = graphql.experimental`
  query QRChartQuery($drinkerId: ID!) {
    node(id: $drinkerId) {
      ... on Drinker {
        reportChart {
          ...Chart_info
        }
      }
      ...Chart_parent
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
        <Chart
          parent={(props && props.node) || null}
          info={(props && props.node.reportChart) || null}
        />
      );
    }}
  />;
