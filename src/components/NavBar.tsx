import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark mb-5">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          GameSpot
        </NavLink>
        <ul className="navbar-nav me-auto">
          <li>
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/games">
              Games
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
