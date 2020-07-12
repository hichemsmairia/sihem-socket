import React, { Component } from "react";
import socketIOClient from 'socket.io-client'
import ReactMapGL, { GeolocateControl,NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css"
import { Button } from 'reactstrap';

const socket =  socketIOClient("http://localhost:5000")

class PatientAskHelp extends Component {
  constructor(props) {
    super(props)
    this.state = {
        displayName : "",
        address : "",
        addressPatient : "",
        viewport: {
          width : "75vw",
          height : "75vh",
          latitude: 75.03,
          longitude: 12.04,
          zoom : 10
      },
      userLocation : {},
      ambulanceLocation : {
      }
    }
}

componentDidMount() {

  
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      this.setState({latitude:position.coords.latitude})
      this.setState({longitude:position.coords.longitude})
    });
  

  socket.on("request-sent",(data) => {
    var setAmbulanceLocation = {
      latitude : data.ambulanceLocation.latitude,
      longitude : data.ambulanceLocation.longitude
    }
    this.setState ({
        displayName : data.displayName,
        address : data.address,
        ambulanceLocation : setAmbulanceLocation
    })
  })
}

requestforHelp = () => {
  var requestDetails = {
      patientId : "1",
      patientName : "Random",
      location: {
          addressPatient: this.state.addressPatient,
          userLocation : this.state.userLocation
      }
  }
  //Emitting the request event
  //@App Component
  socket.emit("request-for-help",requestDetails);
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


render() {
  console.log(this.state.ambulanceLocation.latitude)
  const {displayName,address} = this.state;
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={this.requestforHelp}>Request For Help</button>
      <div class="heading">
      {displayName && address ? (
        <div>
           <h3>{displayName} is coming to take you</h3>
           <h3> It is here - {address}</h3> 
        </div>
      ) : (
        <h3> </h3>
      )}
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
            latitude={this.state.ambulanceLocation.latitude}
            longitude={this.state.ambulanceLocation.longitude}
          >
            <img className="marker" src="ambulancemarker.png"></img>
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
  );
}
}

export default PatientAskHelp;