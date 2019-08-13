import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Select } from 'antd';
import './FilterComponent.scss';

const { Option } = Select;

class FilterComponent extends Component {
  render() {
    return (
      <Select className="FilterComponent" placeholder="Filter by route">
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    );
  }
}

export default observer(FilterComponent);
