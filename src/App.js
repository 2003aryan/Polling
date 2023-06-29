import React from 'react';
import CreatePoll from './components/CreatePoll';
import Navbar from './components/navbar';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './components/dashboard';
import FinalPoll from './components/FinalPoll';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={CreatePoll} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/finalpoll/:id" component={FinalPoll} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
