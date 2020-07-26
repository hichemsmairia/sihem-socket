// Importing React since we are using React.
import React, { Component } from "react";
// Importing Navbar component.
import NavBar from '../../Components/AppBar';
// Import DoctorForm
import LicenseForm from './LicenseForm';
// Import LicenseInfo
import LicenseInfo from './LicenseInfo';
// Import ClinicInfo

// Import API
import LicensesAPI from '../../utils/LicensesAPI';

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

class LicenseList extends Component {
  state = {
    LicenseFirstName: "",
    LicenseLastName: "",
        TaxiDriverPhone: "",
        LicenseCode: "" ,
        LicenseAddress: "",
    LicenseFirstNameError: "",
    LicenseLastNameError: "",
        LicensePhoneError: "",
        licenses: [],
    LicenseFormSuccessMessage: "",  
    
  };

  // When the component mounts, load all doctors and clinics and save them to this.state.doctors and this.state.clinics.
  componentDidMount() {
    this.loadLicenses()
  }

//for rendering licenses list 
  loadLicenses = () => {
    LicensesAPI.getLicenses()
      .then(res =>
        this.setState({ licenses: res.data }))
      .catch(err => console.log('there is an issue loading licenses: ' + err));
  };

  // Loads all clinics and saves them to this.state.clinics.
  

  // Deletes a doctor from the database with a given id, then reloads doctors from the db
  deleteLicense = id => {
    LicensesAPI.deleteLicense(id)
      .then(res => this.loadLicenses())
      .catch(err => console.log(err));
  };

  

  // Keep track of what user enters for doctor first name so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleLicenseFirstNameChange = (event) => {
    this.setState({ 
      LicenseFirstName: event.target.value,
      LicenseFirstNameError: "",
      LicenseFormSuccessMessage: "",
    });
  }

  // Keep track of what user enters for doctor last name so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleLicenseLastNameChange = (event) => {
    this.setState({ 
      LicenseLastName: event.target.value,
      LicenseLastNameError: "",
      LicenseFormSuccessMessage: "",
    });
  }

  // Keep track of what user types into clinic input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  

  // Keep track of what user types into phone input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleLicensePhoneChange = (event) => {
    this.setState({ 
      LicensePhone: event.target.value,
      LicensePhoneError: "",
      LicenseFormSuccessMessage: "",
    });
  }

    // Keep track of what user enters for clinic name so that input can be grabbed later.
    // If form validation error is showing, remove error from page when user starts typing.
  handleLicenseCodeChange = (event) => {
    this.setState({ 
      LicenseCode: event.target.value,
      LicenseCodeError: "",
      LicenseFormSuccessMessage: "",
    });
  }

  // Keep track of what user enters for clinic address so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  
handleLicenseAddressChange = (event) => {
    this.setState({ 
      LicenseAddress: event.target.value,
      LicenseAddressError: "",
      LicenseFormSuccessMessage: "",
    });
  }
   // Keep track of what user types into zip code field so that input can be grabbed later.
   // If form validation error is showing, remove error from page when user starts typing.
  

  // When user submits doctor form, save doctor to database.
  handleLicenseFormSubmit = event => {
    event.preventDefault();

        // If doctor first name field is empty when user submits form, show error.
    if (this.state.LicenseFirstName === "") {
      this.setState({
        LicenseFirstNameError: "First name is required."
      })
    }

    // If the doctor last name field is empty when user submits form, show error.
    if (this.state.LicenseLastName === "") {
      this.setState({
        LicenseLastNameError: "Last name is required."
      })
    }

    // if the select clinic field is empty when user submits form, show error.
    if (this.state.LicenseCode === "") {
      this.setState({
        LicenseCodeError: "From the drop-down list, select the primary clinic that the doctor is associated with."
      })
    }

    // if the doctor phone number field is empty when user submits form, show error.
    if (this.state.LicensePhone === "") {
      this.setState({
        TaxiDriverPhoneError: "Phone number is required."
      })
    }

    if (this.state.LicenseAddress === "") {
      this.setState({
        LicenseAddressError: "address is required."
      })
    }

    else {
      //Save doctor to database if all fields are filled out.s
      // Show form success message to user.
      LicensesAPI.saveLicense({
        firstname: this.state.LicenseFirstName,
        lastname: this.state.LicenseLastName,
        code: this.state.LicenseCode,
        phone: this.state.LicensePhone,
         address: this.state.LicenseAddress,
      })
        .then(res => this.loadLicenses())
        .catch(err => console.log('there is a problem saving licenses: ' + err));

      this.setState({
          LicensesFormSuccessMessage: `Le chauffeur. ${this.state.LicenseFirstName} avec le code ${this.state.LicenseCode} est ajoute avec success!`,
      });

      // Clear form
      document.getElementById('license-form').reset();
    }
  };

  // When user submits clinic form, save clinic to database.
  
  

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
                  Licenses des chauffeures taxi 
                </Typography>
              </Grid>
            </Grid>

            <div className="main-content-section">
              <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={6}>
                  <LicenseForm 
                    
                    handleLicenseFormSubmit={this.handleLicenseFormSubmit}
                    handleLicenseFirstNameChange={this.handleLicenseFirstNameChange}
                    handleLicenseLastNameChange={this.handleLicenseLastNameChange}
                    handleLicenseCodeChange={this.handleLicenseCodeChange}
                    handleLicensePhoneChange={this.handleLicensePhoneChange}
                    handleLicenseAddressChange={this.handleLicenseAddressChange} 
                    LicenseFirstNameError = {this.state.LicenseFirstNameError}
                    LicenseLastNameError = {this.state.LicenseLastNameError}
                    LicenseCodeError = {this.state.LicenseMdError}
                    LicensePhoneError = {this.state.LicensePhoneError} 
                    LicenseAddressError = {this.state.LicenseAddressError}
                    LicenseFormSuccessMessage = {this.state.LicenseFormSuccessMessage}

                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Paper elevation={4} className={classes.doctorMdList}>
                    <Typography gutterBottom variant="headline" component="h2" style={{textAlign: 'center'}} >
                      liste des chauffeures taxi :
                    </Typography>

                    {this.state.licenses.map(license => {
                       return (
                        <LicenseInfo 
                          id={license._id}
                          key={license._id}
                          LicenseStatus={license.status}
                          LicenseFirstName={license.firstname}
                          LicenseLastName={license.lastname}
                          LicenseCode={license.code}
                          LicensePhone={license.phone}
                          LicenseAddress={license.address}
                          deleteLicense= { this.deleteLicense } />
                          
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

// Exporting the DoctorList component so that the App.js file
// can use/render the My Doctor List page.
export default withStyles(styles)(LicenseList);
