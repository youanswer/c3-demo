import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { isValidUrl } from '../utils';
import { DEFAULT_AVATAR, SPINNER } from '../constants';
import { FEED_QUERY } from './UserList';

const USER_QUERY = gql`
  query GetUserQuery($ID: ID!) {
    User(id: $ID) {
      ID
      Login
      AvatarURL
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($ID: ID!) {
    DeleteUser(id: $ID) {
      ID
      Login
      AvatarURL
    }
  }
`;

class UserDetails extends Component {
  _getQueryVariables = () => {
    const { match } = this.props;
    return { ID: match.params.id };
  }

  render() {
    return (
      <Query query={USER_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data }) => {
          if (loading) return <div className="spinner"><img alt="spinner" src={SPINNER} /></div>;
          if (error) return <div>Error</div>;

          const user = data.User;

          return (
            <div className="user-container background-gray">
              <div className="user-details-avatar">
                <img
                  src={isValidUrl(user.AvatarURL) ? user.AvatarURL : DEFAULT_AVATAR}
                  alt="avatar"
                />
              </div>
              <div className="user-text">
                <div>
                  ID: {user.ID}
                </div>
                <div className="f6 lh-copy gray">
                  Login: {user.Login} <br />
                </div>
                <Mutation
                  mutation={DELETE_USER_MUTATION}
                  variables={{ ID: user.ID }}
                  onCompleted={() => this.props.history.push('/')}
                  update={(store, { data: { DeleteUser } }) => {
                    const storeData = store.readQuery({ query: FEED_QUERY });
                    const index = storeData.Users.findIndex(usr => usr.ID === DeleteUser.ID);
                    storeData.Users.splice(index, 1);

                    store.writeQuery({ query: FEED_QUERY, data: storeData });
                  }}
                >
                  {deleteMutation => (
                    <button onClick={deleteMutation} className="pure-button">
                      Delete User
                    </button>
                  )}
                </Mutation>

              </div>

            </div>
          );
        }}
      </Query>
    );
  }
}

UserDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
};


export default UserDetails;
