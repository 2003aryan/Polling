import React from 'react';
import CreatePoll from './components/CreatePoll';
import Navbar from './components/navbar';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PollsList from './components/PollsList';
import FinalPoll from './components/FinalPoll';
import Register from './components/Register';
import Login from './components/Login';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={CreatePoll} />
					<Route exact path="/pollslist" component={PollsList} />
					<Route exact path="/finalpoll/:id" component={FinalPoll} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
