import Controller from '@ember/controller';
// import Song from 'rarwe/models/song';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { empty, sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },
  @tracked isAddingSong: false,
  @tracked newSongTitle: '',
  sortBy: 'ratingDesc',
    searchTerm: '',

      isAddButtonDisabled: empty('newSongTitle'),

        matchingSongs: computed('model.songs.@each.title', 'searchTerm',
          function () {
            let searchTerm = this.searchTerm.toLowerCase();
            return this.model.get('songs').filter((song) => {
              return song.title.toLowerCase().includes(searchTerm);
            });
          }),

    @action addSong() {
  this.isAddingSong = true;
},

@action cancelAddSong() {
  this.isAddingSong = false;
},

// @action saveSong(event) {
@action async saveSong(event) {
  event.preventDefault();
  // let newSong = Song.create({ title: this.newSongTitle });
  // this.model.songs.pushObject(newSong);
  // this.set('newSongTitle', '');
  let newSong = this.store.createRecord('song', {
    title: this.get('newSongTitle'),
    band: this.model
  });
  await newSong.save();
  this.newSongTitle = '';
},

@action updateRating(song, rating) {
  song.set('rating', song.rating === rating ? 0 : rating);
  song.save();
},

//Computed Item Blueprint
sortProperties: computed('sortBy', function () {
  let options = {
    ratingDesc: ['rating:desc', 'title:asc'],
    ratingAsc: ['rating:asc', 'title:asc'],
    titleDesc: ['title:desc'],
    titleAsc: ['title:asc']
  };
  return options[this.sortBy];
}),

  //Actual sorted object
  sortedSongs: sort('matchingSongs', 'sortProperties'),
});
