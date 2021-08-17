import React from 'react';
import Content from '../components/Content';
import Auth from '../utils/auth';

function Profile(props) {
	const { email, username, firstName, lastName } = Auth.getProfile().data;
	return (
		<React.Fragment>
			<h1>{username}'s Profile</h1>
			<Content></Content>
		</React.Fragment>
	);
}

export default Profile;
