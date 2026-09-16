import React, { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  Search,
  Trophy,
  Zap,
} from "lucide-react";
import { getStored } from "../lib/digleStorage";

const history = [
  {
    id: 1,
    title: "Vivendo pela fé",
    type: "Lição",
    category: "Fé",
    date: "Hoje",
    time: "09:20",
    duration: "18 min",
    xp: 80,
    completed: true,
  },
  {
    id: 2,
    title: "O poder da oração",
    type: "Lição",
    category: "Oração",
    date: "Hoje",
    time: "08:42",
    duration: "14 min",
    xp: 70,
    completed: true,
  },
  {
    id: 3,
    title: "Desafio diário",
    type: "Quiz",
    category: "Quiz",
    date: "Ontem",
    time: "20:15",
    duration: "7 min",
    xp: 50,
    completed: true,
  },
  {
    id: 4,
    title: "Salmos 23",
    type: "Bíblia",
    category: "Leitura",
    date: "Ontem",
    time: "19:40",
    duration: "12 min",
    xp: 30,
    completed: true,
  },
  {
    id: 5,
    title: "Conhecendo a Bíblia",
    type: "Lição",
    category: "Fundamentos",
    date: "12 Set",
    time: "18:10",
    duration: "22 min",
    xp: 50,
    completed: true,
  },
  {
    id: 6,
    title: "Flashcards bíblicos",
    type: "Revisão",
    category: "Revisão",
    date: "11 Set",
    time: "21:05",
    duration: "9 min",
    xp: 40,
    completed: true,
  },
  {
    id: 7,
    title: "Quem é Deus?",
    type: "Lição",
    category: "Deus",
    date: "10 Set",
    time: "20:32",
    duration: "16 min",
    xp: 60,
    completed: true,
  },
];

const filters = ["Todos", "Lições", "Quiz", "Bíblia", "Revisão"];

export default function StudyHistory() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const xp = Number(getStored("xp", 420));

  const filtered = useMemo(() => {
    return history.filter((item) => {
      const matchesFilter =
        filter === "Todos" ||
        (filter === "Lições" && item.type === "Lição") ||
        (filter === "Quiz" && item.type === "Quiz") ||
        (filter === "Bíblia" && item.type === "Bíblia") ||
        (filter === "Revisão" && item.type === "Revisão");

      const matchesSearch =
        !search ||
        `${item.title} ${item.category}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <main className="history-page">
      <section className="history-header">
        <div>
          <span className="eyebrow">Seu caminho</span>
          <h1>Histórico de estudos</h1>
          <p>Veja tudo o que você já estudou no Digle.</p>
        </div>

        <div className="history-total">
          <Zap size={18} />
          <strong>{xp} XP</strong>
          <span>total</span>
        </div>
      </section>

      <section className="history-stats">
        <article>
          <BookOpen size={19} />
          <strong>12</strong>
          <span>Lições</span>
        </article>
        <article>
          <Trophy size={19} />
          <strong>8</strong>
          <span>Quizzes</span>
        </article>
        <article>
          <Clock3 size={19} />
          <strong>4h 32m</strong>
          <span>Estudadas</span>
        </article>
        <article>
          <CalendarDays size={19} />
          <strong>7</strong>
          <span>Dias ativos</span>
        </article>
      </section>

      <section className="history-toolbar">
        <div className="history-search">
          <Search size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquisar no histórico..."
          />
        </div>

        <div className="history-filters">
          <Filter size={16} />
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
      </section>

      <section className="history-list">
        {filtered.length ? (
          filtered.map((item) => (
            <article className="history-item" key={item.id}>
              <div className="history-item-icon">
                {item.type === "Quiz" ? (
                  <Trophy size={19} />
                ) : item.type === "Bíblia" ? (
                  <BookOpen size={19} />
                ) : (
                  <CheckCircle2 size={19} />
                )}
              </div>

              <div className="history-item-main">
                <div className="history-item-top">
                  <div>
                    <h2>{item.title}</h2>
                    <span>
                      {item.type} · {item.category}
                    </span>
                  </div>
                  <strong>+{item.xp} XP</strong>
                </div>

                <div className="history-item-bottom">
                  <span>
                    <CalendarDays size={14} />
                    {item.date}, {item.time}
                  </span>
                  <span>
                    <Clock3 size={14} />
                    {item.duration}
                  </span>
                  <span className="completed-label">
                    <CheckCircle2 size={14} />
                    Concluído
                  </span>
                </div>
              </div>

              <button
                className="history-open"
                onClick={() => {
                  if (item.type === "Bíblia") {
                    navigate("/app/bible");
                  } else if (item.type === "Quiz") {
                    navigate("/app/quiz-play");
                  } else {
                    navigate("/app/lesson-reader");
                  }
                }}
                aria-label={`Abrir ${item.title}`}
              >
                <ChevronRight size={19} />
              </button>
            </article>
          ))
        ) : (
          <div className="history-empty">
            <Search size={30} />
            <h2>Nenhum estudo encontrado</h2>
            <p>Tente outro termo ou altere o filtro.</p>
          </div>
        )}
      </section>
    </main>
  );
}
