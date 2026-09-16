import { useMemo, useState } from "react";
import {
  Trophy,
  Lock,
  CheckCircle2,
  Flame,
  BookOpen,
  Brain,
  Star,
  Target,
  Zap,
  Award,
} from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "Primeiro passo",
    description: "Complete sua primeira lição.",
    category: "Começo",
    icon: Star,
    progress: 1,
    goal: 1,
    unlocked: true,
    xp: 25,
  },
  {
    id: 2,
    title: "Buscador",
    description: "Complete 3 lições.",
    category: "Aprendizagem",
    icon: BookOpen,
    progress: 3,
    goal: 3,
    unlocked: true,
    xp: 50,
  },
  {
    id: 3,
    title: "Mente curiosa",
    description: "Complete 5 lições.",
    category: "Aprendizagem",
    icon: Brain,
    progress: 4,
    goal: 5,
    unlocked: false,
    xp: 75,
  },
  {
    id: 4,
    title: "Constante",
    description: "Estude durante 7 dias seguidos.",
    category: "Consistência",
    icon: Flame,
    progress: 7,
    goal: 7,
    unlocked: true,
    xp: 100,
  },
  {
    id: 5,
    title: "Foco total",
    description: "Complete 10 desafios.",
    category: "Desafios",
    icon: Target,
    progress: 6,
    goal: 10,
    unlocked: false,
    xp: 150,
  },
  {
    id: 6,
    title: "Conhecedor",
    description: "Alcance 500 XP.",
    category: "XP",
    icon: Zap,
    progress: 420,
    goal: 500,
    unlocked: false,
    xp: 200,
  },
  {
    id: 7,
    title: "Mestre da Palavra",
    description: "Complete 20 lições.",
    category: "Aprendizagem",
    icon: Award,
    progress: 12,
    goal: 20,
    unlocked: false,
    xp: 300,
  },
  {
    id: 8,
    title: "Explorador da Bíblia",
    description: "Leia 10 capítulos da Bíblia.",
    category: "Bíblia",
    icon: BookOpen,
    progress: 8,
    goal: 10,
    unlocked: false,
    xp: 150,
  },
];

const categories = [
  "Todos",
  "Começo",
  "Aprendizagem",
  "Consistência",
  "Desafios",
  "XP",
  "Bíblia",
];

export default function Achievements() {
  const [category, setCategory] = useState("Todos");

  const visible = useMemo(() => {
    if (category === "Todos") return achievements;

    return achievements.filter((item) => item.category === category);
  }, [category]);

  const unlocked = achievements.filter((item) => item.unlocked).length;

  return (
    <div className="achievements-page">
      <section className="achievements-hero">
        <div className="achievements-hero-icon">
          <Trophy size={32} />
        </div>

        <div>
          <div className="page-eyebrow">
            <Trophy size={15} />
            Conquistas
          </div>

          <h1>Continue crescendo</h1>

          <p>
            Cada conquista representa um passo na sua jornada de aprendizagem.
          </p>
        </div>

        <div className="achievements-summary">
          <strong>{unlocked}</strong>
          <span>de {achievements.length} desbloqueadas</span>
        </div>
      </section>

      <div className="achievement-progress">
        <div>
          <span>Progresso geral</span>
          <strong>
            {Math.round((unlocked / achievements.length) * 100)}%
          </strong>
        </div>

        <div className="achievement-progress-track">
          <span
            style={{
              width: `${(unlocked / achievements.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="achievement-filters">
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

      <div className="achievements-grid">
        {visible.map((achievement) => {
          const Icon = achievement.icon;
          const percentage = Math.min(
            100,
            (achievement.progress / achievement.goal) * 100
          );

          return (
            <article
              className={`achievement-card ${
                achievement.unlocked ? "unlocked" : "locked"
              }`}
              key={achievement.id}
            >
              <div className="achievement-card-icon">
                <Icon size={25} />
              </div>

              <div className="achievement-card-main">
                <div className="achievement-card-title">
                  <h3>{achievement.title}</h3>

                  {achievement.unlocked ? (
                    <CheckCircle2 size={19} />
                  ) : (
                    <Lock size={17} />
                  )}
                </div>

                <p>{achievement.description}</p>

                <div className="achievement-card-meta">
                  <span>
                    {achievement.progress}/{achievement.goal}
                  </span>

                  <strong>+{achievement.xp} XP</strong>
                </div>

                <div className="achievement-card-progress">
                  <span style={{ width: `${percentage}%` }} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
