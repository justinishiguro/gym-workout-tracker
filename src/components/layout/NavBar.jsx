import { NavLink } from 'react-router-dom';
import { UserButton } from '@clerk/react';
import { useUnit } from '../../context/UnitContext';
import './NavBar.css';

const links = [
  { to: '/', label: 'History', icon: '📋' },
  { to: '/workout/new', label: 'Log', icon: '➕' },
  { to: '/progress', label: 'Progress', icon: '📈' },
];

export default function NavBar() {
  const { unit, toggleUnit } = useUnit();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
            end={to === '/'}
          >
            <span className="navbar-icon">{icon}</span>
            <span className="navbar-label">{label}</span>
          </NavLink>
        ))}
        <button className="unit-toggle" onClick={toggleUnit} title="Switch weight unit">
          {unit}
        </button>
        <UserButton />
      </div>
    </nav>
  );
}
