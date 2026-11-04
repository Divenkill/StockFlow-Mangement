import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearSession, getStoredUser } from '../api';
import Logo from './Logo';

function Layout() {
  const navigate = useNavigate();
  const user = getStoredUser();

  function handleLogout() {
    clearSession();
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo size={34} subtitle={user ? user.organizationName : ''} />

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Dashboard
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Products
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Settings
          </NavLink>
        </nav>

        <div className="topbar-user">
          <span className="muted small">{user ? user.email : ''}</span>
          <button className="button button--ghost button--small" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
