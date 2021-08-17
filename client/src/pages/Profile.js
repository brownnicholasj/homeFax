import React from 'react';
import Content from '../components/Content';
import Auth from '../utils/auth';

function Profile(props) {
	return (
		<React.Fragment>
			<h1>{Auth.getProfile().data.email}'s Profile</h1>
			<Content></Content>
		</React.Fragment>
	);
}

export default Profile;
