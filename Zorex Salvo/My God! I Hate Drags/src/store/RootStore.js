import ContentStore from './ContentStore.js';

export default class RootStore {
  constructor() {
    this.content = new ContentStore(this);
  }
}
