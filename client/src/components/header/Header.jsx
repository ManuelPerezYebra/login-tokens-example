import { AuthContext } from '../../contexts/AuthContext';
import Logout from '../logout/Logout';
import Menu from '../menu/Menu';
import { useContext } from 'react';

const Header = () => {
	const { userData, loading } = useContext(AuthContext);
	return (
		<header>
			<Menu />

			{!loading && userData && (
				<>
					<h1>Hola {userData.username}</h1>
					<Logout />
				</>
			)}
		</header>
	);
};

export default Header;
