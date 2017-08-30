/* @flow */

import { graphql } from 'graphql';
import type { GraphQLSchema } from 'graphql';

import { BROWSER_SERVER_ROUNDTRIP_TIME } from '../const';

const cache_ = {};

export default function createFetch({
  schema,
  rootValue,
  contextValue,
}: {
  schema: GraphQLSchema,
  rootValue: {},
  contextValue: {},
}) {
  return function fetchQuery(operation: { text: string }, variables: {}) {
    const key = operation.text + JSON.stringify(variables);
    if (cache_[key]) return cache_[key];
    // console.log('op', operation, variables);
    return graphql(
      schema,
      operation.text,
      rootValue,
      contextValue,
      variables
    ).then(payload => {
      if (payload.errors) {
        throw new Error(payload.errors);
      }

      // cache_[key] = payload;

      return new Promise(r =>
        setTimeout(() => r(payload), BROWSER_SERVER_ROUNDTRIP_TIME)
      );
    });
  };
}
