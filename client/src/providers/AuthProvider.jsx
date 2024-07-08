import { AuthContext } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { verifyTokenRequest } from '../utils/auth/auth.api';

const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	console.log(userData);

	useEffect(() => {
		checkLogin(setLoading, setUserData);
	}, []);

	return (
		<AuthContext.Provider
			value={{ userData, setUserData, loading, setLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};
const checkLogin = async (setLoading, setUserData) => {
	const cookies = Cookies.get();

	if (!cookies.token) {
		setLoading(false);
		return;
	}

	try {
		const data = await verifyTokenRequest();

		if (!data) {
			setLoading(false);
			return;
		}
		setUserData(data);
		setLoading(false);
	} catch (error) {}

	console.log(cookies.token);
};
console.log(Cookies.get());

export default AuthProvider;
