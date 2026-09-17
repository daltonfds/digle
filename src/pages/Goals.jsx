import { useMemo, useState } from "react";
import {
  Target,
  Flame,
  BookOpen,
  Trophy,
  Clock3,
  CheckCircle2,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getStored, setStored } from "../lib/digleStorage";

const defaultGoals = [
  {
    id: "daily-study",
    title: "Estudar todos os dias",
    description: "Complete pelo menos uma atividade por dia.",
    icon: Flame,
    current: 6,
    target: 7,
    unit: "dias",
    reward: 100,
    color: "orange",
  },
  {
    id: "lessons",
    title: "Completar lições",
    description: "Conclua novas lições da sua jornada.",
    icon: BookOpen,
    current: 12,
    target: 20,
    unit: "lições",
    reward: 150,
    color: "purple",
  },
  {
    id: "chapters",
    title: "Ler a Bíblia",
    description: "Leia capítulos e aprofunde seu conhecimento.",
    icon: BookOpen,
    current: 7,
    target: 10,
    unit: "capítulos",
    reward: 120,
    color: "blue",
  },
  {
    id: "xp",
    title: "Alcançar XP",
    description: "Continue aprendendo para subir de nível.",
    icon: Trophy,
    current: Number(getStored("xp", 420)),
    target: 500,
    unit: "XP",
    reward: 80,
    color: "green",
  },
];

const weeklyGoals = [
  { day: "Seg", value: true },
  { day: "Ter", value: true },
  { day: "Qua", value: true },
  { day: "Qui", value: true },
  { day: "Sex", value: true },
  { day: "Sáb", value: true },
  { day: "Dom", value: false },
];

export default function Goals() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState(
    getStored("goals", defaultGoals)
  );
  const [showCompleted, setShowCompleted] = useState(false);

  const completed = goals.filter(
    (goal) => goal.current >= goal.target
  ).length;

  const totalProgress = useMemo(() => {
    const total = goals.reduce((sum, goal) => sum + goal.target, 0);
    const current = goals.reduce(
      (sum, goal) => sum + Math.min(goal.current, goal.target),
      0
    );

    return total ? Math.round((current / total) * 100) : 0;
  }, [goals]);

  function updateGoal(id) {
    const updated = goals.map((goal) =>
      goal.id === id
        ? {
            ...goal,
            current: Math.min(goal.current + 1, goal.target),
          }
        : goal
    );

    setGoals(updated);
    setStored("goals", updated);
  }

  const visibleGoals = showCompleted
    ? goals
    : goals.filter((goal) => goal.current < goal.target);

  return (
    <main className="goals-page">
      <section className="goals-header">
        <div>
          <span className="goals-eyebrow">
            <Target size={15} />
            METAS DE APRENDIZAGEM
          </span>

          <h1>Transforme intenção em hábito.</h1>

          <p>
            Pequenos objetivos todos os dias constroem uma jornada
            consistente de conhecimento bíblico.
          </p>
        </div>

        <button
          className="goals-add-button"
          onClick={() => {
            const name = window.prompt("Nome da nova meta:");
            if (!name?.trim()) return;

            const newGoal = {
              id: `custom-${Date.now()}`,
              title: name.trim(),
              description: "Meta personalizada da sua jornada.",
              icon: Target,
              current: 0,
              target: 10,
              unit: "vezes",
              reward: 50,
              color: "purple",
            };

            const updated = [...goals, newGoal];
            setGoals(updated);
            setStored("goals", updated);
          }}
        >
          <Plus size={16} />
          Nova meta
        </button>
      </section>

      <section className="goals-overview">
        <div className="goals-overview-main">
          <div className="goals-overview-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <span>PROGRESSO GERAL</span>
            <strong>{totalProgress}%</strong>
          </div>

          <div className="goals-overview-track">
            <div style={{ width: `${totalProgress}%` }} />
          </div>

          <small>
            {completed} de {goals.length} metas concluídas
          </small>
        </div>

        <div className="goals-overview-streak">
          <Flame size={21} />
          <div>
            <strong>6/7</strong>
            <span>dias esta semana</span>
          </div>
        </div>
      </section>

      <section className="goals-section-heading">
        <div>
          <span>OBJETIVOS</span>
          <h2>Suas metas</h2>
        </div>

        <button
          className={showCompleted ? "active" : ""}
          onClick={() => setShowCompleted((value) => !value)}
        >
          {showCompleted ? "Ocultar concluídas" : "Mostrar concluídas"}
        </button>
      </section>

      <section className="goals-grid">
        {visibleGoals.map((goal) => {
          const Icon = goal.icon;
          const progress = Math.min(
            100,
            Math.round((goal.current / goal.target) * 100)
          );
          const completedGoal = progress >= 100;

          return (
            <article
              className={`goal-card ${completedGoal ? "completed" : ""}`}
              key={goal.id}
            >
              <div className="goal-card-top">
                <div className={`goal-icon ${goal.color}`}>
                  <Icon size={20} />
                </div>

                {completedGoal ? (
                  <span className="goal-completed">
                    <CheckCircle2 size={14} />
                    Concluída
                  </span>
                ) : (
                  <span className="goal-reward">
                    +{goal.reward} XP
                  </span>
                )}
              </div>

              <h3>{goal.title}</h3>
              <p>{goal.description}</p>

              <div className="goal-values">
                <strong>
                  {goal.current.toLocaleString("pt-BR")}
                </strong>
                <span>
                  / {goal.target.toLocaleString("pt-BR")} {goal.unit}
                </span>
              </div>

              <div className="goal-track">
                <div style={{ width: `${progress}%` }} />
              </div>

              <div className="goal-bottom">
                <span>{progress}% concluído</span>

                {!completedGoal && (
                  <button onClick={() => updateGoal(goal.id)}>
                    Atualizar
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="goals-week-card">
        <div className="goals-week-header">
          <div>
            <span>CONSISTÊNCIA</span>
            <h2>Seu ritmo semanal</h2>
          </div>

          <div className="goals-week-time">
            <Clock3 size={15} />
            20 min / dia
          </div>
        </div>

        <div className="goals-week-days">
          {weeklyGoals.map((day) => (
            <div className="goals-week-day" key={day.day}>
              <div className={day.value ? "active" : ""}>
                {day.value && <CheckCircle2 size={17} />}
              </div>
              <span>{day.day}</span>
            </div>
          ))}
        </div>

        <div className="goals-week-footer">
          <div>
            <strong>6 dias</strong>
            <span>de estudo</span>
          </div>

          <div>
            <strong>1</strong>
            <span>dia restante</span>
          </div>

          <div>
            <strong>20 min</strong>
            <span>meta diária</span>
          </div>
        </div>
      </section>

      <section className="goals-next-card">
        <div className="goals-next-icon">
          <Trophy size={21} />
        </div>

        <div>
          <span>PRÓXIMA CONQUISTA</span>
          <strong>Complete 20 lições</strong>
          <small>Faltam apenas 8 lições para desbloquear a recompensa.</small>
        </div>

        <button onClick={() => (navigate("/app/lessons"))}>
          Continuar
          <ArrowRight size={15} />
        </button>
      </section>
    </main>
  );
}
