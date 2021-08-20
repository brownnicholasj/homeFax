import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_ATTRIBUTE, EDIT_DETAIL, DELETE_DETAIL } from '../utils/mutations';
import Snack from './Snack';
import CardActions from '@material-ui/core/CardActions';

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


export default function AddAttribute({ areaName, areaId }) {
    const classes = useStyles();
    const [snack, setSnack] = useState({ status: false, areaName: areaName, detailKey: '' });
    const [formState, setFormState] = useState({ areaId: areaId, type: '' });
    const [addAttribute, { error }] = useMutation(ADD_ATTRIBUTE);
    // const [editDetail, { error }] = useMutation(EDIT_DETAIL);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState.type) {
            try {
                const mutationResponse = await addAttribute({
                    variables: {
                        areaId: formState.areaId,
                        type: formState.type
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
                                <h1>{areaName}</h1>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} s={6}>
                                <form className={classes.inputRoot} noValidate autoComplete="off">
                                    <div>
                                        <TextField
                                            required
                                            id="type"
                                            label="Type"
                                            helperText="Attribute detail"
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
                                        Save Attribute
                                    </Button>
                                </form>
                            </Grid>
                            <Grid item xs={12} s={6}>
                                <p>An attribute is part of an area. For instance in your kitchen there are many different things - appliances, dishes, paint color, etc. - and these are what we call "attributes".</p><p>An attribute has a type. Your toaster is an attribute with "type" "toaster".</p>
                                {snack.status ? (
                                    <Snack
                                        setOpen={setSnack}
                                        status={snack.status}
                                        areaName={areaName}
                                        detailKey={formState.key}
                                    />
                                ) : (
                                    null
                                )}
                            </Grid>

                        </Grid>
                    </div>

                </CardContent>
                {/* <CardActions>
                <Button
                color="primary"
                variant="standard"
                size="large"
                onSubmit={handleFormSubmit}>
                    Save Detail
                </Button>
                {snack.status ? (
                    <Snack
                    setOpen={setSnack}
                    status={snack.status}
                    attributeName={attributeName}
                    detailKey={formState.key}
                    />
                ) : (
                    null
                )}
            </CardActions> */}
            </Card>
        </>
    );
}

