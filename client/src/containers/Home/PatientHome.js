// Importing React since we are using React.
import React, { Component } from 'react';
// Importing UI components from rebass.
import { Subhead, Link } from 'rebass';
// Import UI components from material-ui-next.
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
// Importing icons/images
import report from '../../assets/images/medical_report.png';
import patient from '../../assets/images/patient.png';
import bookTaxi from '../../assets/images/booktaxi.png' ;
import journal from '../../assets/images/journal.png';
import appointment from '../../assets/images/appointment.png';
import doctor from '../../assets/images/doctor.png';
import payment from '../../assets/images/payment.png';
import chart from '../../assets/images/chart2.png';
// Importing Navbar component.
import NavBar from '../../Components/AppBar';

const styles = {
  root: {
    flexGrow: 1,
  },
  headline: {
    marginTop: 50,
  },
  heading: {
    fontSize: 35,
  }
};

class PatientHome extends Component {
  render() {
    
    const { classes } = this.props;
    return [
      <NavBar />,
      <div style={{ padding: 70 }}>
        <Grid item xs={12} className={classes.headline}>
          <Grid container spacing={24} className={classes.root} justify="center">
            <Typography variant="display1" align="center">
              Tableau de bord du Patient
            </Typography>
          </Grid>
        </Grid>,

        <div className="main-content-section">
          <Grid container spacing={24} className={classes.root}>
            <Grid item xs={12} sm={6} md={4} className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                Journal du sante
              </Typography>
              <Subhead align="center">
                <Link
                  href="/log"
                >
                  <img src={report} alt="clipboard" />
                </Link>
              </Subhead>
            </Grid>
            
            
            <Grid item xs={12} sm={6} md={4} className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                Les rendez-vous
              </Typography>
              <Subhead align="center">
                <Link
                  href="/patientappointments"
                >
                  <img src={appointment} alt="calendar" />
                </Link>
              </Subhead>
            </Grid>

            

            <Grid item xs={12} sm={6} md={4}className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                Gestion des paiements 
              </Typography>
              <Subhead align="center">
                <Link
                  href="/patient-payment"
                >
                  <img src={payment} alt="taxi" style={{width:"125px" , height:"125px"}} />
                </Link>
              </Subhead>
            </Grid>

            <Grid item xs={12} sm={6} md={4} className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                La courbe de ma sante 
              </Typography>
              <Subhead align="center">
                <Link
                  href="/charts"
                >
                  <img src={chart} alt="line graph" />
                </Link>
              </Subhead>
            </Grid>

            <Grid item xs={12} sm={6} md={4} className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                reserver taxi maintenant  
              </Typography>
              <Subhead align="center">
                <Link
                  href="/patientmap"
                >
                  <img src={bookTaxi} alt="line graph" />
                </Link>
              </Subhead>
            </Grid>


            
          </Grid>
        </div>,
      </div>,
    ];
  }
}

// Exporting the Home component so that the App.js file can render the Home page.
export default withStyles(styles)(PatientHome);
