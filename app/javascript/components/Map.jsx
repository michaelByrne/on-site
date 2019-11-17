import React, { Component } from 'react';
import MapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import Pin from './Pin';
import Info from './Info';

const TOKEN = 'pk.eyJ1IjoiZ29mcmVlc2NvdXQiLCJhIjoiY2szMjN4NHA1MDhkajNibW14cm1lZHU3MyJ9.LK3aEnGnIsxewQa5yi6Ktw';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 47.6019,
        longitude: -122.336,
        zoom: 10,
        bearing: 0,
        pitch: 0,
        width: 800,
        height: 800,
      },
      popupInfo: null,
    };
  }

  renderMarker = (property) => {
    const { lat, long } = property;

    return (
      <Marker key={`${lat}${long}`} longitude={parseFloat(long)} latitude={parseFloat(lat)} offsetTop={0} offsetLeft={0}>
        <Pin size={20} onClick={() => this.setState({ popupInfo: property })} />
      </Marker>
    )
  }

  updateViewport = viewport => {
    this.setState({ viewport });
  };

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={15}
          anchor="top"
          longitude={parseFloat(popupInfo.long)}
          latitude={parseFloat(popupInfo.lat)}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <Info info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    const { properties } = this.props;

    return (
      <MapGL
        mapboxApiAccessToken={TOKEN}
        {...viewport}
        onViewportChange={this.updateViewport}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl />
          {properties.map(p => this.renderMarker(p))}
          {this.renderPopup()}
        </div>
      </MapGL>
    );
  }
}
