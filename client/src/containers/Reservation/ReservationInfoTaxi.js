

// Import React
import React from 'react';
// Import UI components and style from material-ui-next.
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import ReactMapGL, { GeolocateControl,NavigationControl, Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import * as geolib from 'geolib';

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Style/Theme
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexWrap: 'wrap',
  }),
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 20,
  },
  logItem: {
    marginTop: 20,
  },
  button: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#33658A',
    color: 'white',
  },
});

// TaxiDriver info component on the TaxiDrivers and clinics page.
class ReservationInfoTaxi extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <List className={classes.logItem} key={this.props.id}>
          <ListItem>
            <ListItemText >
              <b>Addresse du patient :</b> {this.props.FullAddress} 
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText >
              <b>Longitude geographique:</b> {this.props.Longitude} 
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText >
              <b>Latitude geographique:</b> {this.props.Latitude} 
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText >
              <b>  Statut de la reservation :</b> {this.props.Status ? (<div> Reservation accepté</div>):(<div>Reservation en attente</div>)} 
            </ListItemText>
          </ListItem>
            <ListItem>
            <ListItemText >

              <b> Prix du cette mission taxi (le prix unitaire/Km : 0.2 DT) : </b>
              {geolib.getDistance({latitude:this.props.Latitude,longitude:this.props.Longitude}, {
                latitude: this.props.taxilatitude,
                longitude: this.props.taxilongitude,
            }) * 0.0002}  DT  
            </ListItemText>  
            </ListItem>

            <ListItem>
            <ListItemText >

              <b>  Distance de patient par rapport votre localisation : </b>
              {geolib.getDistance({latitude:this.props.Latitude,longitude:this.props.Longitude}, {
                latitude: this.props.taxilatitude,
                longitude: this.props.taxilongitude,
            })/1000} Kilometres  
            </ListItemText>  
            </ListItem>



            <Button size="small" color="primary" variant="raised" className={classes.button} onClick={() => { this.props.acceptReservation(this.props.id); }}>
                {this.props.Status ? "Reservation deja accepté":"Accepter la reservation"}
            </Button>
          
        </List>
        <Divider className={classes.divider} />
      </div>
    );
  }
}

export default withStyles(styles)(ReservationInfoTaxi);
