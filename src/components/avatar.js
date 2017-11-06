import React from 'react';
import {Card} from 'antd';

const Avatar = ({url, userName, fullName, email, alt, width}) => {
  return (
    <Card 
      style={{width}} 
      bodyStyle={{padding: 0}}
    > 
      <div className="custom-image"> 
        <img 
          alt={alt} 
          width="100%" 
          src={url}
        /> 
      </div> 
      <div className="custom-card"> 
        <h3>{fullName}</h3> 
        <h3>{userName}</h3> 
        <h3>{email}</h3> 
      </div> 
    </Card>
  );
}

export default Avatar;
