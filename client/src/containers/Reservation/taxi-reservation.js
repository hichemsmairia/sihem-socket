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
import ReservationInfoTaxi from './ReservationInfoTaxi';
// Import ClinicInfo

// Import API
import ReservationsAPI from '../../utils/ReservationsAPI';
import Logo from './logo.png'
// Import UI components and style from material-ui-next.
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// Import Sidebar component.
import Sidebar from '../../Components/Sidebar/taxiSidebar';

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

class TaxiReservation extends Component {
  state = {
   
   reservations: [],
   taxilongitude:"",
   taxilatitude:"",
   
    
  };

  // When the component mounts, load all doctors and clinics and save them to this.state.doctors and this.state.clinics.
  componentDidMount() {
    this.loadReservations()
    setTimeout(function(){
        window.location.reload(1);
     }, 10000);

     navigator.geolocation.getCurrentPosition(position => {
      this.setState({taxilongitude:position.coords.longitude,taxilatitude:position.coords.latitude})
      console.log("Longitude is :", position.coords.longitude);
      console.log("latitude is ",position.coords.latitude);
    });

  }

//for rendering licenses list 
  loadReservations = () => {
    ReservationsAPI.getReservations()
      .then(res =>
        this.setState({ reservations: res.data }))
      .catch(err => console.log('there is an issue loading reservations: ' + err));
  };

  // Loads all clinics and saves them to this.state.clinics.
  


  acceptReservation = id => {
    ReservationsAPI.updateReservation(id)
      .then(res => this.loadReservations())
      .catch(err => console.log(err)) ; 

  };

  

  

  render() {
    const { classes } = this.props;

    return (
      <div>
      <NavBar />
       
      <div className={classes.appFrame}>
        <Sidebar />
        <main className={classes.content}>
          
                <Grid item xs={12} sm={12} md={6}>
                  <Paper elevation={4} className={classes.doctorMdList}>
                    <Typography gutterBottom variant="headline" component="h2" style={{textAlign: 'center'}} >
                      Liste des reservations
                    </Typography>

                    {this.state.reservations.map(reservation => {
                       return (
                        <ReservationInfoTaxi 
                          id={reservation._id}
                          key={reservation._id}
                          FullAddress={reservation.fulladdress}
                          Longitude={reservation.longitude}
                          Latitude={reservation.latitude}
                          Status= {reservation.accepted}
                         acceptReservation= { this.acceptReservation }
                         taxilongitude = {this.state.taxilongitude}
                         taxilatitude={this.state.taxilatitude}
                         
                         />
                          
                      );
                    })}
                    
                     
                  </Paper>
                </Grid> 
                    
        </main>
      </div>
      </div>
    )
  }
}

// Exporting the DoctorList component so that the App.js file
// can use/render the My Doctor List page.
export default withStyles(styles)(TaxiReservation);
