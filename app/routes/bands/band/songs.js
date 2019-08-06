import Route from '@ember/routing/route';
import { action } from '@ember/object';
import wait from 'rarwe/utils/wait';
import { capitalize as capitalizeWords } from 'rarwe/helpers/capitalize';

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
  // document.title = `${band.name} songs - Rock & Roll`;
  // let name = capitalizeWords(band.name);
  let name = capitalizeWords(band.name);
  document.title = `${name} songs - Rock & Roll`;
},
});
