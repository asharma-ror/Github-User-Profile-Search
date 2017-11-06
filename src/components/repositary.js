import React, {Component} from 'react';
import get from 'lodash/fp/get';

import ItemList from './listItem';

import Repo from './repos';

// import Loading from './Loading';

const getUsername = get('match.params.username');


export default class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    // this.props.getProfile(getUsername(props));
  }

  componentWillReceiveProps(nextProps) {
    const username = getUsername(this.props);
    const nextUsername = getUsername(nextProps);

    if (username !== nextUsername) {
      this.props.getProfile(nextUsername);
    }
  }

  renderProfile() {
    if (this.props.userIsPending) {
      return (
        <div>Lodaing....</div>
      );
    }

    const {
      repoIsPending,
      repoEntities,
      repoIds,
    } = this.props;

    return (
      <div className={'repos'}>
        <h2 className={'content-title'}>Repositories</h2>
          <ItemList
            entities={repoEntities}
            ids={repoIds}
            isPending={repoIsPending}
            component={Repo}
          />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderProfile()}
      </div>
    );
  }

}

// const styles = StyleSheet.create({
//   Profile_wrapLoading: {
//     marginTop: 25,
//   },

//   Profile_repos: {
//     marginBottom: 20,

//     [viewport.SM]: {
//       marginBottom: 0,
//     },
//   },

//   Profile_contentTitle: {
//     fontSize: 22,
//     fontWeight: 400,
//     marginBottom: 25,
//   },

//   Profile_content: {
//     paddingTop: 20,
//   },

//   Profile_container: {
//     paddingTop: 15,
//   },
// });
