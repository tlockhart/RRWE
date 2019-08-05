import Controller from '@ember/controller';
import { action } from '@ember/object';

export default Controller.extend({
  isEditing: false,

@action toggleIsEditing() {
  this.toggleProperty('isEditing');
},
@action edit() {
  this.set('isEditing', true);
},
@action async save() {
  let band = this.model;
  await band.save();
  this.set('isEditing', false);
}
});
