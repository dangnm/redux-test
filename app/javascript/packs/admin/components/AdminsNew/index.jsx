import React from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import compose from 'recompose/compose';
import { connect } from 'react-redux';

const validate = ({email}) => ({
  email: !email && 'This field is required'
})

const renderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} />
    {
      touched &&
      (
        (error && <Message error content={error} />) ||
        (warning && <Message warning content={warning} />)
      )
    }
  </div>
)

class AdminsNew extends React.Component {
  render() {
    return(
      <div>
        <Form error={!this.props.valid} onSubmit={this.props.handleSubmit(this.props.handleMySubmit)}>
          <Form.Field>
            <label>Email</label>
            <Field
              name="email"
              component={renderField}
              type="text"
              placeholder="Email"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="Password"
            />
          </Form.Field>
          <Form.Field>
            <label>Password confirmation</label>
            <Field
              name="passwordConfirmation"
              component="input"
              type="password"
              placeholder="Password confirmation"
            />
          </Form.Field>
          <Form.Button type="submit" disabled={this.props.submitting}>Save</Form.Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleMySubmit: (values) => { console.log(values); }
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm(
    {
      form: 'AdminNew',
      validate
    },
  )
)

export default enhance(AdminsNew);
