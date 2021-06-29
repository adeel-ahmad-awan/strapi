'use strict';

const { merge, map, pipe, reduce } = require('lodash/fp');

const enums = require('./enums');
const dynamicZone = require('./dynamic-zones');

const entity = require('./entity');
const entityMeta = require('./entity-meta');
const type = require('./type');

const response = require('./response');
const responseCollection = require('./response-collection');

const queries = require('./queries');
const filters = require('./filters');

const buildersFactories = [
  enums,
  dynamicZone,
  entity,
  entityMeta,
  type,
  response,
  responseCollection,
  queries,
  filters,
];

/**
 * Instantiate every builder with the given context
 * @param {object} context
 * @param {object} context.strapi
 * @parma {object} context.registry
 */
module.exports = context => {
  return pipe(
    // Create a new instance of every builders
    map(factory => factory(context)),
    // Merge every builder into the same object
    reduce(merge, {})
  ).call(null, buildersFactories);
};
