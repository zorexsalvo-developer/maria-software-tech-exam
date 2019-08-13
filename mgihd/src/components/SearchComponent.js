import React, { Component } from 'react';
import { Input } from 'antd';
import './SearchComponent.scss';
const { Search } = Input;

class SearchComponent extends Component {
  render() {
    return (
      <div className="SearchComponent">
        <Search
          placeholder="Search by generic name or brand name"
          onSearch={value => console.log(value)}
        />
      </div>
    );
  }
}

export default SearchComponent;
