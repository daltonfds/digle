import { useMemo, useState } from "react";
import {
  Brain,
  Trophy,
  Zap,
  BookOpen,
  Flame,
  ChevronRight,
  Lock,
  CheckCircle2,
} from "lucide-react";

const quizzes = [
  {
    id: 1,
    title: "Fundamentos da Bíblia",
    description: "Teste seus conhecimentos básicos sobre as Escrituras.",
    category: "Fundamentos",
    questions: 10,
    xp: 100,
    difficulty: "Fácil",
    progress: 100,
    completed: true,
  },
  {
    id: 2,
    title: "Antigo Testamento",
    description: "Personagens, livros e acontecimentos do Antigo Testamento.",
    category: "Antigo Testamento",
    questions: 12,
    xp: 120,
    difficulty: "Médio",
    progress: 60,
    completed: false,
  },
  {
    id: 3,
    title: "Vida de Jesus",
    description: "Conheça melhor a vida e os ensinamentos de Jesus.",
    category: "Evangelho",
    questions: 15,
    xp: 150,
    difficulty: "Médio",
    progress: 0,
    completed: false,
  },
  {
    id: 4,
    title: "Cartas de Paulo",
    description: "Explore os ensinamentos presentes nas cartas de Paulo.",
    category: "Novo Testamento",
    questions: 15,
    xp: 160,
    difficulty: "Difícil",
    progress: 0,
    completed: false,
  },
  {
    id: 5,
    title: "Sabedoria bíblica",
    description: "Provérbios, Eclesiastes e princípios para a vida.",
    category: "Sabedoria",
    questions: 10,
    xp: 110,
    difficulty: "Médio",
    progress: 0,
    completed: false,
  },
  {
    id: 6,
    title: "Desafio mestre",
    description: "Um desafio completo para testar seu conhecimento.",
    category: "Desafio",
    questions: 25,
    xp: 300,
    difficulty: "Difícil",
    progress: 0,
    completed: false,
    locked: true,
  },
];

const categories = [
  "Todos",
  "Fundamentos",
  "Antigo Testamento",
  "Novo Testamento",
  "Evangelho",
  "Sabedoria",
  "Desafio",
];

export default function QuizHub() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const [category, setCategory] = useState("Todos");

  const visible = useMemo(() => {
    if (category === "Todos") return quizzes;

    return quizzes.filter((quiz) => quiz.category === category);
  }, [category]);

  const completed = quizzes.filter((quiz) => quiz.completed).length;

  return (
    <div className="quiz-hub-page">
      <section className="quiz-hub-hero">
        <div className="quiz-hub-hero-icon">
          <Brain size={34} />
        </div>

        <div>
          <div className="page-eyebrow">
            <Brain size={15} />
            Centro de desafios
          </div>

          <h1>Teste seu conhecimento</h1>

          <p>
            Aprenda, responda e ganhe XP enquanto fortalece seu conhecimento
            bíblico.
          </p>
        </div>

        <div className="quiz-hub-summary">
          <strong>{completed}</strong>
          <span>quizzes concluídos</span>
        </div>
      </section>

      <section className="quiz-hub-stats">
        <div>
          <Zap size={19} />
          <strong>1.250</strong>
          <span>XP disponível</span>
        </div>

        <div>
          <Trophy size={19} />
          <strong>{completed}</strong>
          <span>Concluídos</span>
        </div>

        <div>
          <Flame size={19} />
          <strong>7</strong>
          <span>Sequência</span>
        </div>
      </section>

      <div className="quiz-hub-filters">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="quiz-hub-grid">
        {visible.map((quiz) => (
          <article
            className={`quiz-hub-card ${quiz.locked ? "locked" : ""}`}
            key={quiz.id}
          >
            <div className="quiz-hub-card-top">
              <div className="quiz-hub-card-icon">
                {quiz.locked ? <Lock size={23} /> : <Brain size={23} />}
              </div>

              {quiz.completed && (
                <span className="quiz-completed">
                  <CheckCircle2 size={15} />
                  Concluído
                </span>
              )}
            </div>

            <span className="quiz-category">{quiz.category}</span>

            <h2>{quiz.title}</h2>

            <p>{quiz.description}</p>

            <div className="quiz-hub-meta">
              <span>
                <BookOpen size={15} />
                {quiz.questions} perguntas
              </span>

              <span>
                <Zap size={15} />
                +{quiz.xp} XP
              </span>

              <span>{quiz.difficulty}</span>
            </div>

            {quiz.progress > 0 && quiz.progress < 100 && (
              <div className="quiz-hub-progress">
                <div>
                  <span>Progresso</span>
                  <strong>{quiz.progress}%</strong>
                </div>

                <div className="quiz-hub-progress-track">
                  <span style={{ width: `${quiz.progress}%` }} />
                </div>
              </div>
            )}

            <button
              className="quiz-hub-start"
              disabled={quiz.locked}
              onClick={() => {
                if (!quiz.locked) {
                  navigate("/app/quiz-play");
                }
              }}
            >
              {quiz.locked
                ? "Bloqueado"
                : quiz.progress > 0 && quiz.progress < 100
                  ? "Continuar"
                  : quiz.completed
                    ? "Refazer"
                    : "Começar"}
              {!quiz.locked && <ChevronRight size={17} />}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
