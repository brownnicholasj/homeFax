import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import PaperBase from './pages/PaperBase.js';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Switch>
					<Route exact path="/" component={PaperBase} />
					<Route exact path="/home" component={PaperBase} />
					<Route exact path="/settings" component={PaperBase} />
					<Route exact path="/myhomes" component={PaperBase} />
					<Route exact path="/misc" component={PaperBase} />
					<Route exact path="/profile" component={PaperBase} />
					<Route exact path="/friends" component={PaperBase} />
					<Route exact path="/zillow" component={PaperBase} />
					<Route exact path="/twitter" component={PaperBase} />
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
