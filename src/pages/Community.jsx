import { useState } from "react";
import {
  Users,
  MessageCircle,
  Heart,
  Bookmark,
  Send,
  Trophy,
  Flame,
  Plus,
  Search,
  MoreHorizontal,
} from "lucide-react";

const initialPosts = [
  {
    id: 1,
    name: "Ana Martins",
    initials: "AM",
    time: "há 18 min",
    level: 29,
    text: "Hoje terminei a lição sobre fé. Uma coisa que ficou comigo foi entender que fé também significa continuar caminhando mesmo quando ainda não vemos o resultado.",
    likes: 34,
    comments: 7,
    liked: false,
  },
  {
    id: 2,
    name: "Lucas Silva",
    initials: "LS",
    time: "há 1 h",
    level: 26,
    text: "Completei minha sequência de 19 dias! O desafio diário realmente me ajudou a criar o hábito de estudar a Bíblia todos os dias.",
    likes: 51,
    comments: 12,
    liked: false,
  },
  {
    id: 3,
    name: "Maria Santos",
    initials: "MS",
    time: "há 2 h",
    level: 23,
    text: "Qual lição vocês recomendam para quem está começando a estudar a Bíblia agora?",
    likes: 18,
    comments: 9,
    liked: false,
  },
];

const members = [
  { name: "Ana Martins", initials: "AM", level: 29, streak: 24 },
  { name: "Lucas Silva", initials: "LS", level: 26, streak: 19 },
  { name: "Maria Santos", initials: "MS", level: 23, streak: 17 },
  { name: "João Costa", initials: "JC", level: 20, streak: 14 },
  { name: "Sofia Mendes", initials: "SM", level: 16, streak: 11 },
];

export default function Community() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("recent");

  function publish() {
    if (!text.trim()) return;

    const post = {
      id: Date.now(),
      name: "Você",
      initials: "EU",
      time: "agora",
      level: 5,
      text: text.trim(),
      likes: 0,
      comments: 0,
      liked: false,
    };

    setPosts((current) => [post, ...current]);
    setText("");
  }

  function toggleLike(id) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post
      )
    );
  }

  const filteredPosts = posts.filter((post) =>
    `${post.name} ${post.text}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="community-page">
      <section className="community-header">
        <div>
          <span className="community-eyebrow">
            <Users size={15} />
            COMUNIDADE DIGLE
          </span>

          <h1>Aprenda junto.</h1>

          <p>
            Compartilhe descobertas, faça perguntas e cresça com
            outros estudantes da Palavra.
          </p>
        </div>

        <div className="community-member-count">
          <strong>1.248</strong>
          <span>estudantes ativos</span>
        </div>
      </section>

      <section className="community-layout">
        <div className="community-feed">
          <div className="community-composer">
            <div className="community-avatar">EU</div>

            <div className="community-composer-body">
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Compartilhe algo que você aprendeu..."
                rows={3}
              />

              <div className="community-composer-footer">
                <span>{text.length}/500</span>

                <button
                  onClick={publish}
                  disabled={!text.trim()}
                >
                  <Send size={15} />
                  Publicar
                </button>
              </div>
            </div>
          </div>

          <div className="community-toolbar">
            <div className="community-filters">
              <button
                className={activeFilter === "recent" ? "active" : ""}
                onClick={() => setActiveFilter("recent")}
              >
                Mais recentes
              </button>

              <button
                className={activeFilter === "popular" ? "active" : ""}
                onClick={() => setActiveFilter("popular")}
              >
                Populares
              </button>
            </div>

            <div className="community-search">
              <Search size={14} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Pesquisar"
              />
            </div>
          </div>

          <div className="community-posts">
            {filteredPosts.map((post) => (
              <article className="community-post" key={post.id}>
                <div className="community-post-header">
                  <div className="community-avatar">
                    {post.initials}
                  </div>

                  <div className="community-post-author">
                    <strong>{post.name}</strong>
                    <span>
                      Nível {post.level} · {post.time}
                    </span>
                  </div>

                  <button className="community-more">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <p className="community-post-text">{post.text}</p>

                <div className="community-post-actions">
                  <button
                    className={post.liked ? "liked" : ""}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart
                      size={16}
                      fill={post.liked ? "currentColor" : "none"}
                    />
                    {post.likes}
                  </button>

                  <button>
                    <MessageCircle size={16} />
                    {post.comments}
                  </button>

                  <button className="save-post">
                    <Bookmark size={16} />
                  </button>
                </div>
              </article>
            ))}

            {!filteredPosts.length && (
              <div className="community-empty">
                <Search size={24} />
                <strong>Nenhuma publicação encontrada</strong>
                <span>Tente outra pesquisa.</span>
              </div>
            )}
          </div>
        </div>

        <aside className="community-sidebar">
          <article className="community-challenge">
            <div className="community-challenge-icon">
              <Trophy size={20} />
            </div>

            <span>DESAFIO DA COMUNIDADE</span>
            <h2>7 dias de estudo</h2>

            <p>
              Estude durante 7 dias seguidos e faça parte do
              desafio coletivo desta semana.
            </p>

            <div className="community-challenge-progress">
              <div style={{ width: "72%" }} />
            </div>

            <div className="community-challenge-meta">
              <strong>892 pessoas</strong>
              <span>participando</span>
            </div>

            <button onClick={() => (navigate("/app/streak"))}>
              Participar
            </button>
          </article>

          <article className="community-members">
            <div className="community-sidebar-heading">
              <div>
                <span>COMUNIDADE</span>
                <h2>Estudantes ativos</h2>
              </div>

              <Users size={17} />
            </div>

            <div className="community-member-list">
              {members.map((member) => (
                <div className="community-member" key={member.name}>
                  <div className="community-avatar small">
                    {member.initials}
                  </div>

                  <div>
                    <strong>{member.name}</strong>
                    <span>Nível {member.level}</span>
                  </div>

                  <div className="community-member-streak">
                    <Flame size={12} />
                    {member.streak}
                  </div>
                </div>
              ))}
            </div>

            <button className="community-see-all">
              Ver comunidade
              <Plus size={14} />
            </button>
          </article>

          <article className="community-rules">
            <strong>Um espaço para crescer</strong>
            <p>
              Respeite outras pessoas, compartilhe conhecimento
              e mantenha as conversas construtivas.
            </p>
          </article>
        </aside>
      </section>
    </main>
  );
}
