import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Flame,
  Star,
  Target,
  Compass,
} from "lucide-react";

const content = {
  en: {
    title: "Learning Trails",
    subtitle: "Follow a path and grow your faith one step at a time.",
    back: "Back",
    featured: "Featured trail",
    all: "All trails",
    continue: "Continue",
    start: "Start trail",
    lessons: "lessons",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    home: "Home",
    learn: "Learn",
    profile: "Profile",
    trails: [
      {
        title: "Foundations of Faith",
        description: "Discover the essential truths of Christianity.",
        level: "Beginner",
        lessons: 12,
        progress: 65,
        color: "purple",
        icon: BookOpen,
      },
      {
        title: "Knowing Jesus",
        description: "Explore the life, teachings, and love of Jesus.",
        level: "Beginner",
        lessons: 15,
        progress: 30,
        color: "blue",
        icon: Compass,
      },
      {
        title: "Prayer & Spiritual Growth",
        description: "Build a consistent and meaningful prayer life.",
        level: "Intermediate",
        lessons: 10,
        progress: 10,
        color: "orange",
        icon: Flame,
      },
      {
        title: "Understanding the Bible",
        description: "Learn how to read and understand Scripture.",
        level: "Intermediate",
        lessons: 18,
        progress: 0,
        color: "green",
        icon: BookOpen,
      },
      {
        title: "Living Your Faith",
        description: "Apply biblical principles to everyday life.",
        level: "Advanced",
        lessons: 20,
        progress: 0,
        color: "pink",
        icon: Target,
      },
      {
        title: "The Story of Redemption",
        description: "Follow the great story of God's redemption.",
        level: "Advanced",
        lessons: 24,
        progress: 0,
        color: "gold",
        icon: Star,
      },
    ],
  },
  pt: {
    title: "Caminhos de Aprendizagem",
    subtitle: "Segue um caminho e fortalece a tua fé passo a passo.",
    back: "Voltar",
    featured: "Caminho em destaque",
    all: "Todos os caminhos",
    continue: "Continuar",
    start: "Começar caminho",
    lessons: "lições",
    beginner: "Iniciante",
    intermediate: "Intermédio",
    advanced: "Avançado",
    home: "Início",
    learn: "Aprender",
    profile: "Perfil",
    trails: [
      {
        title: "Fundamentos da Fé",
        description: "Descobre as verdades essenciais do cristianismo.",
        level: "Beginner",
        lessons: 12,
        progress: 65,
        color: "purple",
        icon: BookOpen,
      },
      {
        title: "Conhecendo Jesus",
        description: "Explora a vida, os ensinamentos e o amor de Jesus.",
        level: "Beginner",
        lessons: 15,
        progress: 30,
        color: "blue",
        icon: Compass,
      },
      {
        title: "Oração e Crescimento Espiritual",
        description: "Constrói uma vida de oração consistente.",
        level: "Intermediate",
        lessons: 10,
        progress: 10,
        color: "orange",
        icon: Flame,
      },
      {
        title: "Compreendendo a Bíblia",
        description: "Aprende a ler e compreender as Escrituras.",
        level: "Intermediate",
        lessons: 18,
        progress: 0,
        color: "green",
        icon: BookOpen,
      },
      {
        title: "Vivendo a Tua Fé",
        description: "Aplica princípios bíblicos à vida quotidiana.",
        level: "Advanced",
        lessons: 20,
        progress: 0,
        color: "pink",
        icon: Target,
      },
      {
        title: "A História da Redenção",
        description: "Segue a grande história da redenção de Deus.",
        level: "Advanced",
        lessons: 24,
        progress: 0,
        color: "gold",
        icon: Star,
      },
    ],
  },
};

const levels = ["all", "Beginner", "Intermediate", "Advanced"];

export default function Trails() {
  const [language, setLanguage] = useState("en");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const t = content[language];

  const levelLabel = (level) => {
    if (language === "en") return level;
    if (level === "Beginner") return t.beginner;
    if (level === "Intermediate") return t.intermediate;
    return t.advanced;
  };

  const trails = t.trails.filter(
    (trail) => selectedLevel === "all" || trail.level === selectedLevel
  );

  return (
    <div className="trails-page">
      <header className="trails-header">
        <Link to="/app" className="trails-back">
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        <div className="trails-language">
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

      <main className="trails-content">
        <section className="trails-intro">
          <div className="trails-intro-icon">
            <Compass size={34} />
          </div>
          <div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
        </section>

        <section className="trails-featured">
          <div className="trails-featured-text">
            <span>{t.featured}</span>
            <h2>{t.trails[0].title}</h2>
            <p>{t.trails[0].description}</p>
            <div className="trails-featured-meta">
              <span>
                <BookOpen size={15} />
                {t.trails[0].lessons} {t.lessons}
              </span>
              <span>
                <Flame size={15} />
                {t.trails[0].progress}% complete
              </span>
            </div>
            <Link to="/app/lessons" className="trails-primary-button">
              {t.continue}
              <Play size={16} />
            </Link>
          </div>

          <div className="trails-featured-art">
            <Compass size={92} />
          </div>
        </section>

        <div className="trails-section-title">
          <h2>{t.all}</h2>
        </div>

        <div className="trails-filters">
          {levels.map((level) => (
            <button
              key={level}
              className={selectedLevel === level ? "active" : ""}
              onClick={() => setSelectedLevel(level)}
            >
              {level === "all" ? t.all : levelLabel(level)}
            </button>
          ))}
        </div>

        <section className="trails-grid">
          {trails.map((trail, index) => {
            const Icon = trail.icon;
            const completed = trail.progress === 100;
            const locked = index > 3;

            return (
              <article className={`trail-card ${trail.color}`} key={trail.title}>
                <div className="trail-card-top">
                  <div className="trail-card-icon">
                    <Icon size={25} />
                  </div>

                  {completed ? (
                    <CheckCircle2 className="trail-status completed" size={20} />
                  ) : locked ? (
                    <Lock className="trail-status" size={18} />
                  ) : (
                    <span className="trail-level">
                      {levelLabel(trail.level)}
                    </span>
                  )}
                </div>

                <h3>{trail.title}</h3>
                <p>{trail.description}</p>

                <div className="trail-card-meta">
                  <span>
                    <BookOpen size={14} />
                    {trail.lessons} {t.lessons}
                  </span>
                  <span>{trail.progress}%</span>
                </div>

                <div className="trail-progress">
                  <div style={{ width: `${trail.progress}%` }} />
                </div>

                <Link
                  to={locked ? "/app/lessons" : "/app/lesson"}
                  className="trail-card-button"
                >
                  {trail.progress > 0 ? t.continue : t.start}
                  <Play size={15} />
                </Link>
              </article>
            );
          })}
        </section>
      </main>

      <nav className="trails-bottom-nav">
        <Link to="/app">
          <BookOpen size={20} />
          <span>{t.home}</span>
        </Link>
        <Link className="active" to="/app/trails">
          <Compass size={20} />
          <span>{t.learn}</span>
        </Link>
        <Link to="/app/achievements">
          <Star size={20} />
          <span>Achievements</span>
        </Link>
        <Link to="/app/profile">
          <Target size={20} />
          <span>{t.profile}</span>
        </Link>
      </nav>
    </div>
  );
}
