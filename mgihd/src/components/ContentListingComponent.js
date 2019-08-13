import React, { Component } from 'react';
import { Table, List, Typography, Descriptions, Tag } from 'antd';
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
    dataIndex: 'openfda.route',
    render: routes => {
      if (routes) {
        return routes.map(route => {
          let tag;
          if (route === 'ORAL') {
            tag = <Tag color="magenta">{route}</Tag>;
          } else if (route === 'TOPICAL') {
            tag = <Tag color="red">{route}</Tag>;
          } else if (route === 'INTRAVENOUS') {
            tag = <Tag color="volcano">{route}</Tag>;
          } else if (route === 'DENTAL') {
            tag = <Tag color="orange">{route}</Tag>;
          } else if (route === 'RESPIRATORY') {
            tag = <Tag color="gold">{route}</Tag>;
          } else if (route === 'OPTHALMIC') {
            tag = <Tag color="lime">{route}</Tag>;
          } else if (route === 'INTRAMUSCULAR') {
            tag = <Tag color="green">{route}</Tag>;
          } else if (route === 'SUBCUTANEOUS') {
            tag = <Tag color="cyan">{route}</Tag>;
          } else if (route === 'NASAL') {
            tag = <Tag color="blue">{route}</Tag>;
          } else if (route === 'RECTAL') {
            tag = <Tag color="purple">{route}</Tag>;
          } else {
            tag = <Tag color="geekblue">{route}</Tag>;
          }
          return tag;
        });
      }
    }
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
          rowKey={record => record.id}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          expandedRowRender={record => (
            <Descriptions bordered layout="vertical">
              {record.indications_and_usage ? (
                <Descriptions.Item label="Indications And Usage">
                  {record.indications_and_usage}
                </Descriptions.Item>
              ) : null}
              {record.warnings ? (
                <Descriptions.Item label="Warnings">
                  {record.warnings}
                </Descriptions.Item>
              ) : null}
              {record.active_ingredient ? (
                <Descriptions.Item label="Active Ingredients">
                  {record.active_ingredient}
                </Descriptions.Item>
              ) : null}
              {record.inactive_ingredient ? (
                <Descriptions.Item label="Inactive Ingredients">
                  {record.inactive_ingredient}
                </Descriptions.Item>
              ) : null}
              {record.storage_and_handling ? (
                <Descriptions.Item label="Storage and Handling">
                  {record.storage_and_handling}
                </Descriptions.Item>
              ) : null}
            </Descriptions>
          )}
        />
      </div>
    );
  }
}

export default ContenListingComponent;
