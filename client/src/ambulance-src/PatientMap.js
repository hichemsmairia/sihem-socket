import React, { Component } from "react";
import socketIOClient from 'socket.io-client'
import ReactMapGL, { GeolocateControl,NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css"
import { Button } from 'reactstrap';

const socket =  socketIOClient("http://localhost:4000/patientmap")

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

componentDidMount() {
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
  console.log("demande du reservation du taxi declenché")
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
  console.log(this.state.addressPatient)
  console.log(this.state.userLocation)
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
  //console.log(this.state.ambulanceLocation.latitude)
  const {displayName,address} = this.state;
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={()=>this.requestforHelp()}>Reserver une taxi</button>
      <div>
      --  vous localosation est en longitude : {this.state.userLocation.longitude}
      </div>
      <div>
      --  vous localosation est en latitude : {this.state.userLocation.latitude}

      </div>
      
      <div class="heading">
      {displayName && address ? (
        <div>
           <h3>le taxi {displayName} est en route pour vous  </h3>
           <h3> c'est a :  {address}</h3> 
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

export default PatientMap;