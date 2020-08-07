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

class ReservationForm extends Component {
  
  

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
              Reserver une taxi maintenant ! 
            </Typography>
                 
              <Button 
                size="large" 
                className={classes.button} 
                onClick={this.props.handleReservationFormSubmit}
                color="primary" 
                variant="raised">
                Valider l'ajout du de la reservation
              </Button>
              <Typography className={classes.formSuccess} component="p">{this.props.ReservationFormSuccessMessage}</Typography>
             <div>- methode 1 : saisir votre addresse</div> 
                <div>- methode 2 : obtenir automatiquement votre addresse</div>
                <div>- methode 3 : selectionner un taxist depuis la liste</div>  
          </CardContent>
        </Card>
        </div>
    );
  }
}

export default withStyles(styles)(ReservationForm);

