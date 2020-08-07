import ReactMapGL, { GeolocateControl,NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Importing React since we are using React.
import React, { Component } from "react";
// Importing Navbar component.
import NavBar from '../../Components/AppBar';
// Import DoctorForm
import ReservationForm from './ReservationForm';
// Import LicenseInfo
import ReservationInfo from './ReservationInfo';
// Import ClinicInfo

// Import API
import ReservationsAPI from '../../utils/ReservationsAPI';
import LogoPatient from './logo.png'
import LogoTaxi from './logotaxi.png'
// Import UI components and style from material-ui-next.
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// Import Sidebar component.
import Sidebar from '../../Components/Sidebar';

//Style
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexWrap: 'wrap',
  }),
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#86BBD8',
    padding: theme.spacing.unit * 3,
  },
  doctorMdList: {
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: '#33658A',
  },
  mdSection: {
    marginTop: 45,
  },
});

class ReservationList extends Component {

  state = {

    fulladdress: "",
    longitude: 0,
    latitude: 0,
    FullAddressError: "",
    LongitudeError: "",
    LatitudeError: "",
   reservations: [],
  ReservationFormSuccessMessage: "", 
  viewport: {
    width : "75vw",
    height : "75vh",
    latitude: 35.502995,
    longitude: 11.054254,
    zoom : 10
},
taxi1: {
 
  latitude: 35.825603,
  longitude: 10.808395
  
}, 
taxi2: {
 
  latitude: 35.425603,
  longitude: 10.408395
  
}, 
taxi3: {
 
  latitude: 35.025603,
  longitude: 10.608395
  
},  
    
  };


  // When the component mounts, load all doctors and clinics and save them to this.state.doctors and this.state.clinics.
  componentDidMount() {
    this.loadReservations()
    
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success => this.setState({ latitude: success.coords.latitude, longitude: success.coords.longitude , fulladdress:"via browser gelocalisation" }))
      }
       
        
      
  }

//for rendering licenses list 
  loadReservations = () => {
    ReservationsAPI.getReservations()
      .then(res =>
        this.setState({ reservations: res.data }))
      .catch(err => console.log('there is an issue loading reservations: ' + err));
  };

  // Loads all clinics and saves them to this.state.clinics.
  

  // Deletes a doctor from the database with a given id, then reloads doctors from the db
  deleteReservation = id => {
    ReservationsAPI.deleteReservation(id)
      .then(res => this.loadReservations())
      .catch(err => console.log(err));
  };

  

  // Keep track of what user enters for doctor first name so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleFullAddressChange = (event) => {
    this.setState({ 
      fulladdress: event.target.value,
      FullAddressError: "",
      FullAddressFormSuccessMessage: "",
    });
  }

  // Keep track of what user enters for doctor last name so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleLongitudeChange = (event) => {
    this.setState({ 
      longitude: event.target.value,
      LongitudeError: "",
      LicenseFormSuccessMessage: "",
    });
  }

  // Keep track of what user types into clinic input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  

  // Keep track of what user types into phone input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleLatitudeChange = (event) => {
    this.setState({ 
      latitude: event.target.value,
      LatitudeError: "",
      LicenseFormSuccessMessage: "",
    });
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


handleOnResult = (event) => {
  var patientLocation = {
    address : event.result.place_name,
    latitude : event.result.center[1],
    longitude : event.result.center[0]
  }
  this.setState({
    fulladdress : patientLocation.address,
    longitude : patientLocation.longitude,
    latitude :patientLocation.latitude,
    
    
  })
  
}
   

////////////////////////////////////////////////////////

/////// we gonna use geolib package to determine distance

