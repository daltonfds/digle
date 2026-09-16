import React from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Cross,
  Heart,
  Lightbulb,
  Lock,
  MessageCircle,
  Play,
  Shield,
  Sparkles,
} from "lucide-react";

const paths = [
  {
    title: "Fundamentos da Bíblia",
    desc: "Construa uma base sólida para entender a Bíblia.",
    icon: BookOpen,
    lessons: 8,
    done: 6,
    xp: 500,
  },
  {
    title: "Conhecendo Deus",
    desc: "Descubra quem Deus é e como a Bíblia o apresenta.",
    icon: Lightbulb,
    lessons: 7,
    done: 3,
    xp: 450,
  },
  {
    title: "A vida de Jesus",
    desc: "Conheça a história, ensinamentos e missão de Jesus.",
    icon: Cross,
    lessons: 10,
    done: 1,
    xp: 700,
  },
  {
    title: "Oração",
    desc: "Aprenda princípios bíblicos para desenvolver sua vida de oração.",
    icon: MessageCircle,
    lessons: 6,
    done: 2,
    xp: 400,
  },
  {
    title: "Fé",
    desc: "Entenda o significado da fé e como vivê-la.",
    icon: Shield,
    lessons: 8,
    done: 4,
    xp: 550,
  },
  {
    title: "Vida cristã",
    desc: "Princípios práticos para crescer todos os dias.",
    icon: Heart,
    lessons: 12,
    done: 0,
    xp: 800,
  },
];

export default function LearningPaths() {
  return (
    <main className="digle-page paths-page">
      <section className="paths-hero">
        <div>
          <span className="eyebrow"><Sparkles size={15} /> TRILHAS</span>
          <h1>Aprenda passo a passo.</h1>
          <p>Escolha uma trilha e siga uma jornada organizada de aprendizagem.</p>
        </div>
        <div className="paths-hero-icon"><BookOpen size={48} /></div>
      </section>

      <section className="paths-featured">
        <div className="featured-path-icon"><BookOpen /></div>
        <div>
          <span>RECOMENDADA PARA VOCÊ</span>
          <h2>Fundamentos da Bíblia</h2>
          <p>Você já completou 75% desta trilha. Continue de onde parou.</p>
          <div className="featured-progress">
            <i style={{ width: "75%" }} />
          </div>
          <small>6 de 8 lições</small>
        </div>
        <<button className="primary-button"><Play size={16} fill="currentColor" /> Continuar</button>
      </section>

      <section className="paths-section">
        <div className="section-heading">
          <div><span className="eyebrow">TODAS AS TRILHAS</span><h2>Escolha sua próxima jornada</h2></div>
        </div>

        <div className="paths-grid">
          {paths.map((path) => {
            const Icon = path.icon;
            const progress = Math.round((path.done / path.lessons) * 100);
            return (
              <article className="path-card" key={path.title}>
                <div className="path-icon"><Icon /></div>
                <span className="path-tag">{path.lessons} lições</span>
                <h3>{path.title}</h3>
                <p>{path.desc}</p>

                <div className="path-progress-row">
                  <span>{path.done}/{path.lessons} concluídas</span>
                  <strong>{progress}%</strong>
                </div>
                <div className="path-progress"><i style={{ width: `${progress}%` }} /></div>

                <div className="path-bottom">
                  <span>+{path.xp} XP</span>
                  <button>{path.done ? "Continuar" : "Começar"} <ChevronRight size={16} /></button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="paths-info">
        <CheckCircle2 />
        <div>
          <h3>Aprenda no seu ritmo</h3>
          <p>Não precisa completar tudo de uma vez. Seu progresso fica salvo para você continuar quando quiser.</p>
        </div>
        <ArrowRight />
      </section>
    </main>
  );
}
