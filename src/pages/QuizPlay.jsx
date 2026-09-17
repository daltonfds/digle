import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Flame, Heart, Trophy, XCircle } from "lucide-react";
import { useGamification } from "../hooks/useGamification";

const questions = {
  en: [
    {
      question: "Who built the ark?",
      options: ["Moses", "Noah", "David", "Peter"],
      correct: "Noah",
    },
    {
      question: "How many days did God take to create the world?",
      options: ["5", "6", "7", "12"],
      correct: "6",
    },
    {
      question: "Who was the mother of Jesus?",
      options: ["Mary", "Martha", "Ruth", "Sarah"],
      correct: "Mary",
    },
  ],
  pt: [
    {
      question: "Quem construiu a arca?",
      options: ["Moisés", "Noé", "David", "Pedro"],
      correct: "Noé",
    },
    {
      question: "Quantos dias Deus levou para criar o mundo?",
      options: ["5", "6", "7", "12"],
      correct: "6",
    },
    {
      question: "Quem era a mãe de Jesus?",
      options: ["Maria", "Marta", "Rute", "Sara"],
      correct: "Maria",
    },
  ],
};

const text = {
  en: {
    back: "Back to quizzes",
    title: "Bible Knowledge",
    question: "Question",
    next: "Next question",
    finish: "Finish quiz",
    correct: "Correct answer!",
    incorrect: "Not quite. Keep learning!",
    result: "Quiz complete!",
    score: "Your score",
    xp: "XP earned",
    continue: "Continue",
  },
  pt: {
    back: "Voltar aos quizzes",
    title: "Conhecimento Bíblico",
    question: "Pergunta",
    next: "Próxima pergunta",
    finish: "Terminar quiz",
    correct: "Resposta correta!",
    incorrect: "Não foi desta vez. Continua a aprender!",
    result: "Quiz concluído!",
    score: "A tua pontuação",
    xp: "XP ganho",
    continue: "Continuar",
  },
};

export default function QuizPlay() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [earned, setEarned] = useState(false);
  const { state, finishQuiz } = useGamification();

  const list = questions[language];
  const t = text[language];
  const item = list[current];
  const answered = Boolean(selected);
  const isCorrect = selected === item.correct;

  const chooseAnswer = (answer) => {
    if (answered) return;
    setSelected(answer);
    if (answer === item.correct) setScore((value) => value + 1);
  };

  const nextQuestion = () => {
    if (current === list.length - 1) {
      if (!earned) {
        finishQuiz("bible-knowledge");
        setEarned(true);
      }
      setFinished(true);
      return;
    }

    setCurrent((value) => value + 1);
    setSelected("");
  };

  return (
    <main className="feature-page quiz-play-page">
      <div className="feature-topbar">
        <Link to="/app/quiz-hub" className="feature-back">
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

      {!finished ? (
        <>
          <section className="quiz-play-header">
            <div>
              <span className="feature-eyebrow">{t.title}</span>
              <h1>{t.question} {current + 1}</h1>
            </div>

            <div className="quiz-play-mini-stats">
              <span><Flame size={15} /> {state.streak}</span>
              <span><Heart size={15} /> {state.hearts}</span>
            </div>
          </section>

          <div className="quiz-play-progress">
            <div style={{ width: `${((current + 1) / list.length) * 100}%` }} />
          </div>

          <section className="quiz-question-card">
            <h2>{item.question}</h2>

            <div className="quiz-options">
              {item.options.map((option) => {
                const correct = answered && option === item.correct;
                const wrong = answered && option === selected && !isCorrect;

                return (
                  <button
                    key={option}
                    className={`quiz-option ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                    onClick={() => chooseAnswer(option)}
                  >
                    <span>{option}</span>
                    {correct && <CheckCircle2 size={20} />}
                    {wrong && <XCircle size={20} />}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className={`quiz-feedback ${isCorrect ? "success" : "error"}`}>
                {isCorrect ? t.correct : t.incorrect}
              </div>
            )}

            <button
              className="quiz-next-button"
              disabled={!answered}
              onClick={nextQuestion}
            >
              {current === list.length - 1 ? t.finish : t.next}
            </button>
          </section>
        </>
      ) : (
        <section className="quiz-result-card">
          <Trophy size={58} />
          <span className="feature-eyebrow">{t.title}</span>
          <h1>{t.result}</h1>
          <p>{t.score}: <strong>{score}/{list.length}</strong></p>
          <p>{t.xp}: <strong>+30</strong></p>

          <button onClick={() => navigate("/app/quiz-hub")}>
            {t.continue}
          </button>
        </section>
      )}
    </main>
  );
}
