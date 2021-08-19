import React from 'react';
import AddDetail from '../components/forms/AddDetail';
import AddArea from '../components/forms/AddArea';
import AddAttribute from '../components/forms/AddAttribute';
import GenericList from '../components/GenericList';
import HomeCard from '../components/HomeCard';

import Card from '../components/Card';

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

	function selectArea() {
		const areas = homes.map(home => home.areas[0])
		return {
			areaName: areas[0].name,
			areaId: areas[0]._id,
			areaAttributes: areas[0].attributes
		}
	}

	const testHome = homes[0];
	const testArea = selectArea();
	return (
		<React.Fragment>
			<h1>Misc</h1>
			{/* <AddDetail attributeName={'Attribute Name'} attributeId={'611d3a49f38c9d6718e4f856'}/> */}
			{/* <AddAttribute areaName={testArea.areaName} areaId={testArea.areaId} areaAttributes={testArea.areaAttributes} /> */}
			<AddArea homeId={testHome._id} homeAreas={testHome.areas} />
			{/* <GenericList items={homes[0].areas[0].attributes} itemsKey={'type'} subItems={'detail'} subItemsKey={'key'} /> */}
			<GenericList items={testHome.areas} itemsKey={'name'} />
			{/* <Card /> */}
			{/* <HomeCard home={homes[0]} /> */}
		</React.Fragment>
	);
}

export default Misc;
