import { useMemo, useState } from "react";
import {
  Map,
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  Zap,
  ChevronRight,
  Star,
} from "lucide-react";

const trails = [
  {
    id: "fundamentos",
    title: "Fundamentos da Fé",
    description:
      "Construa uma base sólida para compreender a Bíblia, Deus, fé e oração.",
    level: "Iniciante",
    lessons: 6,
    duration: "1h 25min",
    xp: 420,
    progress: 100,
    color: "default",
    unlocked: true,
    lessonsList: [
      "Conhecendo a Bíblia",
      "Quem é Deus?",
      "O que é fé?",
      "O poder da oração",
      "Como estudar a Bíblia",
      "Vivendo pela fé",
    ],
  },
  {
    id: "vida-jesus",
    title: "A Vida de Jesus",
    description:
      "Conheça a história, os ensinamentos e a missão de Jesus Cristo.",
    level: "Iniciante",
    lessons: 8,
    duration: "2h 10min",
    xp: 560,
    progress: 62,
    color: "blue",
    unlocked: true,
    lessonsList: [
      "O nascimento de Jesus",
      "O batismo",
      "Os primeiros discípulos",
      "Os milagres",
      "As parábolas",
      "A última ceia",
      "A crucificação",
      "A ressurreição",
    ],
  },
  {
    id: "sabedoria",
    title: "Sabedoria para Viver",
    description:
      "Descubra princípios bíblicos para decisões, relacionamentos e vida diária.",
    level: "Intermediário",
    lessons: 7,
    duration: "1h 50min",
    xp: 490,
    progress: 28,
    color: "green",
    unlocked: true,
    lessonsList: [
      "O valor da sabedoria",
      "Palavras e atitudes",
      "Relacionamentos",
      "Trabalho e propósito",
      "Dinheiro e contentamento",
      "Decisões sábias",
      "Uma vida equilibrada",
    ],
  },
  {
    id: "novo-testamento",
    title: "Explorando o Novo Testamento",
    description:
      "Uma jornada pelos principais livros, acontecimentos e ensinamentos.",
    level: "Intermediário",
    lessons: 12,
    duration: "3h 20min",
    xp: 850,
    progress: 0,
    color: "purple",
    unlocked: true,
    lessonsList: [
      "Os Evangelhos",
      "Mateus",
      "Marcos",
      "Lucas",
      "João",
      "Atos",
      "Romanos",
      "As cartas",
      "Paulo",
      "Igreja primitiva",
      "Apocalipse",
      "Revisão final",
    ],
  },
  {
    id: "maturidade",
    title: "Maturidade Espiritual",
    description:
      "Aprofunde sua compreensão e desenvolva uma vida cristã consistente.",
    level: "Avançado",
    lessons: 10,
    duration: "3h 05min",
    xp: 900,
    progress: 0,
    color: "gold",
    unlocked: false,
    lessonsList: [
      "Identidade em Cristo",
      "Fruto do Espírito",
      "Perdão",
      "Serviço",
      "Amor ao próximo",
      "Perseverança",
      "Tentação",
      "Discernimento",
      "Chamado",
      "Maturidade",
    ],
  },
];

