import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useMutation } from '@apollo/client';
import { ADD_HOME, TRANSFER_HOME } from '../../utils/mutations';
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


export default function AddHome({ userId }) {
    const classes = useStyles();
    const [snack, setSnack] = useState({ status: false, message: '' });
    const [formState, setFormState] = useState({ street1: '', street2: '', city: '', state: '', zip: '' });
    const [addHome, { addError }] = useMutation(ADD_HOME);
    const [assignHome, { assignError }] = useMutation(TRANSFER_HOME);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (userId && formState.street1) {
            try {
                const mutationResponse = await addHome({
                    variables: {
                        address: formState,
                    },
                });
                if (mutationResponse) {
                    const user = await assignHome({
                        variables: {
                            receiver: userId,
                            home: mutationResponse.data.addHome._id
                        }
                    });
                    console.log(user);
                    setSnack({ status: true, message: 'Home added' });
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
                                <h3>Add home</h3>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} s={6}>
                                <form className={classes.inputRoot} noValidate autoComplete="off">
                                    <div>
                                        <TextField
                                            required
                                            id="street1"
                                            label="Street(1)"
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            id="street2"
                                            label="Street(2)"
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            required
                                            id="city"
                                            label="City"
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            required
                                            id="state"
                                            label="State"
                                            variant="standard"
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            required
                                            id="zip"
                                            label="Zip"
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
                                        Save Home
                                    </Button>
                                </form>
                                {snack.status ? (
                                    <Snack
                                        setOpen={setSnack}
                                        status={snack.status}
                                        message={snack.message}
                                    />
                                ) : (
                                    null
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

