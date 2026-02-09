import { Route, Switch } from "wouter";
import Index from "./pages/index";
import SobrePage from "./pages/sobre";
import { Provider } from "./components/provider";

function App() {
	return (
		<Provider>
			<Switch>
				<Route path="/" component={Index} />
				<Route path="/sobre" component={SobrePage} />
			</Switch>
		</Provider>
	);
}

export default App;
