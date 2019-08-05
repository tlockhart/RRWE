import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr, hasMany } = DS;


  export default Model.extend({

  // @attr('string') name;
  // @attr('string') description;
  // @hasMany('song') songs;
  name: attr('string'),
  description: attr('string'),
  songs: hasMany(),

  isGreatBand: computed('songs.@each.rating', function() {
    let goodSongs = this.get('songs').filter((song) => song.rating >=4);
    return goodSongs.length >= 2;
  })
});
