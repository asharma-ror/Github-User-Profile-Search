import React from 'react';
import {Card} from 'antd';

const UserStats = ({followers, following, repos, width}) => {
  return (
    <Card 
      style={{width}} 
      bodyStyle={{padding: 0}}
    > 
      <div className="custom-card"> 
        <h3>{`Followers - ${followers}`}</h3> 
        <h3>{`Following - ${following}`}</h3> 
        <h3>{`Repos - ${repos}`}</h3> 
      </div> 
    </Card>
  );
}

export default UserStats;
