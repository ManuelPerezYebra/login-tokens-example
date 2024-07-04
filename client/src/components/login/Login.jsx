import { loginRequest } from '../../utils/auth/auth.api';

const Login = () => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='username'>Email</label>
				<input type='text' name='email' id='email' />
			</div>
			<div>
				<label htmlFor='username'>Password</label>
				<input type='text' name='password' id='password' />
			</div>
			<input type='submit' value='Login User' />
		</form>
	);
};

const handleSubmit = async event => {
	event.preventDefault();
	const { email, password } = event.target;
	const loginData = {
		email: email.value,
		password: password.value
	};
	const serveMessage = await loginRequest(loginData);
	console.log(serveMessage);
};
export default Login;
