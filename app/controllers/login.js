import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),
  session: service(),

  actions: {
    async signIn(event) {
      event.preventDefault();
      let { email, password } = this;
      //TODO: authenticate the user against the back-end
      await this.session.authenticate('authenticator:credentials',
email, password);
      await this.router.transitionTo('bands');
    }
  }
});
