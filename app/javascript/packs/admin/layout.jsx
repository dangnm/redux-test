import React from 'react';
import { Link } from 'react-router'
import { Menu, Dropdown, Container, Segment, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { showGeneralMessageSelector, autoHiddenMessageVisibleSelector } from './components/global/state'

const Layout = (props) => {
    return (
      <Container fluid>
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
          <Menu.Menu position='right'>
            <Dropdown item text='User'>
              <Dropdown.Menu>
                <Dropdown.Item as='a'
                               href="/admins/sign_out"
                               data-method="delete">
                  Sign out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
        <Container>
          {
            props.showGeneralMessage.visible && props.autoHiddenMessageVisible &&
            <Message
              positive={props.showGeneralMessage.positive}
              negative={props.showGeneralMessage.negative}
              content={props.showGeneralMessage.content} />
          }
          <Segment>
            {props.children}
          </Segment>
        </Container>
      </Container>
    )
};

const mapStateToProps = (state) => {
  return {
    showGeneralMessage: showGeneralMessageSelector(state),
    autoHiddenMessageVisible: autoHiddenMessageVisibleSelector(state),
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    null
  ),
)

export default enhance(Layout);
