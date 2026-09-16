import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Flame,
  Heart,
  Play,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Quem é Jesus?",
    subtitle: "Conheça a pessoa central da fé cristã.",
    xp: 20,
    status: "completed",
  },
  {
    id: 2,
    title: "O Bom Samaritano",
    subtitle: "Uma lição sobre amor e compaixão.",
    xp: 25,
    status: "current",
  },
  {
    id: 3,
    title: "A Fé de Abraão",
    subtitle: "Aprenda sobre confiança em Deus.",
    xp: 30,
    status: "locked",
  },
  {
    id: 4,
    title: "A Vida de Davi",
    subtitle: "Coragem, erros e arrependimento.",
    xp: 30,
    status: "locked",
  },
  {
    id: 5,
    title: "O Poder da Oração",
    subtitle: "Descubra a força de uma vida de oração.",
    xp: 35,
    status: "locked",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-kicker">
            <Sparkles size={15} />
            SUA JORNADA
          </span>

          <h1>
            Continue sua
            <br />
            <span>jornada com Deus.</span>
          </h1>

          <p>
            Pequenas lições todos os dias. Grandes mudanças ao longo do
            caminho.
          </p>
        </div>

        <div className="streak-card">
          <div className="streak-flame">
            <Flame size={28} />
          </div>

          <div>
            <strong>7 dias</strong>
            <span>de sequência</span>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon xp-icon">
            <Star size={21} />
          </div>
          <div>
            <span>XP total</span>
            <strong>1,240</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon heart-icon">
            <Heart size={21} />
          </div>
          <div>
            <span>Vidas</span>
            <strong>5</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon lesson-icon">
            <BookOpen size={21} />
          </div>
          <div>
            <span>Lições</span>
            <strong>27</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon trophy-icon">
            <Trophy size={21} />
          </div>
          <div>
            <span>Precisão</span>
            <strong>91%</strong>
          </div>
        </div>
      </section>

      <section className="continue-card">
        <div className="continue-info">
          <span className="dashboard-kicker">CONTINUE APRENDENDO</span>

          <h2>O Bom Samaritano</h2>

          <p>
            Uma lição sobre amor, compaixão e como tratar o próximo.
          </p>

          <div className="progress-row">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: "65%" }} />
            </div>
            <strong>65%</strong>
          </div>

          <button className="dashboard-primary">
            Continuar lição
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="continue-illustration">
          <div className="illustration-circle">
            <BookOpen size={62} strokeWidth={1.5} />
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="section-title-row">
          <div>
            <span className="dashboard-kicker">TRILHA DE APRENDIZADO</span>
            <h2>Sua jornada</h2>
          </div>

          <span className="journey-count">2 / 5</span>
        </div>

        <div className="journey-path">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className={`journey-item ${lesson.status}`}
              whileHover={{ y: -3 }}
            >
              <div className="journey-node">
                {lesson.status === "completed" ? (
                  "✓"
                ) : lesson.status === "current" ? (
                  <Play size={20} fill="currentColor" />
                ) : (
                  <span>🔒</span>
                )}
              </div>

              <div className="journey-content">
                <div className="journey-top">
                  <span>
                    {lesson.status === "completed"
                      ? "CONCLUÍDA"
                      : lesson.status === "current"
                        ? "AGORA"
                        : "PREMIUM"}
                  </span>

                  <b>
                    <Star size={14} />
                    +{lesson.xp} XP
                  </b>
                </div>

                <h3>{lesson.title}</h3>
                <p>{lesson.subtitle}</p>

                {lesson.status === "current" && (
                  <button className="small-action">
                    Continuar
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>

              {index < lessons.length - 1 && (
                <div className="journey-line" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="dashboard-bottom">
        <div className="weekly-card">
          <div className="section-title-row">
            <div>
              <span className="dashboard-kicker">ESTA SEMANA</span>
              <h2>Seu progresso</h2>
            </div>
          </div>

          <div className="weekly-chart">
            {[35, 58, 42, 76, 64, 91, 72].map((height, index) => (
              <div className="chart-day" key={index}>
                <div className="chart-bar">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  />
                </div>
                <span>
                  {["S", "T", "Q", "Q", "S", "S", "D"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ranking-preview">
          <div className="section-title-row">
            <div>
              <span className="dashboard-kicker">LIGA SEMANAL</span>
              <h2>Ranking</h2>
            </div>

            <Trophy size={22} />
          </div>

          <div className="rank-row">
            <strong>1</strong>
            <div className="rank-avatar">S</div>
            <span>Sarah</span>
            <b>3,420 XP</b>
          </div>

          <div className="rank-row">
            <strong>2</strong>
            <div className="rank-avatar">M</div>
            <span>Michael</span>
            <b>3,180 XP</b>
          </div>

          <div className="rank-row current-user">
            <strong>3</strong>
            <div className="rank-avatar">D</div>
            <span>Você</span>
            <b>2,940 XP</b>
          </div>
        </div>
      </section>
    </div>
  );
}
