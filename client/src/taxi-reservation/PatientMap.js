import React, { Component } from "react";
import socketIOClient from 'socket.io-client'
import ReactMapGL, { GeolocateControl,NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios"

import { Button } from 'reactstrap';


class PatientMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
        displayName : "",
        address : "",
        addressPatient : "",
        viewport: {
          width : "75vw",
          height : "75vh",
          latitude: 35.502995,
          longitude: 11.054254,
          zoom : 10
      },
      userLocation : {},
      ambulanceLocation : {
      }
    }
}





//Map Integration
mapRef = React.createRef()
 



  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }


handleOnResult = (event) => {
  var patientLocation = {
    latitude : event.result.center[1],
    longitude : event.result.center[0]
  }
  this.setState({
    addressPatient : event.result.place_name,
    userLocation : patientLocation
  })
  
  
}



SaveReservation = (e) => {
e.preventDefault() 
  const userObject = {
    longitude: this.state.userLocation.longitude,
    latitude: this.state.userLocation.latitude
  };
  axios.post('http://localhost:3001/api/reservation', userObject)
  .then((res) => {
    console.log("reservation termine avec succes")
      console.log(res.data)
  }).catch((error) => {
      console.log(error)
  });
}



render() {
  
  const {displayName,address} = this.state;
  return (
    <div className="container">
      <br></br>
      <br></br>
      latitude : 
      {this.state.userLocation.latitude}
      
      longitude : 
      {this.state.userLocation.longitude}
    <div class="row">
      
      <button type="button" className="btn btn-primary" onClick={this.requestforHelp}>Reserver une taxi</button>
      <button type="button" className="btn btn-primary" onClick={this.SaveReservation}>Reserver une taxi</button>
      <div class="heading">
      
      </div>
      <div className = "map">
        <ReactMapGL
          {...this.state.viewport}
          ref={this.mapRef}
          onViewportChange = {viewport => this.setState({
            viewport
          })}
          mapStyle = "mapbox://styles/mapbox/navigation-preview-day-v2"
          mapboxApiAccessToken = "pk.eyJ1Ijoia2cta2FydGlrIiwiYSI6ImNrOGdicTdwZjAwMGUzZW1wZmxpMDdvajcifQ.7FtdVDqPnZh4pCtTtcNf4g">
          

        <Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1Ijoia2cta2FydGlrIiwiYSI6ImNrOGdicTdwZjAwMGUzZW1wZmxpMDdvajcifQ.7FtdVDqPnZh4pCtTtcNf4g"
        />

            {Object.keys(this.state.ambulanceLocation).length !== 0 ? (
          <Marker
            latitude={this.state.userLocation.latitude}
            longitude={this.state.userLocation.longitude}
          >
            <img className="marker"  style={{width:"75px"}} src="ambulancemarker.png"></img>
          </Marker>
        ) : ( 
          <Marker
            latitude={this.state.viewport.latitude}
            longitude={this.state.viewport.longitude}
          >
            <img className="marker" src="logo.png"></img>
          </Marker>
        )}

        </ReactMapGL>
      </div>
  </div>
  </div>
  );
}
}

export default PatientMap;