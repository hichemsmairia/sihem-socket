// Importing React since we are using React.
import React, { Component } from "react";
// Importing the AppointmentsForm component.

// Importing the AppointmentsList component.
import PatientAppointmentsList from './PatientAppointmentsList';
// Import API
import AppointmentAPI from '../../utils/AppointmentAPI';
import DoctorsAPI from '../../utils/DoctorsAPI';
import PatientsAPI from '../../utils/PatientsAPI';
import MdAPI from '../../utils/MdsAPI';
// Import UI components from material-ui-next.
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// Import patientSidebar component.
import PatientSidebar from '../../Components/Sidebar/PatientSidebar';
// Importing Navbar component.
import NavBar from '../../Components/AppBar';

//Style
const styles = theme => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: '#33658A',
    display: 'block',
    overflowX: 'auto',
    maxWidth: '80%',
  }),
  table: {
    minWidth: 700,
    tableLayout: 'auto',
    display: 'block',
    width: '100%',
    overflowX: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'theme.palette.background.default',
    },
  },
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
  heading: {
    marginTop: 40,
  },
});

class PatientAppointments extends Component {
  state = {
    appointments: [] ,
    
      };
  // When the component mounts, load all appointments and save them to this.state.appointments.
  componentDidMount() {
    this.loadAppointments();
    
  }

  // Loads all appointments and saves them to this.state.appointments.
  loadAppointments = () => {
    AppointmentAPI.getAppointments()
      .then(res =>
        this.setState({ appointments: res.data})
      )
      .catch(err => console.log(err));
  };

  // Deletes an appointment from the database with a given id, then reloads appointments from the db
  deleteAppointment = id => {
    AppointmentAPI.deleteAppointment(id)
      .then(res => this.loadAppointments())
      .catch(err => console.log(err));
  };
  //Loads all patients and saves them to this.state.patients. 
  

  confirmAppointment =(id) => {
    this.setState({appointmentStatus:"confirme"}) 
    AppointmentAPI.update(id)
     .then(res => this.loadAppointments())
    
  }

  

  

  render() {
    const { classes } = this.props;
    return [
      <NavBar />,
      <div className={classes.appFrame}>
        <PatientSidebar />
        <main className={classes.content}>
          <div style={{ padding: 70 }}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="display1" align="left">
                  Liste des rendez-vous
                </Typography>
              </Grid>
            </Grid>

            <div className="main-content-section">
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Titre du rendez-vous</b></TableCell>
                            <TableCell><b>Docteur</b></TableCell>
                            <TableCell><b>Patient</b></TableCell>
                            <TableCell numeric><b>Date</b></TableCell>
                            <TableCell numeric><b>Heure (HH:MM)</b></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className={classes.tabledata}>
                          {this.state.appointments.map(appointment => {
                            
                            return (
                              <PatientAppointmentsList
                                id={appointment._id}
                                key={appointment._id}
                                name={appointment.appointmentName}
                                date={appointment.date}
                                time={appointment.time}
                                doctor={appointment.doctor}
                                patient={appointment.patient}
                                md={appointment.md}
                                confirmAppointment={this.confirmAppointment}
                              />
                            );
                          })}
                        </TableBody>
                      </Table>
                      
                    </div>
                  </Paper>
                </Grid>
              </Grid>

              <Grid container spacing={24} className={classes.heading}>
                <Grid item xs={12}>
                  
                </Grid>
              </Grid>
            </div>
          </div>
        </main>
      </div>
    ];
  }
}

// Exporting the Appointments component
// so that the App.js file can use/render the Appointments page.
export default withStyles(styles)(PatientAppointments);
