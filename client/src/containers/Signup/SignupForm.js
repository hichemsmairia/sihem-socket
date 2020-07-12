// Importing React since we are using React.
import React from 'react';
// Importing material-ui components and style.
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import InputAdornment from 'material-ui/Input/InputAdornment';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import './signup.css'
// Style


class LoginForm extends React.Component {
  // State to toggle password visibility.
  state = {
    password: '',
    showPassword: false,
  };

  // Toggle password visibility
  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // Toggle password visiblity
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { classes } = this.props;

    return (
      <div class="wrapper animated bounce">
  <h1>Bienvenue</h1>
  
  <form>
    <label id="icon" for="username"><i class="fa fa-user"></i></label>
    <input placeholder="Nom d'utilisateur"  id="username"
                  type="text"
                  value={this.props.username}
                  onChange={this.props.handleUsernameChange} />
    <label id="icon" for="password">
    <i class="fa fa-key"></i>
    </label>
    <input placeholder="Mot de passe" 
                  type='password'
                  value={this.props.password}
                  onChange={this.props.handlePasswordChange} />
                  <label id="icon" for="password">
    <i class="fa fa-key"></i>

    </label>
                 <input
                  placeholder="confirmer le mot de passe"
                  type='password'
                  value={this.props.confirmPassword}
                  onChange={this.props.handleConfirmPasswordChange} />
                  <label id="icon" for="email">
<i class="fa fa-envelope" aria-hidden="true"></i>
    </label>
<input  placeholder="Address e-mail"  type='email'
                  value={this.props.email}
                  onChange={this.props.handleEmailChange} />

                  
<label id="icon" for="role">

<i class="fa fa-users" aria-hidden="true"></i>

    </label>
Type du compte :
                  <select id="role"
                  type="text"
                  value={this.props.role}
                  onChange={this.props.handleRoleChange}>
                  


                  <option value="medical-staff">Personelle medical</option>
  <option value="patient">Patient</option>
  
  <option value="taxi-driver">Chauffeur Taxi</option>
</select>


                

    <Button size="large"  onClick={this.props.handleFormSubmit} variant="raised" color="primary">
              Creer un compte
              </Button>
              <Button size="large"  component={Link} to="/" variant="raised" color="primary">
              Deja un membre ? connectez-vous
              </Button>
    <div class="crtacc">

    

              </div>
  </form>
</div>
    );
  }
}

export default (LoginForm);


