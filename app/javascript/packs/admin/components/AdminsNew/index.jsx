import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { flow, path, filter } from 'lodash/fp';
import { createAdmin, createAdminErrorSelector } from './state';
import { xCFRSTokenSelector, autoHiddenMessageVisibleSelector } from './../global/state';

export const adminsFormValidate = ({ email }) => ({
    email: !email && 'This field is required',
});

const errorMessageFromSubmitError = (submitError, fieldName) =>
  flow(path('error.errors'), filter({ location: fieldName, location_type: 'field' }), path('[0].message'))(submitError);

const hasSubmitError = (submitError) =>
  (flow(path('error.errors'))(submitError) !== undefined);

export const RenderField = ({
  input,
  type,
  placeholder,
  submitError,
  autoHiddenMessageVisible,
  meta: { touched, error, warning },
}) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} />
    {
      touched &&
      (
        (error && <Message error size="mini" content={error} />) ||
        (warning && <Message warning size="mini" content={warning} />)
      )
    }
    {
      errorMessageFromSubmitError(submitError, input.name) &&
      autoHiddenMessageVisible &&
      (
        <Message error size="mini" content={errorMessageFromSubmitError(submitError, input.name)} />
      )
    }
  </div>
);

class AdminsNew extends React.Component {
    render() {
        return (
          <div>
            <Form
              error={!this.props.valid || hasSubmitError(this.props.createAdminSubmitError)}
              onSubmit={
                this.props.handleSubmit(
                  values => this.props.handleMySubmit(values, this.props.xCSRFToken)
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
                      submitError: this.props.createAdminSubmitError,
                      autoHiddenMessageVisible: this.props.autoHiddenMessageVisible,
                  }
              }
                  type="text"
                  placeholder="Email"
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  component={RenderField}
                  props={
                  {
                      submitError: this.props.createAdminSubmitError,
                      autoHiddenMessageVisible: this.props.autoHiddenMessageVisible,
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
                      submitError: this.props.createAdminSubmitError,
                      autoHiddenMessageVisible: this.props.autoHiddenMessageVisible,
                  }
              }
                  type="password"
                  placeholder="Password confirmation"
                />
              </Form.Field>
              <Form.Button type="submit" disabled={this.props.submitting}>Save</Form.Button>
            </Form>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    xCSRFToken: xCFRSTokenSelector(state),
    autoHiddenMessageVisible: autoHiddenMessageVisibleSelector(state),
    createAdminSubmitError: createAdminErrorSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    handleMySubmit: (values, csrfToken) => { dispatch(createAdmin(values, csrfToken)); },
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm(
      {
          form: 'AdminNew',
          validate: adminsFormValidate,
      },
  )
);

export default enhance(AdminsNew);
