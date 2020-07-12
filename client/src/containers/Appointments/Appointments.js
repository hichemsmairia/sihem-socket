// Importing React since we are using React.
import React, { Component } from "react";
// Importing the AppointmentsForm component.
import AppointmentsForm from './AppointmentsForm';
// Importing the AppointmentsList component.
import AppointmentsList from './AppointmentsList';
// Import API
import AppointmentAPI from '../../utils/AppointmentAPI';
import DoctorsAPI from '../../utils/DoctorsAPI';
import PatientsAPI from '../../utils/PatientsAPI';
import MdsAPI from '../../utils/MdsAPI';
// Import UI components from material-ui-next.
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// Import patientSidebar component.
import Sidebar from '../../Components/Sidebar/Sidebar';
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

class Appointments extends Component {
  state = {
    appointmentName: "",
    appointmentDoctor: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentStatus: "",
    appointments: [],
    doctors: [],
    patients: [] ,
    mds: [],
    appointmentStatusError:"",
    appointmentNameError: "",
    appointmentDoctorError: "",
    appointmentPatientError: "",
    appointmentDateError: "",
    appointmentTimeError: "",
    formSuccessMessage: "",

  };
  // When the component mounts, load all appointments and save them to this.state.appointments.
  componentDidMount() {

    this.loadAppointments();
    this.loadDoctors();
    this.loadMds();
    this.loadPatients();
    
  }


  loadUsers = () => {


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


  //update appointement status  
  updateAppointment = (id) => {
    AppointmentAPI.updateAppointment(id)
    .then(res => this.loadAppointments())
    .catch(err=> console.log(err))
  }



  loadPatients = () => {
    PatientsAPI.getPatients()
      .then(res =>
        this.setState({ patients: res.data })
      )
      .catch(err => console.log('getting patients did not work: ', err));
  };

  //Loads all doctors and saves them to this.state.doctors.
  loadDoctors = () => {
    DoctorsAPI.getDoctors()
      .then(res =>
        this.setState({ doctors: res.data })
      )
      .catch(err => console.log('getting doctors did not work: ', err));
  };

  //Loads all Mds and saves them to this.state.Mds.
  loadMds = () => {
    MdsAPI.getMds()
      .then(res =>
        this.setState({ mds: res.data })
      )
      .catch(err => console.log('getting mds did not work: ', err));
  };

  // Keep track of what user enters for appointment name so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleAppointmentNameChange = (event) => {
    this.setState({ 
      appointmentName: event.target.value,
      appointmentNameError: "",
      formSuccessMessage: "",
    });
  }

  // Keep track of what user selects for doctor so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleAppointmentDoctorChange = (event) => {
    this.setState({ 
      appointmentDoctor: event.target.value,
      appointmentDoctorError: "",
      formSuccessMessage: "",
    });
  }

handleAppointmentPatientChange = (event) => {
    this.setState({ 
      appointmentPatient: event.target.value,
      appointmentPatientError: "",
      formSuccessMessage: "",
    });
  }

  // Keep track of what user types into appointment date input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleAppointmentDateChange = (event) => {
    this.setState({ 
      appointmentDate: event.target.value,
      appointmentDateError: "",
      formSuccessMessage: "",
    });
  }

  // Keep track of what user types into appointment time input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleAppointmentTimeChange = (event) => {
    this.setState({ 
      appointmentTime: event.target.value,
      appointmentTimeError: "",
      formSuccessMessage: "",
    });
  }


  handleAppointmentStatusChange = (event) => {
    this.setState({
      appointmentStatus: event.target.value,
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();

        // If appointment name field is empty when user submits form, show error.
    if (this.state.appointmentName === "") {
      this.setState({
        appointmentNameError: "Enter a name for the appointment."
      })
    }

    if (this.state.appointmentStatus === "") {
      this.setState({
        appointmentStatusError: "veuillez choisir le statut du RDV."
      })
    }
    // If the appointment doctor field is empty when user submits form, show error.
    if (this.state.appointmentDoctor === "") {
      this.setState({
        appointmentDoctorError: "Select the doctor associated with the appointment from the drop-down list."
      })
    }

    if (this.state.appointmentPatient === "") {
      this.setState({
        appointmentDoctorError: "Select the patient associated with the appointment from the drop-down list."
      })
    }

    // if the appointment date field is empty when user submits form, show error.
    if (this.state.appointmentDate === "" || this.state.appointmentDate === "mm/dd/yyyy") {
      this.setState({
        appointmentDateError: "Use the date picker to select the date of the appointment."
      })
    }

    // if the appointment time field is empty when user submits form, show error.
    if (this.state.appointmentTime === "") {
      this.setState({
        appointmentTimeError: "Use the time picker to select the time of the appointment in HH:MM AM/PM format."
      })
    }

    else {
      //Save appointment to database if all fields are filled out.
      // Show form success message to user.
      AppointmentAPI.saveAppointment({
        appointmentName: this.state.appointmentName,
        doctor: this.state.appointmentDoctor,
        patient: this.state.appointmentPatient ,
        date: this.state.appointmentDate,
        time: this.state.appointmentTime,
        appointmentStatus: this.state.appointmentStatus ,
      })
        .then(res => this.loadAppointments())
        .catch(err => console.log(err));

      this.setState({
          formSuccessMessage: `${this.state.appointmentName} du patient ${this.state.appointmentPatient} avec Dr. ${this.state.appointmentDoctor} a ${this.state.appointmentDate} est ajoute avec succes!`,
      });

      
      // Clear form
      document.getElementById('appointment-form').reset();
    }
  };

  render() {
    const { classes } = this.props;
    return [
      <NavBar />,
      <div className={classes.appFrame}>
        <Sidebar />
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
                            <TableCell><b>patient</b></TableCell>
                            <TableCell numeric><b>Date</b></TableCell>
                            <TableCell numeric><b>Heure (HH:MM)</b></TableCell>
                            <TableCell ><b>Statut de rendez-vous</b></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className={classes.tabledata}>
                          {this.state.appointments.map(appointment => {
                            return (
                              <AppointmentsList
                                id={appointment._id}
                                key={appointment._id}
                                name={appointment.appointmentName}
                                date={appointment.date}
                                time={appointment.time}
                                doctor={appointment.doctor}
                                patient={appointment.patient}
                                md={appointment.md}
                                appointmentStatus={appointment.appointmentStatus}

                                deleteAppointment={this.deleteAppointment}
                                updateAppointment={this.updateAppointment}
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
                  <AppointmentsForm
                    doctors={this.state.doctors}
                    patients={this.state.patients}
                    mds={this.state.mds}
                    handleAppointmentStatusChange={this.handleAppointmentStatusChange}     
                    handleFormSubmit={this.handleFormSubmit}
                    handleAppointmentNameChange={this.handleAppointmentNameChange}
                    handleAppointmentDoctorChange={this.handleAppointmentDoctorChange}
                    handleAppointmentPatientChange={this.handleAppointmentPatientChange}
                    handleAppointmentDateChange={this.handleAppointmentDateChange}
                    handleAppointmentTimeChange={this.handleAppointmentTimeChange}
                    handleAppointmentMdChange={this.handleAppointmentMdChange}
                    appointmentNameError = {this.state.appointmentNameError}
                    appointmentDoctorError = {this.state.appointmentDoctorError}
                    appointmentPatientError={this.state.appointmentPatientError}
                    appointmentDateError  = {this.state.appointmentDateError}
                    appointmentTimeError = {this.state.appointmentTimeError}
                    formSuccessMessage = {this.state.formSuccessMessage} 
                  />
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
export default withStyles(styles)(Appointments);
