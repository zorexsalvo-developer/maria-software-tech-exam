import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './PageHeaderComponent.scss';

class PageHeaderComponent extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="email" className="PageHeader">
          <Icon type="medicine-box" />
          My Gad, I Hate Drugs!
        </Menu.Item>
      </Menu>
    );
  }
}

export default PageHeaderComponent;
