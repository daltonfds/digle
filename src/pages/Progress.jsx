import { useMemo } from "react";
import {
  Flame,
  Trophy,
  Star,
  BookOpen,
  CheckCircle,
  Lock,
  Zap,
  Target,
  Award,
} from "lucide-react";

const lessons = [
  { title: "Conhecendo a Bíblia", category: "Fundamentos", xp: 50, done: true },
  { title: "Quem é Deus?", category: "Deus", xp: 60, done: true },
  { title: "O poder da oração", category: "Oração", xp: 70, done: true },
  { title: "Vivendo pela fé", category: "Fé", xp: 80, done: false },
  { title: "O amor de Cristo", category: "Evangelho", xp: 90, done: false },
];

const achievements = [
  {
    title: "Primeiro passo",
    description: "Complete sua primeira lição",
    icon: BookOpen,
    unlocked: true,
  },
  {
    title: "Buscador",
    description: "Complete 3 lições",
    icon: Target,
    unlocked: true,
  },
  {
    title: "Em crescimento",
    description: "Alcance 250 XP",
    icon: Zap,
    unlocked: true,
  },
  {
    title: "Constante",
    description: "Mantenha uma sequência de 7 dias",
    icon: Flame,
    unlocked: false,
  },
  {
    title: "Conhecedor",
    description: "Complete 10 lições",
    icon: Award,
    unlocked: false,
  },
  {
    title: "Mestre da Palavra",
    description: "Alcance o nível 10",
    icon: Trophy,
    unlocked: false,
  },
];

export default function Progress() {
  const completed = lessons.filter((lesson) => lesson.done).length;

  const xp = useMemo(
    () =>
      lessons
        .filter((lesson) => lesson.done)
        .reduce((total, lesson) => total + lesson.xp, 0),
    []
  );

  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;
  const progress = currentLevelXp;

  return (
    <div className="progress-page">
      <div className="page-header progress-header">
        <div>
          <div className="eyebrow">SEU CAMINHO</div>
          <h1>Continue crescendo.</h1>
          <p>
            Acompanhe seu progresso, conquistas e tudo o que já aprendeu.
          </p>
        </div>

        <div className="progress-level-badge">
          <Star size={18} />
          <span>Nível {level}</span>
        </div>
      </div>

      <section className="progress-overview">
        <div className="progress-main-card">
          <div className="progress-main-top">
            <div className="progress-icon">
              <Zap size={25} />
            </div>

            <div>
              <span className="progress-label">XP TOTAL</span>
              <strong>{xp} XP</strong>
            </div>
          </div>

          <div className="progress-level-row">
            <span>Nível {level}</span>
            <span>{currentLevelXp}/100 XP</span>
          </div>

          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>

          <p className="progress-next">
            {100 - currentLevelXp} XP para o próximo nível
          </p>
        </div>

        <div className="progress-stat-card">
          <div className="stat-icon">
            <BookOpen size={21} />
          </div>
          <span>Lições concluídas</span>
          <strong>{completed}</strong>
          <small>de {lessons.length}</small>
        </div>

        <div className="progress-stat-card">
          <div className="stat-icon">
            <Flame size={21} />
          </div>
          <span>Sequência atual</span>
          <strong>3</strong>
          <small>dias seguidos</small>
        </div>

        <div className="progress-stat-card">
          <div className="stat-icon">
            <Trophy size={21} />
          </div>
          <span>Conquistas</span>
          <strong>{achievements.filter((item) => item.unlocked).length}</strong>
          <small>desbloqueadas</small>
        </div>
      </section>

      <section className="progress-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">APRENDIZAGEM</span>
            <h2>Seu caminho</h2>
          </div>
          <span className="section-count">
            {completed}/{lessons.length}
          </span>
        </div>

        <div className="learning-path">
          {lessons.map((lesson, index) => (
            <div
              className={`learning-item ${lesson.done ? "done" : ""}`}
              key={lesson.title}
            >
              <div className="learning-number">
                {lesson.done ? <CheckCircle size={20} /> : index + 1}
              </div>

              <div className="learning-content">
                <span>{lesson.category}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.xp} XP</p>
              </div>

              <div className="learning-status">
                {lesson.done ? (
                  <span className="completed-label">Concluída</span>
                ) : (
                  <span>Próxima</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="progress-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">RECOMPENSAS</span>
            <h2>Conquistas</h2>
          </div>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;

            return (
              <div
                className={`achievement-card ${
                  achievement.unlocked ? "unlocked" : "locked"
                }`}
                key={achievement.title}
              >
                <div className="achievement-icon">
                  {achievement.unlocked ? (
                    <Icon size={24} />
                  ) : (
                    <Lock size={21} />
                  )}
                </div>

                <div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>

                {achievement.unlocked && (
                  <CheckCircle className="achievement-check" size={18} />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
