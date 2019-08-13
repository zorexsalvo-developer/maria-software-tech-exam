import { decorate, observable, action } from 'mobx';
import { notification } from 'antd';
import ContentUiStore from './ContentUiStore';
import ContentWebservice from './../webservice/ContentWebservice';

class ContentStore {
  constructor() {
    this.ui = new ContentUiStore();
    this.results = [];
    this.meta = {};
    this.limit = 10;
  }

  setResults(value) {
    this.results = value;
  }

  setMeta(value) {
    this.meta = value;
  }

  showDisclaimer() {
    notification.open({
      placement: 'bottomRight',
      message: 'Disclaimer',
      description:
        'Do not rely on openFDA to make decisions regarding medical care. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.'
    });
  }

  async getData() {
    this.ui.setLoading(true);
    try {
      const params = {
        limit: this.limit
      };
      const webservice = new ContentWebservice();
      const response = await webservice.getData(params);
      this.setMeta(response.data.meta);
      this.setResults(response.data.results);
    } catch (e) {
      console.log(e);
    }
    this.ui.setLoading(false);
  }
}

export default decorate(ContentStore, {
  results: observable,
  meta: observable,

  setMeta: action,
  setResults: action
});
