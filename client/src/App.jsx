import Login from './components/login/Login';
import Register from './components/register/Register';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<>
			<GlobalStyles />
			<h1>REGISTER</h1>
			<Register />
			<h2>----------</h2>
			<Login />
		</>
	);
};

export default App;
