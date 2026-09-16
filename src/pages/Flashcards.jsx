import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  RotateCcw,
  Star,
  Zap,
} from "lucide-react";

const cards = [
  { front: "Quem construiu a arca?", back: "Noé", ref: "Gênesis 6–9" },
  { front: "Qual é o primeiro livro da Bíblia?", back: "Gênesis", ref: "Antigo Testamento" },
  { front: "Quantos discípulos Jesus escolheu?", back: "Doze", ref: "Mateus 10:1–4" },
  { front: "Qual é o maior mandamento?", back: "Amar a Deus de todo o coração.", ref: "Mateus 22:37" },
];

export default function Flashcards() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  const card = cards[index];

  const next = (correct) => {
    if (correct) setKnown(known + 1);
    setFlipped(false);
    setIndex((index + 1) % cards.length);
  };

  return (
    <main className="digle-page flashcards-page">
      <section className="flash-header">
        <div>
          <span className="eyebrow"><BookOpen size={15} /> FLASHCARDS</span>
          <h1>Aprenda por repetição.</h1>
          <p>Revise conceitos bíblicos e fortaleça sua memória.</p>
        </div>
        <div className="flash-score"><Zap /><strong>+{known * 10} XP</strong></div>
      </section>

      <div className="flash-progress">
        <span>Cartão {index + 1} de {cards.length}</span>
        <div><i style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></div>
      </div>

      <button className={`flash-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
        <div className="flash-front">
          <span>PERGUNTA</span>
          <strong>{card.front}</strong>
          <small>Toque para revelar</small>
        </div>
        <div className="flash-back">
          <span>RESPOSTA</span>
          <strong>{card.back}</strong>
          <small>{card.ref}</small>
        </div>
      </button>

      <div className="flash-actions">
        <button onClick={() => next(false)}><ArrowLeft /> Ainda não</button>
        <button onClick={() => setFlipped(!flipped)} className="flip-button"><RotateCcw /> Virar</button>
        <button onClick={() => next(true)}><ArrowRight /> Aprendi</button>
      </div>

      <div className="flash-tip">
        <Star />
        <span>Revise novamente os cartões que você ainda não domina.</span>
      </div>
    </main>
  );
}
