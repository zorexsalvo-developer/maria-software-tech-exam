import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import DescriptionListComponent from './DescriptionListComponent';
import './ContentListingComponent.scss';

class ContenListingComponent extends Component {
  componentDidMount() {
    this.props.store.getData();
    this.props.store.showDisclaimer();
  }

  render() {
    return (
      <div className="ContentListingComponent">
        <Table
          bordered
          locale={{ emptyText: 'No more products to display.' }}
          columns={this.props.store.ui.columns}
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
