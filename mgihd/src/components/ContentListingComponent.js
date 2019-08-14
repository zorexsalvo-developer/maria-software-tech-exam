import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import DescriptionListComponent from './DescriptionListComponent';
import InfiniteScroll from 'react-infinite-scroller';
import './ContentListingComponent.scss';

class ContenListingComponent extends Component {
  componentDidMount() {
    this.props.store.getData();
    this.props.store.showDisclaimer();
  }

  loadMore = () => {
    console.log('loading...');
    this.props.store.loadMore();
  };

  render() {
    return (
      <div className="ContentListingComponent">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={this.props.store.hasMore}
          useWindow={true}
          threshold={0}
        >
          <Table
            bordered
            initialLoad={false}
            locale={{ emptyText: 'No products to display.' }}
            columns={this.props.store.ui.columns}
            rowKey={record => record.id}
            dataSource={this.props.store.results}
            loading={this.props.store.ui.loading}
            pagination={false}
            expandedRowRender={record => (
              <DescriptionListComponent record={record} />
            )}
          />
        </InfiniteScroll>
      </div>
    );
  }
}

export default observer(ContenListingComponent);
