import React from 'react';
import CreatePoll from './components/CreatePoll';
import { Switch, Route, useLocation } from "react-router-dom";
import PollsList from './components/PollsList';
import ViewPoll from './components/ViewPoll';
import Register from './components/Register';
import Login from './components/Login';
import PollResults from './components/PollResults';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/navbar.js';
import EditPoll from './components/EditPoll';
import Success from './components/success';

function App() {
	const location = useLocation();
	const hideNavbarOnLogin = ['/login', '/', '/register'];
	return (
			<>
				{hideNavbarOnLogin.includes(location?.pathname) ? null : <Navbar />}
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/createpoll" component={CreatePoll} />
					<PrivateRoute exact path="/pollslist" component={PollsList} />
					<Route exact path="/viewpoll/:id" component={ViewPoll} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/viewpoll/:id/pollresults" component={PollResults}/>
					<PrivateRoute exact path="/editpoll/:id" component={EditPoll}/>
					<Route exact path="/success" component={Success}/>
				</Switch>
			</>
	);
}

export default App;
