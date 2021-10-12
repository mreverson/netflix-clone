import React, { useEffect} from "react";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useHistory } from 'react-router';

function App() {
	const user = useSelector(selectUser)
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			if (userAuth) {
				dispatch(login({
					uid: userAuth.uid,
					email: userAuth.email
				}))
			} else {
				dispatch(logout());
				
			}
		})
		return unsubscribe;
	}, [dispatch])

  	return (
		<div className="app bg-black-custom">
			<Router>
				{!user ? (
					<LoginScreen />
				) : (
					<Switch>
						<Route path="/profile">
							<ProfileScreen />
						</Route>
						<Route exact path="/">
							<HomeScreen />
						</Route>
					</Switch>

				)}

		</Router>
		</div>
  	);
}

export default App;
