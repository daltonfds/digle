import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Lightbulb,
  MessageCircle,
  Star,
  Trophy,
  Play,
} from "lucide-react";

const sections = [
  {
    title: "O que é fé?",
    text: "A fé é confiar em Deus e acreditar naquilo que Ele promete, mesmo quando ainda não conseguimos ver o resultado.",
    verse: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
    reference: "Hebreus 11:1",
  },
  {
    title: "Fé não é apenas conhecimento",
    text: "Conhecer aquilo que a Bíblia ensina é importante, mas a fé também envolve colocar esse conhecimento em prática. É confiar em Deus nas decisões, dificuldades e momentos de incerteza.",
    verse: "Confia no Senhor de todo o teu coração e não te apoies no teu próprio entendimento.",
    reference: "Provérbios 3:5",
  },
  {
    title: "Como desenvolver a fé?",
    text: "A fé cresce quando ouvimos a Palavra, oramos, aprendemos com aquilo que Deus já fez e escolhemos confiar nEle diariamente.",
    verse: "De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.",
    reference: "Romanos 10:17",
  },
];

export default function LessonReader() {
  const [section, setSection] = useState(0);
  const [saved, setSaved] = useState(false);
  const [completed, setCompleted] = useState(false);

  const current = sections[section];
  const last = section === sections.length - 1;
  const progress = ((section + 1) / sections.length) * 100;

  const next = () => {
    if (last) {
      setCompleted(true);
      return;
    }

    setSection((value) => value + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previous = () => {
    if (section === 0) return;

    setSection((value) => value - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (completed) {
    return (
      <div className="lesson-reader-page">
        <div className="lesson-completion">
          <div className="lesson-completion-icon">
            <Trophy size={34} />
          </div>

          <span className="eyebrow">LIÇÃO CONCLUÍDA</span>

          <h1>Você avançou mais um passo!</h1>

          <p>
            Continue aprendendo. Pequenos passos constantes podem transformar
            a maneira como você conhece e vive a Palavra.
          </p>

          <div className="lesson-xp-reward">
            <Star size={20} />
            <strong>+80 XP</strong>
            <span>adicionados ao seu progresso</span>
          </div>

          <div className="completion-actions">
            <button
              className="reader-secondary-button"
              onClick={() => {
                setCompleted(false);
                setSection(0);
              }}
            >
              Rever lição
            </button>

            <button className="reader-primary-button">
              Próxima lição
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-reader-page">
      <header className="reader-header">
        <button className="reader-back-button">
          <ArrowLeft size={17} />
          Voltar às lições
        </button>

        <div className="reader-progress-label">
          <span>LIÇÃO 04</span>
          <strong>{section + 1} de {sections.length}</strong>
        </div>
      </header>

      <div className="reader-progress">
        <span style={{ width: `${progress}%` }} />
      </div>

      <main className="reader-layout">
        <article className="reader-content">
          <div className="reader-title-block">
            <span className="eyebrow">FÉ</span>
            <h1>Vivendo pela fé</h1>
            <p>
              Aprenda o que significa confiar em Deus e como desenvolver uma
              fé prática no dia a dia.
            </p>

            <div className="reader-meta">
              <span>
                <BookOpen size={14} />
                14 min
              </span>
              <span>80 XP</span>
              <span>Intermediário</span>
            </div>
          </div>

          <div className="reader-section">
            <div className="reader-section-number">
              {String(section + 1).padStart(2, "0")}
            </div>

            <h2>{current.title}</h2>

            <p className="reader-main-text">{current.text}</p>

            <blockquote className="reader-verse">
              <BookOpen size={19} />
              <div>
                <p>“{current.verse}”</p>
                <cite>{current.reference}</cite>
              </div>
            </blockquote>

            <div className="reader-insight">
              <div className="insight-icon">
                <Lightbulb size={19} />
              </div>

              <div>
                <strong>Para refletir</strong>
                <p>
                  Onde você precisa confiar mais em Deus hoje, mesmo sem saber
                  exatamente como as coisas vão acontecer?
                </p>
              </div>
            </div>

            <div className="reader-note">
              <MessageCircle size={18} />
              <span>
                Pense por alguns segundos antes de avançar para a próxima
                parte.
              </span>
            </div>
          </div>

          <div className="reader-navigation">
            <button
              className="reader-secondary-button"
              onClick={previous}
              disabled={section === 0}
            >
              <ArrowLeft size={16} />
              Anterior
            </button>

            <button
              className={`reader-save-button ${saved ? "saved" : ""}`}
              onClick={() => setSaved((value) => !value)}
            >
              <CheckCircle size={16} />
              {saved ? "Salvo" : "Marcar como concluída"}
            </button>

            <button className="reader-primary-button" onClick={next}>
              {last ? "Concluir lição" : "Continuar"}
              {last ? <Trophy size={16} /> : <ArrowRight size={16} />}
            </button>
          </div>
        </article>

        <aside className="reader-sidebar">
          <div className="reader-sidebar-card">
            <div className="reader-sidebar-icon">
              <Play size={17} fill="currentColor" />
            </div>

            <span className="eyebrow">ÁUDIO</span>

            <h3>Ouça esta lição</h3>

            <p>
              Aprenda enquanto caminha, viaja ou simplesmente relaxa.
            </p>

            <button className="reader-audio-button">
              <Play size={14} fill="currentColor" />
              Ouvir agora
            </button>
          </div>

          <div className="reader-sidebar-card">
            <span className="eyebrow">SEU PROGRESSO</span>

            <div className="reader-sidebar-progress">
              <strong>{Math.round(progress)}%</strong>
              <span>concluído</span>
            </div>

            <div className="mini-progress">
              <span style={{ width: `${progress}%` }} />
            </div>

            <div className="reader-sidebar-list">
              {sections.map((item, index) => (
                <div
                  className={`reader-sidebar-item ${
                    index === section ? "active" : ""
                  } ${index < section ? "done" : ""}`}
                  key={item.title}
                >
                  <span>
                    {index < section ? (
                      <CheckCircle size={15} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
