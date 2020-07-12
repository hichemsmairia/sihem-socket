// Import React
import React from 'react';
// Import UI components and style from material-ui-next.
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import List, { ListItem, ListItemText } from 'material-ui/List';
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
    color: 'white',
  },
  logItem: {
    marginTop: 34,
    backgroundColor: '#33658A',
    color: 'white',
  },
  button: {
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#F26419',
    color: 'white',
  },
});

// Log List component on the My health log page.
class LogList extends React.Component {
  render() {
    const { classes } = this.props;
    return [
        <ExpansionPanel className={classes.logItem} key={this.props._id}>
          <ExpansionPanelSummary>
            <i className="fas fa-plus"></i>
            <Typography className={classes.heading}>
              <b>Date du note {this.props.date}</b>
            </Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <List>
              <ListItem>
                <ListItemText>
                  <b>Docteur:</b> {this.props.doctor}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <b>Patient:</b> {this.props.patient}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText >
                  <b>Raisons de la visite : </b> {this.props.visitPurpose}
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText >
                  <b>Hauteur (en Cm):</b> {this.props.heightIn}
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText >
                  <b>Poids (en Kg):</b> {this.props.weightLb}
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText >
                  <b>Les notes de la visite:</b> {this.props.visitNotes}
                </ListItemText>
              </ListItem>
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>,
        <Button size="small" color="primary" variant="raised" className={classes.button} onClick={() => { this.props.deleteLog(this.props.id); }}>Supprimer la note</Button>,
    ];
  }
}

export default withStyles(styles)(LogList);
