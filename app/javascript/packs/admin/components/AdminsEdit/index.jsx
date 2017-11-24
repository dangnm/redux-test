import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { flow, path } from 'lodash/fp';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import lifecycle from 'recompose/lifecycle';
import mapProps from 'recompose/mapProps';
import { camelizeKeys } from 'humps';
import css from 'css-template';
import { adminsFormValidate, RenderField } from '../AdminsNew';
import spinner from './../../../modules/spinner';
import { updateAdmin,
         updateAdminErrorSelector,
         fetchAdmin,
         apiFetchAdminSelector,
         isAdminFetchingSelector,
} from './state';
import { xCFRSTokenSelector, autoHiddenMessageVisibleSelector } from './../global/state';

const spinnerStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
`;

const hasSubmitError = (submitError) =>
  (flow(path('error.errors'))(submitError) !== undefined);

const AdminsEdit = (
  {
    valid,
    editAdminSubmitError,
    handleSubmit,
    handleMySubmit,
    xCSRFToken,
    updateAdminSubmitError,
    autoHiddenMessageVisible,
    submitting,
    params: {
      id
    }
  }) => (
  <div>
    <Form
      error={!valid || hasSubmitError(editAdminSubmitError)}
      onSubmit={
        handleSubmit(
          values => handleMySubmit({id: id, ...values}, xCSRFToken)
        )
      }
    >
      <Form.Field>
        <label htmlFor="email">Email</label>
        <Field
          name="email"
          component={RenderField}
          props={
            {
              submitError: updateAdminSubmitError,
              autoHiddenMessageVisible: autoHiddenMessageVisible,
            }
          }
          type="text"
          placeholder="Email"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="firstName">First name</label>
        <Field
          name="firstName"
          component={RenderField}
          props={
            {
              submitError: updateAdminSubmitError,
              autoHiddenMessageVisible: autoHiddenMessageVisible,
            }
          }
          type="text"
          placeholder="First name"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="lastName">Last name</label>
        <Field
          name="lastName"
          component={RenderField}
          props={
            {
              submitError: updateAdminSubmitError,
              autoHiddenMessageVisible: autoHiddenMessageVisible,
            }
          }
          type="text"
          placeholder="Last name"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          component={RenderField}
          props={
            {
              submitError: updateAdminSubmitError,
              autoHiddenMessageVisible: autoHiddenMessageVisible,
            }
          }
          type="password"
          placeholder="Password"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="email">Password confirmation</label>
        <Field
          name="passwordConfirmation"
          component={RenderField}
          props={
            {
              submitError: updateAdminSubmitError,
              autoHiddenMessageVisible: autoHiddenMessageVisible,
            }
          }
          type="password"
          placeholder="Password confirmation"
        />
      </Form.Field>
      <Form.Button type="submit" disabled={submitting}>Save</Form.Button>
    </Form>
  </div>
);

const mapStateToProps = (state) => ({
    xCSRFToken: xCFRSTokenSelector(state),
    autoHiddenMessageVisible: autoHiddenMessageVisibleSelector(state),
    updateAdminSubmitError: updateAdminErrorSelector(state),
    admin: camelizeKeys(apiFetchAdminSelector(state)),
    isAdminFetching: isAdminFetchingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    handleMySubmit: (values, csrfToken) => { dispatch(updateAdmin(values, csrfToken)); },
    fetchAdmin: (id) => { dispatch(fetchAdmin(id)); },
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      this.props.fetchAdmin(this.props.params.id);
    },
  }),
  mapProps(
    ({
      admin,
      isAdminFetching,
      ...others
    }) => ({
      admin,
      initialValues: {
        email: path('data.email')(admin),
        firstName: path('data.firstName')(admin),
        lastName: path('data.lastName')(admin),
      },
      isFetching: admin == null || isAdminFetching,
      ...others
    })
  ),
  spinner(
    () => {},
    path('isFetching'),
    { spinnerStyles }
  ),
  reduxForm(
      {
          form: 'AdminEdit',
      },
  ),
);

export default enhance(AdminsEdit);
