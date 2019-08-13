import React from 'react';
import PageHeaderComponent from './components/PageHeaderComponent';
import SearchComponent from './components/SearchComponent';
import ContentListingComponent from './components/ContentListingComponent';
import { Row, Col } from 'antd';
import './App.css';

function App() {
  return (
    <div className="App">
      <PageHeaderComponent />
      <Row>
        <Col span={16} offset={4}>
          <SearchComponent />
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <ContentListingComponent />
        </Col>
      </Row>
    </div>
  );
}

export default App;
