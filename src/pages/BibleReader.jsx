import { useMemo, useState } from "react";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Highlighter,
  BookOpen,
  X,
} from "lucide-react";

const books = [
  {
    name: "Genesis",
    chapters: [
      {
        number: 1,
        verses: [
          {
            number: 1,
            text: "In the beginning God created the heavens and the earth.",
          },
          {
            number: 2,
            text: "The earth was formless and empty, and darkness was over the surface of the deep.",
          },
          {
            number: 3,
            text: "And God said, Let there be light, and there was light.",
          },
          {
            number: 4,
            text: "God saw that the light was good, and he separated the light from the darkness.",
          },
          {
            number: 5,
            text: "God called the light day, and the darkness he called night.",
          },
        ],
      },
    ],
  },
  {
    name: "John",
    chapters: [
      {
        number: 1,
        verses: [
          {
            number: 1,
            text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
          },
          {
            number: 2,
            text: "He was with God in the beginning.",
          },
          {
            number: 3,
            text: "Through him all things were made; without him nothing was made that has been made.",
          },
          {
            number: 4,
            text: "In him was life, and that life was the light of all mankind.",
          },
          {
            number: 5,
            text: "The light shines in the darkness, and the darkness has not overcome it.",
          },
        ],
      },
    ],
  },
  {
    name: "Psalms",
    chapters: [
      {
        number: 23,
        verses: [
          {
            number: 1,
            text: "The Lord is my shepherd, I lack nothing.",
          },
          {
            number: 2,
            text: "He makes me lie down in green pastures, he leads me beside quiet waters.",
          },
          {
            number: 3,
            text: "He refreshes my soul. He guides me along the right paths for his name’s sake.",
          },
          {
            number: 4,
            text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.",
          },
        ],
      },
    ],
  },
];

export default function BibleReader() {
  const [bookIndex, setBookIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const book = books[bookIndex];
  const chapter = book.chapters[chapterIndex];

  const filteredVerses = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return chapter.verses;

    return chapter.verses.filter((verse) =>
      verse.text.toLowerCase().includes(query)
    );
  }, [chapter, search]);

  function toggleBookmark(verseNumber) {
    const key = `${book.name}-${chapter.number}-${verseNumber}`;

    setBookmarks((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }

  function toggleHighlight(verseNumber) {
    const key = `${book.name}-${chapter.number}-${verseNumber}`;

    setHighlights((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }

  function changeBook(direction) {
    const next = bookIndex + direction;

    if (next < 0 || next >= books.length) return;

    setBookIndex(next);
    setChapterIndex(0);
    setSelectedVerse(null);
    setSearch("");
  }

  function isBookmarked(verseNumber) {
    return bookmarks.includes(
      `${book.name}-${chapter.number}-${verseNumber}`
    );
  }

  function isHighlighted(verseNumber) {
    return highlights.includes(
      `${book.name}-${chapter.number}-${verseNumber}`
    );
  }

  return (
    <div className="page bible-reader-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">SCRIPTURE</span>
          <h1>Bible Reader</h1>
          <p>Read, reflect, and save the verses that matter to you.</p>
        </div>

        <button
          className="secondary-btn"
          onClick={() => setShowSearch((value) => !value)}
        >
          {showSearch ? <X size={18} /> : <Search size={18} />}
          Search
        </button>
      </div>

      {showSearch && (
        <div className="search-card">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search this chapter..."
          />
        </div>
      )}

      <div className="bible-toolbar">
        <button
          className="secondary-btn"
          onClick={() => changeBook(-1)}
          disabled={bookIndex === 0}
        >
          <ChevronLeft size={17} />
        </button>

        <div className="bible-location">
          <BookOpen size={18} />
          <strong>
            {book.name} {chapter.number}
          </strong>
        </div>

        <button
          className="secondary-btn"
          onClick={() => changeBook(1)}
          disabled={bookIndex === books.length - 1}
        >
          <ChevronRight size={17} />
        </button>
      </div>

      <div className="bible-book-selector">
        {books.map((item, index) => (
          <button
            key={item.name}
            className={index === bookIndex ? "active" : ""}
            onClick={() => {
              setBookIndex(index);
              setChapterIndex(0);
              setSelectedVerse(null);
              setSearch("");
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <article className="bible-content-card">
        <div className="bible-content-header">
          <div>
            <span className="eyebrow">HOLY SCRIPTURE</span>
            <h2>
              {book.name} {chapter.number}
            </h2>
          </div>

          <span className="bible-version">DIGLE READER</span>
        </div>

        <div className="bible-verses">
          {filteredVerses.length === 0 ? (
            <div className="empty-state">
              <Search size={32} />
              <h3>No verses found</h3>
              <p>Try another search term.</p>
            </div>
          ) : (
            filteredVerses.map((verse) => {
              const active = selectedVerse === verse.number;

              return (
                <div
                  key={verse.number}
                  className={`bible-verse ${
                    isHighlighted(verse.number) ? "highlighted" : ""
                  } ${active ? "selected" : ""}`}
                  onClick={() => setSelectedVerse(verse.number)}
                >
                  <span className="verse-number">{verse.number}</span>

                  <p>{verse.text}</p>

                  {active && (
                    <div className="verse-actions">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleBookmark(verse.number);
                        }}
                        title="Bookmark verse"
                      >
                        {isBookmarked(verse.number) ? (
                          <BookmarkCheck size={18} />
                        ) : (
                          <Bookmark size={18} />
                        )}
                      </button>

                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleHighlight(verse.number);
                        }}
                        title="Highlight verse"
                      >
                        <Highlighter size={18} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="bible-footer">
          <button
            className="secondary-btn"
            onClick={() => changeBook(-1)}
            disabled={bookIndex === 0}
          >
            <ChevronLeft size={17} />
            Previous
          </button>

          <span>
            {bookIndex + 1} / {books.length}
          </span>

          <button
            className="primary-btn"
            onClick={() => changeBook(1)}
            disabled={bookIndex === books.length - 1}
          >
            Next
            <ChevronRight size={17} />
          </button>
        </div>
      </article>
    </div>
  );
}
