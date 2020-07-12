import React, { Component } from "react";
import axios from "axios"
import socketIOClient from 'socket.io-client'
import ReactMapGL, { GeolocateControl,NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css"
import { Button } from 'reactstrap';
import patient from './patient.png'
const socket =  socketIOClient("http://localhost:4000/taximap")

class TaxiMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName : "",
      address : "",
      patientId : "",
      residence : "",
      viewport: {
        width : "75vw",
        height : "75vh",
        latitude: 12.9716,
        longitude: 77.5946,
        zoom : 10
      },
      userLocation : {},
      ambulanceLocation : {}
    };
  }


componentDidMount() {
 
  axios.get('http://localhost:4000/api/ambulance/info/'+this.props.match.params.ambulanceid)
  .then((response) => {
    var setAmbulanceLocation = {
      latitude : this.state.latitude,
      longitude : this.state.longitude 
    }
      this.setState({
        displayName : response.data.displayName,
        address : response.data.location.address,
        ambulanceLocation : setAmbulanceLocation
      }, () => {
        socket.emit('join', {
          displayName : this.state.displayName
        })
    })
  })
   
socket.on("request", (eventData) =>{
  console.log(eventData.location.userLocation.latitude);
  var setUserLocation = {
    latitude : eventData.location.userLocation.latitude,
    longitude : eventData.location.userLocation.longitude
  }
  this.setState({
    patientId : eventData.patientId,
    residence : eventData.location.addressPatient,
    userLocation : setUserLocation
  })
})
}

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

requestforHelp = () => {
  socket.emit("request-accepted", {
    displayName : this.state.displayName,
    address : this.state.address,
    ambulanceLocation : this.state.ambulanceLocation
  })
}

render() {
  console.log(this.state.userLocation)
  const { address, displayName,patientId,residence} = this.state;
  return (
    <div>
      <div className="heading"> {
      displayName && address ? (
      <div>
        <h3>  {displayName} </h3>
        <h3> It is here - {address} </h3> 
      </div> )
        : (<h5> Fetching Ambulance Details.. </h5>
        )}

      {
        patientId && residence ? (
          <div>
            <h3> {patientId} needs your help</h3>
            <h3> Location - {residence} </h3>
          </div>
        ) : (<h5> Fetching Patient Requests...</h5>)
      }    
    </div>
      <button type="button" className="btn btn-success" onClick={this.requestforHelp}>Help Patient</button>

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

        {Object.keys(this.state.userLocation).length !== 0 ? (
          <Marker
            latitude={this.state.userLocation.latitude}
            longitude={this.state.userLocation.longitude}
          >
            <img className="marker" src={patient}></img>
          </Marker>
        ) : ( 
          <div></div>
        )}
      
      </ReactMapGL>
    </div>
    </div>
  );
}
}

export default TaxiMap;