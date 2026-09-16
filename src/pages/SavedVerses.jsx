import { useMemo, useState } from "react";
import {
  Bookmark,
  Search,
  Trash2,
  Copy,
  BookOpen,
  ArrowLeft,
  Check,
} from "lucide-react";
import { removeVerse, getStored } from "../lib/digleStorage";

const defaultVerses = [
  {
    id: "salmos-23-1",
    reference: "Salmos 23:1",
    text: "O Senhor é o meu pastor; nada me faltará.",
    book: "Salmos",
  },
  {
    id: "filipenses-4-13",
    reference: "Filipenses 4:13",
    text: "Tudo posso naquele que me fortalece.",
    book: "Filipenses",
  },
  {
    id: "salmos-90-12",
    reference: "Salmos 90:12",
    text: "Ensina-nos a contar os nossos dias para que alcancemos corações sábios.",
    book: "Salmos",
  },
];

export default function SavedVerses() {
  const navigate = useNavigate();
  const [verses, setVerses] = useState(() =>
    getStored("savedVerses", defaultVerses)
  );
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return verses;

    return verses.filter(
      (verse) =>
        verse.reference.toLowerCase().includes(query) ||
        verse.text.toLowerCase().includes(query) ||
        verse.book.toLowerCase().includes(query)
    );
  }, [verses, search]);

  function handleRemove(id) {
    removeVerse(id);

    setVerses((current) => current.filter((verse) => verse.id !== id));
  }

  async function handleCopy(verse) {
    try {
      await navigator.clipboard.writeText(
        `"${verse.text}" — ${verse.reference}`
      );

      setCopied(verse.id);

      setTimeout(() => {
        setCopied(null);
      }, 1800);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="saved-verses-page">
      <div className="saved-verses-header">
        <div>
          <div className="page-eyebrow">
            <Bookmark size={15} />
            Minha biblioteca
          </div>

          <h1>Versículos salvos</h1>

          <p>
            Guarde os versículos que deseja revisitar durante sua jornada.
          </p>
        </div>

        <div className="saved-verses-count">
          <Bookmark size={18} />
          <strong>{verses.length}</strong>
          <span>salvos</span>
        </div>
      </div>

      <div className="saved-verses-search">
        <Search size={19} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Pesquisar versículo..."
        />
      </div>

      {filtered.length > 0 ? (
        <div className="saved-verses-grid">
          {filtered.map((verse) => (
            <article className="saved-verse-card" key={verse.id}>
              <div className="saved-verse-card-top">
                <span className="saved-verse-book">
                  <BookOpen size={15} />
                  {verse.book}
                </span>

                <button
                  className="saved-verse-delete"
                  onClick={() => handleRemove(verse.id)}
                  aria-label="Remover versículo"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="saved-verse-content">
                <div className="saved-verse-mark">“</div>

                <p>{verse.text}</p>

                <strong>{verse.reference}</strong>
              </div>

              <div className="saved-verse-actions">
                <button onClick={() => handleCopy(verse)}>
                  {copied === verse.id ? (
                    <>
                      <Check size={16} />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copiar
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    navigate(`/app/bible?book=${encodeURIComponent(verse.book)}`)
                  }
                >
                  <BookOpen size={16} />
                  Ler na Bíblia
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="saved-verses-empty">
          <div className="saved-verses-empty-icon">
            <Bookmark size={30} />
          </div>

          <h2>Nenhum versículo encontrado</h2>

          <p>
            {search
              ? "Tente pesquisar por outro livro, referência ou palavra."
              : "Os versículos que você salvar aparecerão aqui."}
          </p>

          {search && (
            <button onClick={() => setSearch("")}>
              <ArrowLeft size={17} />
              Limpar pesquisa
            </button>
          )}
        </div>
      )}
    </div>
  );
}
