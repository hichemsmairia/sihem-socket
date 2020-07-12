// Importing React since we are using React.
import React from 'react';
// Importing UI components from material-ui-next
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// Style for add appointments form.
const styles = {
  textField: {
    marginTop: 60,
  },
  // Tell Material-UI what's the font-size on the html element is.
  typography: {
    htmlFontSize: 40,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: '#33658A',
    maxWidth: '85%',
  },
  formControl: {
    minWidth: 120,
    marginTop: 30,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#33658A',
    color: 'white',
  },
  formError: {
    color: 'red',
  },
  formSuccess: {
    color: 'green',
    marginTop: 10,
  }
};

class AppointmentsForm extends React.Component {
  handleDoctorMenuOption = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
    this.props.handleAppointmentDoctorChange(event);
  }

  handlePatientMenuOption = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
    this.props.handleAppointmentPatientChange(event);
  }


  handleAppointmentStatusOption = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
    this.props.handleAppointmentStatusChange(event);
  }



  state = {
    value: '',
  }

  render() {
    const { classes, doctors, mds , patients } = this.props;

    return (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
            Ajouter un rendez-vous
            </Typography>
            <form noValidate autoComplete="off" id="appointment-form">
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="appointment-name">
                  <span>
                    Titre du rendez-vous
                    <Tooltip  
                      title="Specifier un nom pour le rendz-vous"
                      placement="top">
                      <HelpOutlineIcon> <i>aide</i></HelpOutlineIcon>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField
                  id="appointment-name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                  value={this.props.appointmentName}
                  onChange={this.props.handleAppointmentNameChange}
                />
                <Typography className={classes.formError} component="p">{this.props.appointmentNameError}</Typography>
              </FormControl>




              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="select-patient">
                  <span>
                    Choisir le patient
                    <Tooltip  
                      title="choisir le patient associer au rendez-vous"
                      placement="top">
                      <HelpOutlineIcon> <i>aide</i></HelpOutlineIcon>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField 
                  id='patient'
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField} 
                  value={this.state.value}
                  onChange={this.handlePatientMenuOption} 
                  SelectProps={{ name: 'value'}} 
                  margin="normal">
                    {patients.map(patient => {
                      return <MenuItem key={patient._id} value={patient.lastname}>{patient.firstname} {patient.lastname}</MenuItem>;
                    })}
                  </TextField>
                  <Typography className={classes.formError} component="p">{this.props.appointmentPatientError}</Typography>
              </FormControl>






              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="select-doctor">
                  <span>
                    choisir le medecin
                    <Tooltip  
                      title="choisir le medecin associer au rendez-vous"
                      placement="top">
                      <HelpOutlineIcon> <i>aide</i></HelpOutlineIcon>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField 
                  id='doctor'
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField} 
                  value={this.state.value}
                  onChange={this.handleDoctorMenuOption} 
                  SelectProps={{ name: 'value'}} 
                  margin="normal">
                    {doctors.map(doctor => {
                      return <MenuItem key={doctor._id} value={doctor.lastname}>Dr. {doctor.lastname}</MenuItem>;
                    })}
                  </TextField>
                  <Typography className={classes.formError} component="p">{this.props.appointmentDoctorError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="appointment-date">
                  <span>
                    Date de rendez-vous
                    <Tooltip  
                      title="utiliser le Date picker vous choisir la date "
                      placement="top">
                      <HelpOutlineIcon> <i>aide</i></HelpOutlineIcon>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField
                  id="appointment-date"
                  type="date"
                  defaultValue="MM-DD-YYYY"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.props.appointmentDate}
                  onChange={this.props.handleAppointmentDateChange}
                />
                <Typography className={classes.formError} component="p">{this.props.appointmentDateError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="appointment-time">
                  <span>
                    Temps du rendez-vous:  (HH:MM AM/PM)
                    <Tooltip  
                      title="Use the time picker to specify the time of the appointment."
                      placement="top">
                      <HelpOutlineIcon> <i>aide</i></HelpOutlineIcon>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField
                  id="appointment-time"
                  type="time"
                  defaultValue=""
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.props.appointmentTime}
                  onChange={this.props.handleAppointmentTimeChange}
                />
                <Typography className={classes.formError} component="p">{this.props.appointmentTimeError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="select-patient">
                  <span>
                    Choisir le patient
                    <Tooltip  
                      title="choisir le patient associer au rendez-vous"
                      placement="top">
                      <HelpOutlineIcon> <i>aide</i></HelpOutlineIcon>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField 
                  id='patient'
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField} 
                  value={this.state.value}
                  onChange={this.handlePatientMenuOption} 
                  SelectProps={{ name: 'value'}} 
                  margin="normal">
                    {patients.map(patient => {
                      return <MenuItem key={patient._id} value={patient.lastname}>{patient.firstname} {patient.lastname}</MenuItem>;
                    })}
                  </TextField>
                  <Typography className={classes.formError} component="p">{this.props.appointmentPatientError}</Typography>
              </FormControl>






              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="select-doctor">
                  <span>
                      Selectionner le status de R.D.V : 
                      <Tooltip  
                      title="choisir le status du rendez-vous"
                      placement="top">
                      <HelpOutlineIcon> <i>aide</i></HelpOutlineIcon>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField 
                  id='appointmentStatus'
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField} 
                  value={this.state.value}
                  onChange={this.handleAppointmentStatusOption} 
                  SelectProps={{ name: 'value'}} 
                  margin="normal">
                    <MenuItem  value="confirme">confirme</MenuItem>;
                    <MenuItem  value="en attente">en attente</MenuItem>;
                    
                  </TextField>
                  <Typography className={classes.formError} component="p">{this.props.appointmenStatusError}</Typography>
              </FormControl>

              <Button 
                size="large" 
                className={classes.button} 
                onClick={this.props.handleFormSubmit}
                color="primary" 
                variant="raised"
              >
                Valider l'ajout du rendez-vous
              </Button>
              <Typography className={classes.formSuccess} component="p">{this.props.formSuccessMessage}</Typography>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AppointmentsForm);
