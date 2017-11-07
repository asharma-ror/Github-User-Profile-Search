import React, {Component} from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';
import get from 'lodash/fp/get';

import Styles from './styles';

import Loader from './loader';
import Avatar from './avatar';
import UserStats from './userStats';
import WeatherInfo from './weatherInfo';
import ProfileContainer from './repositary';

import {getUserProfile} from '../actions';

const getUsername = get('match.params.username');

class DisplayUserDetails extends Component {

  renderUserProfile(userProfile) {
    const {repos, repoEntities} = this.props;
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

    const {weather} = this.props;

    console.log('this.props.weather',this.props.weather)

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
          <WeatherInfo
            width={'300px'}
            weatherInfo={weather && weather.result}
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
    );
  }

  renderError(error, text) {
    if (error.response.status === 404) {
      return (
        <div style={Styles.loaderStyle}>
          <h3>{`${text} Not Found`}</h3>
        </div>
      );
    } else {
      return (
        <div style={Styles.loaderStyle}>
          <h3>Something went wrong. Please try again!</h3>
        </div>
      );
    }
  }

  render() {
    const {isPending, error, userProfile} = this.props.profile;
    let contents;

    if (error) {
      contents = this.renderError(error, 'Profile');
    } else {
      contents = this.renderUserProfile(userProfile);
    }

    return (
      <div>
        <Loader loaderStyle={Styles.loaderStyle} display={isPending}/>
        {!isPending && contents}
      </div> 
    )
  }

  componentDidMount() {
    if (_.isEmpty(this.props.profile.userProfile)) {
      this.props.getUserProfile(getUsername(this.props));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    repos: state.repos,
    repoEntities: state.entities.repos,
    weather: state.weather
  }  
};

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (username) => dispatch(getUserProfile(username)),
});

export default connect(mapStateToProps, mapDispatchToProps) (DisplayUserDetails);
