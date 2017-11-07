import React, {Component} from 'react';

import ItemList from './listItem';

import Repo from './repos';

import Styles from './styles';

import Loader from './loader';


export default class ProfileContainer extends Component {

  constructor(props) {
    super(props);
  }

  renderProfile() {
    const {
      repoIsPending,
      repoEntities,
      repoIds,
      userIsPending,
    } = this.props;

    return (
      <div>
        <Loader loaderStyle={Styles.loaderStyle} display={userIsPending}/>
        {!userIsPending && <div className={'repos'}>
          <h2 className={'content-title'}>Repositories</h2>
            <ItemList
              entities={repoEntities}
              ids={repoIds}
              isPending={repoIsPending}
              component={Repo}
            />
        </div>}
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
