import React from 'react';
import { observable, decorate, action } from 'mobx';
import { Tag, Typography, List } from 'antd';

class ContentUiStore {
  constructor() {
    this.loading = false;
    const { Text } = Typography;
    this.columns = [
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
  }

  setLoading(value) {
    this.loading = value;
  }
}

export default decorate(ContentUiStore, {
  columns: observable,
  loading: observable,
  setLoading: action
});
