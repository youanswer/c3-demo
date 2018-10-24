import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { SPINNER } from '../constants';
import User from './User';

export const FEED_QUERY = gql`
  {
    Users {
      ID
      Login
      AvatarURL
    }
  }
`;

class UserList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div className="spinner"><img alt="loading..." src={SPINNER} /></div>;
          if (error) return <div>Error</div>;

          const usersToRender = data.Users;

          return (
            <div>
              {usersToRender.map(user => <User key={user.ID} user={user} />)}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default UserList;
