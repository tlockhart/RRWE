import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr, hasMany, belongsTo } = DS;


  export default Model.extend({

  name: attr('string'),
  description: attr('string'),


  /**************************/
  //BM ADDED
  /**************************/
  userEmail: attr('string'),

  //bands belongsTo user
  user: belongsTo('user'),
  /**************************/
  songs: hasMany(),

  isGreatBand: computed('songs.@each.rating', function() {
    let goodSongs = this.get('songs').filter((song) => song.rating >=4);
    return goodSongs.length >= 2;
  })
});
