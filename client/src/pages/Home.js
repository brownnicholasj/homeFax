import React, { useEffect } from 'react';
import Content from '../components/Content';
import { Menu } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

// CODE ADDED FOR USE STATE TESTING
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';
import {
	UPDATE_USER,
	UPDATE_HOMES
} from '../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function Home(props) {
	const [state, dispatch] = useStoreContext();
	const { user, homes, transfers } = state;
	const { loading, data } = useQuery(QUERY_USER);
	
	useEffect(() => {
		if (data) {
			dispatch({
				type: UPDATE_USER,
				user: data.user,
			});
			idbPromise('user', 'put', data.user);
			dispatch({
				type: UPDATE_HOMES,
				homes: data.user.homes,
			});
			data.user.homes.forEach((home) => {
				idbPromise('homes', 'put', home);
		    });
		} else if (!loading) {
			idbPromise('user', 'get').then((user) => {
				dispatch({
					type: UPDATE_USER,
					user: user,
				});
			});
			idbPromise('homes', 'get').then((homes) => {
				dispatch({
					type: UPDATE_HOMES,
					homes: homes,
				});
			});
		}
	  }, [data, loading, dispatch]);
	
	console.log(user);
	console.log(homes);
	
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// TEST CODE FOR PWA
	const [testState, setTestState] = useState({});

	const { loading, data } = useQuery(QUERY_USER);
	// let user;
	// if (!loading) {
	// 	user = data.user;
	// }

	const { user, homes } = testState;

	useEffect(() => {
		// // already in global store
		// if (data) {
		// 	setCurrentProduct(products.find((product) => product._id === id));
		// }
		// retrieved from server
		if (data) {
			setTestState({
			user: data.user,
			homes: data.user.homes,
			});
	
			idbPromise('user', 'put', data.user);
			data.user.homes.forEach((home) => {
				idbPromise('homes', 'put', home);
			});
		}
		// get cache from idb
		else if (!loading) {
			idbPromise('user', 'get').then((indexedInfo) => {
				setTestState({
					user: indexedInfo.user,
					homes: indexedInfo.user.homes,
				});
			});
		}
	}, [user, homes, data, loading]);
  
	// END OF PWA TEST CODE

	return (
		<React.Fragment>
			<h1>Home</h1>
			<div>
				<Button
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleClick}
				>
					Open Menu
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>My account</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
			</div>
			<Content></Content>
		</React.Fragment>
	);
}

export default Home;
