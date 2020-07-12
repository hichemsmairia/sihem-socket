// Importing React since we are using React.
import React from 'react';
// Importing material-ui components and style.
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';

// Style
const styles = theme => ({
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
    marginTop: theme.spacing.unit * 3,
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
});

class SymptomTextFields extends React.Component {
  handleSymptomSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
    this.props.handleSymptomTypeChange(event);
  }

  state = {
    value: '',
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);

    return (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
            Ajouter un symptome
            </Typography>
            <form noValidate autoComplete="off" id="symptom-form">
              <FormControl className={classes.formControl} fullWidth>     
                <InputLabel htmlFor="select-symptom">
                  <span>
                    Choisir le type de symptome
                    <Tooltip  
                      title="Choisir un symtome de la liste"
                      placement="top">
                      <IconButton> <i className="material-icons">aide</i></IconButton>
                    </Tooltip>
                  </span>
                </InputLabel>     
                <TextField 
                  id='select-symptom'
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField} 
                  value={this.state.value}
                  onChange={this.handleSymptomSelectChange}
                  SelectProps={{ name: 'value'}} 
                  margin="normal">
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="Dizzy">Vertigineuse</MenuItem>
                    <MenuItem value="Shortness of breath">Essoufflement</MenuItem>
                    <MenuItem value="Fainted">Évanoui</MenuItem>
                    <MenuItem value="Swelling">Gonflement</MenuItem>
                    <MenuItem value="Heart Fluttering">Battements de cœur</MenuItem>
                    <MenuItem value="Fatigue">Fatigue</MenuItem>
                    <MenuItem value="Other">autre</MenuItem>
                </TextField>
                <Typography className={classes.formError} component="p">{this.props.symptomTypeError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="symptom-day">
                  <span>
                    Jour d'apparition du symptome
                    <Tooltip  
                      title="Choisir la date d'apparition du symptome"
                      placement="top">
                      <IconButton> <i className="material-icons">aide</i></IconButton>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField
                  id="symptom-day"
                  type="date"
                  defaultValue="DD-MM-YYYY"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.props.date}
                  onChange={this.props.handleSymptomDayChange}
                />
                <Typography className={classes.formError} component="p">{this.props.symptomDayError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="symptom-time">
                  <span>
                    Le symtome est apparut a : (HH:MM AM/PM)
                    <Tooltip  
                      title="Moment d'apparition du symptome"
                      placement="top">
                      <IconButton> <i className="material-icons">aide</i></IconButton>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField
                  id="symptom-time"
                  type="time"
                  defaultValue=""
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.props.time}
                  onChange={this.props.handleSymptomTimeChange}
                />
                <Typography className={classes.formError} component="p">{this.props.symptomTimeError}</Typography>
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="additional-symptom-info">
                  <span>
                    Autre information a partager avec votre medecin
                    <Tooltip 
                      title=""
                      placement="top">
                      <IconButton> <i className="material-icons">aide</i></IconButton>
                    </Tooltip>
                  </span>
                </InputLabel>
                <TextField
                  id="additional-symptom-info"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  multiline="true"
                  rows={3}
                  rowsMax={4}
                  value={this.props.info}
                  onChange={this.props.handleSymptomInfoChange}
                />
                <Typography className={classes.formError} component="p">{this.props.symptomInfoError}</Typography>
              </FormControl>

              <Button 
                size="large" 
                className={classes.button} 
                onClick={this.props.handleFormSubmit}
                color="primary" 
                variant="raised">
                  Ajouter le symptome
              </Button>
              <Typography className={classes.formSuccess} component="p">{this.props.formSuccessMessage}</Typography>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SymptomTextFields);
