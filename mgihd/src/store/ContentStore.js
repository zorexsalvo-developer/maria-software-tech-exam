import { decorate, observable, action } from 'mobx';
import { notification, message } from 'antd';
import ContentUiStore from './ContentUiStore';
import ContentWebservice from './../webservice/ContentWebservice';
import SearchStore from './SearchStore';

class ContentStore {
  constructor() {
    this.ui = new ContentUiStore();
    this.search = new SearchStore();
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

      if (this.search.query) {
        params['search'] = `opendfda.brand_name:${
          this.search.query
        } openfda.generic_name:${this.search.query}`;
      }
      const webservice = new ContentWebservice();
      const response = await webservice.getData(params);
      this.setMeta(response.data.meta);
      this.setResults(response.data.results);
    } catch (e) {
      if (e.response.data) {
        message.error(e.response.data.error.message);
      }
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
