import React, { Component } from "react";
import axios from "axios"
import socketIOClient from 'socket.io-client'
import ReactMapGL, { GeolocateControl,NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Button } from 'reactstrap';

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
        latitude: 35.487789,
        longitude: 10.962243,
        zoom : 10
      },
      userLocation : {},
      ambulanceLocation : {}
    };
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
        <h3> c'est a  - {address} </h3> 
      </div> )
        : (<h5> Aquisation des informations a propos le taxi  </h5>
        )}

      {
        patientId && residence ? (
          <div>
            <h3> {patientId} needs your help</h3>
            <h3> Location - {residence} </h3>
          </div>
        ) : (<h5> Mise a jours des reservations en temps reelle</h5>)
      }    
    </div>
      <button type="button" className="btn btn-success" >Accepter la reservation</button>

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
            <img className="marker" src="patient.png"></img>
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