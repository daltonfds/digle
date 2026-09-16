import React, { useState } from "react";
import {
  Bookmark,
  Check,
  Copy,
  Heart,
  Share2,
  Sparkles,
} from "lucide-react";

const verses = [
  {
    text: "Ensina-nos a contar os nossos dias para que alcancemos corações sábios.",
    ref: "Salmos 90:12",
    theme: "Sabedoria",
  },
  {
    text: "Tudo posso naquele que me fortalece.",
    ref: "Filipenses 4:13",
    theme: "Fé",
  },
  {
    text: "O Senhor é o meu pastor; nada me faltará.",
    ref: "Salmos 23:1",
    theme: "Confiança",
  },
];

export default function VerseOfDay() {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [index, setIndex] = useState(0);
  const verse = verses[index];

  const next = () => {
    setIndex((index + 1) % verses.length);
    setSaved(false);
    setLiked(false);
  };

  return (
    <main className="digle-page verse-day-page">
      <section className="verse-day-card">
        <div className="verse-day-icon"><Sparkles /></div>
        <span className="eyebrow">VERSÍCULO DO DIA</span>
        <h1>Uma palavra para hoje.</h1>

        <blockquote>“{verse.text}”</blockquote>
        <strong>{verse.ref}</strong>
        <span className="verse-theme">{verse.theme}</span>

        <div className="verse-day-actions">
          <button className={liked ? "active" : ""} onClick={() => setLiked(!liked)}>
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
          <button className={saved ? "active" : ""} onClick={() => setSaved(!saved)}>
            {saved ? <Check size={18} /> : <Bookmark size={18} />}
          </button>
          <button><Copy size={18} /></button>
          <button><Share2 size={18} /></button>
        </div>

        <button className="next-verse" onClick={next}>Ver outro versículo</button>
      </section>

      <section className="verse-reflection">
        <span>REFLEXÃO</span>
        <h2>Como este versículo pode fazer parte do seu dia?</h2>
        <p>
          Pare por alguns minutos, leia novamente e pense em uma forma prática
          de aplicar esta mensagem hoje.
        </p>
      </section>
    </main>
  );
}
