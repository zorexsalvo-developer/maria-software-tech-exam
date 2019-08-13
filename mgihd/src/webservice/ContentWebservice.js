import axios from 'axios';

export default class ContentWebservice {
  getData() {
    return axios.get('https://api.fda.gov/drug/label.json');
  }
}
