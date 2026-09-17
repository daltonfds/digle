import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  Heart,
  Lock,
  Star,
  Trophy,
} from "lucide-react";
import { useGamification } from "../hooks/useGamification";

const content = {
  en: {
    back: "Back to lessons",
    lesson: "Lesson 01",
    title: "God's Love",
    subtitle: "Discover the depth of God's unconditional love.",
    reading: "Today's teaching",
    paragraph1:
      "God's love is constant, unconditional, and available to everyone. It is not based on our achievements or failures.",
    paragraph2:
      "When we understand God's love, we can live with confidence, hope, and purpose. His love invites us to grow every day.",
    reflection: "Reflection",
    question: "What does God's love mean to you?",
    answer: "God's love reminds me that I am never alone.",
    complete: "Complete lesson",
    completed: "Lesson completed!",
    earned: "You earned +25 XP",
    continue: "Continue learning",
    xp: "XP",
    streak: "Day streak",
    hearts: "Hearts",
    locked: "Premium content",
  },
  pt: {
    back: "Voltar às lições",
    lesson: "Lição 01",
    title: "O Amor de Deus",
    subtitle: "Descobre a profundidade do amor incondicional de Deus.",
    reading: "Ensinamento de hoje",
    paragraph1:
      "O amor de Deus é constante, incondicional e está disponível para todos. Não depende das nossas conquistas ou falhas.",
    paragraph2:
      "Quando compreendemos o amor de Deus, podemos viver com confiança, esperança e propósito. O Seu amor convida-nos a crescer todos os dias.",
    reflection: "Reflexão",
    question: "O que o amor de Deus significa para ti?",
    answer: "O amor de Deus lembra-me que nunca estou sozinho.",
    complete: "Concluir lição",
    completed: "Lição concluída!",
    earned: "Ganhaste +25 XP",
    continue: "Continuar a aprender",
    xp: "XP",
    streak: "Dias seguidos",
    hearts: "Corações",
    locked: "Conteúdo premium",
  },
};

export default function LessonReader() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [completed, setCompleted] = useState(false);
  const { state, finishLesson } = useGamification();

  const t = content[language];

  const handleComplete = () => {
    if (!completed) {
      finishLesson("gods-love");
      setCompleted(true);
    }
  };

  return (
    <main className="feature-page lesson-reader-page">
      <div className="feature-topbar">
        <Link to="/app/lessons" className="feature-back">
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

      <section className="lesson-reader-hero">
        <div className="lesson-reader-icon">
          <BookOpen size={34} />
        </div>

        <span className="feature-eyebrow">{t.lesson}</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <div className="lesson-reader-stats">
          <span>
            <Star size={16} /> +25 {t.xp}
          </span>
          <span>
            <Flame size={16} /> {state.streak} {t.streak}
          </span>
          <span>
            <Heart size={16} /> {state.hearts} {t.hearts}
          </span>
        </div>
      </section>

      <section className="lesson-reader-card">
        <span className="feature-eyebrow">{t.reading}</span>
        <h2>{t.title}</h2>
        <p>{t.paragraph1}</p>
        <p>{t.paragraph2}</p>

        <div className="lesson-reader-quote">
          <BookOpen size={20} />
          <strong>
            “For God so loved the world that he gave his one and only Son.”
          </strong>
          <span>John 3:16</span>
        </div>
      </section>

      <section className="lesson-reader-card">
        <span className="feature-eyebrow">{t.reflection}</span>
        <h2>{t.question}</h2>

        <div className="lesson-reader-answer">
          <CheckCircle2 size={20} />
          {t.answer}
        </div>
      </section>

      {completed ? (
        <section className="lesson-complete-card">
          <Trophy size={38} />
          <h2>{t.completed}</h2>
          <p>{t.earned}</p>
          <button onClick={() => navigate("/app/lessons")}>
            {t.continue}
            <ChevronRight size={18} />
          </button>
        </section>
      ) : (
        <button className="lesson-complete-button" onClick={handleComplete}>
          <CheckCircle2 size={20} />
          {t.complete}
        </button>
      )}
    </main>
  );
}
