import React from 'react';
import CreatePoll from './components/CreatePoll';
import Navbar from './components/navbar';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PollsList from './components/PollsList';
import ViewPoll from './components/ViewPoll';
import Register from './components/Register';
import Login from './components/Login';
import PollResults from './components/PollResults';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={CreatePoll} />
					<Route exact path="/pollslist" component={PollsList} />
					<Route exact path="/viewpoll/:id" component={ViewPoll} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/viewpoll/:id/pollresults" component={PollResults}/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
