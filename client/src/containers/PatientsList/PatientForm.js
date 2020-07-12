// Importing React since we are using React.
import React, { Component } from 'react';
// Importing UI components from material-ui-next
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';

const styles = {
  textField: {
    marginTop: 50,
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

class PatientForm extends Component {
  
  state = {
    value: '',
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Ajouter un patient
            </Typography>
            <form noValidate autoComplete="off" id="patient-form">
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="first-name">Nom</InputLabel>
                <TextField
                  id="first-name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                  value={this.props.patientFirstName}
                  onChange={this.props.handlePatientFirstNameChange}
                />
                <Typography className={classes.formError} component="p">{this.props.patientFirstNameError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="last-name">Prenom</InputLabel>
                <TextField
                  id="last-name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                  value={this.props.patientLastName}
                  onChange={this.props.handlePatientLastNameChange}
                />
                <Typography className={classes.formError} component="p">{this.props.patientLastNameError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="patient-phone">Address </InputLabel>
                <TextField
                  id="patient-phone"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.patientAddress}
                  onChange={this.props.handlePatientAddressChange}
                />
                <Typography className={classes.formError} component="p">{this.props.patientAddressError}</Typography>
              </FormControl>

              
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="patient-phone">Numero Telephone </InputLabel>
                <TextField
                  id="patient-phone"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.patientPhone}
                  onChange={this.props.handlePatientPhoneChange}
                />
                <Typography className={classes.formError} component="p">{this.props.patientPhoneError}</Typography>
              </FormControl>

              

              <Button 
                size="large" 
                className={classes.button} 
                onClick={this.props.handlePatientFormSubmit}
                color="primary" 
                variant="raised">
                Ajouter le patient
              </Button>
              <Typography className={classes.formSuccess} component="p">{this.props.patientFormSuccessMessage}</Typography>
            </form>
          </CardContent>
        </Card>
      </div >
    );
  }
}

export default withStyles(styles)(PatientForm);

