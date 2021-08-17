import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';

import KitchenIcon from '@material-ui/icons/Kitchen';
import WeekendIcon from '@material-ui/icons/Weekend';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import BuildIcon from '@material-ui/icons/Build';
import WcIcon from '@material-ui/icons/Wc';


const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function InteractiveList({ home }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(true);

  console.log(home)
  return (
    <div className={classes.root}>
      {/* <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />
          }
          label="Enable dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Enable secondary text"
        />
      </FormGroup> */}
      <Grid container spacing={2}>
        <Grid item xs={8} md={6}>
          <div className={classes.demo}>
            <List dense={dense}>
            {home.areas.map((area, index) => (
                <ListItem key={area._id}>
                  <ListItemIcon>
                    <KitchenIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={area.name}
                    secondary={area.attributes.map(attr => `${attr.type}, `)}
                  />
                </ListItem>
            ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}