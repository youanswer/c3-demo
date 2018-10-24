import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FEED_QUERY } from './UserList';

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    CreateUser(input: $input) {
      ID
      Login
      AvatarURL
    }
  }
`;

class CreateUserComponent extends Component {
  state = {
    Login: '',
    AvatarURL: '',
  }

  render() {
    const { Login, AvatarURL } = this.state;
    return (
      <div className="user-container">
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={Login}
            onChange={e => this.setState({ Login: e.target.value })}
            type="text"
            placeholder="Login of new user"
          />
          <input
            className="mb2"
            value={AvatarURL}
            onChange={e => this.setState({ AvatarURL: e.target.value })}
            type="text"
            placeholder="AvatarURL of new user"
          />
          <Mutation
            mutation={CREATE_USER_MUTATION}
            variables={{ input: { Login, AvatarURL } }}
            onCompleted={() => this.props.history.push('/')}
            update={(store, { data: { CreateUser } }) => {
              const data = store.readQuery({ query: FEED_QUERY });
              data.Users.unshift(CreateUser);

              store.writeQuery({ query: FEED_QUERY, data });
            }}
          >
            {createMutation => (
              <button onClick={createMutation} className="pure-button mb2 flex pa1">
                Create User
              </button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

CreateUserComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export default CreateUserComponent;
