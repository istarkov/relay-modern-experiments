/* @flow */
import * as React from 'react';
import { Div } from 'glamorous';
// $ExpectError
import Typography from 'material-ui/Typography';

import { createFragmentContainer, graphql } from 'react-relay';

import { compose } from 'recompose';

const table = ({ info, parent }) =>
  <Div>
    <Typography type="subheading">
      Table data for "{parent && parent.name}"
    </Typography>
    <Div marginTop="1rem">
      {info && info.table}
    </Div>
  </Div>;

const enhance = compose();

export default createFragmentContainer(
  enhance(table),
  graphql`
    fragment Table_info on DrinkerReportTable {
      id
      table
    }

    # we can pass this data from parent via props or just reload if needed
    fragment Table_parent on Drinker {
      id
      name
    }
  `
);
