import Route from '@ember/routing/route';
import {action} from '@ember/object';
import wait from 'rarwe/utils/wait';

export default Route.extend({

  // async model() {
  //   await wait(3000);
  //   return this.modelFor('bands.band');
  //   },
  model() {
    return this.modelFor('bands.band');
    },
  resetController(controller) {
    controller.setProperties({
    isAddingSong: false,
    newSongTitle: ''
    });
  },

  @action didTransition() {
    let band = this.modelFor(this.routeName);
    document.title = `${band.name} songs - Rock & Roll`;
    },
});
