import { useMemo, useState } from "react";
import {
  Trophy,
  Flame,
  Crown,
  Medal,
  Star,
  Users,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { getStored } from "../lib/digleStorage";

const initialUsers = [
  { id: 1, name: "Ana Martins", initials: "AM", xp: 2840, streak: 24, level: 29 },
  { id: 2, name: "Lucas Silva", initials: "LS", xp: 2510, streak: 19, level: 26 },
  { id: 3, name: "Maria Santos", initials: "MS", xp: 2240, streak: 17, level: 23 },
  { id: 4, name: "João Costa", initials: "JC", xp: 1980, streak: 14, level: 20 },
  { id: 5, name: "Pedro Almeida", initials: "PA", xp: 1760, streak: 12, level: 18 },
  { id: 6, name: "Sofia Mendes", initials: "SM", xp: 1590, streak: 11, level: 16 },
  { id: 7, name: "Daniel Rocha", initials: "DR", xp: 1430, streak: 9, level: 15 },
  { id: 8, name: "Rita Fernandes", initials: "RF", xp: 1280, streak: 8, level: 13 },
  { id: 9, name: "Miguel Lopes", initials: "ML", xp: 1120, streak: 7, level: 12 },
  { id: 10, name: "Beatriz Gomes", initials: "BG", xp: 980, streak: 6, level: 10 },
];

const periods = [
  { id: "week", label: "Esta semana" },
  { id: "month", label: "Este mês" },
  { id: "all", label: "Sempre" },
];

export default function Leaderboard() {
  const [period, setPeriod] = useState("week");
  const [friendsOnly, setFriendsOnly] = useState(false);

  const myXP = Number(getStored("xp", 420));
  const myStreak = Number(getStored("streak", 7));
  const myLevel = Math.floor(myXP / 100) + 1;

  const users = useMemo(() => {
    const multiplier =
      period === "week" ? 0.35 : period === "month" ? 0.72 : 1;

    return initialUsers
      .map((user) => ({
        ...user,
        displayedXP: Math.round(user.xp * multiplier),
      }))
      .sort((a, b) => b.displayedXP - a.displayedXP);
  }, [period]);

  const myPosition =
    users.filter((user) => user.displayedXP > myXP).length + 1;

  const podium = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <main className="digle-page leaderboard-page">
      <section className="leaderboard-hero">
        <div>
          <div className="leaderboard-kicker">
            <Trophy size={16} />
            COMUNIDADE DIGLE
          </div>

          <h1>Ranking</h1>

          <p>
            Continue aprendendo, ganhe XP e acompanhe seu progresso
            junto com outros estudantes.
          </p>
        </div>

        <div className="leaderboard-my-position">
          <span>Sua posição</span>
          <strong>#{myPosition}</strong>
          <small>{myXP.toLocaleString("pt-BR")} XP</small>
        </div>
      </section>

      <section className="leaderboard-controls">
        <div className="leaderboard-periods">
          {periods.map((item) => (
            <button
              key={item.id}
              className={period === item.id ? "active" : ""}
              onClick={() => setPeriod(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className={`friends-toggle ${friendsOnly ? "active" : ""}`}
          onClick={() => setFriendsOnly((value) => !value)}
        >
          <Users size={17} />
          {friendsOnly ? "Só amigos" : "Todos"}
        </button>
      </section>

      <section className="leaderboard-summary-grid">
        <article>
          <div className="leaderboard-summary-icon">
            <Star size={19} />
          </div>
          <div>
            <span>Seu XP</span>
            <strong>{myXP.toLocaleString("pt-BR")}</strong>
          </div>
        </article>

        <article>
          <div className="leaderboard-summary-icon">
            <Flame size={19} />
          </div>
          <div>
            <span>Sequência</span>
            <strong>{myStreak} dias</strong>
          </div>
        </article>

        <article>
          <div className="leaderboard-summary-icon">
            <Trophy size={19} />
          </div>
          <div>
            <span>Nível</span>
            <strong>{myLevel}</strong>
          </div>
        </article>

        <article>
          <div className="leaderboard-summary-icon">
            <Users size={19} />
          </div>
          <div>
            <span>Participantes</span>
            <strong>1.248</strong>
          </div>
        </article>
      </section>

      <section className="leaderboard-podium">
        {podium.map((user, index) => {
          const position = index + 1;

          return (
            <article
              key={user.id}
              className={`podium-card podium-${position}`}
            >
              <div className="podium-medal">
                {position === 1 ? (
                  <Crown size={22} />
                ) : (
                  <Medal size={21} />
                )}
              </div>

              <div className="podium-avatar">{user.initials}</div>

              <strong>{user.name}</strong>
              <span>Nível {user.level}</span>

              <div className="podium-xp">
                {user.displayedXP.toLocaleString("pt-BR")} XP
              </div>

              <div className="podium-rank">#{position}</div>
            </article>
          );
        })}
      </section>

      <section className="leaderboard-list-card">
        <div className="leaderboard-list-header">
          <div>
            <span className="section-eyebrow">CLASSIFICAÇÃO</span>
            <h2>Todos os estudantes</h2>
          </div>

          <span className="leaderboard-period-label">
            {periods.find((item) => item.id === period)?.label}
          </span>
        </div>

        <div className="leaderboard-list">
          {rest.map((user, index) => {
            const position = index + 4;
            const difference = user.displayedXP - myXP;

            return (
              <div className="leaderboard-row" key={user.id}>
                <div className="leaderboard-rank-number">
                  #{position}
                </div>

                <div className="leaderboard-user-avatar">
                  {user.initials}
                </div>

                <div className="leaderboard-user-info">
                  <strong>{user.name}</strong>
                  <span>
                    Nível {user.level} · {user.streak} dias de sequência
                  </span>
                </div>

                <div className="leaderboard-user-xp">
                  <strong>
                    {user.displayedXP.toLocaleString("pt-BR")} XP
                  </strong>

                  {difference >= 0 ? (
                    <span className="xp-above">
                      <ChevronUp size={14} />
                      {difference.toLocaleString("pt-BR")}
                    </span>
                  ) : (
                    <span className="xp-below">
                      <ChevronDown size={14} />
                      {Math.abs(difference).toLocaleString("pt-BR")}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="leaderboard-your-card">
        <div className="leaderboard-user-avatar large">
          EU
        </div>

        <div className="leaderboard-your-info">
          <span>SUA POSIÇÃO ATUAL</span>
          <strong>Você</strong>
          <small>
            Nível {myLevel} · {myStreak} dias de sequência
          </small>
        </div>

        <div className="leaderboard-your-xp">
          <strong>{myXP.toLocaleString("pt-BR")} XP</strong>
          <span>#{myPosition} posição</span>
        </div>
      </section>
    </main>
  );
}
