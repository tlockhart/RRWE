import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;
import { tracked } from '@glimmer/tracking';

export default Model.extend({
  // @attr('string') title,
  // @attr('number') @tracked rating,
  // @belongsTo() band,
  title: attr('string'),
  // @tracked rating: attr('number'),
  rating: attr('number'),
  band: belongsTo()
});
