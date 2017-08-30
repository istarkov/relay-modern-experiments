/* @flow */
import * as React from 'react';
import { Div } from 'glamorous';
// $ExpectError
import Typography from 'material-ui/Typography';

import { createFragmentContainer, graphql } from 'react-relay';

import { compose, withProps } from 'recompose';

const chart = ({ info, parent }) =>
  <Div>
    <Typography type="subheading">
      Chart data for "{parent.name}"
    </Typography>
    <Div marginTop="1rem">
      {info.main}
    </Div>
  </Div>;

const enhance = compose(
  withProps(({ info, parent }) => ({
    info: info || { main: '' },
    parent: parent || { name: '' },
  }))
);

export default createFragmentContainer(
  enhance(chart),
  graphql`
    fragment Chart_info on DrinkerReportChart {
      id
      main
    }

    # we can pass this data from parent via props or just reload if needed
    fragment Chart_parent on Drinker {
      id
      name
    }
  `
);
