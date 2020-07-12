// Importing React since we are using React.
import React, { Component } from "react";
// Importing Navbar component.
import NavBar from '../../Components/AppBar';
// Import DoctorForm
// Import LicenseInfo
// Import ClinicInfo

// Import API
import LicensesAPI from '../../utils/LicensesAPI';

// Import UI components and style from material-ui-next.
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// Import Sidebar component.

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

class TaxiverificationCode extends Component {
  state = {
    
        licenses: [],
    entredCode: "",
    
  };

  // When the component mounts, load all doctors and clinics and save them to this.state.doctors and this.state.clinics.
  componentDidMount() {
    this.loadLicenses()
    this.SetCodes()
  }

//for rendering licenses list 
  loadLicenses = () => {
    LicensesAPI.getLicenses()
      .then(res =>
        this.setState({ licenses: res.data }))
      .catch(err => console.log('there is an issue loading licenses: ' + err));
  };

SetCodes = () => {

   const Codes = this.state.licenses.map(license =>  license.code);

}


  Search = () => { 
    var flag = false;
    let entredCode = document.getElementById("entredCode").value;
    let codes = this.state.licenses.map(license =>  parseInt(license.code));
    for (var i = 0; i < codes.length; i++) {
        if (entredCode === codes[i]) {
            
            flag = true;
        } 
    }
    if(flag == false) {
        alert("no such Code was found");
    } else {
      alert("Code was found ");

    }
    console.log(entredCode)
    this.Search = this.Search.bind(this)

}
// Prompt user for data


  
render() {
  return (
    <div> 

  
<input type="number" id="entredCode" />
<button onClick={()=> this.Search()}>Valider le code</button>

    </div>
  ) }}
               

// Exporting the DoctorList component so that the App.js file
// can use/render the My Doctor List page.
export default withStyles(styles)(TaxiverificationCode);
