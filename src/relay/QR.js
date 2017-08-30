import * as React from 'react';
import { QueryRenderer } from 'react-relay';

export default ({ environment, query, renderError, variables, render }) =>
  <QueryRenderer
    environment={environment}
    query={query}
    variables={variables}
    render={({ error, props }) => {
      if (error) {
        return render({ error, props });
      }
      if (props) {
        return render({ error, props });
      } else {
        const {
          createOperationSelector,
          getOperation,
        } = environment.unstable_internal;

        const opQuery = getOperation(query);
        const operation = createOperationSelector(opQuery, variables);

        // TODO: it's needed to dispose previous retain so _roots at RelayMarkSweepStore
        // would not grow forever
        // It is possible to use just Operation name
        // (sic! dispose after retain)
        environment.retain(operation.root);

        const snapshot = environment.check(operation.root)
          ? environment.lookup(operation.fragment)
          : {};

        return render({
          error,
          props: snapshot.data,
        });
      }
    }}
  />;
