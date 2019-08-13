import React, { Component } from 'react';
import { Descriptions, Typography } from 'antd';

const { Text } = Typography;

export default class DescriptionListComponent extends Component {
  render() {
    const { record } = this.props;
    return (
      <Descriptions title="Drugs Information" layout="vertical" bordered>
        {record.indications_and_usage ? (
          <Descriptions.Item label="Indications And Usage">
            {record.indications_and_usage}
          </Descriptions.Item>
        ) : null}
        {record.warnings ? (
          <Descriptions.Item label="Warnings">
            <Text type="danger">{record.warnings}</Text>
          </Descriptions.Item>
        ) : null}
        {record.purpose ? (
          <Descriptions.Item label="Purpose">
            {record.purpose}
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
    );
  }
}
