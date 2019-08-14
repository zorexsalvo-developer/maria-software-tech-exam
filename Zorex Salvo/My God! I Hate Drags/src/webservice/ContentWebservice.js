import axios from 'axios';
import Webservice from './Webservice';

export default class ContentWebservice extends Webservice {
  getData(params = {}) {
    return axios.get(`${this.apiBaseUrl}/drug/label.json`, { params });
  }
}
