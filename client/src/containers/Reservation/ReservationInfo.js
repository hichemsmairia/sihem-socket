// Import React
import React from 'react';
import { getDistance } from 'geolib';

// Import UI components and style from material-ui-next.
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

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
class ReservationInfo extends React.Component {


  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <List className={classes.logItem} key={this.props.id}>
          <ListItem>
            <ListItemText >
              <b>Address du patient :</b> {this.props.FullAddress} 
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
              <b>Status de la reservation :</b> {this.props.Status ? <div> reservation accepte par un chauffeur taxi</div> : <div>reservation en attente</div> } 
            </ListItemText>
          </ListItem>

          

          
            <Button size="small" color="primary" variant="raised" className={classes.button} onClick={() => { this.props.deleteReservation(this.props.id); }}>Supprimer</Button>
          
        </List>
        <Divider className={classes.divider} />
      </div>
    );
  }
}

export default withStyles(styles)(ReservationInfo);
