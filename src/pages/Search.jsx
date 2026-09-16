import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Headphones,
  Layers,
  Search as SearchIcon,
  Sparkles,
} from "lucide-react";

const data = [
  { type: "Lição", title: "Vivendo pela fé", text: "Aprenda como desenvolver uma fé prática.", icon: BookOpen },
  { type: "Lição", title: "O poder da oração", text: "Princípios bíblicos sobre oração.", icon: BookOpen },
  { type: "Trilha", title: "Fundamentos da Bíblia", text: "Uma jornada para começar a estudar a Bíblia.", icon: Layers },
  { type: "Quiz", title: "Conhecimentos gerais", text: "Teste seus conhecimentos bíblicos.", icon: Brain },
  { type: "Áudio", title: "O amor de Cristo", text: "Estudo em áudio sobre o Evangelho.", icon: Headphones },
  { type: "Versículo", title: "Filipenses 4:13", text: "Tudo posso naquele que me fortalece.", icon: Sparkles },
];

export default function Search() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return data;
    return data.filter((item) =>
      `${item.title} ${item.text} ${item.type}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <main className="digle-page search-page">
      <section className="page-heading">
        <span className="eyebrow"><SearchIcon size={15} /> EXPLORAR</span>
        <h1>O que você quer aprender?</h1>
        <p>Pesquise por lições, trilhas, quizzes, áudios e versículos.</p>
      </section>

      <div className="global-search">
        <SearchIcon />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar no Digle..."
        />
        {query && <button onClick={() => setQuery("")}>Limpar</button>}
      </div>

      <div className="search-results">
        <div className="search-result-header">
          <span>{results.length} resultados</span>
        </div>

        {results.map((item) => {
          const Icon = item.icon;
          return (
            <article className="search-result-card" key={`${item.type}-${item.title}`}>
              <div className="search-result-icon"><Icon /></div>
              <div>
                <span>{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <ArrowRight />
            </article>
          );
        })}
      </div>
    </main>
  );
}
