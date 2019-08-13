import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Table, List, Typography, Tag } from 'antd';
import DescriptionListComponent from './DescriptionListComponent';
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
    this.props.store.getData();
  }

  render() {
    return (
      <div className="ContentListingComponent">
        <Table
          bordered
          locale={{ emptyText: 'No more products to display.' }}
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.props.store.results}
          loading={this.props.store.ui.loading}
          expandedRowRender={record => (
            <DescriptionListComponent record={record} />
          )}
        />
      </div>
    );
  }
}

export default observer(ContenListingComponent);
