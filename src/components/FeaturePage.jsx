import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Trophy,
  Users,
  Settings,
  Bell,
  BarChart3,
  History,
  Award,
  Flame,
  Layers,
  Bookmark,
  CalendarCheck,
  Headphones,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const pageData = {
  LessonReader: {
    icon: BookOpen,
    en: ["Lesson Reader", "Learn through interactive Bible lessons."],
    pt: ["Leitor de Lições", "Aprende através de lições bíblicas interativas."],
  },
  QuizPlay: {
    icon: Trophy,
    en: ["Quiz Challenge", "Test your knowledge and earn XP."],
    pt: ["Desafio de Quiz", "Testa o teu conhecimento e ganha XP."],
  },
  Ranking: {
    icon: Trophy,
    en: ["Leaderboard", "See how you compare with other learners."],
    pt: ["Classificação", "Compara o teu progresso com outros estudantes."],
  },
  Community: {
    icon: Users,
    en: ["Community", "Connect, share and grow together."],
    pt: ["Comunidade", "Conecta-te, partilha e cresce com outros."],
  },
  SettingsPage: {
    icon: Settings,
    en: ["Settings", "Manage your account and preferences."],
    pt: ["Definições", "Gere a tua conta e preferências."],
  },
  Notifications: {
    icon: Bell,
    en: ["Notifications", "Stay updated with your learning journey."],
    pt: ["Notificações", "Mantém-te atualizado sobre a tua aprendizagem."],
  },
  StudyStatistics: {
    icon: BarChart3,
    en: ["Study Statistics", "Track your learning performance."],
    pt: ["Estatísticas", "Acompanha o teu desempenho de aprendizagem."],
  },
  StudyHistory: {
    icon: History,
    en: ["Study History", "Review your recent learning activity."],
    pt: ["Histórico de Estudos", "Consulta a tua atividade recente."],
  },
  Certificates: {
    icon: Award,
    en: ["Certificates", "Celebrate your completed learning paths."],
    pt: ["Certificados", "Celebra os teus caminhos de aprendizagem concluídos."],
  },
  DailyChallenge: {
    icon: Flame,
    en: ["Daily Challenge", "Complete today's challenge and earn rewards."],
    pt: ["Desafio Diário", "Conclui o desafio de hoje e ganha recompensas."],
  },
  Flashcards: {
    icon: Layers,
    en: ["Flashcards", "Review important biblical concepts."],
    pt: ["Cartões de Memória", "Revê conceitos bíblicos importantes."],
  },
  SavedVerses: {
    icon: Bookmark,
    en: ["Saved Verses", "Keep your favorite Bible verses close."],
    pt: ["Versículos Guardados", "Mantém os teus versículos favoritos por perto."],
  },
};

export default function FeaturePage({ type = "Community" }) {
  const [language, setLanguage] = useState("en");
  const [completed, setCompleted] = useState(false);
  const data = pageData[type] || pageData.Community;
  const Icon = data.icon;
  const [title, description] = data[language];

  const labels =
    language === "en"
      ? {
          back: "Back",
          action: "Continue",
          completed: "Completed",
          language: "Language",
          progress: "Your progress",
          empty: "Your activity will appear here.",
          home: "Home",
          learn: "Learn",
          profile: "Profile",
        }
      : {
          back: "Voltar",
          action: "Continuar",
          completed: "Concluído",
          language: "Idioma",
          progress: "O teu progresso",
          empty: "A tua atividade aparecerá aqui.",
          home: "Início",
          learn: "Aprender",
          profile: "Perfil",
        };

  return (
    <div className="feature-page">
      <header className="feature-header">
        <Link to="/app" className="feature-back">
          <ArrowLeft size={18} />
          {labels.back}
        </Link>

        <div className="feature-language">
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

      <main className="feature-content">
        <section className="feature-hero">
          <div className="feature-icon">
            <Icon size={34} />
          </div>
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </section>

        <section className="feature-card">
          <div className="feature-card-heading">
            <div>
              <span>{labels.progress}</span>
              <h2>{completed ? "100%" : "0%"}</h2>
            </div>
            <Icon size={30} />
          </div>

          <div className="feature-progress">
            <div style={{ width: completed ? "100%" : "8%" }} />
          </div>

          <p className="feature-empty">{labels.empty}</p>

          <button
            className="feature-action"
            onClick={() => setCompleted(!completed)}
          >
            {completed ? labels.completed : labels.action}
          </button>
        </section>

        <section className="feature-grid">
          {[1, 2, 3].map((item) => (
            <div className="feature-item" key={item}>
              <Icon size={22} />
              <div>
                <strong>
                  {language === "en"
                    ? `Learning activity ${item}`
                    : `Atividade de aprendizagem ${item}`}
                </strong>
                <p>
                  {language === "en"
                    ? "Continue your spiritual growth."
                    : "Continua o teu crescimento espiritual."}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <nav className="feature-bottom-nav">
        <Link to="/app">
          <BookOpen size={20} />
          <span>{labels.home}</span>
        </Link>
        <Link to="/app/lessons">
          <CalendarCheck size={20} />
          <span>{labels.learn}</span>
        </Link>
        <Link to="/app/profile">
          <Settings size={20} />
          <span>{labels.profile}</span>
        </Link>
      </nav>
    </div>
  );
}
