import { useMemo } from "react";
import {
  Flame,
  Trophy,
  BookOpen,
  ArrowRight,
  Play,
  CheckCircle2,
  Clock3,
  Target,
  Sparkles,
} from "lucide-react";
import { getStored } from "../lib/digleStorage";

const weekly = [
  { day: "Seg", value: 18, active: true },
  { day: "Ter", value: 26, active: true },
  { day: "Qua", value: 12, active: true },
  { day: "Qui", value: 31, active: true },
  { day: "Sex", value: 22, active: true },
  { day: "Sáb", value: 38, active: true },
  { day: "Dom", value: 0, active: false },
];

const continueLessons = [
  {
    id: 1,
    title: "Vivendo pela fé",
    category: "Fé",
    progress: 66,
    duration: "12 min",
    xp: 80,
  },
  {
    id: 2,
    title: "O poder da oração",
    category: "Oração",
    progress: 40,
    duration: "15 min",
    xp: 70,
  },
  {
    id: 3,
    title: "O amor de Cristo",
    category: "Evangelho",
    progress: 18,
    duration: "18 min",
    xp: 90,
  },
];

const dailyTasks = [
  { id: 1, title: "Completar uma lição", xp: 50, done: true },
  { id: 2, title: "Responder ao desafio diário", xp: 30, done: false },
  { id: 3, title: "Ler um capítulo da Bíblia", xp: 25, done: false },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const xp = Number(getStored("xp", 420));
  const streak = Number(getStored("streak", 7));
  const level = Math.floor(xp / 100) + 1;
  const nextLevel = level * 100;
  const levelProgress = Math.min(100, (xp / nextLevel) * 100);

  const completedTasks = dailyTasks.filter((task) => task.done).length;
  const maxWeek = Math.max(...weekly.map((item) => item.value));

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }, []);

  return (
    <main className="digle-dashboard">
      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">
            <Sparkles size={14} />
            SUA JORNADA BÍBLICA
          </span>

          <h1>{greeting}! 👋</h1>

          <p>
            Continue sua jornada e descubra algo novo hoje.
          </p>
        </div>

        <button
          className="dashboard-primary-action"
          onClick={() => (navigate("/app/lessons"))}
        >
          <Play size={16} />
          Continuar estudando
        </button>
      </section>

      <section className="dashboard-stat-grid">
        <article className="dashboard-stat-card featured">
          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon">
              <Flame size={19} />
            </div>
            <span>SEQUÊNCIA</span>
          </div>

          <strong>{streak} dias</strong>
          <small>Continue hoje para manter sua sequência.</small>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon">
              <Trophy size={19} />
            </div>
            <span>XP TOTAL</span>
          </div>

          <strong>{xp.toLocaleString("pt-BR")}</strong>
          <small>{nextLevel - xp} XP para o nível {level + 1}</small>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon">
              <BookOpen size={19} />
            </div>
            <span>LIÇÕES</span>
          </div>

          <strong>12</strong>
          <small>Continue aprendendo todos os dias.</small>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon">
              <Target size={19} />
            </div>
            <span>OBJETIVO</span>
          </div>

          <strong>{completedTasks}/3</strong>
          <small>tarefas concluídas hoje</small>
        </article>
      </section>

      <section className="dashboard-main-grid">
        <div className="dashboard-left-column">
          <div className="dashboard-section-heading">
            <div>
              <span>CONTINUE DE ONDE PAROU</span>
              <h2>Suas lições</h2>
            </div>

            <button onClick={() => (navigate("/app/lessons"))}>
              Ver todas
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="dashboard-lessons">
            {continueLessons.map((lesson) => (
              <article className="dashboard-lesson" key={lesson.id}>
                <div className="dashboard-lesson-number">
                  0{lesson.id}
                </div>

                <div className="dashboard-lesson-content">
                  <span>{lesson.category}</span>
                  <h3>{lesson.title}</h3>

                  <div className="dashboard-progress-track">
                    <div
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>

                  <div className="dashboard-lesson-meta">
                    <small>{lesson.progress}% concluído</small>
                    <small>
                      <Clock3 size={13} />
                      {lesson.duration}
                    </small>
                  </div>
                </div>

                <button
                  className="dashboard-lesson-action"
                  onClick={() =>
                    (navigate("/app/lesson-reader"))
                  }
                >
                  <Play size={15} />
                </button>
              </article>
            ))}
          </div>

          <div className="dashboard-section-heading weekly-heading">
            <div>
              <span>ATIVIDADE</span>
              <h2>Seu ritmo esta semana</h2>
            </div>

            <strong>147 XP</strong>
          </div>

          <article className="dashboard-chart-card">
            <div className="dashboard-chart">
              {weekly.map((item) => {
                const height =
                  item.value === 0
                    ? 5
                    : Math.max(18, (item.value / maxWeek) * 100);

                return (
                  <div className="dashboard-chart-column" key={item.day}>
                    <div className="dashboard-chart-value">
                      {item.value > 0 ? item.value : ""}
                    </div>

                    <div className="dashboard-chart-bar">
                      <div
                        className={item.active ? "active" : ""}
                        style={{ height: `${height}%` }}
                      />
                    </div>

                    <span>{item.day}</span>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        <aside className="dashboard-right-column">
          <article className="dashboard-level-card">
            <div className="dashboard-level-header">
              <div>
                <span>SEU NÍVEL</span>
                <strong>{level}</strong>
              </div>

              <div className="dashboard-level-badge">
                <Trophy size={19} />
              </div>
            </div>

            <div className="dashboard-level-progress">
              <div style={{ width: `${levelProgress}%` }} />
            </div>

            <div className="dashboard-level-footer">
              <span>{xp} XP</span>
              <span>{nextLevel} XP</span>
            </div>
          </article>

          <article className="dashboard-daily-card">
            <div className="dashboard-section-heading compact">
              <div>
                <span>DESAFIO DE HOJE</span>
                <h2>Meta diária</h2>
              </div>

              <Target size={19} />
            </div>

            <p>
              Complete suas atividades para ganhar XP e manter
              sua sequência.
            </p>

            <div className="dashboard-task-list">
              {dailyTasks.map((task) => (
                <div className="dashboard-task" key={task.id}>
                  <div className={task.done ? "done" : ""}>
                    {task.done && <CheckCircle2 size={17} />}
                  </div>

                  <span>{task.title}</span>

                  <strong>+{task.xp}</strong>
                </div>
              ))}
            </div>

            <button
              className="dashboard-challenge-button"
              onClick={() =>
                (navigate("/app/daily-challenge"))
              }
            >
              Fazer desafio
              <ArrowRight size={15} />
            </button>
          </article>

          <article className="dashboard-bible-card">
            <BookOpen size={22} />

            <div>
              <span>VERSÍCULO DO DIA</span>
              <strong>
                “O Senhor é o meu pastor; nada me faltará.”
              </strong>
              <small>Salmos 23:1</small>
            </div>

            <button
              onClick={() => (navigate("/app/verse-of-day"))}
            >
              Ler
            </button>
          </article>
        </aside>
      </section>
    </main>
  );
}
