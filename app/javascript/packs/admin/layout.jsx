import React from 'react';
import { Link } from 'react-router'
import { Menu, Dropdown } from 'semantic-ui-react'

const Layout = (props) => {
    return (
      <div className="ui containter">
        <Menu>
          <Menu.Item as={Link} to="/">
            Dashboard
          </Menu.Item>
          <Menu.Item as={Link} to="/about">
            About
          </Menu.Item>
          <Dropdown item text='Accounts'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/admins">Admins</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
        <div className="ui container segment main-container">
          {props.children}
        </div>
      </div>
    )
};

export default Layout


