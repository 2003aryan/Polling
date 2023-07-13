import React from 'react';
import CreatePoll from './components/CreatePoll';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PollsList from './components/PollsList';
import ViewPoll from './components/ViewPoll';
import Register from './components/Register';
import Login from './components/Login';
import PollResults from './components/PollResults';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/navbar.js';
import HomePage from './components/HomePage.js';
import EditPoll from './components/EditPoll';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/createPoll" component={CreatePoll} />
					<PrivateRoute exact path="/pollslist" component={PollsList} />
					<Route exact path="/viewpoll/:id" component={ViewPoll} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/viewpoll/:id/pollresults" component={PollResults}/>
					<PrivateRoute exact path="/editpoll/:id" component={EditPoll}/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
