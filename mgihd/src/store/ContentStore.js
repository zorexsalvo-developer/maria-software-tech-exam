import { decorate } from 'mobx';

class ContentStore {
  constructor() {
    this.results = [];
  }
}

export default decorate(ContentStore, {});
