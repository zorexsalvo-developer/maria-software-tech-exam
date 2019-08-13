import React, { Component } from 'react';
import { Table, List, Typography, Descriptions } from 'antd';
import axios from 'axios';
import './ContentListingComponent.scss';

const { Text } = Typography;
const columns = [
  {
    title: 'Generic Name',
    dataIndex: 'openfda.generic_name',
    render: name => <Text strong>{name}</Text>
  },
  {
    title: 'Brand Name',
    dataIndex: 'openfda.brand_name',
    render: name => <Text strong>{name}</Text>
  },
  {
    title: 'Product Type',
    dataIndex: 'openfda.product_type'
  },
  {
    title: 'Route of Administration',
    dataIndex: 'openfda.route'
  },
  {
    title: 'Purpose',
    dataIndex: 'purpose',
    render: uses => {
      if (uses) {
        return (
          <List
            dataSource={uses}
            renderItem={use => <List.Item>{use}</List.Item>}
          />
        );
      }
    }
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
    axios
      .get('https://api.fda.gov/drug/label.json', {
        params: {
          limit: 100
        }
      })
      .then(data => {
        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        data = data.data;
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
          bordered
          locale={{ emptyText: 'No more products to display.' }}
          columns={columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          expandedRowRender={record => (
            <Descriptions bordered layout="vertical">
              <Descriptions.Item label="Indications And Usage">
                {record.indications_and_usage}
              </Descriptions.Item>
              <Descriptions.Item label="Warnings">
                {record.warnings}
              </Descriptions.Item>
              <Descriptions.Item label="Active Ingredients">
                {record.active_ingredient}
              </Descriptions.Item>
              <Descriptions.Item label="Inactive Ingredients">
                {record.inactive_ingredient}
              </Descriptions.Item>
              <Descriptions.Item label="Storage and Handling">
                {record.storage_and_handling}
              </Descriptions.Item>
            </Descriptions>
          )}
        />
      </div>
    );
  }
}

export default ContenListingComponent;
