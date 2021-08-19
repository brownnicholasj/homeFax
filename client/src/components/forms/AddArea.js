import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_AREA } from '../../utils/mutations';

import Snack from '../Snack';


const useStyles = makeStyles((theme) => ({
    root: {
        // minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    inputRoot: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    },
    gridRoot: {
        flexGrow: 1,
    }
}));


export default function AddArea({ homeId, homeAreas }) {
    const classes = useStyles();
    const [formState, setFormState] = useState({ homeId: homeId, name: '', icon: '' });
	const [addArea, { error }] = useMutation(ADD_AREA);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState.name) {
            try {
                const mutationResponse = await addArea({
                    variables: {
                        homeId: formState.homeId,
                        name: formState.name,
                        icon: formState.icon
                    },
                });
                if (mutationResponse) {
                    console.log(mutationResponse);
                    // setSnack({ status: true });
                }
            } catch (e) {
                console.log(e);
            }
        }
	};

	const handleChange = (event) => {
		const { id, value } = event.target;
		setFormState({
			...formState,
			[id]: value,
		});
	};


  return (
    <>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <div className={classes.gridRoot}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <h1>Add area</h1>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} s={6}>
                            <form className={classes.inputRoot} noValidate autoComplete="off">
                                <div>
                                <TextField
                                    required
                                    id="name"
                                    label="Name"
                                    helperText="Area name"
                                    variant="standard"
                                    onChange={handleChange}
                                    />
                                <TextField
                                    disabled
                                    id="icon"
                                    label="Icon"
                                    helperText="Area icon"
                                    variant="standard"
                                    onChange={handleChange}
                                    />
                                </div>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    size="large"
                                    type="submit"
                                    onClick={handleFormSubmit}>
                                        Save Area
                                </Button>
                            </form>
                        </Grid>
                        <Grid item xs={12} s={6}>
                            <p>An area is part of an area. For instance in your kitchen there are many different things - appliances, dishes, paint color, etc. - and these are what we call "areas".</p><p>An area has a type. Your toaster is an area with "type" "toaster".</p>
                            {/* {snack.status ? (
                                    <Snack
                                    setOpen={setSnack}
                                    status={snack.status}
                                    areaName={areaName}
                                    detailKey={formState.key}
                                    />
                                ) : (
                                    null
                                )} */}
                        </Grid>

                    </Grid>
                </div>
            </CardContent>
        </Card>
    </>
  );
}

