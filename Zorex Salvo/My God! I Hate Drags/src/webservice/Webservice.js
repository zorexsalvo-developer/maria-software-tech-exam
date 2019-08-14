export default class Webservice {
  constructor() {
    const { REACT_APP_API_URL } = process.env;
    this.apiBaseUrl = REACT_APP_API_URL;
  }
}
