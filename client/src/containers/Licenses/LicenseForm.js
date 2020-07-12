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

class LicenseForm extends Component {
  
  handleMdMenuOption = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
    
    //need to make the selected item the first thing that shows on the list
  }

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
              Ajouter un chauffeur Taxi
            </Typography>
            <form noValidate autoComplete="off" id="license-form">
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="first-name">Nom</InputLabel>
                <TextField
                  id="first-name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                  value={this.props.LicenseFirstName}
                  onChange={this.props.handleLicenseFirstNameChange}
                />
                <Typography className={classes.formError} component="p">{this.props.LicenseFirstNameError}</Typography>
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
                  value={this.props.LicenseLastName}
                  onChange={this.props.handleLicenseLastNameChange}
                />
                <Typography className={classes.formError} component="p">{this.props.LicenseLastNameError}</Typography>
              </FormControl>

              

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="license-code">Code</InputLabel>
                <TextField
                  id="doctor-phone"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.LicenseCode}
                  onChange={this.props.handleLicenseCodeChange}
                />
                <Typography className={classes.formError} component="p">{this.props.LicenseCodeError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="license-address">Address</InputLabel>
                <TextField
                  id="doctor-phone"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.LicenseAddress}
                  onChange={this.props.handleLicenseAddressChange}
                />
                <Typography className={classes.formError} component="p">{this.props.LicenseAddressError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="license-phone">Telephone</InputLabel>
                <TextField
                  id="doctor-phone"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.LicensePhone}
                  onChange={this.props.handleLicensePhoneChange}
                />
                <Typography className={classes.formError} component="p">{this.props.LicensePhoneError}</Typography>
              </FormControl>

              <Button 
                size="large" 
                className={classes.button} 
                onClick={this.props.handleLicenseFormSubmit}
                color="primary" 
                variant="raised">
                Valider l'ajout du chauffeur taxi
              </Button>
              <Typography className={classes.formSuccess} component="p">{this.props.LicenseFormSuccessMessage}</Typography>
            </form>
          </CardContent>
        </Card>
        </div>
    );
  }
}

export default withStyles(styles)(LicenseForm);

