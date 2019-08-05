import Route from '@ember/routing/route';
import {action} from '@ember/object';
import wait from 'rarwe/utils/wait';

export default Route.extend({
  // async model() {
  //   await wait(3000);
  //   return this.store.findAll('band');
  // },
  model() {
    return this.store.findAll('band');
    },
  @action didTransition() {
    document.title = 'Bands - Rock & Roll';
  }
});