setPosition = () =>  {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success => this.setState({ latitude: success.coords.latitude, longitude: success.coords.longitude , fulladdress:"via browser gelocalisation" }))
  }
    console.log(this.state.latitude)
    
  }
 

  ///////////////////////////////////////
  

  // When user submits doctor form, save doctor to database.
  handleReservationFormSubmit = event => {
    event.preventDefault();

        // If doctor first name field is empty when user submits form, show error.
    if (this.state.fulladdress === "") {
      this.setState({
        FullAddressError: "l'addresse n'est pas fournis."
      })
    }

    // If the doctor last name field is empty when user submits form, show error.
    if (this.state.longitude === "") {
      this.setState({
        LongitudeError: "le paramaitre longitude n'est pas fournis."
      })
    }

    // if the select clinic field is empty when user submits form, show error.
    if (this.state.latitude === "") {
      this.setState({
        LatitudeError: "le paramaitre latitude n'est pas fournis ."
      })
    }

   

    else {
      //Save doctor to database if all fields are filled out.s
      // Show form success message to user.
      ReservationsAPI.saveReservation({
        fulladdress: this.state.fulladdress,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        
      })
        .then(res => this.loadReservations())
        .catch(err => console.log('there is a problem saving reservation: ' + err));

      

      // Clear form
      //document.getElementById('reservation-form').reset();
    }

    console.log(this.state.fulladdress)
    console.log(this.state.latitude)
    console.log(this.state.longitude)
  };

  // When user submits clinic form, save clinic to database.
  
  

  render() {
    const { classes } = this.props;

    return (
      <div>
      <NavBar />
       
      <div className={classes.appFrame}>
        <Sidebar />
        <main className={classes.content}>
          <div style={{ padding: 70 }}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="display1" align="left">
                  Reserver un taxi !
                  
                </Typography>
              </Grid>
            </Grid>
            
        <button variant="display1" align="left" onClick={()=>this.setPosition()} > Definir votre localisation automatiquement </button>
            <div className="main-content-section">
              <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={6}>
                  <ReservationForm 
                    
                    handleReservationFormSubmit={this.handleReservationFormSubmit}
                    handleFullAddressChange={this.handleFullAddressChange}
                    handleLatitudeChange={this.handleLatitudeChange}
                    handleLongitudeChange={this.handleLongitudeChange}
                     
                    ReservationFullAddressError = {this.state.ReservationFullAddressError}
                    ReservationLongitudeError = {this.state.ReservationLongitudeError}
                    ReservationLatitudeError = {this.state.ReservationLatitudeError}
                    
                    ReservationFormSuccessMessage = {this.state.ReservationFormSuccessMessage}

                  />
                </Grid>
                <Grid>
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
          placeholder="Veuillez saisir votre addresse"
          
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1Ijoia2cta2FydGlrIiwiYSI6ImNrOGdicTdwZjAwMGUzZW1wZmxpMDdvajcifQ.7FtdVDqPnZh4pCtTtcNf4g"
        />

          
           
         <Marker
            
            longitude={this.state.viewport.longitude}
            latitude={this.state.viewport.latitude}
          >
            <img style={{"width":"50px","height":"50px"}} src={LogoPatient}></img>
          </Marker>

          <Marker
            latitude={this.state.taxi1.latitude}
            longitude={this.state.taxi1.longitude}
          >
            <img style={{"width":"50px","height":"50px"}} src={LogoTaxi}></img>
          </Marker>
          <Marker
            latitude={this.state.taxi2.latitude}
            longitude={this.state.taxi2.longitude}
          >
            <img style={{"width":"50px","height":"50px"}} src={LogoTaxi}></img>
          </Marker>
          <Marker
            latitude={this.state.taxi3.latitude}
            longitude={this.state.taxi3.longitude}
          >
            <img style={{"width":"50px","height":"50px"}} src={LogoTaxi}></img>
          </Marker>
        

        </ReactMapGL>
      </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Paper elevation={4} className={classes.doctorMdList}>
                    <Typography gutterBottom variant="headline" component="h2" style={{textAlign: 'center'}} >
                      Liste des reservations
                    </Typography>

                    {this.state.reservations.map(reservation => {
                       return (
                        <ReservationInfo 
                          id={reservation._id}
                          key={reservation._id}
                          FullAddress={reservation.fulladdress}
                          Longitude={reservation.longitude}
                          Latitude={reservation.latitude}
                          Status= {reservation.accepted}

                          deleteReservation= { this.deleteReservation } />
                          
                      );
                    })}
                    
                     
                  </Paper>
                </Grid>
              </Grid>

              
              
            </div>
          </div>
          
        </main>
      </div>
      </div>
    )
  }
}

// Exporting the DoctorList component so that the App.js file
// can use/render the My Doctor List page.
export default withStyles(styles)(ReservationList);
