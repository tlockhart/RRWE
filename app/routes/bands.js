import Route from '@ember/routing/route';
import {action} from '@ember/object';
import wait from 'rarwe/utils/wait';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    /*******************************/
    //BM
    /*******************************/
    let userEmail = this.session.data.authenticated.userEmail;
    console.log("User Email Routes = ", userEmail);
    // return this.store.findRecord('band', {userEmail: userEmail});
    /*******************************/
    //TL VERSION
    /*******************************/
    // return this.store.query('band', {
    //   filter: {
    //     userEmail: this.userEmail
    //   }
    // }).then(function(bands) {
    //   return bands.get("firstObject");
    // });
    /*******************************/
    //Original:
    return this.store.findAll('band');
    /*******************************/
    },
  @action didTransition() {
    document.title = 'Bands - Rock & Roll';
  }
});
