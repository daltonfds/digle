import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Trophy,
  Star,
  Flame,
  Clock,
  ArrowRight,
  Globe,
  Lock,
} from "lucide-react";

const text = {
  en: {
    title: "Test your knowledge",
    subtitle: "Learn, challenge yourself, and grow your faith.",
    daily: "Daily challenge",
    dailyText: "Answer 5 questions and earn bonus XP.",
    play: "Start quiz",
    categories: "Quiz categories",
    questions: "questions",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    locked: "Locked",
    xp: "XP",
    minutes: "min",
  },
  pt: {
    title: "Teste os seus conhecimentos",
    subtitle: "Aprenda, desafie-se e fortaleça a sua fé.",
    daily: "Desafio diário",
    dailyText: "Responda a 5 perguntas e ganhe XP extra.",
    play: "Começar quiz",
    categories: "Categorias de quiz",
    questions: "perguntas",
    beginner: "Iniciante",
    intermediate: "Intermédio",
    advanced: "Avançado",
    locked: "Bloqueado",
    xp: "XP",
    minutes: "min",
  },
};

const quizzes = [
  {
    id: 1,
    title: "Bible Basics",
    pt: "Fundamentos da Bíblia",
    description: "Test your knowledge of the Bible.",
    descriptionPt: "Teste os seus conhecimentos sobre a Bíblia.",
    icon: "📖",
    level: "beginner",
    questions: 10,
    duration: 5,
    xp: 100,
    locked: false,
  },
  {
    id: 2,
    title: "Life of Jesus",
    pt: "Vida de Jesus",
    description: "Explore the life and ministry of Jesus.",
    descriptionPt: "Explore a vida e o ministério de Jesus.",
    icon: "✝️",
    level: "beginner",
    questions: 15,
    duration: 8,
    xp: 150,
    locked: false,
  },
  {
    id: 3,
    title: "Old Testament",
    pt: "Antigo Testamento",
    description: "Challenge yourself with Old Testament questions.",
    descriptionPt: "Desafie-se com perguntas do Antigo Testamento.",
    icon: "🏺",
    level: "intermediate",
    questions: 20,
    duration: 12,
    xp: 200,
    locked: false,
  },
  {
    id: 4,
    title: "New Testament",
    pt: "Novo Testamento",
    description: "Discover the message of the New Testament.",
    descriptionPt: "Descubra a mensagem do Novo Testamento.",
    icon: "📜",
    level: "intermediate",
    questions: 20,
    duration: 12,
    xp: 200,
    locked: false,
  },
  {
    id: 5,
    title: "Biblical Wisdom",
    pt: "Sabedoria Bíblica",
    description: "Apply biblical wisdom to real situations.",
    descriptionPt: "Aplique a sabedoria bíblica a situações reais.",
    icon: "🌿",
    level: "advanced",
    questions: 25,
    duration: 15,
    xp: 300,
    locked: true,
  },
  {
    id: 6,
    title: "Master Challenge",
    pt: "Desafio de Mestre",
    description: "The ultimate challenge for Bible students.",
    descriptionPt: "O desafio definitivo para estudantes da Bíblia.",
    icon: "🏆",
    level: "advanced",
    questions: 30,
    duration: 20,
    xp: 500,
    locked: true,
  },
];

export default function QuizHub() {
  const [language, setLanguage] = useState("en");
  const [level, setLevel] = useState("all");
  const t = text[language];

  const filtered =
    level === "all"
      ? quizzes
      : quizzes.filter((quiz) => quiz.level === level);

  return (
    <main className="quiz-page">
      <header className="quiz-header">
        <div>
          <div className="quiz-brand">
            digle<span>.</span>
          </div>
          <p>{t.subtitle}</p>
        </div>

        <button
          className="quiz-language"
          onClick={() => setLanguage(language === "en" ? "pt" : "en")}
        >
          <Globe size={17} />
          {language === "en" ? "PT" : "EN"}
        </button>
      </header>

      <section className="quiz-hero">
        <div>
          <span>DAILY LEARNING</span>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <Brain size={100} />
      </section>

      <section className="daily-quiz">
        <div className="daily-quiz-icon">
          <Flame size={27} />
        </div>

        <div className="daily-quiz-content">
          <div className="daily-quiz-heading">
            <h2>{t.daily}</h2>
            <strong>+50 {t.xp}</strong>
          </div>
          <p>{t.dailyText}</p>

          <div className="daily-quiz-meta">
            <span>
              <Clock size={15} /> 5 {t.minutes}
            </span>
            <span>
              <Star size={15} /> 5 {t.questions}
            </span>
          </div>
        </div>

        <Link to="/app/quiz" className="quiz-start-button">
          <ArrowRight size={20} />
        </Link>
      </section>

      <div className="quiz-title-row">
        <h2>{t.categories}</h2>
        <div className="quiz-filters">
          {["all", "beginner", "intermediate", "advanced"].map((item) => (
            <button
              key={item}
              className={level === item ? "active" : ""}
              onClick={() => setLevel(item)}
            >
              {item === "all" ? "All" : t[item]}
            </button>
          ))}
        </div>
      </div>

      <section className="quiz-grid">
        {filtered.map((quiz) => (
          <article className="quiz-card" key={quiz.id}>
            <div className="quiz-card-top">
              <div className="quiz-card-icon">{quiz.icon}</div>

              {quiz.locked ? (
                <span className="quiz-lock">
                  <Lock size={14} />
                  {t.locked}
                </span>
              ) : (
                <span className="quiz-available">Available</span>
              )}
            </div>

            <span className="quiz-level">{t[quiz.level]}</span>

            <h3>{language === "en" ? quiz.title : quiz.pt}</h3>

            <p>
              {language === "en" ? quiz.description : quiz.descriptionPt}
            </p>

            <div className="quiz-card-meta">
              <span>
                <Brain size={15} />
                {quiz.questions} {t.questions}
              </span>
              <span>
                <Clock size={15} />
                {quiz.duration} {t.minutes}
              </span>
            </div>

            <div className="quiz-card-bottom">
              <strong>
                <Star size={15} />
                +{quiz.xp} {t.xp}
              </strong>

              {quiz.locked ? (
                <button className="quiz-disabled" disabled>
                  <Lock size={15} />
                </button>
              ) : (
                <Link to="/app/quiz" className="quiz-card-play">
                  {t.play}
                  <ArrowRight size={15} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="quiz-achievement">
        <Trophy size={34} />
        <div>
          <h2>Keep your streak alive!</h2>
          <p>
            {language === "en"
              ? "Complete one quiz every day to maintain your learning streak."
              : "Complete um quiz todos os dias para manter a sua sequência."}
          </p>
        </div>
      </section>
    </main>
  );
}
