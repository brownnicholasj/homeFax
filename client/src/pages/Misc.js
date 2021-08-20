import React, { useEffect } from 'react';
import AddDetail from '../components/forms/AddDetail';
import EditDetail from '../components/forms/EditDetail';
import AddAttribute from '../components/forms/AddAttribute';
import EditAttribute from '../components/forms/EditAttribute';
import AddArea from '../components/forms/AddArea';
import EditArea from '../components/forms/EditArea';
import AddHome from '../components/forms/AddHome';
import GenericList from '../components/GenericList';
import HomeCard from '../components/HomeCard';
import Card from '../components/Card';
import Transfer from '../components/Transfer';
import { useStoreContext } from '../utils/GlobalState';
import { effectHelper } from '../utils/helpers';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_GET_HOME, QUERY_AREA, QUERY_ATTRIBUTE, QUERY_DETAIL } from '../utils/queries';

function Misc(props) {
	const [state] = useStoreContext();
	const { user, homes } = state;

	console.log(homes);

	// const homes = user.homes;	
	// const testHome = user.homes[0];
	// const testArea = testHome.areas[0];
	// const testAttribute = testArea.attributes[0];
	// const testDetail = testAttribute.detail[0];



	// const testArea = selectArea();
	// // const { data: areaData } = useQuery(QUERY_AREA, {
	// 	variables: { areaId: testHome.area[0]._id}
	// });
	// let area;
	// if (areaData) {
	// 	area = areaData;
	// };
	return (
		<React.Fragment>
			<div>
				{/* <AddDetail attributeName={testAttribute.type} attributeId={testAttribute._id}/> */}
				{/* <EditDetail detailId={testDetail._id} detailKey={testDetail.key} detailValue={testDetail.value} detailDate={testDetail.date} /> */}
				{/* <GenericList items={testAttribute.detail} itemsKey={'key'} />
		
					{/* <AddAttribute areaName={testArea.name} areaId={testArea._id} areaAttributes={testArea.attributes} />
					<EditAttribute attId={testAttribute._id} attType={testAttribute.type} />
					<GenericList items={testArea.attributes} itemsKey={'type'} subItems={'detail'} subItemsKey={'key'} /> */}

				{/* <AddArea homeId={testHome._id} />
					<EditArea areaId={testArea._id} areaName={testArea.name} areaIcon={testArea.icon} />
					<GenericList items={testHome.areas} itemsKey={'name'} /> */}

				{/* <AddHome userId={user._id} />
					<GenericList items={homes} itemsKey={'_id'} /> */}

				{/* <Card /> */}
				{/* <HomeCard home={homes[0]} /> */}
			</div>
		</React.Fragment>
	);
}

export default Misc;
