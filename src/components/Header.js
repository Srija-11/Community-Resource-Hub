import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import './Header.css';

export default function Header({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

  return (
    <header className="header">
      <h1>COMMUNITY EMERGENCY RESOURCE HUB</h1>
      <nav className="nav-links">
        <Link to="/">SOS & Maps</Link>
        <a href="#contact">Contact</a>

        {user ? (
          <>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
