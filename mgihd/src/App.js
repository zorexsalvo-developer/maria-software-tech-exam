import React from 'react';
import PageHeaderComponent from './components/PageHeaderComponent';
import SearchComponent from './components/SearchComponent';
import { Row, Col } from 'antd';
import './App.css';

function App() {
  return (
    <div className="App">
      <PageHeaderComponent />
      <Row>
        <Col span={12} offset={6}>
          <SearchComponent />
        </Col>
      </Row>
    </div>
  );
}

export default App;
