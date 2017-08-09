import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { adminsSelector } from './state';
import { connect } from 'react-redux';


class AdminsIndex extends React.Component {
  render() {
    return(
      <div>
        <div className="ui right aligned grid action-box">
          <div className="sixteen wide column">
            <div className="ui button">New Admin</div>
          </div>
        </div>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.props.admins.map((admin, index) =>
                <Table.Row>
                  <Table.Cell>{admin.id}</Table.Cell>
                  <Table.Cell>{admin.email}</Table.Cell>
                  <Table.Cell>{admin.created_at}</Table.Cell>
                </Table.Row>
              )
            }
          </Table.Body>
        </Table>
        <p>Admin Index</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admins: adminsSelector(state)
  };
};

const ConnectedAdminsIndex = connect(
  mapStateToProps,
  null
)(AdminsIndex);

export default ConnectedAdminsIndex;
