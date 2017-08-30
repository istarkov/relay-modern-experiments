/* @flow */

import {
  GraphQLNonNull, // new GraphQLNonNull(GraphQLString)
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  // GraphQLID,
  GraphQLEnumType,
} from 'graphql';

import { nodeDefinitions, globalIdField, fromGlobalId } from 'graphql-relay';
import { REQUEST_AT_SERVER_TIME } from '../const';

let g_ = 0;

const getData = (id, type) => {
  return new Promise(r =>
    setTimeout(
      () =>
        r({
          id,
          type,
          name: `Vasya Pupken ${id} ${g_}`,
        }),
      REQUEST_AT_SERVER_TIME
    )
  );
};

const getDrinkerPals = id => {
  return [{ id: `pal_${id}`, name: `Pal ${id}` }];
};

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);

    return getData(id, type);
  },
  (obj, a, info) => {
    const resType = info.schema.getType(obj.type);
    if (resType instanceof GraphQLObjectType) {
      return resType;
    }
    throw new Error("Can't find type");
  }
);

const ChartEnum = new GraphQLEnumType({
  name: 'ChartEnum',
  values: {
    CHART: { value: 'DrinkerReportChart' },
    TABLE: { value: 'DrinkerReportTable' },
  },
});

const DrinkerReportChartType = new GraphQLObjectType({
  name: 'DrinkerReportChart',
  description: 'A charts',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    main: {
      type: GraphQLString,
      description: 'main chart data',
      resolve: () =>
        'DATA FROM SERVER: THIS IS A CHART: DATA FROM SERVER: THIS IS A CHART: DATA FROM SERVER: THIS IS A CHART: DATA FROM SERVER: THIS IS A CHART: DATA FROM SERVER: THIS IS A CHART: ',
    },
  }),
});

const DrinkerReportTable = new GraphQLObjectType({
  name: 'DrinkerReportTable',
  description: 'A report table',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    table: {
      type: GraphQLString,
      description: 'main chart data',
      resolve: () =>
        'DATA FROM SERVER: THIS IS A TABLE: DATA FROM SERVER: THIS IS A TABLE: DATA FROM SERVER: THIS IS A TABLE:',
    },
  }),
});

const DrinkerType = new GraphQLObjectType({
  name: 'Drinker',
  description: 'A drinkers',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      type: GraphQLString,
      description: 'The name of the ship.',
    },
    pals: {
      type: new GraphQLList(new GraphQLNonNull(DrinkerType)),
      description: 'Pals',
      resolve: ({ id }) => getDrinkerPals(id),
    },
    // reports
    report: {
      type: nodeInterface,
      resolve: ({ id }, { type }) => getData(id, type),
      args: {
        type: { type: new GraphQLNonNull(ChartEnum) },
      },
    },
    reportChart: {
      type: DrinkerReportChartType,
      resolve: ({ id }) => getData(id, 'DrinkerReportChartType'),
    },
    reportTable: {
      type: DrinkerReportTable,
      resolve: ({ id }) => getData(id, 'DrinkerReportTable'),
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    drinkers: {
      type: new GraphQLList(DrinkerType),
      resolve: () => [getData('i1', 'Drinker'), getData('i2', 'Drinker')],
    },
    node: nodeField,
  },
});

export default new GraphQLSchema({
  query: Query,
  types: [DrinkerType, DrinkerReportChartType, DrinkerReportTable],
});
