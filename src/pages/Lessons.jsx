import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  Play,
  CheckCircle,
  Lock,
  Clock,
  Filter,
  ChevronRight,
} from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Conhecendo a Bíblia",
    description: "Descubra como a Bíblia está organizada e por que ela é importante.",
    category: "Fundamentos",
    duration: "8 min",
    level: "Iniciante",
    xp: 50,
    completed: true,
  },
  {
    id: 2,
    title: "Quem é Deus?",
    description: "Conheça os atributos de Deus e descubra o que a Bíblia ensina sobre Ele.",
    category: "Deus",
    duration: "10 min",
    level: "Iniciante",
    xp: 60,
    completed: true,
  },
  {
    id: 3,
    title: "O poder da oração",
    description: "Aprenda por que oramos e como desenvolver uma vida de oração.",
    category: "Oração",
    duration: "12 min",
    level: "Iniciante",
    xp: 70,
    completed: true,
  },
  {
    id: 4,
    title: "Vivendo pela fé",
    description: "Entenda o que significa confiar em Deus mesmo quando não vemos o resultado.",
    category: "Fé",
    duration: "14 min",
    level: "Intermediário",
    xp: 80,
    completed: false,
  },
  {
    id: 5,
    title: "O amor de Cristo",
    description: "Explore o significado do amor de Jesus e como ele transforma nossa vida.",
    category: "Evangelho",
    duration: "11 min",
    level: "Intermediário",
    xp: 90,
    completed: false,
  },
  {
    id: 6,
    title: "Sabedoria para viver",
    description: "Descubra princípios bíblicos para tomar decisões melhores.",
    category: "Sabedoria",
    duration: "15 min",
    level: "Intermediário",
    xp: 100,
    completed: false,
  },
  {
    id: 7,
    title: "O fruto do Espírito",
    description: "Conheça as características que devem crescer na vida de quem segue Cristo.",
    category: "Vida cristã",
    duration: "13 min",
    level: "Intermediário",
    xp: 100,
    completed: false,
  },
  {
    id: 8,
    title: "Perdão",
    description: "Aprenda o que a Bíblia ensina sobre perdoar e receber perdão.",
    category: "Vida cristã",
    duration: "9 min",
    level: "Intermediário",
    xp: 80,
    completed: false,
  },
  {
    id: 9,
    title: "A vida de Jesus",
    description: "Uma visão geral da vida, ministério, morte e ressurreição de Jesus.",
    category: "Evangelho",
    duration: "18 min",
    level: "Avançado",
    xp: 120,
    completed: false,
  },
];

const categories = [
  "Todas",
  "Fundamentos",
  "Deus",
  "Oração",
  "Fé",
  "Evangelho",
  "Sabedoria",
  "Vida cristã",
];

export default function Lessons() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();

    return lessons.filter((lesson) => {
      const matchesCategory =
        category === "Todas" || lesson.category === category;

      const matchesSearch =
        !query ||
        lesson.title.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query) ||
        lesson.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="lessons-page">
      <header className="lessons-header">
        <div>
          <span className="eyebrow">APRENDER</span>
          <h1>Explore a Bíblia.</h1>
          <p>
            Lições simples, curtas e envolventes para você aprender um passo
            de cada vez.
          </p>
        </div>

        <div className="lessons-total">
          <BookOpen size={18} />
          <span>{lessons.length} lições</span>
        </div>
      </header>

      <section className="lessons-toolbar">
        <div className="lesson-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquisar uma lição..."
            type="search"
          />
        </div>

        <div className="lesson-filter-label">
          <Filter size={15} />
          <span>Categoria</span>
        </div>
      </section>

      <div className="lesson-categories">
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

      <section className="lessons-results">
        <div className="lessons-results-heading">
          <div>
            <span className="eyebrow">LIÇÕES</span>
            <h2>
              {category === "Todas" ? "Todas as lições" : category}
            </h2>
          </div>

          <span>{filteredLessons.length} resultados</span>
        </div>

        {filteredLessons.length > 0 ? (
          <div className="lessons-grid">
            {filteredLessons.map((lesson) => (
              <article
                className={`lesson-card ${
                  lesson.completed ? "completed" : ""
                }`}
                key={lesson.id}
              >
                <div className="lesson-card-top">
                  <div className="lesson-card-icon">
                    {lesson.completed ? (
                      <CheckCircle size={22} />
                    ) : (
                      <BookOpen size={22} />
                    )}
                  </div>

                  {lesson.completed && (
                    <span className="lesson-completed">
                      <CheckCircle size={13} />
                      Concluída
                    </span>
                  )}
                </div>

                <span className="lesson-category">{lesson.category}</span>

                <h3>{lesson.title}</h3>

                <p>{lesson.description}</p>

                <div className="lesson-meta">
                  <span>
                    <Clock size={14} />
                    {lesson.duration}
                  </span>

                  <span>{lesson.level}</span>

                  <span>{lesson.xp} XP</span>
                </div>

                <button className="lesson-open-button">
                  {lesson.completed ? "Revisar lição" : "Começar lição"}
                  {lesson.completed ? (
                    <ChevronRight size={16} />
                  ) : (
                    <Play size={15} fill="currentColor" />
                  )}
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="lessons-empty">
            <Search size={28} />
            <h3>Nenhuma lição encontrada</h3>
            <p>Tente pesquisar outro termo ou escolher outra categoria.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("Todas");
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
