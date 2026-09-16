import { NavLink, Outlet } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Award,
  User,
  ShoppingBag,
  Flame,
  Heart,
  Star,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/app", label: "Aprender", icon: BookOpen, end: true },
  { to: "/app/ranking", label: "Ranking", icon: Trophy },
  { to: "/app/achievements", label: "Conquistas", icon: Award },
  { to: "/app/profile", label: "Perfil", icon: User },
  { to: "/app/purchases", label: "Compras", icon: ShoppingBag },
];

export default function UserLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="user-layout">
      <aside className={`user-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <span className="brand-mark">D</span>
          <span>digle</span>
        </div>

        <nav className="sidebar-nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-pass">
          <div className="pass-icon">✦</div>
          <strong>Digle Pass</strong>
          <p>Desbloqueie toda a jornada por 30 dias.</p>
          <button>Ver passe</button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">D</div>
          <div>
            <strong>Visitante</strong>
            <span>Comece sua jornada</span>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      <div className="user-main">
        <header className="user-header">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="header-spacer" />

          <div className="header-stat streak">
            <Flame size={18} />
            <span>7</span>
          </div>

          <div className="header-stat xp">
            <Star size={18} />
            <span>120</span>
          </div>

          <div className="header-stat hearts">
            <Heart size={18} />
            <span>5</span>
          </div>
        </header>

        <main className="user-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
