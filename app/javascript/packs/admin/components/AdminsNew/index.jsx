import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

class AdminsNew extends React.Component {
  render() {
    return(
      <div>
        <Form>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type='password' placeholder='Password' />
          </Form.Field>
          <Form.Field>
            <label>Password confirmation</label>
            <input type='password' placeholder='Password confirmation' />
          </Form.Field>
          <Form.Button>Save</Form.Button>
        </Form>
      </div>
    )
  }
}

export default AdminsNew;
