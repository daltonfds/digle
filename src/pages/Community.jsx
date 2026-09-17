import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Send,
  Users,
} from "lucide-react";

const translations = {
  en: {
    back: "Back to dashboard",
    title: "Community",
    subtitle: "Share faith. Encourage others.",
    placeholder: "Share something encouraging...",
    publish: "Publish",
    likes: "likes",
    comments: "comments",
    welcome: "Welcome to the Digle community!",
    language: "PT",
  },
  pt: {
    back: "Voltar ao painel",
    title: "Comunidade",
    subtitle: "Partilha a fé. Encoraja outras pessoas.",
    placeholder: "Partilha algo encorajador...",
    publish: "Publicar",
    likes: "gostos",
    comments: "comentários",
    welcome: "Bem-vindo à comunidade Digle!",
    language: "EN",
  },
};

const initialPosts = [
  {
    id: 1,
    name: "Grace Walker",
    initials: "G",
    text: "God's grace is new every morning. Keep going!",
    likes: 24,
    comments: 5,
    liked: false,
  },
  {
    id: 2,
    name: "Daniel Smith",
    initials: "D",
    text: "Today I completed my seventh lesson. Stay consistent!",
    likes: 18,
    comments: 3,
    liked: false,
  },
];

export default function Community() {
  const [language, setLanguage] = useState("en");
  const [posts, setPosts] = useState(initialPosts);
  const [message, setMessage] = useState("");
  const t = translations[language];

  const publishPost = () => {
    if (!message.trim()) return;

    setPosts((current) => [
      {
        id: Date.now(),
        name: language === "en" ? "You" : "Tu",
        initials: "Y",
        text: message.trim(),
        likes: 0,
        comments: 0,
        liked: false,
      },
      ...current,
    ]);

    setMessage("");
  };

  const toggleLike = (id) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <main className="community-page">
      <div className="feature-topbar">
        <Link to="/app" className="feature-back">
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        <button
          className="language-switch"
          onClick={() => setLanguage(language === "en" ? "pt" : "en")}
        >
          {t.language}
        </button>
      </div>

      <header className="community-hero">
        <Users size={40} />
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      <section className="community-composer">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t.placeholder}
          maxLength={500}
        />

        <button onClick={publishPost} disabled={!message.trim()}>
          <Send size={17} />
          {t.publish}
        </button>
      </section>

      <div className="community-welcome">{t.welcome}</div>

      <section className="community-feed">
        {posts.map((post) => (
          <article className="community-post" key={post.id}>
            <div className="community-post-header">
              <div className="community-avatar">{post.initials}</div>
              <strong>{post.name}</strong>
            </div>

            <p>{post.text}</p>

            <div className="community-actions">
              <button
                className={post.liked ? "community-liked" : ""}
                onClick={() => toggleLike(post.id)}
              >
                <Heart size={18} fill={post.liked ? "currentColor" : "none"} />
                {post.likes} {t.likes}
              </button>

              <button>
                <MessageCircle size={18} />
                {post.comments} {t.comments}
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
