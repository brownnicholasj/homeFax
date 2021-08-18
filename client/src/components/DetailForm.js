import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import { useQuery, useMutation } from '@apollo/client';
import {
	ADD_DETAIL,
    EDIT_DETAIL,
    DELETE_DETAIL
} from '../utils/mutations';


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


export default function OutlinedCard({ test }) {
    const classes = useStyles();

    const [formState, setFormState] = useState({ attributeId: '611d3a49f38c9d6718e4f856', key: '', value: '', date: '' });
	const [addDetail, { error }] = useMutation(ADD_DETAIL);
	// const [editDetail, { error }] = useMutation(EDIT_DETAIL);
	const handleFormSubmit = async (event) => {
		event.preventDefault();
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
            }
        } catch (e) {
			console.log(e);
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
                        <Grid item xs={12}><h1 className={classes.title}>{test}</h1></Grid>
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
                            </form>
                        </Grid>
                        <Grid item xs={12} s={6}>
                            <p>Some text here to explain what a detail should and shouldn't be.</p>
                        </Grid>

                    </Grid>
                </div>

            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleFormSubmit}>Test Text</Button>
            </CardActions>
        </Card>
    </>
  );
}

