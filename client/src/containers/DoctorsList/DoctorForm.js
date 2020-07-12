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

class DoctorForm extends Component {
  handleMdMenuOption = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
    this.props.handleDoctorMdChange(event);
    //need to make the selected item the first thing that shows on the list
  }

  state = {
    value: '',
  }

  render() {
    const { classes, mds } = this.props;
    
    return (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Ajouter un docteur
            </Typography>
            <form noValidate autoComplete="off" id="doctor-form">
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="first-name">Nom</InputLabel>
                <TextField
                  id="first-name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                  value={this.props.doctorFirstName}
                  onChange={this.props.handleDoctorFirstNameChange}
                />
                <Typography className={classes.formError} component="p">{this.props.doctorFirstNameError}</Typography>
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
                  value={this.props.doctorLastName}
                  onChange={this.props.handleDoctorLastNameChange}
                />
                <Typography className={classes.formError} component="p">{this.props.doctorLastNameError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="md">Selectionner un departement medicale</InputLabel>
                <TextField 
                  id='md'
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField} 
                  value={this.state.value}
                  onChange={this.handleMdMenuOption} 
                  SelectProps={{ name: 'value'}} 
                  margin="normal">
                    {mds.map(md => {
                      return <MenuItem key={md._id} value={md.mdname} sid={md._id}>{md.mdname}</MenuItem>;
                    })}
                  </TextField>
                  <Typography className={classes.formError} component="p">{this.props.doctorMdError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="doctor-phone">Numero telephonique</InputLabel>
                <TextField
                  id="doctor-phone"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.doctorPhone}
                  onChange={this.props.handleDoctorPhoneChange}
                />
                <Typography className={classes.formError} component="p">{this.props.doctorPhoneError}</Typography>
              </FormControl>

              <Button 
                size="large" 
                className={classes.button} 
                onClick={this.props.handleDoctorFormSubmit}
                color="primary" 
                variant="raised">
                Valider l'ajout du docteur
              </Button>
              <Typography className={classes.formSuccess} component="p">{this.props.doctorFormSuccessMessage}</Typography>
            </form>
          </CardContent>
        </Card>
      </div >
    );
  }
}

export default withStyles(styles)(DoctorForm);

