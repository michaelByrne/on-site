import React from 'react';

const Info = ({ info }) => {
  return (
    <div className="info-pop">
      <div className="info-item">{info.use}</div>
      <div className="info-item">{info.org}</div>
    </div>
  )
}

export default Info;