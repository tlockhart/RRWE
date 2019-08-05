import Route from '@ember/routing/route';
import {action} from '@ember/object';

export default Route.extend({
  model() {
    return this.modelFor('bands.band');
    },

    @action willTransition(transition) {
      if (this.controller.isEditing) {
        let leave = window.confirm('Are you sure?');
        if (!leave) {
          transition.abort();
        }
      }
    },

    @action didTransition() {
      this.set('isEditing', false);
    }
});
