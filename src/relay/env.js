/* @flow */

import createFetch from './createFetch';
import schema from '../data/schema';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const fetchQuery = createFetch({
  schema,
  rootValue: { isRoot: true },
  contextValue: { isContext: true },
});

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default modernEnvironment;
