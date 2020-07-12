// Importing React since we are using React.
import React from 'react';
// Importing material-ui components and style.
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import InputAdornment from 'material-ui/Input/InputAdornment';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import './login.css'








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
    <input placeholder="Nom d'utilisateur" id="password" id="username"
                  type="text"
                  value={this.props.username}
                  onChange={this.props.handleUsernameChange} />
    <label id="icon" for="password">

    <i class="fa fa-key"></i>

    </label>

    <input placeholder="Mot de passe" id="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.props.password}
                  onChange={this.props.handlePasswordChange} />

                  <Button onClick={this.handleClickShowPassword.bind(this)} > Affichier le mot de passe </Button>

    <Button  onClick={this.props.handleFormSubmit} variant="raised" color="primary">
              Connection
              </Button>
              
     <Button   component={Link} to="/signup" variant="raised" color="primary">
              Creer un compte
              </Button>
    <div class="crtacc">

    

              </div>
  </form>
</div>

    )
  }
}

// Export the LoginForm component with styling.
export default (LoginForm); 





