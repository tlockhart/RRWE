import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr, hasMany, belongsTo } = DS;


  export default Model.extend({

  name: attr('string'),
  description: attr('string'),
  songs: hasMany(),

  /**************************/
  //BM ADDED
  /**************************/
  // user: belongsTo(), //bands belongsTo user
  // userEmail: attr('string'),
  /**************************/

  isGreatBand: computed('songs.@each.rating', function() {
    let goodSongs = this.get('songs').filter((song) => song.rating >=4);
    return goodSongs.length >= 2;
  })
});
