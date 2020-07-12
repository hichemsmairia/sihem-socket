// Importing React since we are using React.
import React, { Component } from "react";
// Importing UI components and style from material-ui-next
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
// Import LoginForm
import SignupForm from './SignupForm';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

const styles = {
  // Tell Material-UI what's the font-size on the html element is.
  root: {
    flexGrow: 1,
  },
  headline: {
    marginTop: 30,
  },
};

class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: "",
    credentials: [],
    usernameMissingError: "",
    passwordMissingError: "",
    emailMissingError: "",
    passwordLengthError: "",
    confirmPasswordError: "",
  };


  // Keep track of what user enters for username so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
      usernameMissingError: "", 
    });
  }

  handleRoleChange = (event) => {
    this.setState({
      role: event.target.value,
          });
    console.log(event.target.value)
  }
  // Keep track of what user enters into password input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handlePasswordChange = (event) => {
    this.setState({ 
      password: event.target.value,
      passwordMissingError: "",
    });

    // If password length is greater than 0 but less than 8, show password weak error.
    if (this.state.password.length > 0 && this.state.password.length < 8) {
      this.setState({
        passwordLengthError: "Mot de passe est faible , au moins 8 caracters"
      });
    }

    // If password is 8 characters or greater, remove password length error from page.
    if (this.state.password.length === 8 || this.state.password.length > 8) {
      this.setState({
        passwordLengthError: "",
      });
    }
  }

  // Keep track of what user enters into confirm password input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleConfirmPasswordChange = (event) => {
    this.setState({ 
      confirmPassword: event.target.value,
      confirmPasswordError: "",
    });
  }

  // Keep track of what user enters into email input field so that input can be grabbed later.
  // If form validation error is showing, remove error from page when user starts typing.
  handleEmailChange = (event) => {
    this.setState({ 
      email: event.target.value,
      emailMissingError: "",
    });
  }


  // When user enters credentials and clicks LOG IN button to log in.
  handleFormSubmit = event => {
    const { history } = this.props;
    event.preventDefault();

    // If username field is empty when user submits form, show error.
    if (this.state.username === "") {
      this.setState({
        usernameMissingError: "Nom d'utilisateur est obligatoire"
      })
    }

    // If the password field is empty when user submits form, show error.
    if (this.state.password === "") {
      this.setState({
        passwordMissingError: "Mot de passe est obligatoire"
      })
    }

    // if the email field is empty when user submits form, show error.
    if (this.state.email === "") {
      this.setState({
        emailMissingError: "Email est obligatoire"
      })
    }

    // if the confirm password field is empty when user submits form, show error.
    if (this.state.confirmPassword === "") {
      this.setState({
        confirmPasswordError: "Confirmer mot de passe."
      })
    }

    // If the password and confirm password fields don't match, tell user.
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: "Les deux mots de passe ne se correspondent pas , veuillez verifier",
      })
    }

    // If form is validated, sign up user...
    else {
      axios.post('/Auth/signup', { username: this.state.username, password: this.state.password, email: this.state.email, role: this.state.role})
        .then((res) => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
        axios.post('/Auth/login', { username: this.state.username, password: this.state.password})
        .then((res) => {
          if(this.state.role === "patient") {
            console.log(res.data);
          history.push('/patienthome')
          } else if (this.state.role === "taxi-driver") 
          {
          history.push('/taxiverificationcode') 
          }
          else if(this.state.role === "medical-staff") {
            history.push('/home')
          }
        })
    }
  };

  render() {
    const { classes } = this.props;
    return [
      <div style={{ padding: 70 }}>
        <Grid item xs={12} className={classes.headline}>
          
        </Grid>,

        <div className="main-content-section">
          <Grid item xs={12} className={classes.headline}>
            <Grid container spacing={16} className={classes.root} justify="center">
              <SignupForm
                handleFormSubmit = {this.handleFormSubmit}
                handleUsernameChange = {this.handleUsernameChange}
                handlePasswordChange = {this.handlePasswordChange}
                handleConfirmPasswordChange = {this.handleConfirmPasswordChange}
                handleEmailChange = {this.handleEmailChange}
                handleRoleChange = {this.handleRoleChange}
                usernameMissingError = {this.state.usernameMissingError}
                passwordMissingError = {this.state.passwordMissingError}
                emailMissingError = {this.state.emailMissingError}
                passwordLengthError = {this.state.passwordLengthError}
                confirmPasswordError = {this.state.confirmPasswordError}
              />
            </Grid>
          </Grid>
        </div>
      </div>,
    ];
  }
}

// Exporting the Login component
// so that the App.js file can render the Signup page.
export default withRouter(withStyles(styles)(Signup));