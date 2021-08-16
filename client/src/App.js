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
import Content from './components/Content';

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

function App(props) {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Switch>
					<Route exact path="/">
						<PaperBase content={<Content></Content>}></PaperBase>
					</Route>
					<Route exact path="/home">
						<PaperBase content={<Content></Content>}></PaperBase>
					</Route>
					<Route exact path="/settings">
						<PaperBase content={<Content></Content>}></PaperBase>
					</Route>
					<Route exact path="/myhomes">
						<PaperBase content={<Content></Content>}></PaperBase>
					</Route>
					<Route exact path="/misc">
						<PaperBase content={<Content></Content>}></PaperBase>
					</Route>
					<Route exact path="/profile">
						<PaperBase content={<Content></Content>}></PaperBase>
					</Route>
					<Route exact path="/friends">
						<PaperBase content={<Content></Content>}></PaperBase>
					</Route>
					<Route exact path="/zillow">
						<PaperBase content={<Content></Content>}></PaperBase>
					</Route>
					<Route exact path="/twitter">
						<PaperBase content={<Content></Content>}></PaperBase>
					</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
