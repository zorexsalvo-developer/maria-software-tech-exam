import { decorate, observable, action, computed } from 'mobx';
import { notification, message } from 'antd';
import ContentUiStore from './ContentUiStore';
import ContentWebservice from './../webservice/ContentWebservice';
import SearchStore from './SearchStore';
import FilterStore from './FilterStore';

class ContentStore {
  constructor() {
    this.ui = new ContentUiStore();
    this.search = new SearchStore();
    this.filter = new FilterStore();
    this.results = [];
    this.meta = {};

    this.limit = 10;
    this.skip = 0;
    this.total = 0;
  }

  setResults(value) {
    this.results = value;
  }

  setMeta(value) {
    this.meta = value;
  }

  setTotal(value) {
    this.total = value;
  }

  showDisclaimer() {
    notification.open({
      placement: 'bottomRight',
      message: 'Disclaimer',
      description:
        'Do not rely on openFDA to make decisions regarding medical care. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.'
    });
  }

  buildParams() {
    const params = {
      search: '(_exists_:openfda)',
      limit: this.limit,
      skip: this.skip
    };

    if (this.search.query) {
      params['search'] += ` AND ((opendfda.brand_name:${
        this.search.query
      }) (openfda.generic_name:${this.search.query}))`;
    }

    if (this.filter.route) {
      params['search'] += ` AND (openfda.route:${this.filter.route})`;
    }
    return params;
  }

  resetDataTable() {
    this.setTotal(-1);
    this.setSkip(0);
    this.setResults([]);
  }

  async getData() {
    this.resetDataTable();
    this.ui.setLoading(true);
    try {
      const webservice = new ContentWebservice();
      const response = await webservice.getData(this.buildParams());

      this.setTotal(response.data.meta.results.total);
      this.setMeta(response.data.meta);
      this.setResults(response.data.results);
    } catch (e) {
      if (e.response) {
        if (e.response.data.error.message.startsWith('Search not supported:')) {
          message.error('Invalid search term!');
        } else {
          message.error(e.response.data.error.message);
        }
      } else {
        message.error(e);
      }
    }
    this.ui.setLoading(false);
  }

  pushDataToResults(value) {
    value.map(result => this.results.push(result));
  }

  async loadMore() {
    this.ui.setLoading(true);
    this.setSkip(this.skip + this.limit);

    try {
      const webservice = new ContentWebservice();
      const response = await webservice.getData(this.buildParams());
      this.setTotal(response.data.meta.results.total);
      this.pushDataToResults(response.data.results);
    } catch (e) {
      if (e.response) {
        if (this.results.length >= this.total) {
          message.info('No more products to display');
        } else {
          message.error(e.response.data.error.message);
        }
      } else {
        message.error(e);
      }
    }
    this.ui.setLoading(false);
  }

  setSkip(value) {
    this.skip = value;
  }

  get hasMore() {
    return this.skip + this.limit <= this.total;
  }
}

export default decorate(ContentStore, {
  results: observable,
  meta: observable,
  total: observable,
  limit: observable,
  skip: observable,

  setMeta: action,
  setResults: action,
  setTotal: action,
  setLimit: action,
  setSkip: action,
  pushDataToResults: action,
  resetDataTable: action,

  hasMore: computed
});
