import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Select } from 'antd';
import './FilterComponent.scss';

const { Option } = Select;

class FilterComponent extends Component {
  onChange = value => {
    this.props.store.filter.setRoute(value);
    this.props.store.getData();
  };

  render() {
    return (
      <Select
        className="FilterComponent"
        placeholder="Filter by route of administration"
        allowClear
        value={this.props.store.filter.route}
        onChange={this.onChange}
      >
        {this.props.store.filter.routeOpts.map(option => (
          <Option value={option.value}>{option.text}</Option>
        ))}
      </Select>
    );
  }
}

export default observer(FilterComponent);
