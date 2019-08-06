import Route from '@ember/routing/route';
import {action} from '@ember/object';
import wait from 'rarwe/utils/wait';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  // session: service(),

  model() {
    /*******************************/
    //BM
    /*******************************/
    // let userEmail = this.session.data.authenticated.userEmail;
    // return this.store.findAll('band', {userEmail: userEmail});
    /*******************************/
    return this.store.findAll('band');
    },
  @action didTransition() {
    document.title = 'Bands - Rock & Roll';
  }
});
