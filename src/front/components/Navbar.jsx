import { Link } from "react-router-dom";
import { logout } from "../fetch";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	const handleClick = () => {
		logout(dispatch)
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>

				<Link to="/signup">
					<button className="btn btn-primary">
						Sign Up!
					</button>
				</Link>

				<div className="ml-auto">
					{
						(store.isLoggedIn)
						?
						<>
							<Link to="/login">
								<button
									className="btn btn-danger"
									onClick={handleClick}
								>Logout
								</button>
							</Link>
						</>
						:
						<>
							<Link to="/login">
								<button
									className="btn btn-success"
									onClick={handleClick}
								>Log In
								</button>
							</Link>
						</>
					}
				</div>
			</div>
		</nav>
	);
};