import DS from 'ember-data';
const { Model, hasMany } = DS;
// const { Model } = DS;

export default Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),

  /**************************/
  //BM ADDED
  /**************************/
  //user hasMany bands
  bands: hasMany('band')
  /**************************/
});
