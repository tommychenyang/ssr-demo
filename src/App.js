import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Todos from './Todos';
class App extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log('Application did mount');
	}
	render() {
		console.log('application rendering');
		return (
			<div>
				<Switch>
					<Route exact path="/" render={props => <Home name="Alligator.io" {...props} />} />

					<Route path="/todos" component={Todos} />
				</Switch>
			</div>
		);
	}
}

export default App;
