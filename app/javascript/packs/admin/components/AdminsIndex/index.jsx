import React from 'react';
import { Table } from 'semantic-ui-react';
import { camelizeKeys } from 'humps';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { apiAdminsSelector,
         apiAdminsPagerSelector,
         fetchAdmins,
         mockAdminsUpdater,
         mockAdmins } from './state';
import Pager from './../../../modules/pager';

class AdminsIndex extends React.Component {
    componentDidMount() {
        this.props.fetchAdmins(1);
    /* this.props.fetchMockAdmins(); */
    }

    render() {
        const onPagerClick = (page) => {
            this.props.fetchAdmins(page);
        };

        return (
          <div>
            <div className="ui right aligned grid action-box">
              <div className="sixteen wide column">
                <div
                  className="ui button"
                  onClick={this.props.handleOpenNewAdminPage}
                >New Admin</div>
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
                (<Table.Row key={index}>
                  <Table.Cell>{admin.id}</Table.Cell>
                  <Table.Cell>{admin.email}</Table.Cell>
                  <Table.Cell>{admin.createdAt}</Table.Cell>
                </Table.Row>)
              )
            }
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <Pager
                      totalItems={this.props.pager.totalItems}
                      pageIndex={this.props.pager.pageIndex}
                      itemsPerPage={this.props.pager.itemsPerPage}
                      onClick={onPagerClick}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    admins: camelizeKeys(apiAdminsSelector(state)),
    pager: camelizeKeys(apiAdminsPagerSelector(state)),
});

const mapDispatchToProps = (dispatch) => ({
    fetchAdmins: (page) => dispatch(fetchAdmins(page)),
    fetchMockAdmins: () => dispatch(mockAdminsUpdater(mockAdmins)),
    handleOpenNewAdminPage: () => dispatch(push('/admins/new')),
});

const ConnectedAdminsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminsIndex);

export default ConnectedAdminsIndex;
