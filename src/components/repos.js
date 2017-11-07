import React from 'react';

import parse from 'date-fns/parse';
import distanceInWords from 'date-fns/distance_in_words';

import forkIcon from './repo-forked.svg';
import starIcon from './star.svg';

const renderFooterItem = (icon, text) => {
  return (
    <div className={'repo-item-footer'}>
      <img
        alt={'icon'}
        src={icon}
        width={18}
        height={18}
        className={'repo-item-footer-icon'}
      />
      <p>{text}</p>
    </div>
  );
}

const Repo = (props: Props) => {
  const {
    description,
    fork,
    html_url,
    language,
    name,
    stargazers_count,
    pushed_at,
    forks_count,
  } = props;

  const pushedDate = distanceInWords(parse(pushed_at), new Date());

  return (
    <div>
      <p className={'repo-item-name'}>
        <a href={html_url}>{name}</a>
        {
          fork
          ? <span className={'repo-item-fork'}>(fork)</span>
          : null
        }
      </p>
      {
        description
        ? <p className={'repo-item-desc'}>{description}</p>
        : null
      }
      <div className={'repo-item-footer'}>
        {
          language
          ? <p className={'repo-item-footer'}>{language}</p>
          : null
        }
        {renderFooterItem(starIcon, stargazers_count)}
        {renderFooterItem(forkIcon, forks_count)}
        <p className={'repo-item-last-update'}>last push {pushedDate} ago</p>
      </div>
    </div>
  );
}

export default Repo;
