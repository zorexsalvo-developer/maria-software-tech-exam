import React, { Component } from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';
import './ContentListingComponent.scss';

const columns = [
  {
    title: 'Generic Name',
    dataIndex: 'genericName'
  },
  {
    title: 'Brand Name',
    dataIndex: 'brandName'
  },
  {
    title: 'Product Type',
    dataIndex: 'productType'
  },
  {
    title: 'Route of Administration',
    dataIndex: 'routeOfAdministration'
  },
  {
    title: 'Purpose',
    dataIndex: 'purpose'
  },
  {
    title: 'Indication and Usage',
    dataIndex: 'indicationAndUsage'
  },
  {
    title: 'Warnings',
    dataIndex: 'warnings'
  },
  {
    title: 'Active Ingredients',
    dataIndex: 'activeIngredients'
  },
  {
    title: 'Inactive Ingredients',
    dataIndex: 'inactiveIngredients'
  },
  {
    title: 'Storage and Handling',
    dataIndex: 'storageAndHandling'
  }
];

class ContenListingComponent extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url:
        'https://api.fda.gov/drug/label.json?search=effective_time:[20110601+TO+20121231]&limit=1',
      method: 'get',
      data: {
        results: 10,
        ...params
      },
      type: 'json'
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination
      });
    });
  };

  render() {
    return (
      <div className="ContentListingComponent">
        <Table
          locale={{ emptyText: 'No more products to display.' }}
          columns={columns}
          rowKey={record => record.login.uuid}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default ContenListingComponent;
