import React from "react";
import {
  Award,
  ChevronRight,
  Crown,
  Gift,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";

const levels = [
  ["1", "Iniciante", 0, "Primeiros passos"],
  ["2", "Explorador", 200, "Continue descobrindo"],
  ["3", "Aprendiz", 400, "Conhecimento crescendo"],
  ["4", "Aprendiz da Palavra", 600, "Você está avançando"],
  ["5", "Conhecedor", 800, "Próxima grande etapa"],
  ["6", "Estudante", 1100, "Aprofundando"],
  ["7", "Discípulo", 1500, "Crescimento consistente"],
  ["8", "Mestre", 2000, "Grande conhecimento"],
  ["9", "Sábio", 3000, "Nível avançado"],
  ["10", "Mestre da Palavra", 5000, "Topo da jornada"],
];

export default function XPLevels() {
  return (
    <main className="digle-page xp-page">
      <section className="xp-hero">
        <div className="xp-hero-icon"><Zap size={42} /></div>
        <span className="eyebrow">SISTEMA DE PROGRESSO</span>
        <h1>Cada passo vale XP.</h1>
        <p>Aprenda, pratique e evolua enquanto constrói sua jornada.</p>
        <div className="current-xp">
          <strong>620 XP</strong>
          <span>Nível 4</span>
        </div>
      </section>

      <section className="xp-actions">
        <div><BookIcon /><strong>Complete uma lição</strong><span>+50–100 XP</span></div>
        <div><QuizIcon /><strong>Complete um quiz</strong><span>+50–250 XP</span></div>
        <div><FlameIcon /><strong>Streak diário</strong><span>+10 XP</span></div>
        <div><Award /><strong>Conquista</strong><span>+25–500 XP</span></div>
      </section>

      <section className="levels-section">
        <div className="section-heading">
          <div><span className="eyebrow">NÍVEIS</span><h2>Sua evolução</h2></div>
        </div>

        <div className="levels-list">
          {levels.map(([level, name, xp, desc], index) => {
            const active = level === "4";
            const unlocked = Number(level) < 4;
            return (
              <article className={`level-row ${active ? "current" : ""} ${unlocked ? "unlocked" : ""}`} key={level}>
                <div className="level-number">{level}</div>
                <div className="level-info">
                  <span>NÍVEL {level}</span>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                </div>
                <strong>{xp.toLocaleString("pt-BR")} XP</strong>
                {active && <b>ATUAL</b>}
                {unlocked && <Star className="level-check" />}
              </article>
            );
          })}
        </div>
      </section>

      <section className="xp-reward">
        <Gift />
        <div>
          <span>PRÓXIMA RECOMPENSA</span>
          <h3>Desbloqueie o nível 5</h3>
          <p>Você precisa de mais 180 XP.</p>
        </div>
        <Crown />
      </section>
    </main>
  );
}

function BookIcon() {
  return <span className="xp-action-icon">📖</span>;
}

function QuizIcon() {
  return <span className="xp-action-icon">🧠</span>;
}

function FlameIcon() {
  return <span className="xp-action-icon">🔥</span>;
}
