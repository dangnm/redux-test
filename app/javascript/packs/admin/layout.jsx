import React from 'react';
import { Link } from 'react-router'

const Layout = (props) => {
    return (
      <div>
        <div>
          <h2>Layout 22</h2>
        </div>
        <header>
          Links:
          {' '}
          <Link to="/">Dashboard</Link>
          {' '}
          <Link to="/about">About</Link>
        </header>
        <div style={{ marginTop: '1.5em' }}>{props.children}</div>
      </div>
    )
};

export default Layout


