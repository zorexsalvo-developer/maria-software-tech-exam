import { decorate, observable, action } from 'mobx';
import ContentUiStore from './ContentUiStore';
import ContentWebservice from './../webservice/ContentWebservice';

class ContentStore {
  constructor() {
    this.ui = new ContentUiStore();
    this.results = [];
  }

  setResults(value) {
    this.results = value;
  }

  async getData() {
    this.ui.setLoading(true);
    try {
      const webservice = new ContentWebservice();
      const response = await webservice.getData();
      this.setResults(response.data.results);
    } catch (e) {
      console.log(e);
    }
    this.ui.setLoading(false);
  }
}

export default decorate(ContentStore, {
  results: observable,
  setResults: action
});
