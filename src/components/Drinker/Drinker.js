/* @flow */
import * as React from 'react';
// $ExpectError
import Grid from 'material-ui/Grid';
// $ExpectError
import Typography from 'material-ui/Typography';
// $ExpectError
import Tabs, { Tab } from 'material-ui/Tabs';
// $ExpectError
import Paper from 'material-ui/Paper';
// import { Link } from 'react-router-dom';
import { createFragmentContainer, graphql } from 'react-relay';

import { compose, withHandlers } from 'recompose';
import { withRouter, Route } from 'react-router-dom';
import QRChart from './QRChart';
import QRTable from './QRTable';

const drinker = ({ drinker, match, handleTabChange }) =>
  <Grid container justify="center">
    <Grid item xs={10}>
      <Paper
        style={{
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '1rem',
        }}
      >
        <Typography type="title">Drinker:</Typography>
        <Typography style={{ marginLeft: '1rem' }} type="subheading">
          {drinker && drinker.name}
        </Typography>
      </Paper>
    </Grid>
    <Grid item xs={10}>
      <Route
        path={`${match.url}/:reportType`}
        render={({ match: { params: { reportType } } }) =>
          <Paper>
            <Tabs value={reportType} onChange={handleTabChange}>
              <Tab label="Chart" value={'CHART'} />
              <Tab label="Table" value={'TABLE'} />
            </Tabs>
            <Paper style={{ padding: '1rem', minHeight: '200px' }}>
              <Route path={`${match.path}/CHART`} component={QRChart} />
              <Route path={`${match.path}/TABLE`} component={QRTable} />
            </Paper>
          </Paper>}
      />
    </Grid>
  </Grid>;

const enhance = compose(
  withHandlers({
    handleTabChange: ({ drinker, history }) => (_, v) => {
      history.push(`/drinker/${drinker.id}/${v}`);
    },
  })
);

export default withRouter(
  createFragmentContainer(
    enhance(drinker),
    graphql`
      fragment Drinker_drinker on Drinker {
        id
        name
      }
    `
  )
);
