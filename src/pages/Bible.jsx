import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  CheckCircle,
  X,
} from "lucide-react";

const books = [
  { name: "Gênesis", testament: "Antigo Testamento", chapters: 50 },
  { name: "Êxodo", testament: "Antigo Testamento", chapters: 40 },
  { name: "Levítico", testament: "Antigo Testamento", chapters: 27 },
  { name: "Números", testament: "Antigo Testamento", chapters: 36 },
  { name: "Deuteronômio", testament: "Antigo Testamento", chapters: 34 },
  { name: "Josué", testament: "Antigo Testamento", chapters: 24 },
  { name: "Juízes", testament: "Antigo Testamento", chapters: 21 },
  { name: "Rute", testament: "Antigo Testamento", chapters: 4 },
  { name: "Salmos", testament: "Antigo Testamento", chapters: 150 },
  { name: "Provérbios", testament: "Antigo Testamento", chapters: 31 },
  { name: "Eclesiastes", testament: "Antigo Testamento", chapters: 12 },
  { name: "Isaías", testament: "Antigo Testamento", chapters: 66 },
  { name: "Jeremias", testament: "Antigo Testamento", chapters: 52 },
  { name: "Mateus", testament: "Novo Testamento", chapters: 28 },
  { name: "Marcos", testament: "Novo Testamento", chapters: 16 },
  { name: "Lucas", testament: "Novo Testamento", chapters: 24 },
  { name: "João", testament: "Novo Testamento", chapters: 21 },
  { name: "Atos", testament: "Novo Testamento", chapters: 28 },
  { name: "Romanos", testament: "Novo Testamento", chapters: 16 },
  { name: "1 Coríntios", testament: "Novo Testamento", chapters: 16 },
  { name: "2 Coríntios", testament: "Novo Testamento", chapters: 13 },
  { name: "Gálatas", testament: "Novo Testamento", chapters: 6 },
  { name: "Efésios", testament: "Novo Testamento", chapters: 6 },
  { name: "Filipenses", testament: "Novo Testamento", chapters: 4 },
  { name: "Apocalipse", testament: "Novo Testamento", chapters: 22 },
];

const sampleVerses = [
  {
    number: 1,
    text: "No princípio, criou Deus os céus e a terra.",
  },
  {
    number: 2,
    text: "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava sobre as águas.",
  },
  {
    number: 3,
    text: "Disse Deus: Haja luz; e houve luz.",
  },
  {
    number: 4,
    text: "E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.",
  },
  {
    number: 5,
    text: "E Deus chamou à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia.",
  },
];

export default function Bible() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapter, setChapter] = useState(1);
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState([]);

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return books;

    return books.filter((book) =>
      book.name.toLowerCase().includes(query)
    );
  }, [search]);

  const openBook = (book) => {
    setSelectedBook(book);
    setChapter(1);
  };

  const closeBook = () => {
    setSelectedBook(null);
  };

  const toggleBookmark = (verse) => {
    setBookmarked((current) =>
      current.includes(verse)
        ? current.filter((item) => item !== verse)
        : [...current, verse]
    );
  };

  if (selectedBook) {
    return (
      <div className="bible-page">
        <header className="bible-reader-header">
          <button className="bible-back-button" onClick={closeBook}>
            <ChevronLeft size={17} />
            Todos os livros
          </button>

          <div className="bible-reference">
            <BookOpen size={16} />
            <strong>
              {selectedBook.name} {chapter}
            </strong>
          </div>

          <span className="bible-version">BÍBLIA</span>
        </header>

        <div className="bible-reader-layout">
          <aside className="chapter-sidebar">
            <span className="eyebrow">CAPÍTULOS</span>

            <div className="chapter-grid">
              {Array.from(
                { length: selectedBook.chapters },
                (_, index) => index + 1
              ).map((item) => (
                <button
                  key={item}
                  className={chapter === item ? "active" : ""}
                  onClick={() => setChapter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>

          <main className="bible-text">
            <div className="bible-text-heading">
              <div>
                <span className="eyebrow">{selectedBook.testament}</span>
                <h1>
                  {selectedBook.name} {chapter}
                </h1>
              </div>

              <button className="bible-bookmark-all">
                <Bookmark size={17} />
              </button>
            </div>

            <div className="verse-list">
              {sampleVerses.map((verse) => {
                const key = `${selectedBook.name}-${chapter}-${verse.number}`;
                const isSaved = bookmarked.includes(key);

                return (
                  <div
                    className={`bible-verse ${isSaved ? "saved" : ""}`}
                    key={verse.number}
                  >
                    <span className="verse-number">{verse.number}</span>

                    <p>{verse.text}</p>

                    <button
                      className="verse-bookmark"
                      onClick={() => toggleBookmark(key)}
                      aria-label="Guardar versículo"
                    >
                      {isSaved ? (
                        <CheckCircle size={16} />
                      ) : (
                        <Bookmark size={16} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bible-reader-navigation">
              <button
                disabled={chapter === 1}
                onClick={() => setChapter((value) => value - 1)}
              >
                <ChevronLeft size={16} />
                Capítulo anterior
              </button>

              <button
                disabled={chapter === selectedBook.chapters}
                onClick={() => setChapter((value) => value + 1)}
              >
                Próximo capítulo
                <ChevronRight size={16} />
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bible-page">
      <header className="bible-library-header">
        <div>
          <span className="eyebrow">PALAVRA DE DEUS</span>
          <h1>Leia a Bíblia.</h1>
          <p>
            Explore os livros da Bíblia, escolha um capítulo e comece a ler.
          </p>
        </div>

        <div className="bible-library-icon">
          <BookOpen size={24} />
        </div>
      </header>

      <div className="bible-search">
        <Search size={18} />
        <input
          type="search"
          placeholder="Pesquisar livro..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {search && (
          <button onClick={() => setSearch("")}>
            <X size={15} />
          </button>
        )}
      </div>

      <section className="bible-books-section">
        <div className="bible-section-heading">
          <div>
            <span className="eyebrow">BÍBLIA</span>
            <h2>Livros</h2>
          </div>

          <span>{filteredBooks.length} livros</span>
        </div>

        <div className="bible-books-grid">
          {filteredBooks.map((book, index) => (
            <button
              className="bible-book-card"
              key={book.name}
              onClick={() => openBook(book)}
            >
              <div className="book-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="book-info">
                <span>{book.testament}</span>
                <h3>{book.name}</h3>
                <p>{book.chapters} capítulos</p>
              </div>

              <ChevronRight size={17} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
