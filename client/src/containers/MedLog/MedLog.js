// Importing React since we are using React.
import React, { Component } from "react";
// Importing Navbar component.
import NavBar from '../../Components/AppBar';
// Import LogForm
import LogForm from './LogForm';
// Import LogList
import LogList from './LogList';
// Import API
import MedLogAPI from '../../utils/MedLogAPI';
import DoctorsAPI from '../../utils/DoctorsAPI';
// Import style and UI components from material-ui-next
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import SymptomJournal from '../SymptomJournal/SymptomJournal'
// Import Sidebar component.
import PatientSidebar from '../../Components/Sidebar/PatientSidebar';

// Style/Theme
const styles = theme => ({
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
});


class MedLog extends Component {
  state = {
    logDoctor: "",
    logPatientName: "",
    logDate: "",
    logVisitReason: "",
    logHeight: "",
    logWeight: "",
    logNotes: "",
    logs: [],
    doctors: [],
    logDoctorError: "",
    logPatientNameError: "",
    logDateError: "",
    logVisitReasonError: "",
    logHeightError: "",
    logWeightError: "",
    logNotesError: "",
    formSuccessMessage: "",
  };

  // When the component mounts, load all logs and save them to this.state.logs.
  // When the component mounts, load all doctors and save them to this.state.doctors.
  componentDidMount() {
    this.loadLogs();
    this.loadDoctors();
  }

  // Loads all logs and saves them to this.state.logs.
  loadLogs = () => {
    MedLogAPI.getLogs()
      .then(res =>
        this.setState({ logs: res.data })
      )
      .catch(err => console.log(err));
  };

  // Deletes a log from the database with a given id, then reloads logs from the db
  deleteLog = id => {
    MedLogAPI.deleteLog(id)
      .then(res => this.loadLogs())
      .catch(err => console.log(err));
  };

  //Loads all doctors and saves them to this.state.doctors.
  loadDoctors = () => {
    DoctorsAPI.getDoctors()
      .then(res =>
        this.setState({ doctors: res.data })
      )
      .catch(err => console.log('getting doctors did not work: ', err));
  };

  // Keep track of what user selects from doctor drop-down list so that input can be grabbed later
    // If form validation error is showing, remove error from page when user starts typing.
  handleLogDoctorChange = (event) => {
    this.setState({ 
      logDoctor: event.target.value,
      logDoctorError: "",
      formSuccessMessage: "",
    });
  }

  // Keep track of what user enters into the log day input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleLogDateChange = (event) => {
    this.setState({ 
      logDate: event.target.value,
      logDateError: "",
      formSuccessMessage: "",
    });
  }

  // Keep track of what user types into reason for visit input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleLogVisitReasonChange = (event) => {
    this.setState({ 
      logVisitReason: event.target.value,
      logVisitReasonError: "",
      formSuccessMessage: "", 
    });
  }


  handleLogPatientNameChange = (event) => {
    this.setState({ 
      logPatientName: event.target.value,
      logPatientNameError: "",
      formSuccessMessage: "", 
    });
    console.log(this.state.logPatientName)
  }
  // Keep track of what user types into height input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleLogHeightChange = (event) => {
    this.setState({ 
      logHeight: event.target.value,
      logHeightError: "",
      formSuccessMessage: "", 
    });
  }

  // Keep track of what user types into weight input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleLogWeightChange = (event) => {
    this.setState({ 
      logWeight: event.target.value,
      logWeightError: "",
      formSuccessMessage: "",
    });
  }

  // Keep track of what user types into notes input field so that input can be grabbed later
  // If form validation error is showing, remove error from page when user starts typing.
  handleLogNotesChange = (event) => {
    this.setState({ 
      logNotes: event.target.value,
      logNotesError: "",
      formSuccessMessage: "",
     });
  }

  // When user submits health log form, save health log inforation to database.
  handleFormSubmit = event => {
    event.preventDefault();

    // If select doctor field is empty when user submits form, show error.
    if (this.state.logDoctor === "") {
      this.setState({
        logDoctorError: "Choisir un medecin de la liste"
      })
    }

    if (this.state.logPatientName === "") {
      this.setState({
        logPatientNameError: "Veuillez saisir votre nom "
      })
    }
    // If the log date field is empty when user submits form, show error.
    if (this.state.logDate === "" || this.state.logDate === "mm/dd/yyy") {
      this.setState({
        logDateError: "Utiliser le Date Picker pour Choisir la date"
      })
    }

    // if the visit reason field is empty when user submits form, show error.
    if (this.state.logVisitReason === "") {
      this.setState({
        logVisitReasonError: "Raison de la visite"
      })
    }

    // if the height field is empty when user submits form, show error.
    if (this.state.logHeight === "") {
      this.setState({
        logHeightError: "Enter a value for height (in inches)."
      })
    }

    // if the weight field is empty when user submits form, show error.
    if (this.state.logWeight === "") {
      this.setState({
        logWeightError: "Poids en Kgs"
      })
    }

    // if the visit notes field is empty when user submits form, show error.
    if (this.state.logNotes === "") {
      this.setState({
        logNotesError: "Ajouter les notes de la visite , s'il y'a aucune , taper N/A"
      })
    }

    else {
      //Save symptom to database if all fields are filled out.
      // Show form success message to user.
      MedLogAPI.saveLog({
        date: this.state.logDate,
        doctor: this.state.logDoctor,
        patient: this.state.logPatientName,
        visitPurpose: this.state.logVisitReason,
        heightIn: this.state.logHeight,
        weightLb: this.state.logWeight,
        notes: this.state.logNotes,
      })
        .then(res => this.loadLogs())
        .catch(err => console.log(err));

      this.setState({
          formSuccessMessage: `Note de  ${this.state.logDate} added successfully!`,
      });

      // Clear form
      document.getElementById('log-form').reset();
    }
  };

  render() {
    const { classes } = this.props;
    return [
      <NavBar />, 
      <div className={classes.appFrame}>
        <PatientSidebar />
          <main className={classes.content}>
            <div style={{ padding: 70 }}>
              <SymptomJournal />
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="display1" align="left">
                    Mon journal de santé
                  </Typography>
                </Grid>
              </Grid>
             
              <div className="main-content-section">
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={12} md={6}>
                    <LogForm
                      doctors={this.state.doctors}
                      handleFormSubmit={this.handleFormSubmit}
                      handleLogDateChange={this.handleLogDateChange}
                      handleLogDoctorChange={this.handleLogDoctorChange}
                      handleLogPatientNameChange={this.handleLogPatientNameChange}
                      handleLogVisitReasonChange={this.handleLogVisitReasonChange}
                      handleLogHeightChange={this.handleLogHeightChange}
                      handleLogWeightChange={this.handleLogWeightChange}
                      handleLogNotesChange={this.handleLogNotesChange}
                      logDoctorError={this.state.logDoctorError}
                      logPatientNameError={this.state.logPatientNameError}
                      logDateError = {this.state.logDateError}
                      logVisitReasonError = {this.state.logVisitReasonError}
                      logHeightError = {this.state.logHeightError}
                      logWeightError = {this.state.logWeightError}
                      logNotesError = {this.state.logNotesError}
                      formSuccessMessage = {this.state.formSuccessMessage} />
                  </Grid>
                      
                  
                </Grid>
              </div>
          </div>
        </main>
      </div>,
    ];
  }
}

// Exporting the MedLog component so that the App.js file can use/render the My health log page.
export default withStyles(styles)(MedLog);
