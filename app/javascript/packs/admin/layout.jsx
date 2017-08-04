import React from 'react';
import { Link } from 'react-router'

const Layout = (props) => {
    return (
      <div className="ui containter">
        <div className="ui menu">
          <Link className="item" to="/">Dashboard</Link>
          <Link className="item" to="/about">About</Link>
        </div>
        <div className="ui container segment main-container">
          {props.children}
        </div>
      </div>
    )
};

export default Layout


