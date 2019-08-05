import { computed } from '@ember/object';
import Component from '@ember/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: ['rating-panel'],
  @tracked rating: 0,
  maxRating: 5,
  
  onClick() {},

  stars: computed('rating', 'maxRating', function() {
    let stars = [];
    for (let i=1; i <= this.maxRating; i++) {
      //star is full if current index rating is greater than the index value
    stars.push({ rating: i, isFull: this.rating >= i });
    }
    return stars;
    }),

    @action setRating(newRating) {
      return this.onClick(newRating);
      }
});
