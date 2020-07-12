import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import { Link } from 'react-router-dom';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';

const drawerWidth = 120;

const styles = {
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: '#33658A',
  },
  navItem: {
    marginTop: 8,
  },
};

class patientSidebar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Hidden xsDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem className={classes.navItem} component={Link} to="/patienthome">
              <ListItemText>
                <Tooltip
                  title="Acceuil"
                  placement="top"
                >
                  <IconButton> <i className="fas fa-home" /></IconButton>
                </Tooltip>
              </ListItemText>
            </ListItem>
            <ListItem className={classes.navItem} component={Link} to="/log">
              <ListItemText>
                <Tooltip
                  title="Mon journal de santé"
                  placement="top"
                >
                  <IconButton>  <i className="fas fa-notes-medical" /></IconButton>
                </Tooltip>
              </ListItemText>
            </ListItem>
            <ListItem className={classes.navItem} component={Link} to="/symptoms">
              <ListItemText>
                <Tooltip
                  title="Journal des symptomes"
                  placement="top"
                >
                  <IconButton><i className="fas fa-sticky-note" /></IconButton>
                </Tooltip>
              </ListItemText>
            </ListItem>
            <ListItem className={classes.navItem} component={Link} to="/patientappointments">
              <ListItemText>
                <Tooltip
                  title="Appointments"
                  placement="top"
                >
                  <IconButton><i className="fas fa-calendar-alt" /></IconButton>
                </Tooltip>
              </ListItemText>
            </ListItem>
            
            
            <ListItem className={classes.navItem} component={Link} to="/charts">
              <ListItemText>
                <Tooltip
                  title="Mes graphes"
                  placement="top"
                >
                  <IconButton><i className="fas fa-chart-line" /></IconButton >
                </Tooltip>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
    );
  }
}

export default withStyles(styles)(patientSidebar);
