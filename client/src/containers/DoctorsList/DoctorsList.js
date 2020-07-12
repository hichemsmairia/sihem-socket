// Importing React since we are using React.
import React, { Component } from "react";
// Importing Navbar component.
import NavBar from '../../Components/AppBar';
// Import DoctorForm
import DoctorForm from './DoctorForm';
// Import DoctorInfo
import DoctorInfo from './DoctorInfo';
// Import ClinicInfo
import MedicalDepartementInfo from './MedicalDepartementInfo';
// Import ClinicForm
import MedicalDepartementForm from './MedicalDepartementForm';
// Import API
import DoctorsAPI from '../../utils/DoctorsAPI';
import MdsAPI from '../../utils/MdsAPI';
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

class DoctorList extends Component {
  state = {
    doctorFirstName: "",
    doctorLastName: "",
    doctorMd: "",
    doctorPhone: "",
    doctors: [],
    mdName: "",
    mdAddress: "",
    mdCity: "",
    mdState: "",
    mdZip: "",
    mdPhone: "",
    mds: [],
    doctorFirstNameError: "",
    doctorLastNameError: "",
    doctormdError: "",
    doctorPhoneError: "",
    mdNameError: "",
    mdAddressError: "",
    mdCityError: "",
    mdStateError: "",
    mdZipError: "",
    mdPhoneError: "",
    doctorFormSuccessMessage: "",  
    mdFormSuccessMessage: "",  
  };

  // When the component mounts, load all doctors and clinics and save them to this.state.doctors and this.state.clinics.
  componentDidMount() {
    this.loadDoctors();
    this.loadMds();
  }

//for rendering doctors list 
  loadDoctors = () => {
    DoctorsAPI.getDoctors()
      .then(res =>
        this.setState({ doctors: res.data }))
      .catch(err => console.log('there is an issue loading doctors: ' + err));
  };

  // Loads all clinics and saves them to this.state.clinics.
  loadMds = () => {
    MdsAPI.getMds()
      .then(res =>
        this.setState({ mds: res.data }))
      .catch(err => console.log('there is an issue loading Mds: ' + err));
  };

  // Deletes a doctor from the database with a given id, then reloads doctors from the db
  deleteDoctor = id => {
    DoctorsAPI.deleteDoctor(id)
      .then(res => this.loadDoctors())
      .catch(err => console.log(err));
  };

  // Deletes a clinic from the database with a given id, then reloads clinics from the db
  deleteMd = id => {
    MdsAPI.deleteMd(id)
      .then(res => this.loadMds())
      .catch(err => console.log(err));
  };

