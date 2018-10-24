import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isValidUrl } from '../utils';
import { DEFAULT_AVATAR } from '../constants';

const User = ({ user }) => (
  <div className="user-container  background-gray">
    <div className="user-avatar">
      <img
        src={isValidUrl(user.AvatarURL) ? user.AvatarURL : DEFAULT_AVATAR}
        alt="avatar"
      />
    </div>
    <div className="user-text">
      <div>
        ID: {user.ID}
      </div>
      <div className="gray">
        Login: {user.Login} <br />
      </div>
      <Link to={`/user/${user.ID}`} className="pure-button">
        View Details
      </Link>
    </div>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    ID: PropTypes.string.isRequired,
    Login: PropTypes.string.isRequired,
    AvatarURL: PropTypes.string,
  }).isRequired,
};

export default User;
