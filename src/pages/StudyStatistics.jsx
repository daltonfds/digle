import React, { useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Clock3,
  Flame,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { getStored } from "../lib/digleStorage";

const weekly = [
  { day: "Seg", minutes: 18, xp: 80 },
  { day: "Ter", minutes: 25, xp: 120 },
  { day: "Qua", minutes: 14, xp: 70 },
  { day: "Qui", minutes: 31, xp: 160 },
  { day: "Sex", minutes: 22, xp: 110 },
  { day: "Sáb", minutes: 38, xp: 190 },
  { day: "Dom", minutes: 28, xp: 140 },
];

export default function StudyStatistics() {
  const [period, setPeriod] = useState("week");

  const xp = Number(getStored("xp", 420));
  const streak = Number(getStored("streak", 7));

  const totals = useMemo(
    () => ({
      minutes: weekly.reduce((sum, item) => sum + item.minutes, 0),
      xp: weekly.reduce((sum, item) => sum + item.xp, 0),
      sessions: weekly.length,
    }),
    []
  );

  const maxMinutes = Math.max(...weekly.map((item) => item.minutes));

  return (
    <main className="stats-page">
      <section className="stats-header">
        <div>
          <span className="eyebrow">Seu desempenho</span>
          <h1>Estatísticas de estudo</h1>
          <p>Acompanhe sua evolução e descubra a força da sua constância.</p>
        </div>

        <div className="stats-periods">
          {["week", "month", "all"].map((item) => (
            <button
              key={item}
              className={period === item ? "active" : ""}
              onClick={() => setPeriod(item)}
            >
              {item === "week" ? "Semana" : item === "month" ? "Mês" : "Sempre"}
            </button>
          ))}
        </div>
      </section>

      <section className="stats-metrics">
        <article>
          <div className="metric-icon"><Clock3 size={20} /></div>
          <strong>{totals.minutes} min</strong>
          <span>Tempo estudado</span>
        </article>

        <article>
          <div className="metric-icon"><Zap size={20} /></div>
          <strong>{xp}</strong>
          <span>XP acumulado</span>
        </article>

        <article>
          <div className="metric-icon"><Flame size={20} /></div>
          <strong>{streak} dias</strong>
          <span>Sequência atual</span>
        </article>

        <article>
          <div className="metric-icon"><BookOpen size={20} /></div>
          <strong>{totals.sessions}</strong>
          <span>Sessões esta semana</span>
        </article>
      </section>

      <section className="stats-grid">
        <article className="stats-card stats-chart-card">
          <div className="stats-card-title">
            <div>
              <h2>Tempo de estudo</h2>
              <span>Minutos por dia</span>
            </div>
            <BarChart3 size={21} />
          </div>

          <div className="study-chart">
            {weekly.map((item) => (
              <div className="study-bar-column" key={item.day}>
                <span>{item.minutes}</span>
                <div className="study-bar-track">
                  <div
                    className="study-bar"
                    style={{ height: `${(item.minutes / maxMinutes) * 100}%` }}
                  />
                </div>
                <small>{item.day}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="stats-card">
          <div className="stats-card-title">
            <div>
              <h2>Resumo</h2>
              <span>Seu progresso</span>
            </div>
            <TrendingUp size={21} />
          </div>

          <div className="stats-summary-list">
            <div>
              <span><Target size={17} /> Meta diária</span>
              <strong>20 min</strong>
            </div>
            <div>
              <span><CalendarDays size={17} /> Meta semanal</span>
              <strong>6 / 7 dias</strong>
            </div>
            <div>
              <span><Trophy size={17} /> XP semanal</span>
              <strong>{totals.xp} XP</strong>
            </div>
            <div>
              <span><BookOpen size={17} /> Lições concluídas</span>
              <strong>12</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="stats-card consistency-card">
        <div className="stats-card-title">
          <div>
            <h2>Consistência</h2>
            <span>Continue aparecendo todos os dias.</span>
          </div>
          <Flame size={21} />
        </div>

        <div className="consistency-grid">
          {Array.from({ length: 28 }).map((_, index) => (
            <div
              key={index}
              className={`consistency-day ${
                index >= 3 && index !== 8 && index !== 16 && index !== 24
                  ? "active"
                  : ""
              }`}
              title={`Dia ${index + 1}`}
            />
          ))}
        </div>

        <div className="consistency-footer">
          <span>Menos</span>
          <i />
          <i className="medium" />
          <i className="high" />
          <i className="full" />
          <span>Mais</span>
        </div>
      </section>
    </main>
  );
}
