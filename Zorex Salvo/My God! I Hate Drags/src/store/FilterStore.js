import { decorate, observable, action } from 'mobx';

class FilterStore {
  constructor() {
    this.route = undefined;
    this.routeOpts = [
      {
        text: 'Oral',
        value: 'ORAL'
      },
      {
        text: 'Topical',
        value: 'TOPICAL'
      },
      {
        text: 'Intravenous',
        value: 'INTRAVENOUS'
      },
      {
        text: 'Dental',
        value: 'DENTAL'
      },
      {
        text: 'Respiratory',
        value: 'RESPIRATORY'
      },
      {
        text: 'Ophthalmic',
        value: 'OPHTHALMIC'
      },
      {
        text: 'Intramuscular',
        value: 'INTRAMUSCULAR'
      },
      {
        text: 'Subcutaneous',
        value: 'SUBCUTANEOUS'
      },
      {
        text: 'Nasal',
        value: 'NASAL'
      },
      {
        text: 'Rectal',
        value: 'RECTAL'
      }
    ];
  }

  setRoute(value) {
    this.route = value;
  }
}

export default decorate(FilterStore, {
  route: observable,
  setRoute: action
});
