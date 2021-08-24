import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import ListIcon from '@material-ui/icons/List';


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


export default function InteractiveList({ items, itemsKey, subItems, subItemsKey }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={6}>
          <div className={classes.demo}>
            <List dense={dense}>
            {items.map((item, index) => (
                <ListItem key={`item_${index}`}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item[itemsKey]}
                    secondary={subItems ? (
                      item[subItems].map((subItem, idx) => (
                        <span key={`subItem_${idx}`}>•{subItem[subItemsKey]} </span>
                      )
                    )) : (
                      null
                    )}
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