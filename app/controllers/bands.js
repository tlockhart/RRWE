import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import { empty } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  @tracked isAddingBand: false,
  @tracked newBandName: '',

  isAddButtonDisabled: empty('newBandName'),

  router: service(),

  @action addBand() {
    this.isAddingBand = true;
  },

  @action cancelAddBand() {
    this.isAddingBand = false;
  },

    @action async saveBand(event) {
    event.preventDefault();
    // Create a new band
    let newBand = this.store.createRecord('band', { name: this.newBandName });
    await newBand.save();

    //transition to new page?
    this.setProperties({
      newBandName: '',
      isAddingBand: false
      });

      // transition to the .songs route and passing the newBand object
      // this.router.transitionTo('bands.band.songs', newBand.slug);
      this.router.transitionTo('bands.band.songs', newBand.id);
  }
});
