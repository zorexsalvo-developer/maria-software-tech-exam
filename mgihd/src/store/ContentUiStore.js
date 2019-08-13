import { observable, decorate, action } from 'mobx';

class ContentUiStore {
  constructor() {
    this.loading = false;
  }

  setLoading(value) {
    this.loading = value;
  }
}

export default decorate(ContentUiStore, {
  loading: observable,
  setLoading: action
});
