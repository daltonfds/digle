import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Flame,
  HelpCircle,
  History,
  Library,
  MessageCircle,
  NotebookPen,
  PlayCircle,
  ScrollText,
  Settings,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";

const sections = [
  {
    title: "Aprender",
    items: [
      ["Lições", "/app/lessons", BookOpen],
      ["Trilhas", "/app/trails", Library],
      ["Quizzes", "/app/quiz-hub", Trophy],
      ["Flashcards", "/app/flashcards", ScrollText],
      ["Desafio diário", "/app/daily-challenge", Sparkles],
    ],
  },
  {
    title: "Estudar",
    items: [
      ["Bíblia", "/app/bible", BookOpen],
      ["Versículo do dia", "/app/verse-of-day", NotebookPen],
      ["Áudios", "/app/audio-studies", PlayCircle],
      ["Notas", "/app/notes", NotebookPen],
      ["Versículos salvos", "/app/saved-verses", ScrollText],
      ["Planejador", "/app/study-planner", CalendarDays],
    ],
  },
  {
    title: "Minha jornada",
    items: [
      ["Progresso", "/app/progress", BarChart3],
      ["Estatísticas", "/app/study-statistics", BarChart3],
      ["Histórico", "/app/study-history", History],
      ["Sequência", "/app/streak", Flame],
      ["Metas", "/app/goals", Target],
      ["Conquistas", "/app/achievements", Trophy],
      ["Certificados", "/app/certificates", Award],
      ["Ranking", "/app/leaderboard", Trophy],
    ],
  },
  {
    title: "Comunidade",
    items: [
      ["Comunidade", "/app/community", MessageCircle],
    ],
  },
  {
    title: "Conta",
    items: [
      ["Perfil", "/app/profile", UserRound],
      ["Configurações", "/app/settings", Settings],
      ["Ajuda", "/app/help", HelpCircle],
    ],
  },
];

export default function DigleCommandCenter() {
  const navigate = useNavigate();

  return (
    <section className="digle-command-center">
      <div className="command-center-header">
        <div>
          <span className="eyebrow">Centro de aprendizagem</span>
          <h2>Continue sua jornada</h2>
          <p>Todo o Digle organizado em um só lugar.</p>
        </div>

        <div className="command-xp">
          <Zap size={16} />
          <span>Explorar</span>
        </div>
      </div>

      <div className="command-groups">
        {sections.map((section) => (
          <div className="command-group" key={section.title}>
            <h3>{section.title}</h3>

            <div className="command-items">
              {section.items.map(([label, path, Icon]) => (
                <button
                  key={path}
                  type="button"
                  onClick={() => navigate(path)}
                >
                  <span className="command-item-icon">
                    <Icon size={17} />
                  </span>

                  <span>{label}</span>

                  <ChevronRight size={15} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
