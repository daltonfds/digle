import React, { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

const categories = [
  {
    id: "getting-started",
    title: "Começando no Digle",
    description: "Tudo para começar sua jornada de aprendizagem.",
    icon: Sparkles,
  },
  {
    id: "learning",
    title: "Aprendizagem",
    description: "Lições, trilhas, quizzes e progresso.",
    icon: BookOpen,
  },
  {
    id: "gamification",
    title: "XP e conquistas",
    description: "Entenda níveis, XP, sequência e certificados.",
    icon: Trophy,
  },
  {
    id: "account",
    title: "Conta e segurança",
    description: "Perfil, privacidade e configurações.",
    icon: ShieldCheck,
  },
];

const articles = [
  {
    category: "getting-started",
    question: "Como começar minha jornada?",
    answer:
      "Escolha uma trilha ou lição na área de aprendizagem. Você pode estudar no seu ritmo, concluir atividades e acompanhar sua evolução no painel.",
  },
  {
    category: "getting-started",
    question: "Como funciona o Digle?",
    answer:
      "O Digle transforma o estudo da Bíblia em uma experiência estruturada com lições, leitura bíblica, quizzes, flashcards, desafios, XP, sequência de estudos e conquistas.",
  },
  {
    category: "learning",
    question: "Como uma lição é concluída?",
    answer:
      "Leia todas as etapas da lição e finalize a atividade. Quando a lição for marcada como concluída, seu progresso poderá ser atualizado.",
  },
  {
    category: "learning",
    question: "O que são as trilhas?",
    answer:
      "Trilhas organizam várias lições em uma sequência de aprendizagem. Cada trilha possui um objetivo, progresso e conteúdo próprio.",
  },
  {
    category: "learning",
    question: "Posso estudar a Bíblia diretamente?",
    answer:
      "Sim. A área Bíblia permite navegar pelos livros e capítulos disponíveis e guardar versículos para consultar posteriormente.",
  },
  {
    category: "gamification",
    question: "Como ganho XP?",
    answer:
      "XP pode ser obtido ao concluir atividades de aprendizagem, desafios, quizzes e outras experiências da plataforma.",
  },
  {
    category: "gamification",
    question: "O que é a sequência de estudos?",
    answer:
      "A sequência representa a constância dos seus estudos. Estudar regularmente ajuda você a manter sua jornada ativa.",
  },
  {
    category: "gamification",
    question: "Como desbloqueio certificados?",
    answer:
      "Ao concluir uma trilha que oferece certificado, a conquista fica disponível na área de certificados.",
  },
  {
    category: "account",
    question: "Como altero minhas configurações?",
    answer:
      "Abra Configurações para ajustar preferências de estudo, notificações, áudio e outras opções disponíveis na sua conta.",
  },
  {
    category: "account",
    question: "Meus dados ficam seguros?",
    answer:
      "O Digle deve utilizar autenticação e regras de acesso para proteger os dados da conta. Nunca compartilhe sua senha ou códigos de acesso.",
  },
];

export default function HelpCenter() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const categoryMatch =
        category === "all" || article.category === category;

      const searchMatch =
        !search ||
        `${article.question} ${article.answer}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <main className="help-page">
      <section className="help-hero">
        <span className="eyebrow">Central de ajuda</span>
        <h1>Como podemos ajudar?</h1>
        <p>Encontre respostas e aprenda a aproveitar melhor o Digle.</p>

        <div className="help-search">
          <Search size={19} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquisar uma dúvida..."
          />
        </div>
      </section>

      <section className="help-categories">
        {categories.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={category === item.id ? "active" : ""}
              onClick={() =>
                setCategory(category === item.id ? "all" : item.id)
              }
            >
              <span className="help-category-icon">
                <Icon size={20} />
              </span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              <ChevronRight size={17} />
            </button>
          );
        })}
      </section>

      <section className="help-content">
        <div className="help-content-heading">
          <div>
            <h2>Perguntas frequentes</h2>
            <span>{filtered.length} respostas encontradas</span>
          </div>

          {category !== "all" && (
            <button onClick={() => setCategory("all")}>Ver todas</button>
          )}
        </div>

        <div className="help-articles">
          {filtered.map((article, index) => {
            const key = `${article.category}-${index}`;
            const isOpen = open === key;

            return (
              <article className={`help-article ${isOpen ? "open" : ""}`} key={key}>
                <button
                  onClick={() => setOpen(isOpen ? null : key)}
                  aria-expanded={isOpen}
                >
                  <span>
                    <HelpCircle size={18} />
                    {article.question}
                  </span>
                  <ChevronDown size={18} />
                </button>

                {isOpen && (
                  <div className="help-answer">
                    <p>{article.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {!filtered.length && (
          <div className="help-empty">
            <Search size={30} />
            <h3>Nenhuma resposta encontrada</h3>
            <p>Tente pesquisar usando outras palavras.</p>
          </div>
        )}
      </section>

      <section className="help-contact">
        <div className="help-contact-icon">
          <MessageCircle size={23} />
        </div>
        <div>
          <strong>Ainda precisa de ajuda?</strong>
          <p>Entre em contacto com a equipa do Digle.</p>
        </div>
        <button
          onClick={() => {
            navigate("/app/contact");
          }}
        >
          Contactar suporte
          <ChevronRight size={17} />
        </button>
      </section>
    </main>
  );
}
