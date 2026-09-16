import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  FileText,
  Users,
  CreditCard,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/courses", label: "Cursos", icon: BookOpen },
  { to: "/admin/content", label: "Conteúdo", icon: Layers },
  { to: "/admin/lessons", label: "Lições", icon: FileText },
  { to: "/admin/users", label: "Usuários", icon: Users },
  { to: "/admin/purchases", label: "Compras", icon: CreditCard },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-mark">D</span>
          <div>
            <strong>digle</strong>
            <span>ADMIN</span>
          </div>
        </div>

        <nav className="admin-nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `admin-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-security">
          <ShieldCheck size={20} />
          <div>
            <strong>Admin</strong>
            <span>Acesso protegido</span>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div>
            <span>Painel administrativo</span>
            <strong>Digle</strong>
          </div>

          <div className="admin-avatar">A</div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
