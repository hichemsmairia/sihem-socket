import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    width: 500,
  },
  copyright: {
    marginTop: 10,
    backgroundColor: '#33658A',
    color: 'white',
  },
  footerContent: {
    backgroundColor: '#33658A',
    color: 'white',
  },
  button: {
    color: 'white',
    float: 'right',
    marginBottom: 60,
  },
};

class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className="footer">
        <CardContent>
         
          <Typography component="p" className={classes.footerContent}>
            Sihem ellefi 2020
          </Typography>
          
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Footer);
