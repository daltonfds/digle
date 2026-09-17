import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Flame,
  Star,
  Lock,
  CheckCircle2,
  Target,
  BookOpen,
  Award,
  Crown,
} from "lucide-react";

const translations = {
  en: {
    title: "Achievements",
    subtitle: "Celebrate your progress and keep growing.",
    back: "Back",
    earned: "Earned",
    inProgress: "In progress",
    locked: "Locked",
    totalXP: "Total XP",
    completed: "Completed",
    streak: "Day streak",
    achievements: "Achievements",
    milestones: "Milestones",
    next: "Next achievement",
    progress: "Progress",
    home: "Home",
    learn: "Learn",
    profile: "Profile",
    badges: [
      {
        title: "First Step",
        description: "Complete your first lesson",
        progress: 1,
        goal: 1,
        icon: BookOpen,
        earned: true,
      },
      {
        title: "Bible Explorer",
        description: "Read 10 Bible chapters",
        progress: 7,
        goal: 10,
        icon: BookOpen,
        earned: false,
      },
      {
        title: "Quiz Master",
        description: "Complete 10 quizzes",
        progress: 4,
        goal: 10,
        icon: Trophy,
        earned: false,
      },
      {
        title: "Seven Day Flame",
        description: "Maintain a 7-day streak",
        progress: 5,
        goal: 7,
        icon: Flame,
        earned: false,
      },
      {
        title: "Knowledge Seeker",
        description: "Earn 1,000 XP",
        progress: 680,
        goal: 1000,
        icon: Star,
        earned: false,
      },
      {
        title: "Faithful Student",
        description: "Complete 25 lessons",
        progress: 25,
        goal: 25,
        icon: Award,
        earned: true,
      },
      {
        title: "Dedicated Disciple",
        description: "Study for 30 consecutive days",
        progress: 8,
        goal: 30,
        icon: Target,
        earned: false,
      },
      {
        title: "Digle Champion",
        description: "Reach level 10",
        progress: 4,
        goal: 10,
        icon: Crown,
        earned: false,
      },
    ],
  },
  pt: {
    title: "Conquistas",
    subtitle: "Celebra o teu progresso e continua a crescer.",
    back: "Voltar",
    earned: "Conquistadas",
    inProgress: "Em progresso",
    locked: "Bloqueadas",
    totalXP: "XP total",
    completed: "Concluídas",
    streak: "Dias seguidos",
    achievements: "Conquistas",
    milestones: "Marcos",
    next: "Próxima conquista",
    progress: "Progresso",
    home: "Início",
    learn: "Aprender",
    profile: "Perfil",
    badges: [
      {
        title: "Primeiro Passo",
        description: "Concluir a primeira lição",
        progress: 1,
        goal: 1,
        icon: BookOpen,
        earned: true,
      },
      {
        title: "Explorador da Bíblia",
        description: "Ler 10 capítulos da Bíblia",
        progress: 7,
        goal: 10,
        icon: BookOpen,
        earned: false,
      },
      {
        title: "Mestre dos Quizzes",
        description: "Concluir 10 quizzes",
        progress: 4,
        goal: 10,
        icon: Trophy,
        earned: false,
      },
      {
        title: "Chama de Sete Dias",
        description: "Manter uma sequência de 7 dias",
        progress: 5,
        goal: 7,
        icon: Flame,
        earned: false,
      },
      {
        title: "Buscador de Conhecimento",
        description: "Ganhar 1.000 XP",
        progress: 680,
        goal: 1000,
        icon: Star,
        earned: false,
      },
      {
        title: "Estudante Fiel",
        description: "Concluir 25 lições",
        progress: 25,
        goal: 25,
        icon: Award,
        earned: true,
      },
      {
        title: "Discípulo Dedicado",
        description: "Estudar durante 30 dias seguidos",
        progress: 8,
        goal: 30,
        icon: Target,
        earned: false,
      },
      {
        title: "Campeão Digle",
        description: "Alcançar o nível 10",
        progress: 4,
        goal: 10,
        icon: Crown,
        earned: false,
      },
    ],
  },
};

