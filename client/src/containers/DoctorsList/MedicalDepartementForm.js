import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

const styles = {
  textField: {
    marginTop: 50,
  },
  
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
    color: 'red'
  },
  formSuccess: {
    color: 'green',
    marginTop: 10,
  }
};

class MedicalDepartementForm extends React.Component {
  // Keep track of what user selects from md state drop down menu so that input can be grabbed later.
  handleMdStateSelectChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    event.preventDefault();
    this.props.handleMdStateChange(event);
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
              Ajouter un département médicale
            </Typography>
            <form noValidate autoComplete="off" id="md-form">
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="md-name">Nom</InputLabel>
                <TextField
                  id="md-name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  className={classes.textField}
                  value={this.props.mdName}
                  onChange={this.props.handleMdNameChange}
                />
                <Typography className={classes.formError} component="p">{this.props.mdNameError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="md-address">Addresse</InputLabel>
                <TextField
                  id="md-address"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.mdAddress}
                  onChange={this.props.handleMdAddressChange}
                />
                <Typography className={classes.formError} component="p">{this.props.mdAddressError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="md-city">Cité</InputLabel>
                <TextField
                  id="md-city"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.mdCity}
                  onChange={this.props.handleMdCityChange}
                />
                <Typography className={classes.formError} component="p">{this.props.mdCityError}</Typography>
              </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="select-state-dropdown">State</InputLabel>
                <TextField
                  select
                  className={classes.textField}
                  value={this.state.value}
                  onChange={this.handleMdStateSelectChange}
                  inputProps={{
                    state: '',
                    id: 'select-md-state',
                  }}
                  SelectProps = {
                    {name: 'value'}
                  }
                >
                  <MenuItem value='' />
                  <MenuItem value='AL'>Alabama</MenuItem>
                  <MenuItem value='AK'>Alaska</MenuItem>
                  <MenuItem value='AZ'>Arizona</MenuItem>
                  <MenuItem value='CA'>California</MenuItem>
                  <MenuItem value='CO'>Colorado</MenuItem>
                  
                  
                </TextField>
                <Typography className={classes.formError} component="p">{this.props.mdStateError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="md-zip-code">Zip code</InputLabel>
                <TextField
                  id="md-zip-code"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.mdZip}
                  onChange={this.props.handleMdZipChange}
                />
                <Typography className={classes.formError} component="p">{this.props.mdZipError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="md-phone">Phone number</InputLabel>
                <TextField
                  id="md-phone"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  className={classes.textField}
                  value={this.props.mdPhone}
                  onChange={this.props.handleMdPhoneChange}
                />
                <Typography className={classes.formError} component="p">{this.props.mdPhoneError}</Typography>
              </FormControl>

              <Button 
                size="large" 
                className={classes.button} 
                onClick={this.props.handleMdFormSubmit}
                color="primary" 
                variant="raised"
              >
                Add md
              </Button>
              <Typography className={classes.formSuccess} component="p">{this.props.mdFormSuccessMessage}</Typography>
            </form>
          </CardContent>
        </Card>
      </div >
    );
  }
}

// Export md form component with styling.
export default withStyles(styles)(MedicalDepartementForm);
