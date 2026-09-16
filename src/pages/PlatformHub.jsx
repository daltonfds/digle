import React from "react";
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Bookmark,
  Brain,
  ChevronRight,
  Flame,
  Headphones,
  Home,
  Layers,
  Settings,
  Sparkles,
  Trophy,
  User,
  Zap,
} from "lucide-react";

const items = [
  ["Dashboard", Home, "/"],
  ["Bíblia", BookOpen, "/bible"],
  ["Lições", Layers, "/lessons"],
  ["Trilhas", Sparkles, "/trilhas"],
  ["Quiz", Brain, "/quiz"],
  ["Áudio", Headphones, "/audio"],
  ["Desafio diário", Zap, "/daily-challenge"],
  ["Progresso", BarChart3, "/progress"],
  ["Conquistas", Trophy, "/achievements"],
  ["Streak", Flame, "/streak"],
  ["Salvos", Bookmark, "/saved"],
  ["Perfil", User, "/profile"],
];

export default function PlatformHub() {
  return (
    <main className="digle-page platform-page">
      <section className="platform-header">
        <div>
          <span className="eyebrow"><Sparkles size={15} /> DIGLE</span>
          <h1>Sua jornada bíblica em um só lugar.</h1>
          <p>Aprenda. Pratique. Cresça.</p>
        </div>
        <div className="platform-avatar">D</div>
      </section>

      <section className="platform-overview">
        <div className="overview-main">
          <span>PROGRESSO GERAL</span>
          <h2>Você está indo muito bem.</h2>
          <div className="overview-bar"><i style={{ width: "62%" }} /></div>
          <div><strong>62%</strong><span>da jornada inicial concluída</span></div>
        </div>
        <div className="overview-side">
          <Flame />
          <strong>7</strong>
          <span>dias consecutivos</span>
        </div>
      </section>

      <section className="platform-section">
        <div className="section-heading">
          <div><span className="eyebrow">EXPLORAR</span><h2>Todas as áreas</h2></div>
        </div>

        <div className="platform-grid">
          {items.map(([title, Icon, path]) => (
            <a href={path} className="platform-item" key={title}>
              <div className="platform-item-icon"><Icon /></div>
              <div><strong>{title}</strong><span>Explorar</span></div>
              <ChevronRight />
            </a>
          ))}
        </div>
      </section>

      <section className="platform-bottom">
        <a href="/settings"><Settings /><span>Definições</span></a>
        <a href="/notifications"><Bell /><span>Notificações</span></a>
        <a href="/profile"><User /><span>Minha conta</span></a>
        <a href="/achievements"><Award /><span>Conquistas</span></a>
      </section>
    </main>
  );
}