export default function AchievementsPage() {
  const [language, setLanguage] = useState("en");
  const t = translations[language];
  const badges = t.badges;
  const earned = badges.filter((badge) => badge.earned).length;
  const nextBadge = badges.find((badge) => !badge.earned);

  return (
    <div className="achievements-page">
      <header className="achievements-header">
        <Link to="/app" className="achievements-back">
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        <div className="achievements-language">
          <button
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            className={language === "pt" ? "active" : ""}
            onClick={() => setLanguage("pt")}
          >
            PT
          </button>
        </div>
      </header>

      <main className="achievements-content">
        <section className="achievements-hero">
          <div className="achievements-hero-icon">
            <Trophy size={34} />
          </div>
          <div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
        </section>

        <section className="achievements-stats">
          <div className="achievement-stat">
            <Trophy size={22} />
            <strong>{earned}</strong>
            <span>{t.earned}</span>
          </div>

          <div className="achievement-stat">
            <Star size={22} />
            <strong>680</strong>
            <span>{t.totalXP}</span>
          </div>

          <div className="achievement-stat">
            <Flame size={22} />
            <strong>5</strong>
            <span>{t.streak}</span>
          </div>
        </section>

        {nextBadge && (
          <section className="achievement-next">
            <div className="achievement-next-top">
              <div>
                <span>{t.next}</span>
                <h2>{nextBadge.title}</h2>
                <p>{nextBadge.description}</p>
              </div>
              <nextBadge.icon size={34} />
            </div>

            <div className="achievement-progress-line">
              <div
                style={{
                  width: `${Math.min(
                    (nextBadge.progress / nextBadge.goal) * 100,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="achievement-progress-label">
              <span>{t.progress}</span>
              <strong>
                {nextBadge.progress} / {nextBadge.goal}
              </strong>
            </div>
          </section>
        )}

        <section className="achievements-section">
          <div className="achievements-section-heading">
            <h2>{t.achievements}</h2>
            <span>{badges.length}</span>
          </div>

          <div className="achievements-grid">
            {badges.map((badge) => {
              const Icon = badge.icon;
              const percentage = Math.min(
                (badge.progress / badge.goal) * 100,
                100
              );

              return (
                <article
                  className={`achievement-card ${
                    badge.earned ? "earned" : ""
                  }`}
                  key={badge.title}
                >
                  <div className="achievement-card-icon">
                    {badge.earned ? (
                      <Icon size={28} />
                    ) : (
                      <Lock size={25} />
                    )}
                  </div>

                  <div className="achievement-card-content">
                    <div className="achievement-card-title">
                      <h3>{badge.title}</h3>
                      {badge.earned && <CheckCircle2 size={17} />}
                    </div>

                    <p>{badge.description}</p>

                    {!badge.earned && (
                      <>
                        <div className="achievement-mini-progress">
                          <div style={{ width: `${percentage}%` }} />
                        </div>
                        <small>
                          {badge.progress} / {badge.goal}
                        </small>
                      </>
                    )}

                    {badge.earned && (
                      <span className="achievement-earned-label">
                        {t.earned}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="achievements-milestone">
          <Award size={25} />
          <div>
            <h3>{t.milestones}</h3>
            <p>
              {language === "en"
                ? "Every lesson brings you closer to your next milestone."
                : "Cada lição aproxima-te do teu próximo marco."}
            </p>
          </div>
        </section>
      </main>

      <nav className="achievements-bottom-nav">
        <Link to="/app">
          <BookOpen size={20} />
          <span>{t.home}</span>
        </Link>
        <Link to="/app/lessons">
          <Target size={20} />
          <span>{t.learn}</span>
        </Link>
        <Link className="active" to="/app/achievements">
          <Trophy size={20} />
          <span>{t.achievements}</span>
        </Link>
        <Link to="/app/profile">
          <Crown size={20} />
          <span>{t.profile}</span>
        </Link>
      </nav>
    </div>
  );
}
