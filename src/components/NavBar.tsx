import { NavLink } from 'react-router-dom';
import AuthService from '../services/AuthService';

function NavBar() {
  const user: any = AuthService.getUser();

  return (
    <nav className="navbar navbar-expand-lg bg-dark mb-5">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          GameSpot
        </NavLink>
        <ul className="navbar-nav me-auto">
          <li>
            <NavLink className="nav-link" to={user ? '/customers' : '/login'}>
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/games">
              Games
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to={user ? '/rentals' : '/login'}>
              Rentals
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink className="nav-link" to="/me">
                  Hello, {user.name}
                </NavLink>
              </li>
              <li>
                <button
                  className="btn btn-secondary rounded-pill"
                  onClick={() => AuthService.logout()}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
