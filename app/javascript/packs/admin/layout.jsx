import React from 'react';

const Layout = (props) => {
    return (
      <div>
        <div>
          <h2>Layout 22</h2>
        </div>
        <div style={{ marginTop: '1.5em' }}>{props.children}</div>
      </div>
    )
};

export default Layout


