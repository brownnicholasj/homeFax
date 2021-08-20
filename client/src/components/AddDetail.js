import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_DETAIL, EDIT_DETAIL, DELETE_DETAIL } from '../utils/mutations';
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


export default function AddDetail({ attributeName, attributeId }) {
    const classes = useStyles();
    const [snack, setSnack] = useState({ status: false, attributeName: attributeName, detailKey: '' });
    const [formState, setFormState] = useState({ attributeId: attributeId, key: '', value: '', date: '' });
    const [addDetail, { error }] = useMutation(ADD_DETAIL);
    // const [editDetail, { error }] = useMutation(EDIT_DETAIL);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState.key && formState.value) {
            try {
                const mutationResponse = await addDetail({
                    variables: {
                        attributeId: formState.attributeId,
                        key: formState.key,
                        value: formState.value,
                        date: formState.date
                    },
                });
                if (mutationResponse) {
                    console.log(mutationResponse);
                    setSnack({ status: true });
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
                                <h1>{attributeName}</h1>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} s={6}>
                                <form className={classes.inputRoot} noValidate autoComplete="off">
                                    <div>
                                        <TextField
                                            required
                                            id="key"
                                            label="Detail"
                                            helperText="Attribute detail"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            required
                                            id="value"
                                            label="Value"
                                            helperText="Attribute detail value"
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                        <TextField
                                            id="date"
                                            type="date"
                                            helperText="Associated date"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        size="large"
                                        type="submit"
                                        onClick={handleFormSubmit}>
                                        Save Detail
                                    </Button>
                                </form>
                            </Grid>
                            <Grid item xs={12} s={6}>
                                <p>Some text here to explain what a detail should and shouldn't be.</p>
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
                            </Grid>

                        </Grid>
                    </div>

                </CardContent>
                {/* <CardActions>
                <Button
                color="primary"
                variant="outlined"
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

