import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Flame,
  Star,
  Trophy,
  Target,
  Award,
  Globe,
  ChevronRight,
  Settings,
} from "lucide-react";

const translations = {
  en: {
    profile: "Your profile",
    level: "Faith explorer",
    overview: "Overview",
    achievements: "Achievements",
    statistics: "Statistics",
    streak: "Day streak",
    totalXp: "Total XP",
    lessons: "Lessons completed",
    quizzes: "Quizzes completed",
    goals: "Weekly goals",
    goalText: "Complete 5 lessons this week",
    progress: "Progress",
    settings: "Settings",
    viewAchievements: "View achievements",
    days: "days",
  },
  pt: {
    profile: "O seu perfil",
    level: "Explorador da fé",
    overview: "Resumo",
    achievements: "Conquistas",
    statistics: "Estatísticas",
    streak: "Dias consecutivos",
    totalXp: "XP total",
    lessons: "Lições concluídas",
    quizzes: "Quizzes concluídos",
    goals: "Objetivos semanais",
    goalText: "Complete 5 lições esta semana",
    progress: "Progresso",
    settings: "Definições",
    viewAchievements: "Ver conquistas",
    days: "dias",
  },
};

const achievements = [
  { icon: "🔥", title: "First Steps", pt: "Primeiros Passos", text: "Complete your first lesson", textPt: "Complete a sua primeira lição", unlocked: true },
  { icon: "📖", title: "Bible Explorer", pt: "Explorador da Bíblia", text: "Read 10 lessons", textPt: "Leia 10 lições", unlocked: true },
  { icon: "⭐", title: "XP Collector", pt: "Colecionador de XP", text: "Earn 1,000 XP", textPt: "Ganhe 1.000 XP", unlocked: true },
  { icon: "🏆", title: "Quiz Master", pt: "Mestre dos Quizzes", text: "Complete 20 quizzes", textPt: "Complete 20 quizzes", unlocked: false },
  { icon: "🌟", title: "Faithful Student", pt: "Estudante Fiel", text: "Keep a 30-day streak", textPt: "Mantenha uma sequência de 30 dias", unlocked: false },
  { icon: "💎", title: "Bible Scholar", pt: "Estudioso da Bíblia", text: "Complete 100 lessons", textPt: "Complete 100 lições", unlocked: false },
];

export default function ProfilePage() {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  return (
    <main className="profile-page">
      <header className="profile-header">
        <div className="profile-brand">digle<span>.</span></div>

        <div className="profile-header-actions">
          <button onClick={() => setLanguage(language === "en" ? "pt" : "en")}>
            <Globe size={17} />
            {language === "en" ? "PT" : "EN"}
          </button>

          <Link to="/app/settings">
            <Settings size={18} />
          </Link>
        </div>
      </header>

      <section className="profile-identity">
        <div className="profile-avatar">
          <User size={42} />
        </div>

        <div>
          <span className="profile-label">DIGLE MEMBER</span>
          <h1>{t.profile}</h1>
          <p>{t.level}</p>
        </div>
      </section>

      <section className="profile-level-card">
        <div className="profile-level-heading">
          <div>
            <span>LEVEL 4</span>
            <h2>{t.level}</h2>
          </div>
          <strong>1,240 XP</strong>
        </div>

        <div className="profile-level-progress">
          <div style={{ width: "68%" }} />
        </div>

        <div className="profile-level-footer">
          <span>1,240 XP</span>
          <span>2,000 XP</span>
        </div>
      </section>

      <section className="profile-stat-grid">
        <div className="profile-stat-card">
          <Flame size={23} />
          <strong>7</strong>
          <span>{t.streak}</span>
        </div>

        <div className="profile-stat-card">
          <Star size={23} />
          <strong>1,240</strong>
          <span>{t.totalXp}</span>
        </div>

        <div className="profile-stat-card">
          <Target size={23} />
          <strong>12</strong>
          <span>{t.lessons}</span>
        </div>

        <div className="profile-stat-card">
          <Trophy size={23} />
          <strong>8</strong>
          <span>{t.quizzes}</span>
        </div>
      </section>

      <section className="profile-goal-card">
        <div className="profile-goal-icon">
          <Target size={25} />
        </div>

        <div className="profile-goal-content">
          <div className="profile-goal-heading">
            <h2>{t.goals}</h2>
            <strong>3/5</strong>
          </div>

          <p>{t.goalText}</p>

          <div className="profile-level-progress">
            <div style={{ width: "60%" }} />
          </div>

          <small>60% {t.progress}</small>
        </div>
      </section>

      <section className="profile-achievements">
        <div className="profile-section-heading">
          <h2>{t.achievements}</h2>
          <Link to="/app/achievements">
            {t.viewAchievements}
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="profile-achievement-grid">
          {achievements.map((achievement) => (
            <article
              className={`profile-achievement-card ${
                achievement.unlocked ? "unlocked" : "locked"
              }`}
              key={achievement.title}
            >
              <div className="profile-achievement-icon">
                {achievement.icon}
              </div>

              <h3>
                {language === "en" ? achievement.title : achievement.pt}
              </h3>

              <p>
                {language === "en"
                  ? achievement.text
                  : achievement.textPt}
              </p>

              {!achievement.unlocked && <span>🔒</span>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
