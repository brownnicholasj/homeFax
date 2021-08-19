import React from 'react';
import AddDetail from '../components/AddDetail';
import Transfer from '../components/Transfer';

import { useEffect } from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { effectHelper } from '../utils/helpers';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


function Misc(props) {
	const [state, dispatch] = useStoreContext();
	const { user, homes, transfers } = state;
	const { loading, data } = useQuery(QUERY_USER);


	useEffect(() => {
		effectHelper(data, dispatch, loading);
	}, [data, loading, dispatch]);


	return (
		<React.Fragment>
			<h1>Misc</h1>
			{/* <AddDetail attributeName={'Attribute Name'} attributeId={'611d3a49f38c9d6718e4f856'}/> */}
			<Transfer user={user} homes={homes} transfers={transfers} />
		</React.Fragment>
	);
}

export default Misc;
