import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Input } from 'antd';
import './SearchComponent.scss';
const { Search } = Input;

class SearchComponent extends Component {
  onSearch = () => this.props.store.getData();

  render() {
    return (
      <div className="SearchComponent">
        <Search
          placeholder="Search by generic name or brand name"
          value={this.props.store.search.query}
          onChange={e => this.props.store.search.setQuery(e.target.value)}
          onSearch={this.onSearch}
          allowClear={true}
        />
      </div>
    );
  }
}

export default observer(SearchComponent);
