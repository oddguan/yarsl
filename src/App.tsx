import React from 'react';
import Menu from './components/Menu/menu';

function App(): React.ReactElement {
  return (
    <>
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
