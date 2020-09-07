import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Menu from './components/Menu/menu';
import Icon from './components/Icon/icon';
library.add(fas);

function App(): React.ReactElement {
  return (
    <>
      <Icon icon='coffee' theme='primary' size='10x' />
      <div style={{ width: '700px' }}>
        <Menu>
          <Menu.Item>menu item 1</Menu.Item>
          <Menu.Item disabled>menu item 2</Menu.Item>
          <Menu.Item>menu item 3</Menu.Item>
          <Menu.SubMenu title='submenu item 4'>
            <Menu.Item>sub-item 1</Menu.Item>
            <Menu.Item>sub-item 2</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <Menu mode='vertical'>
          <Menu.Item>menu item 1</Menu.Item>
          <Menu.Item disabled>menu item 2</Menu.Item>
          <Menu.Item>menu item 3</Menu.Item>
          <Menu.SubMenu title='submenu item 4' defaultOpen={false}>
            <Menu.Item>sub-item 1</Menu.Item>
            <Menu.Item>sub-item 2</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    </>
  );
}

export default App;
