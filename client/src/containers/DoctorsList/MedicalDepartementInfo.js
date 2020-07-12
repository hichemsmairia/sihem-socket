// Import React
import React from 'react';
// Import UI components and style from material-ui-next.
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

// Style/Theme
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 20,
  },
  logItem: {
    marginTop: 20,
  },
  button: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#33658A',
    color: 'white',
  },
});

// md info component on the Doctors and mds page.
class MedicalDepartementInfo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <List className={classes.logItem} key={this.props.id}>
          <ListItem>
            <ListItemText >
              <b>Département médicale</b> {this.props.mdName}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText >
              <p><b>Localisation du département:</b></p>
              <p>{this.props.mdAddress}</p>
              <p>{this.props.mdCity}, {this.props.mdState} {this.props.mdZip}</p>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText >
              <b>Télephone: </b> {this.props.mdPhone}
            </ListItemText>
          </ListItem>
          <ListItem>
            <Button size="small" color="primary" variant="raised" className={classes.button} onClick={() => { this.props.deletemd(this.props.id); }}>Supprimer</Button>
          </ListItem>
        </List>
        <Divider className={classes.divider} />
      </div>
    );
  }
}

export default withStyles(styles)(MedicalDepartementInfo);
