import DS from 'ember-data';
// const { Model, hasMany } = DS;
const { Model } = DS;

export default Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),

  /**************************/
  //BM ADDED
  /**************************/
  // bands: hasMany() //user hasMany bands
  /**************************/
});
