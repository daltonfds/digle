import { useMemo } from "react";
import {
  User,
  Flame,
  Zap,
  BookOpen,
  Trophy,
  Target,
  Settings,
  ChevronRight,
  CheckCircle2,
  Award,
} from "lucide-react";
import { getStored } from "../lib/digleStorage";

export default function Profile() {
  const xp = Number(getStored("xp", 420));
  const streak = Number(getStored("streak", 7));

  const level = Math.floor(xp / 100) + 1;
  const currentLevelXP = xp % 100;
  const nextLevelXP = 100;
  const progress = Math.min(100, currentLevelXP);

  const stats = useMemo(
    () => [
      {
        icon: Zap,
        value: xp,
        label: "XP total",
      },
      {
        icon: BookOpen,
        value: 12,
        label: "Lições",
      },
      {
        icon: Flame,
        value: streak,
        label: "Dias seguidos",
      },
      {
        icon: Trophy,
        value: 3,
        label: "Conquistas",
      },
    ],
    [xp, streak]
  );

  const badges = [
    {
      icon: Award,
      title: "Primeiro passo",
      description: "Primeira lição concluída",
    },
    {
      icon: BookOpen,
      title: "Buscador",
      description: "3 lições concluídas",
    },
    {
      icon: Flame,
      title: "Constante",
      description: "7 dias de sequência",
    },
  ];

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar">
          <User size={38} />
        </div>

        <div className="profile-identity">
          <span>Minha jornada</span>
          <h1>Estudante da Palavra</h1>
          <p>Nível {level} · Em crescimento</p>
        </div>

        <button
          className="profile-settings-button"
          onClick={() => {
            navigate("/app/settings");
          }}
        >
          <Settings size={18} />
          Definições
        </button>
      </section>

      <section className="profile-level-card">
        <div className="profile-level-top">
          <div>
            <span>Nível atual</span>
            <strong>Nível {level}</strong>
          </div>

          <div className="profile-level-xp">
            <Zap size={17} />
            {currentLevelXP}/{nextLevelXP} XP
          </div>
        </div>

        <div className="profile-level-track">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="profile-level-bottom">
          <span>{progress}% concluído</span>
          <span>{nextLevelXP - currentLevelXP} XP para o próximo nível</span>
        </div>
      </section>

      <section className="profile-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="profile-stat" key={stat.label}>
              <div className="profile-stat-icon">
                <Icon size={20} />
              </div>

              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          );
        })}
      </section>

      <div className="profile-columns">
        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <Trophy size={19} />
              <h2>Conquistas recentes</h2>
            </div>

            <button
              onClick={() => {
                navigate("/app/achievements");
              }}
            >
              Ver todas
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="profile-badges">
            {badges.map((badge) => {
              const Icon = badge.icon;

              return (
                <div className="profile-badge" key={badge.title}>
                  <div className="profile-badge-icon">
                    <Icon size={21} />
                  </div>

                  <div>
                    <strong>{badge.title}</strong>
                    <span>{badge.description}</span>
                  </div>

                  <CheckCircle2 size={17} />
                </div>
              );
            })}
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <Target size={19} />
              <h2>Próximos objetivos</h2>
            </div>
          </div>

          <div className="profile-goals">
            <div className="profile-goal">
              <div>
                <strong>500 XP</strong>
                <span>{xp}/500</span>
              </div>

              <div className="profile-goal-track">
                <span style={{ width: `${Math.min(100, (xp / 500) * 100)}%` }} />
              </div>
            </div>

            <div className="profile-goal">
              <div>
                <strong>20 lições</strong>
                <span>12/20</span>
              </div>

              <div className="profile-goal-track">
                <span style={{ width: "60%" }} />
              </div>
            </div>

            <div className="profile-goal">
              <div>
                <strong>10 capítulos</strong>
                <span>8/10</span>
              </div>

              <div className="profile-goal-track">
                <span style={{ width: "80%" }} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="profile-journey">
        <div className="profile-journey-icon">
          <BookOpen size={25} />
        </div>

        <div>
          <strong>Continue sua jornada</strong>
          <p>
            Reserve alguns minutos hoje para aprender algo novo sobre a Bíblia.
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/app/lessons");
          }}
        >
          Estudar agora
          <ChevronRight size={17} />
        </button>
      </section>
    </div>
  );
}
