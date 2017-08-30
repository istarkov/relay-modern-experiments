/* @flow */
import * as React from 'react';
// $ExpectError
import Grid from 'material-ui/Grid';
// $ExpectError
import Typography from 'material-ui/Typography';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  // $ExpectError
} from 'material-ui/Table';
// $ExpectError
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import { createFragmentContainer, graphql } from 'react-relay';

import type { DrinkersList_drinkers } from './__generated__/DrinkersList_drinkers.graphql';

const drinkersList = ({ drinkers }: { drinkers: ?DrinkersList_drinkers }) =>
  <Grid
    container
    justify="center"
    style={{ marginTop: '2rem', marginBottom: '2rem' }}
  >
    <Grid item xs={10}>
      <Paper style={{ padding: '1rem' }}>
        <Typography type="title">Table</Typography>
      </Paper>
    </Grid>
    <Grid item xs={10}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drinkers &&
              drinkers.map(({ id, name }) =>
                <TableRow key={id}>
                  <TableCell>
                    <Link to={`/drinker/${id}/CHART`}>
                      {name}
                    </Link>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  </Grid>;

export default createFragmentContainer(
  drinkersList,
  graphql`
    fragment DrinkersList_drinkers on Drinker @relay(plural: true) {
      id
      name
    }
  `
);
