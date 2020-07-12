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
// Import Sidebar component.
import Sidebar from '../../Components/Sidebar/Sidebar';

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


class doctorLog extends Component {
  state = {
    
    logs: [],
    
  };

  // When the component mounts, load all logs and save them to this.state.logs.
  // When the component mounts, load all doctors and save them to this.state.doctors.
  componentDidMount() {
    this.loadLogs();
    
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
  

  // Keep track of what user enters into the log day input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  

  // Keep track of what user types into notes input field so that input can be grabbed later
  // If form validation error is showing, remove error from page when user starts typing.
 
  

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
                    Le journal de santé des patients
                  </Typography>
                </Grid>
              </Grid>
             
              <div className="main-content-section">
                
                      
                  <Grid item xs={12} sm={12} md={6}>
                    {this.state.logs.map(log => {
                      return (
                        <LogList
                          id={log._id}
                          key={log._id}
                          date={log.date}
                          doctor={log.doctor}
                          patient={log.patient}
                          visitPurpose={log.visitPurpose}
                          heightIn={log.heightIn}
                          weightLb={log.weightLb}
                          visitNotes={log.notes}
                          deleteLog={this.deleteLog}
                        />
                      );
                    })}  
                  </Grid>
                
              </div>
          </div>
        </main>
      </div>,
    ];
  }
}

// Exporting the MedLog component so that the App.js file can use/render the My health log page.
export default withStyles(styles)(doctorLog);
