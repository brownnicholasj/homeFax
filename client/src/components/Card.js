import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import HomeIcon from '@material-ui/icons/Home';
import Modal from './Modal';
import HomeList from './HomeList';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    // paper: {
    //     position: 'absolute',
    //     width: 400,
    //     backgroundColor: theme.palette.background.paper,
    //     border: '2px solid #000',
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing(2, 4, 3),
    //   },
    });


export default function OutlinedCard() {
    const { loading, data } = useQuery(QUERY_USER);
    console.log(data)
    let user;
    if (data) {
        user = data.user;
    }
    console.log(user)

    // const user = {
    //     homes: [
    //         {
    //             _id: ';lkjaslkjfillahihe98',
    //             address: {
    //                 street1: 'some street',
    //                 street2: 'some other street',
    //                 city: 'some City',
    //                 state: 'some State',
    //                 zip: 'some Zip'
    //             }
    //         }
    //     ]
    // }

    const classes = useStyles();

    const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
        {loading ? (
            <span>loading...</span>
        ) : (
            user.homes.map((home, index) => (
                <>
                <Card key={home.index} className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <HomeIcon />
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {home.address.street1}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {home.address.street2}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {home.address.city}, {home.address.state} {home.address.zip}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" ><Modal home={home} /></Button>
                    </CardActions>
                </Card>
                {/* <HomeList home={home} /> */}
                </>
            ))
        
        )}
        
    </>
  );
}