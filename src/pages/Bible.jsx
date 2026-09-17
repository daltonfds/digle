import { useState } from "react";
import { BookOpen, Search, Bookmark, Globe, ChevronRight } from "lucide-react";

const books = [
  { name: "Genesis", pt: "Génesis", chapters: 50, testament: "old" },
  { name: "Exodus", pt: "Êxodo", chapters: 40, testament: "old" },
  { name: "Psalms", pt: "Salmos", chapters: 150, testament: "old" },
  { name: "Proverbs", pt: "Provérbios", chapters: 31, testament: "old" },
  { name: "Matthew", pt: "Mateus", chapters: 28, testament: "new" },
  { name: "Mark", pt: "Marcos", chapters: 16, testament: "new" },
  { name: "Luke", pt: "Lucas", chapters: 24, testament: "new" },
  { name: "John", pt: "João", chapters: 21, testament: "new" },
  { name: "Romans", pt: "Romanos", chapters: 16, testament: "new" },
  { name: "Revelation", pt: "Apocalipse", chapters: 22, testament: "new" },
];

const copy = {
  en: {
    title: "Explore the Bible",
    subtitle: "Read, reflect, and discover God's Word.",
    search: "Search books...",
    old: "Old Testament",
    new: "New Testament",
    chapters: "chapters",
    featured: "Verse of the day",
    verse: "Your word is a lamp for my feet, a light on my path.",
    reference: "Psalm 119:105",
    save: "Save verse",
    saved: "Saved",
  },
  pt: {
    title: "Explore a Bíblia",
    subtitle: "Leia, reflita e descubra a Palavra de Deus.",
    search: "Pesquisar livros...",
    old: "Antigo Testamento",
    new: "Novo Testamento",
    chapters: "capítulos",
    featured: "Versículo do dia",
    verse: "A tua palavra é lâmpada para os meus pés e luz para o meu caminho.",
    reference: "Salmos 119:105",
    save: "Guardar versículo",
    saved: "Guardado",
  },
};

export default function Bible() {
  const [language, setLanguage] = useState("en");
  const [query, setQuery] = useState("");
  const [testament, setTestament] = useState("all");
  const [saved, setSaved] = useState(false);

  const t = copy[language];

  const filteredBooks = books.filter((book) => {
    const title = language === "en" ? book.name : book.pt;
    const matchesQuery = title.toLowerCase().includes(query.toLowerCase());
    const matchesTestament =
      testament === "all" || book.testament === testament;

    return matchesQuery && matchesTestament;
  });

  return (
    <main className="bible-page">
      <header className="bible-header">
        <div>
          <div className="bible-brand">
            digle<span>.</span>
          </div>
          <p>{t.subtitle}</p>
        </div>

        <button
          className="bible-language"
          onClick={() => setLanguage(language === "en" ? "pt" : "en")}
        >
          <Globe size={17} />
          {language === "en" ? "PT" : "EN"}
        </button>
      </header>

      <section className="bible-hero">
        <div>
          <span>BIBLE LIBRARY</span>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <BookOpen size={100} />
      </section>

      <section className="bible-featured">
        <div className="bible-featured-top">
          <span>{t.featured}</span>
          <BookOpen size={20} />
        </div>

        <blockquote>“{t.verse}”</blockquote>
        <strong>{t.reference}</strong>

        <button
          className={saved ? "bible-save saved" : "bible-save"}
          onClick={() => setSaved(!saved)}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
          {saved ? t.saved : t.save}
        </button>
      </section>

      <div className="bible-search">
        <Search size={19} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.search}
        />
      </div>

      <div className="bible-filters">
        <button
          className={testament === "all" ? "active" : ""}
          onClick={() => setTestament("all")}
        >
          All
        </button>
        <button
          className={testament === "old" ? "active" : ""}
          onClick={() => setTestament("old")}
        >
          {t.old}
        </button>
        <button
          className={testament === "new" ? "active" : ""}
          onClick={() => setTestament("new")}
        >
          {t.new}
        </button>
      </div>

      <section className="bible-books">
        {["old", "new"].map((section) => {
          const sectionBooks = filteredBooks.filter(
            (book) => book.testament === section
          );

          if (!sectionBooks.length) return null;

          return (
            <div key={section} className="bible-book-section">
              <h2>{section === "old" ? t.old : t.new}</h2>

              <div className="bible-book-grid">
                {sectionBooks.map((book) => (
                  <button className="bible-book-card" key={book.name}>
                    <div className="bible-book-icon">
                      <BookOpen size={20} />
                    </div>

                    <div>
                      <h3>{language === "en" ? book.name : book.pt}</h3>
                      <p>
                        {book.chapters} {t.chapters}
                      </p>
                    </div>

                    <ChevronRight size={18} />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
