import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    return (
      <div className="flex pa1 nowrap blue">
        <div className="flex flex-fixed black">
          <Link to="/" className="ml1 no-underline black">
            <div className="fw7 mr1">Demo Users</div>
          </Link>
        </div>
        <div className="divider">|</div>
        <Link to="/create" className="no-underline black">
            Create User
        </Link>
      </div>
    );
  }
}

export default withRouter(Header);
