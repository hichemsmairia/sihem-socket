// Importing React since we are using React.
import React, { Component } from "react";
// Importing Navbar component.
import NavBar from '../../Components/AppBar';
// Import DoctorForm
import PatientForm from './PatientForm';
// Import PatientInfo
import PatientInfo from './PatientInfo';
// Import ClinicInfo

// Import ClinicForm

// Import API
import PatientsAPI from '../../utils/PatientsAPI';

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
  }
});

class PatientList extends Component {
  state = {
    patientFirstName: "",
    patientLastName: "",
    patientAddress: "",
    patientPhone: "",
    patients: [],
    patientFirstNameError: "",
    patientLastNameError: "",
    patientAddressError : "" , 
    patientPhoneError: "",
    patientFormSuccessMessage: ""  
      
  };

  // When the component mounts, load all doctors and clinics and save them to this.state.doctors and this.state.clinics.
  componentDidMount() {
    this.loadPatients();
    
  }

//for rendering doctors list 
  loadPatients = () => {
    PatientsAPI.getPatients()
      .then(res =>
        this.setState({ patients: res.data }))
      .catch(err => alert('there is an issue loading Patients: ' + err));
  };

  // Loads all clinics and saves them to this.state.clinics.
  

  // Deletes a Patient from the database with a given id, then reloads Patients from the db
  deletePatient = id => {
    PatientsAPI.deletePatient(id)
      .then(res => this.loadPatients())
      .catch(err => console.log(err));
  };

  // Deletes a clinic from the database with a given id, then reloads clinics from the db
  

  // Keep track of what user enters for Patient first name so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handlePatientFirstNameChange = (event) => {
    
    this.setState({ 
      patientFirstName: event.target.value,
      patientFirstNameError: "",
      patientFormSuccessMessage: "",
    });
  }



  // Keep track of what user enters for Patient last name so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handlePatientLastNameChange = (event) => {
    
    this.setState({ 
      patientLastName: event.target.value,
      patientLastNameError: "",
      patientFormSuccessMessage: "",
    });
  }

  // Keep track of what user types into clinic input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handlePatientAddressChange = (event) => {
    this.setState({ 
      patientAddress: event.target.value,
      patientAddressError: "",
      patientFormSuccessMessage: "",
    });
  }

  // Keep track of what user types into phone input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handlePatientPhoneChange = (event) => {
    this.setState({ 
      patientPhone: event.target.value,
      patientrPhoneError: "",
      patientrFormSuccessMessage: "",
    });
  }

    // Keep track of what user enters for clinic name so that input can be grabbed later.
    // If form validation error is showing, remove error from page when user starts typing.
  

  // Keep track of what user enters for clinic address so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  

  // Keep track of what user types into clinic city field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  

  // Keep track of what user types into clinic state field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  

   // Keep track of what user types into zip code field so that input can be grabbed later.
   // If form validation error is showing, remove error from page when user starts typing.
  

  // Keep track of what user types into phone input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  

  // When user submits Patient form, save Patient to database.
  handlePatientFormSubmit = event => {
    event.preventDefault();

        // If doctor first name field is empty when user submits form, show error.
    if (this.state.patientFirstName === "") {
      this.setState({
        patientFirstNameError: "First name is required."
      })
    }

    // If the patient last name field is empty when user submits form, show error.
    if (this.state.patientLastName === "") {
      this.setState({
        patientLastNameError: "Last name is required."
      })
    }

    // if the select clinic field is empty when user submits form, show error.
    if (this.state.patientAddress === "") {
      this.setState({
        patientAddressError: "address is required."
      })
    }

    // if the patient phone number field is empty when user submits form, show error.
    if (this.state.patientPhone === "") {
      this.setState({
        patientPhoneError: "Phone number is required."
      })
    }

    else {
      //Save patient to database if all fields are filled out.s
      // Show form success message to user.

      PatientsAPI.savePatient({
        firstname: this.state.patientFirstName,
        lastname: this.state.patientLastName,
        address : this.state.patientAddress,
        phone: this.state.patientPhone,
      })
        .then(res => this.loadPatients())
        .catch(err => alert('there is a problem saving patient: ' + err));

      this.setState({
          patientFormSuccessMessage: `Patient. ${this.state.patientFirstName} ${this.state.patientLastName} added successfully!`,
      });

      // Clear form
      document.getElementById('patient-form').reset();
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
                  patients
                </Typography>
              </Grid>
            </Grid>

            <div className="main-content-section">
              <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={6}>
                  <PatientForm 
                    handlePatientFormSubmit={this.handlePatientFormSubmit}
                    handlePatientFirstNameChange={this.handlePatientFirstNameChange}
                    handlePatientLastNameChange={this.handlePatientLastNameChange}
                    handlePatientAddressChange={this.handlePatientAddressChange}
                    handlePatientPhoneChange={this.handlePatientPhoneChange} 
                    patientFirstNameError = {this.state.patientFirstNameError}
                    patientLastNameError = {this.state.patientLastNameError}
                    patientAddressError = {this.state.patientAddressError}
                    patientPhoneError = {this.state.patientPhoneError} 
                    patientFormSuccessMessage = {this.state.patientFormSuccessMessage}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Paper elevation={4} className={classes.doctorClinicList}>
                    <Typography gutterBottom variant="headline" component="h2" style={{textAlign: 'center'}} >
                      patients list
                    </Typography>
                     {this.state.patients.map(patient => {
                       return (
                        <PatientInfo 
                          id={patient._id}
                          key={patient._id}
                          patientFirstName={patient.firstname}
                          patientLastName={patient.lastname}
                          patientAddress={patient.address}
                          patientPhone={patient.phone}
                          deletePatient = { this.deletePatient } />
                      );
                    })}
                  </Paper>
                </Grid>
              </Grid>

              </div>
                
              
            </div>
          
        </main>
      </div>,
    ];
  }
}

// Exporting the PatientList component so that the App.js file
// can use/render the patient List page.
export default withStyles(styles)(PatientList);
