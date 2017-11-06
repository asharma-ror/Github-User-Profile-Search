import React, {Component} from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {Input, Form, Button} from 'antd';

import Styles from './styles';

import Avatar from './avatar';
import UserStats from './userStats';
import ProfileContainer from './repositary';

class DisplayUserDetails extends Component {

  render() {
    const {profile, repos, repoEntities} = this.props;
    const {isPending, error, userProfile} = profile;

    const {
      name, 
      login, 
      email, 
      followers, 
      following, 
      location,
      avatar_url,
      public_repos
    } = userProfile;

    const {isPending: repoStatus, result} = repos;

    return (
      <div className={'user-details'}>
        <div>
          <Avatar 
            fullName={name}
            userName={login}
            email={email}
            url={avatar_url} 
            alt='Github_user_image' 
            width={'300px'}
          />
          <UserStats
            width={'300px'}
            followers={followers}
            following={following}
            location={location}
            repos={public_repos}
          />
        </div>
        <div className={'repo-details'}>
          <ProfileContainer
            repoIsPending={repoStatus}
            repoEntities={repoEntities}
            repoIds={result}
          />
        </div>
      </div> 
    )
  }

}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    repos: state.repos,
    repoEntities: state.entities.repos,
  }  
};

export default connect(mapStateToProps) (DisplayUserDetails);



