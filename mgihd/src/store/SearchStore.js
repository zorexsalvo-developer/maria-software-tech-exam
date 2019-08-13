import { decorate, observable, action } from 'mobx';

class SearchStore {
  constructor() {
    this.query = '';
  }

  setQuery(value) {
    this.query = value;
  }
}

export default decorate(SearchStore, {
  query: observable,
  setQuery: action
});