  // Keep track of what user enters for doctor first name so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleDoctorFirstNameChange = (event) => {
    this.setState({ 
      doctorFirstName: event.target.value,
      doctorFirstNameError: "",
      doctorFormSuccessMessage: "",
    });
  }

  // Keep track of what user enters for doctor last name so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleDoctorLastNameChange = (event) => {
    this.setState({ 
      doctorLastName: event.target.value,
      doctorLastNameError: "",
      doctorFormSuccessMessage: "",
    });
  }

  // Keep track of what user types into clinic input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleDoctorMdChange = (event) => {
    this.setState({ 
      doctorMd: event.target.value,
      doctorMdError: "",
      doctorFormSuccessMessage: "",
    });
  }

  // Keep track of what user types into phone input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleDoctorPhoneChange = (event) => {
    this.setState({ 
      doctorPhone: event.target.value,
      doctorPhoneError: "",
      doctorFormSuccessMessage: "",
    });
  }

    // Keep track of what user enters for clinic name so that input can be grabbed later.
    // If form validation error is showing, remove error from page when user starts typing.
  handleMdNameChange = (event) => {
    this.setState({ 
      mdName: event.target.value,
      mdNameError: "",
      mdFormSuccessMessage: "",
    });
  }

  // Keep track of what user enters for clinic address so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleMdAddressChange = (event) => {
    this.setState({ 
      mdAddress: event.target.value,
      mdAddressError: "",
      mdFormSuccessMessage: "",
    });
  }

  // Keep track of what user types into clinic city field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleMdCityChange = (event) => {
    this.setState({ 
      mdCity: event.target.value,
      mdCityError: "",
      mdFormSuccessMessage: "",
    });
  }

  // Keep track of what user types into clinic state field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleMdStateChange = (event) => {
    this.setState({ 
      mdState: event.target.value,
      mdStateError: "",
      mdFormSuccessMessage: "",
    });
  }

   // Keep track of what user types into zip code field so that input can be grabbed later.
   // If form validation error is showing, remove error from page when user starts typing.
  handleMdZipChange = (event) => {
    this.setState({ 
      mdZip: event.target.value,
      mdZipError: "",
      mdFormSuccessMessage: "",
    });
  }

  // Keep track of what user types into phone input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleMdPhoneChange = (event) => {
    this.setState({ 
      mdPhone: event.target.value,
      mdPhoneError: "",
      mdFormSuccessMessage: "",
    });
  }

  // When user submits doctor form, save doctor to database.
  handleDoctorFormSubmit = event => {
    event.preventDefault();

        // If doctor first name field is empty when user submits form, show error.
    if (this.state.doctorFirstName === "") {
      this.setState({
        doctorFirstNameError: "First name is required."
      })
    }

    // If the doctor last name field is empty when user submits form, show error.
    if (this.state.doctorLastName === "") {
      this.setState({
        doctorLastNameError: "Last name is required."
      })
    }

    // if the select clinic field is empty when user submits form, show error.
    if (this.state.doctorMd === "") {
      this.setState({
        doctorMdError: "From the drop-down list, select the primary clinic that the doctor is associated with."
      })
    }

    // if the doctor phone number field is empty when user submits form, show error.
    if (this.state.doctorPhone === "") {
      this.setState({
        doctorPhoneError: "Phone number is required."
      })
    }

    else {
      //Save doctor to database if all fields are filled out.s
      // Show form success message to user.
      DoctorsAPI.saveDoctor({
        firstname: this.state.doctorFirstName,
        lastname: this.state.doctorLastName,
        md: this.state.doctorMd,
        phone: this.state.doctorPhone,
      })
        .then(res => this.loadDoctors())
        .catch(err => console.log('there is a problem saving doctor: ' + err));

      this.setState({
          doctorFormSuccessMessage: `Dr. ${this.state.doctorFirstName} ${this.state.doctorLastName} added successfully!`,
      });

      // Clear form
      document.getElementById('doctor-form').reset();
    }
  };

  // When user submits clinic form, save clinic to database.
  handleMdFormSubmit = event => {
    event.preventDefault();

    // If clinic name field is empty when user submits form, show error.
    if (this.state.mdName === "") {
      this.setState({
        mdNameError: "Name is required."
      })
    }

    // If the clinic address field is empty when user submits form, show error.
    if (this.state.mdAddress === "") {
      this.setState({
        mdAddressError: "Address is required."
      })
    }

    // if the md city field is empty when user submits form, show error.
    if (this.state.mdCity === "") {
      this.setState({
        mdCityError: "City is required."
      })
    }

    // if the md state field is empty when user submits form, show error.
    if (this.state.mdState === "") {
      this.setState({
        mdStateError: "State is required."
      })
    }

    // if the md zip code field is empty when user submits form, show error.
    if (this.state.mdZip === "") {
      this.setState({
        mdZipError: "Zip code is required."
      })
    }

    // if the md phone number field is empty when user submits form, show error.
    if (this.state.mdPhone === "") {
      this.setState({
        mdPhoneError: "Phone number is required."
      })
    }

    else {
      // Save md to database if all fields are filled out.
      // Show form success message to user.
      MdsAPI.saveMd({
        mdname: this.state.mdName,
        address: this.state.mdAddress,
        city: this.state.mdCity,
        state: this.state.mdState,
        zip: this.state.mdZip,
        phone: this.state.mdPhone,
      })
        .then(res => this.loadMds())
        .catch(err => console.log('there is a problem saving doctor: ' + err));

        this.setState({
          mdFormSuccessMessage: `${this.state.mdName} added successfully!`,
      });

      // Clear form
      document.getElementById('md-form').reset();
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
                  Docteurs et Departements 
                </Typography>
              </Grid>
            </Grid>

            <div className="main-content-section">
              <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={6}>
                  <DoctorForm 
                    mds = {this.state.mds}
                    handleDoctorFormSubmit={this.handleDoctorFormSubmit}
                    handleDoctorFirstNameChange={this.handleDoctorFirstNameChange}
                    handleDoctorLastNameChange={this.handleDoctorLastNameChange}
                    handleDoctorMdChange={this.handleDoctorMdChange}
                    handleDoctorPhoneChange={this.handleDoctorPhoneChange} 
                    doctorFirstNameError = {this.state.doctorFirstNameError}
                    doctorLastNameError = {this.state.doctorLastNameError}
                    doctorMdcError = {this.state.doctorMdError}
                    doctorPhoneError = {this.state.doctorPhoneError} 
                    doctorFormSuccessMessage = {this.state.doctorFormSuccessMessage}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Paper elevation={4} className={classes.doctorMdList}>
                    <Typography gutterBottom variant="headline" component="h2" style={{textAlign: 'center'}} >
                      Doctors list
                    </Typography>
                     {this.state.doctors.map(doctor => {
                       return (
                        <DoctorInfo 
                          id={doctor._id}
                          key={doctor._id}
                          doctorFirstName={doctor.firstname}
                          doctorLastName={doctor.lastname}
                          doctorMd={doctor.md}
                          doctorPhone={doctor.phone}
                          deleteDoctor = { this.deleteDoctor } />
                      );
                    })}
                  </Paper>
                </Grid>
              </Grid>

              <Grid container spacing={16} className={classes.mdSection}>
                <Grid item xs={12} sm={12} md={6}>
                  <MedicalDepartementForm
                    handleMdFormSubmit={this.handleMdFormSubmit}
                    handleMdNameChange={this.handleMdNameChange}
                    handleMdAddressChange={this.handleMdAddressChange}
                    handleMdCityChange={this.handleMdCityChange}
                    handleMdStateChange={this.handleMdStateChange}
                    handleMdZipChange={this.handleMdZipChange}
                    handleMdPhoneChange={this.handleMdPhoneChange}
                    mdNameError = {this.state.mdNameError}
                    mdAddressError = {this.state.mdAddressError}
                    mdCityError = {this.state.mdCityError}
                    mdStateError = {this.state.mdStateError}
                    mdZipError = {this.state.mdZipError}
                    mdPhoneError = {this.state.mdPhoneError}
                    mdFormSuccessMessage = {this.state.mdFormSuccessMessage}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div>
                    <Paper elevation={4} className={classes.doctorMdList}>
                      <Typography gutterBottom variant="headline" component="h2" style={{textAlign: 'center'}}>
                        Departements
                      </Typography>
                      {this.state.mds.map(md => {
                        return (
                          <MedicalDepartementInfo 
                            id={md._id}
                            key={md._id}
                            mdName={md.mdname}
                            mdAddress={md.address}
                            mdCity={md.city}
                            mdState={md.state}
                            mdZip={md.zip}
                            mdPhone={md.phone}
                            deleteMd={this.deleteMd} />
                        );
                      })}
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </main>
      </div>,
    ];
  }
}

// Exporting the DoctorList component so that the App.js file
// can use/render the My Doctor List page.
export default withStyles(styles)(DoctorList);
