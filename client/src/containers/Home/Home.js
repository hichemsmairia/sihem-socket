import React, { Component } from 'react';
import { Subhead, Link } from 'rebass';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import report from '../../assets/images/medical_report.png';
import patient from '../../assets/images/patient.png';
import journal from '../../assets/images/journal.png';
import appointment from '../../assets/images/appointment.png';
import gestiontaxi from '../../assets/images/gestiontaxi.png'
import doctor from '../../assets/images/doctor.png';
import chart from '../../assets/images/chart2.png';
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

class Home extends Component {
  render() {
    const { classes } = this.props;
    return [
      <NavBar />,
      <div style={{ padding: 70 }}>
            

        <Grid item xs={12} className={classes.headline}>
          <Grid container spacing={24} className={classes.root} justify="center">
            <Typography variant="display1" align="center">
              Tableau de bord du personnel médical
            </Typography>
          </Grid>
        </Grid>,

        <div className="main-content-section">
          <Grid container spacing={24} className={classes.root}>
            <Grid item xs={12} sm={6} md={4} className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                Journal du sante des patients
              </Typography>
              <Subhead align="center">
                <Link
                  href="/doctorLog"
                >
                  <img src={report} alt="clipboard" />
                </Link>
              </Subhead>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                journal des symptomes patients
              </Typography>
              <Subhead align="center">
                <Link
                  href="/doctorSymptoms"
                >
                  <img src={journal} alt="health journal" />
                </Link>
              </Subhead>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                Ajouter un patient
              </Typography>
              <Subhead align="center">
                <Link
                  href="/patients"
                >
                  <img src={patient} alt="clipboard" style={{height:"128px" , width:"128px"}} />
                </Link>
              </Subhead>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                Les rendez-vous
              </Typography>
              <Subhead align="center">
                <Link
                  href="/appointments"
                >
                  <img src={appointment} alt="calendar" />
                </Link>
              </Subhead>
            </Grid>

            

            <Grid item xs={12} sm={6} md={4}className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                Docteurs et departements medicaux
              </Typography>
              <Subhead align="center">
                <Link
                  href="/doctors"
                >
                  <img src={doctor} alt="doctor" />
                </Link>
              </Subhead>
            </Grid>




              <Grid item xs={12} sm={6} md={4}className={classes.headline}>
              <Typography align="center" className={classes.heading}>
                Gestion des chauffeurs taxi
              </Typography>
              <Subhead align="center">
                <Link
                  href="/managetaxidriver"
                >
                  <img src={gestiontaxi} alt="taxi" style={{height:"128px" , width:"128px"}} />
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
export default withStyles(styles)(Home);
