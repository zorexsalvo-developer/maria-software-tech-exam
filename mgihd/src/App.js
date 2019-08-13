import React, { Component } from 'react';
import PageHeaderComponent from './components/PageHeaderComponent';
import SearchComponent from './components/SearchComponent';
import ContentListingComponent from './components/ContentListingComponent';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'antd';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PageHeaderComponent />
        <Row>
          <Col span={16} offset={4}>
            <SearchComponent store={this.props.store.content} />
          </Col>
        </Row>
        <Row>
          <Col span={18} offset={3}>
            <ContentListingComponent store={this.props.store.content} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default inject('store')(observer(App));
