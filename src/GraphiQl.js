/* @flow */
import * as React from 'react';
import createFetch from './relay/createFetch';
import GraphiQL from 'graphiql';
import schema from './data/schema';

import 'graphiql/graphiql.css';

const graphQLFetcher = ({
  query,
  variables,
}: {
  query: string,
  variables: {},
}) =>
  createFetch({
    schema,
    rootValue: { isRoot: true },
    contextValue: { isContext: true },
  })({ text: query }, variables);

export default () => <GraphiQL fetcher={graphQLFetcher} />;
