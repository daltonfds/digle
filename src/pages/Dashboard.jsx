import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Flame,
  Trophy,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Globe,
  Lock,
} from "lucide-react";

const content = {
  en: {
    greeting: "Welcome back",
    subtitle: "Continue your journey through God's Word.",
    continue: "Continue learning",
    daily: "Daily lesson",
    progress: "Your progress",
    streak: "Day streak",
    xp: "Total XP",
    completed: "Completed",
    courses: "Learning paths",
    viewAll: "View all",
    recommended: "Recommended for you",
    start: "Start lesson",
    challenge: "Daily challenge",
    challengeText: "Test your Bible knowledge and earn extra XP.",
    takeChallenge: "Take challenge",
  },
  pt: {
    greeting: "Bem-vindo de volta",
    subtitle: "Continue a sua jornada através da Palavra de Deus.",
    continue: "Continuar a aprender",
    daily: "Lição diária",
    progress: "O seu progresso",
    streak: "Dias consecutivos",
    xp: "XP total",
    completed: "Concluído",
    courses: "Caminhos de aprendizagem",
    viewAll: "Ver todos",
    recommended: "Recomendado para si",
    start: "Começar lição",
    challenge: "Desafio diário",
    challengeText: "Teste os seus conhecimentos bíblicos e ganhe XP extra.",
    takeChallenge: "Aceitar desafio",
  },
};

const paths = [
  {
    title: "The Life of Jesus",
    pt: "A Vida de Jesus",
    description: "Discover the life and teachings of Jesus Christ.",
    descriptionPt: "Descubra a vida e os ensinamentos de Jesus Cristo.",
    progress: 35,
    icon: "✝️",
  },
  {
    title: "Foundations of Faith",
    pt: "Fundamentos da Fé",
    description: "Build a strong foundation in Christian faith.",
    descriptionPt: "Construa uma base sólida na fé cristã.",
    progress: 60,
    icon: "📖",
  },
  {
    title: "Wisdom & Proverbs",
    pt: "Sabedoria e Provérbios",
    description: "Learn practical wisdom for everyday life.",
    descriptionPt: "Aprenda sabedoria prática para a vida diária.",
    progress: 10,
    icon: "🌿",
  },
];

export default function Dashboard() {
  const [language, setLanguage] = useState("en");
  const t = content[language];

  return (
    <main className="digle-dashboard">
      <header className="digle-topbar">
        <div>
          <div className="digle-logo">digle<span>.</span></div>
          <p className="digle-muted">Bible learning, made joyful.</p>
        </div>

        <button
          className="digle-language"
          onClick={() => setLanguage(language === "en" ? "pt" : "en")}
        >
          <Globe size={17} />
          {language === "en" ? "PT" : "EN"}
        </button>
      </header>

      <section className="digle-hero">
        <div>
          <p className="digle-eyebrow">{t.greeting} 👋</p>
          <h1>{t.subtitle}</h1>
          <Link to="/app/lessons" className="digle-primary">
            {t.continue}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="digle-hero-symbol">✝</div>
      </section>

      <section className="digle-stats">
        <div className="digle-stat">
          <Flame size={22} />
          <strong>7</strong>
          <span>{t.streak}</span>
        </div>

        <div className="digle-stat">
          <Star size={22} />
          <strong>1,240</strong>
          <span>{t.xp}</span>
        </div>

        <div className="digle-stat">
          <Trophy size={22} />
          <strong>12</strong>
          <span>{t.completed}</span>
        </div>
      </section>

      <section className="digle-section">
        <div className="digle-section-heading">
          <h2>{t.daily}</h2>
          <span>+25 XP</span>
        </div>

        <div className="digle-daily-card">
          <div className="digle-icon-box">📚</div>
          <div className="digle-card-content">
            <h3>{language === "en" ? "Walking with God" : "Caminhando com Deus"}</h3>
            <p>
              {language === "en"
                ? "Learn how to strengthen your relationship with God."
                : "Aprenda a fortalecer a sua relação com Deus."}
            </p>
            <div className="digle-progress">
              <div style={{ width: "40%" }} />
            </div>
          </div>
          <Link to="/app/lessons" className="digle-round-button">
            <Play size={18} />
          </Link>
        </div>
      </section>

      <section className="digle-section">
        <div className="digle-section-heading">
          <h2>{t.courses}</h2>
          <Link to="/app/trails">{t.viewAll}</Link>
        </div>

        <div className="digle-path-grid">
          {paths.map((path) => (
            <Link to="/app/trails" className="digle-path-card" key={path.title}>
              <div className="digle-path-icon">{path.icon}</div>
              <h3>{language === "en" ? path.title : path.pt}</h3>
              <p>{language === "en" ? path.description : path.descriptionPt}</p>

              <div className="digle-progress">
                <div style={{ width: `${path.progress}%` }} />
              </div>

              <small>{path.progress}%</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="digle-challenge">
        <div className="digle-challenge-icon">🏆</div>
        <div>
          <h2>{t.challenge}</h2>
          <p>{t.challengeText}</p>
          <Link to="/app/quiz-hub" className="digle-secondary">
            {t.takeChallenge}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <nav className="digle-bottom-nav">
        <Link to="/app" className="active">
          <BookOpen size={19} />
          Home
        </Link>
        <Link to="/app/lessons">
          <Play size={19} />
          Learn
        </Link>
        <Link to="/app/ranking">
          <Trophy size={19} />
          Ranking
        </Link>
        <Link to="/app/achievements">
          <CheckCircle size={19} />
          Goals
        </Link>
      </nav>
    </main>
  );
}
