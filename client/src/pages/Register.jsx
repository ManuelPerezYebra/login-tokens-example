import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../utils/auth/auth.api';

const Register = () => {
	const navigate = useNavigate();
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='username'>Username</label>
					<input type='text' name='username' id='username' />
				</div>
				<div>
					<label htmlFor='username'>Email</label>
					<input type='text' name='email' id='email' />
				</div>
				<div>
					<label htmlFor='username'>Password</label>
					<input type='text' name='password' id='password' />
				</div>
				<input type='submit' value='Register User' />
			</form>
			<button onClick={() => navigate('/')}>Go back</button>
		</>
	);
};

const handleSubmit = async event => {
	event.preventDefault();
	const { username, email, password } = event.target;
	const newUser = {
		username: username.value,
		email: email.value,
		password: password.value
	};
	const serveMessage = await registerRequest(newUser);
	console.log(serveMessage);
};
export default Register;
