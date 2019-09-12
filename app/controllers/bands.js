import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import { empty } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  @tracked isAddingBand: false,
  @tracked newBandName: '',

  isAddButtonDisabled: empty('newBandName'),
  session: service(),
  router: service(),

  @action addBand() {
    // event.preventDefault();
    this.isAddingBand = true;
  },

  @action cancelAddBand() {
    this.isAddingBand = false;
  },

    // @action async saveBand(event) {
    // event.preventDefault();
    @action async saveBand(event) {
      event.preventDefault();
    /****************************/
    //BM
    /*****************************/

    let userEmail = this.session.data.authenticated.userEmail;
    // let userPassword = this.session.data.authenticated.userPassword;
    let userId = this.session.data.authenticated.token;
    // console.log("User Email = ", userEmail);
    // console.log("User Password = ", this.userPassword);
    console.log("Band Name = ", this.newBandName);
    alert(userEmail+" "+this.newBandName);

    let newBand = this.store.createRecord('band', {
      name: this.newBandName,
      userEmail: userEmail,
      description: null,
      id: this.newBandName,
      // user:userId
    });

    await newBand.save();

    // Original Create a new band
    // let newBand = this.store.createRecord('band', { name: this.newBandName });
    // await newBand.save();
    /*****************************/


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
