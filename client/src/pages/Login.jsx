import { useContext, useEffect } from 'react';
import { loginRequest } from '../utils/auth/auth.api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
	const { userData, setUserData, loading } = useContext(AuthContext);

	useEffect(() => {
		if (!userData) return;
		navigate('/');
	}, [userData]);
	if (loading) return <h1>Loading...</h1>;
	const navigate = useNavigate();
	return (
		<>
			<form onSubmit={event => handleSubmit(event, setUserData)}>
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
			<button onClick={() => navigate('/')}>Go back</button>
		</>
	);
};

const handleSubmit = async (event, setUserData) => {
	event.preventDefault();
	const { email, password } = event.target;
	const loginData = {
		email: email.value,
		password: password.value
	};
	const serveMessage = await loginRequest(loginData, setUserData);
	console.log(serveMessage);
};
export default Login;
