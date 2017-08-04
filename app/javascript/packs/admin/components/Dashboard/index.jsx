import React from 'react';

class Dashboard extends React.Component {
  render() {
    return(
      <div>
        <div className="ui right aligned grid action-box">
          <div className="sixteen wide column">
            <div className="ui button">New Admin</div>
          </div>
        </div>
        <p>Hello Dashboard</p>
      </div>
    );
  }
}

export default Dashboard;
