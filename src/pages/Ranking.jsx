import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Crown, Flame, Medal, Trophy } from "lucide-react";
import { useGamification } from "../hooks/useGamification";

const translations = {
  en: {
    back: "Back to dashboard",
    title: "Leaderboard",
    subtitle: "Learn together. Grow together.",
    yourPosition: "Your position",
    thisWeek: "This week",
    xp: "XP",
    streak: "Streak",
    rank: "Rank",
    name: "Learner",
    encouragement: "Keep learning to climb the leaderboard!",
  },
  pt: {
    back: "Voltar ao painel",
    title: "Classificação",
    subtitle: "Aprende em conjunto. Cresce em conjunto.",
    yourPosition: "A tua posição",
    thisWeek: "Esta semana",
    xp: "XP",
    streak: "Sequência",
    rank: "Posição",
    name: "Estudante",
    encouragement: "Continua a aprender para subir na classificação!",
  },
};

const learners = [
  { name: "Grace Walker", xp: 2450, streak: 18 },
  { name: "Daniel Smith", xp: 2180, streak: 14 },
  { name: "Sarah Johnson", xp: 1920, streak: 12 },
  { name: "You", xp: 680, streak: 5 },
  { name: "Michael Brown", xp: 540, streak: 4 },
  { name: "Emma Davis", xp: 420, streak: 3 },
];

export default function Ranking() {
  const [language, setLanguage] = useState("en");
  const { state } = useGamification();
  const t = translations[language];

  const ranking = learners
    .map((learner) =>
      learner.name === "You"
        ? { ...learner, xp: state.xp, streak: state.streak, name: t.name }
        : learner
    )
    .sort((a, b) => b.xp - a.xp);

  const position = ranking.findIndex((learner) => learner.name === t.name) + 1;

  return (
    <main className="ranking-page">
      <div className="feature-topbar">
        <Link to="/app" className="feature-back">
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        <button
          className="language-switch"
          onClick={() => setLanguage(language === "en" ? "pt" : "en")}
        >
          {language === "en" ? "PT" : "EN"}
        </button>
      </div>

      <header className="ranking-hero">
        <Trophy size={42} />
        <span>{t.thisWeek}</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      <section className="ranking-summary">
        <div>
          <span>{t.yourPosition}</span>
          <strong>#{position}</strong>
          <small>{t.rank}</small>
        </div>
        <div>
          <span>{t.xp}</span>
          <strong>{state.xp}</strong>
          <small>XP</small>
        </div>
        <div>
          <span>{t.streak}</span>
          <strong>{state.streak}</strong>
          <small>🔥</small>
        </div>
      </section>

      <section className="ranking-list">
        {ranking.map((learner, index) => (
          <div
            className={`ranking-row ${
              learner.name === t.name ? "ranking-current" : ""
            }`}
            key={`${learner.name}-${index}`}
          >
            <div className="ranking-number">
              {index === 0 ? <Crown size={21} /> : index + 1}
            </div>

            <div className="ranking-avatar">
              {learner.name.charAt(0)}
            </div>

            <div className="ranking-person">
              <strong>{learner.name}</strong>
              <span>
                <Flame size={14} />
                {learner.streak}
              </span>
            </div>

            <div className="ranking-xp">
              <strong>{learner.xp.toLocaleString()}</strong>
              <span>XP</span>
            </div>
          </div>
        ))}
      </section>

      <div className="ranking-encouragement">
        <Medal size={22} />
        {t.encouragement}
      </div>
    </main>
  );
}