export default function Trails() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("Todos");

  const filters = ["Todos", "Iniciante", "Intermediário", "Avançado"];

  const visible = useMemo(() => {
    if (filter === "Todos") return trails;
    return trails.filter((trail) => trail.level === filter);
  }, [filter]);

  if (selected) {
    const trail = trails.find((item) => item.id === selected);

    return (
      <div className="trail-detail-page">
        <button
          className="trail-back"
          onClick={() => setSelected(null)}
        >
          ← Voltar para trilhas
        </button>

        <section className={`trail-detail-hero trail-${trail.color}`}>
          <div className="trail-detail-icon">
            <Map size={31} />
          </div>

          <div>
            <span>{trail.level}</span>
            <h1>{trail.title}</h1>
            <p>{trail.description}</p>
          </div>

          <div className="trail-detail-xp">
            <Zap size={17} />
            <strong>{trail.xp} XP</strong>
          </div>
        </section>

        <div className="trail-detail-progress">
          <div>
            <span>Seu progresso</span>
            <strong>{trail.progress}%</strong>
          </div>

          <div className="trail-progress-track">
            <span style={{ width: `${trail.progress}%` }} />
          </div>
        </div>

        <section className="trail-lessons">
          <div className="trail-section-title">
            <div>
              <BookOpen size={19} />
              <h2>Conteúdo da trilha</h2>
            </div>

            <span>{trail.lessons} lições</span>
          </div>

          {trail.lessonsList.map((lesson, index) => {
            const completed =
              trail.progress === 100 ||
              index < Math.floor((trail.progress / 100) * trail.lessons);

            const available =
              completed ||
              index <= Math.floor((trail.progress / 100) * trail.lessons);

            return (
              <div
                className={`trail-lesson-row ${
                  completed ? "completed" : ""
                } ${!available ? "locked" : ""}`}
                key={lesson}
              >
                <div className="trail-lesson-number">
                  {completed ? (
                    <CheckCircle2 size={19} />
                  ) : !available ? (
                    <Lock size={17} />
                  ) : (
                    index + 1
                  )}
                </div>

                <div className="trail-lesson-info">
                  <strong>{lesson}</strong>
                  <span>
                    Lição {index + 1} · {index % 2 === 0 ? "8 min" : "12 min"}
                  </span>
                </div>

                {available && (
                  <button
                    onClick={() => {
                      navigate("/app/lesson-reader");
                    }}
                  >
                    {completed ? "Rever" : "Começar"}
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </section>
      </div>
    );
  }

  return (
    <div className="trails-page">
      <section className="trails-header">
        <div>
          <div className="page-eyebrow">
            <Map size={15} />
            Caminhos de aprendizagem
          </div>

          <h1>Escolha sua jornada</h1>

          <p>
            Trilhas organizadas para você aprender a Bíblia passo a passo.
          </p>
        </div>

        <div className="trails-summary">
          <Star size={18} />
          <strong>4</strong>
          <span>trilhas disponíveis</span>
        </div>
      </section>

      <div className="trail-filters">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="trails-grid">
        {visible.map((trail) => (
          <article
            className={`trail-card trail-${trail.color} ${
              !trail.unlocked ? "locked" : ""
            }`}
            key={trail.id}
          >
            <div className="trail-card-top">
              <div className="trail-card-icon">
                {trail.unlocked ? <Map size={23} /> : <Lock size={21} />}
              </div>

              {trail.progress === 100 && (
                <span className="trail-completed">
                  <CheckCircle2 size={14} />
                  Concluída
                </span>
              )}
            </div>

            <span className="trail-level">{trail.level}</span>

            <h2>{trail.title}</h2>

            <p>{trail.description}</p>

            <div className="trail-meta">
              <span>
                <BookOpen size={14} />
                {trail.lessons} lições
              </span>

              <span>
                <Clock size={14} />
                {trail.duration}
              </span>

              <span>
                <Zap size={14} />
                {trail.xp} XP
              </span>
            </div>

            <div className="trail-card-progress">
              <div>
                <span>Progresso</span>
                <strong>{trail.progress}%</strong>
              </div>

              <div className="trail-progress-track">
                <span style={{ width: `${trail.progress}%` }} />
              </div>
            </div>

            <button
              className="trail-open"
              disabled={!trail.unlocked}
              onClick={() => {
                if (trail.unlocked) setSelected(trail.id);
              }}
            >
              {trail.unlocked ? (
                <>
                  {trail.progress > 0 ? "Continuar trilha" : "Começar trilha"}
                  <ChevronRight size={17} />
                </>
              ) : (
                <>
                  Desbloqueie esta trilha
                  <Lock size={15} />
                </>
              )}
            </button>
          </article>
        ))}
      </div>

      <section className="trail-learning-tip">
        <div>
          <Play size={21} />
        </div>

        <div>
          <strong>Aprenda no seu ritmo</strong>
          <p>
            Complete uma lição por vez. Cada etapa concluída aproxima você do
            próximo nível.
          </p>
        </div>
      </section>
    </div>
  );
}
