import React from 'react';
import {Spin} from 'antd';

const Loader = ({display, loaderStyle}) => {
  return (
    <div>
      {display &&
        <div style={loaderStyle}>
          <Spin/>
        </div>
      }
    </div>
  );
}

export default Loader;
