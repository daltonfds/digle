import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  Trophy,
  BookOpen,
  ArrowRight,
  Play,
  Clock3,
  Target,
  Sparkles,
} from "lucide-react";
import { getDashboardData, recordActivity } from "../lib/digleApi";

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    user: null,
    stats: null,
    progress: [],
    achievements: [],
  });

  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setData(await getDashboardData());
    } catch (error) {
      console.error("Dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const xp = Number(data.stats?.xp_total || 0);
  const streak = Number(data.stats?.streak_current || 0);
  const level = Math.floor(xp / 100) + 1;
  const currentLevelXP = (level - 1) * 100;
  const nextLevelXP = level * 100;
  const levelProgress = Math.min(
    100,
    ((xp - currentLevelXP) / 100) * 100
  );

  const completedLessons = data.progress.filter(
    (item) => item.status === "completed"
  ).length;

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }, []);

  const name =
    data.user?.user_metadata?.display_name ||
    data.user?.email?.split("@")[0] ||
    "Peregrino";

  const continueLessons = [
    {
      id: "vivendo-pela-fe",
      title: "Vivendo pela fé",
      category: "Fé",
      progress: 66,
      duration: "12 min",
    },
    {
      id: "poder-da-oracao",
      title: "O poder da oração",
      category: "Oração",
      progress: 40,
      duration: "15 min",
    },
    {
      id: "amor-de-cristo",
      title: "O amor de Cristo",
      category: "Evangelho",
      progress: 18,
      duration: "18 min",
    },
  ];

  const todayTasks = [
    {
      title: "Completar uma lição",
      done: completedLessons > 0,
    },
    {
      title: "Responder ao desafio diário",
      done: false,
    },
    {
      title: "Ler a Bíblia",
      done: false,
    },
  ];

  const completedTasks = todayTasks.filter((task) => task.done).length;

  return (
    <main className="digle-dashboard">
      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">
            <Sparkles size={14} />
            SUA JORNADA BÍBLICA
          </span>

          <h1>
            {greeting}! {name} 👋
          </h1>

          <p>
            Continue sua jornada e descubra algo novo hoje.
          </p>
        </div>

        <button
          className="dashboard-primary-action"
          onClick={() => navigate("/app/lessons")}
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

          <strong>{loading ? "—" : `${streak} dias`}</strong>
          <small>Continue hoje para manter sua sequência.</small>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon">
              <Trophy size={19} />
            </div>
            <span>XP TOTAL</span>
          </div>

          <strong>{loading ? "—" : xp.toLocaleString("pt-BR")}</strong>
          <small>
            {Math.max(0, nextLevelXP - xp)} XP para o nível {level + 1}
          </small>
        </article>

        <article className="dashboard-stat-card">
          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon">
              <BookOpen size={19} />
            </div>
            <span>LIÇÕES</span>
          </div>

          <strong>{loading ? "—" : completedLessons}</strong>
          <small>lições concluídas na sua jornada.</small>
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

            <button onClick={() => navigate("/app/lessons")}>
              Ver todas
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="dashboard-lessons">
            {continueLessons.map((lesson, index) => (
              <article className="dashboard-lesson" key={lesson.id}>
                <div className="dashboard-lesson-number">
                  0{index + 1}
                </div>

                <div className="dashboard-lesson-content">
                  <span>{lesson.category}</span>
                  <h3>{lesson.title}</h3>

                  <div className="dashboard-progress-track">
                    <div style={{ width: `${lesson.progress}%` }} />
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
                  onClick={() => navigate("/app/lessons")}
                >
                  <Play size={15} />
                </button>
              </article>
            ))}
          </div>

          <div className="dashboard-section-heading weekly-heading">
            <div>
              <span>SEU NÍVEL</span>
              <h2>Nível {level}</h2>
            </div>

            <strong>{xp} XP</strong>
          </div>

          <article className="dashboard-chart-card">
            <div className="dashboard-level-progress">
              <div
                className="dashboard-level-progress-fill"
                style={{ width: `${levelProgress}%` }}
              />
            </div>

            <div className="dashboard-level-meta">
              <span>{currentLevelXP} XP</span>
              <span>{nextLevelXP} XP</span>
            </div>
          </article>
        </div>

        <aside className="dashboard-right-column">
          <div className="dashboard-section-heading">
            <div>
              <span>HOJE</span>
              <h2>Seu objetivo</h2>
            </div>
          </div>

          <article className="dashboard-daily-card">
            <div className="dashboard-daily-top">
              <div>
                <span>PROGRESSO DIÁRIO</span>
                <strong>{completedTasks}/3</strong>
              </div>

              <Target size={22} />
            </div>

            <div className="dashboard-daily-progress">
              <div
                style={{
                  width: `${(completedTasks / 3) * 100}%`,
                }}
              />
            </div>

            <div className="dashboard-daily-tasks">
              {todayTasks.map((task) => (
                <div key={task.title}>
                  <span className={task.done ? "done" : ""}>
                    {task.done ? "✓" : "○"}
                  </span>
                  <p>{task.title}</p>
                </div>
              ))}
            </div>

            <button
              className="primary-btn"
              onClick={async () => {
                try {
                  await recordActivity({
                    type: "dashboard",
                    minutes: 1,
                    xp: 0,
                  });
                  await load();
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Atualizar progresso
            </button>
          </article>

          <article className="dashboard-next-level">
            <Trophy size={22} />

            <div>
              <span>PRÓXIMO NÍVEL</span>
              <strong>Nível {level + 1}</strong>
              <small>
                Faltam {Math.max(0, nextLevelXP - xp)} XP
              </small>
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
