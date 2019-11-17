import React, {PureComponent} from 'react';

export default class Info extends PureComponent {
  render() {
    const {info} = this.props;

    return (
      <div className="info-pop">
          <div className="info-item">{info.use}</div> 
          <div className="info-item">{info.org}</div>
      </div>
    );
  }
}