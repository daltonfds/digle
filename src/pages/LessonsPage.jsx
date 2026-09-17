import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Lock,
  Play,
  CheckCircle,
  Star,
  Globe,
  ChevronRight,
} from "lucide-react";

const translations = {
  en: {
    title: "Your learning journey",
    subtitle: "Grow your faith, one lesson at a time.",
    paths: "Learning paths",
    all: "All lessons",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    completed: "completed",
    lessons: "lessons",
    start: "Start learning",
    continue: "Continue",
    locked: "Locked",
    finished: "Completed",
    xp: "XP",
    free: "Free",
  },
  pt: {
    title: "A sua jornada de aprendizagem",
    subtitle: "Fortaleça a sua fé, uma lição de cada vez.",
    paths: "Caminhos de aprendizagem",
    all: "Todas as lições",
    beginner: "Iniciante",
    intermediate: "Intermédio",
    advanced: "Avançado",
    completed: "concluído",
    lessons: "lições",
    start: "Começar a aprender",
    continue: "Continuar",
    locked: "Bloqueado",
    finished: "Concluído",
    xp: "XP",
    free: "Grátis",
  },
};

const courses = [
  {
    id: 1,
    title: "The Life of Jesus",
    titlePt: "A Vida de Jesus",
    description: "Discover the life, miracles and teachings of Jesus.",
    descriptionPt: "Descubra a vida, os milagres e os ensinamentos de Jesus.",
    level: "beginner",
    icon: "✝️",
    color: "purple",
    progress: 35,
    total: 12,
    completed: 4,
  },
  {
    id: 2,
    title: "Foundations of Faith",
    titlePt: "Fundamentos da Fé",
    description: "Understand the foundations of Christian faith.",
    descriptionPt: "Compreenda os fundamentos da fé cristã.",
    level: "beginner",
    icon: "📖",
    color: "blue",
    progress: 60,
    total: 10,
    completed: 6,
  },
  {
    id: 3,
    title: "Prayer and Spiritual Growth",
    titlePt: "Oração e Crescimento Espiritual",
    description: "Develop a deeper and more consistent prayer life.",
    descriptionPt: "Desenvolva uma vida de oração mais profunda e consistente.",
    level: "intermediate",
    icon: "🙏",
    color: "green",
    progress: 20,
    total: 15,
    completed: 3,
  },
  {
    id: 4,
    title: "Wisdom of Proverbs",
    titlePt: "Sabedoria dos Provérbios",
    description: "Discover practical wisdom for everyday decisions.",
    descriptionPt: "Descubra sabedoria prática para as decisões diárias.",
    level: "intermediate",
    icon: "🌿",
    color: "orange",
    progress: 0,
    total: 14,
    completed: 0,
  },
  {
    id: 5,
    title: "Understanding the Bible",
    titlePt: "Compreender a Bíblia",
    description: "Learn how to read and understand Scripture.",
    descriptionPt: "Aprenda a ler e compreender as Escrituras.",
    level: "advanced",
    icon: "📚",
    color: "red",
    progress: 0,
    total: 18,
    completed: 0,
  },
  {
    id: 6,
    title: "Christian Character",
    titlePt: "Carácter Cristão",
    description: "Explore love, patience, humility and integrity.",
    descriptionPt: "Explore o amor, a paciência, a humildade e a integridade.",
    level: "advanced",
    icon: "💛",
    color: "yellow",
    progress: 0,
    total: 16,
    completed: 0,
  },
];

const lessons = [
  {
    id: 1,
    title: "Who is Jesus?",
    titlePt: "Quem é Jesus?",
    course: "The Life of Jesus",
    coursePt: "A Vida de Jesus",
    duration: "5 min",
    xp: 25,
    completed: true,
    locked: false,
  },
  {
    id: 2,
    title: "The Birth of Jesus",
    titlePt: "O Nascimento de Jesus",
    course: "The Life of Jesus",
    coursePt: "A Vida de Jesus",
    duration: "7 min",
    xp: 30,
    completed: true,
    locked: false,
  },
  {
    id: 3,
    title: "Jesus and His Disciples",
    titlePt: "Jesus e os Seus Discípulos",
    course: "The Life of Jesus",
    coursePt: "A Vida de Jesus",
    duration: "6 min",
    xp: 30,
    completed: false,
    locked: false,
  },
  {
    id: 4,
    title: "The Miracles of Jesus",
    titlePt: "Os Milagres de Jesus",
    course: "The Life of Jesus",
    coursePt: "A Vida de Jesus",
    duration: "8 min",
    xp: 35,
    completed: false,
    locked: true,
  },
];

export default function LessonsPage() {
  const [language, setLanguage] = useState("en");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [activeTab, setActiveTab] = useState("paths");

  const t = translations[language];

  const filteredCourses =
    selectedLevel === "all"
      ? courses
      : courses.filter((course) => course.level === selectedLevel);

  return (
    <main className="lessons-page">
      <header className="lessons-header">
        <div>
          <div className="lessons-brand">
            digle<span>.</span>
          </div>
          <p>{t.subtitle}</p>
        </div>

        <button
          className="lessons-language"
          onClick={() => setLanguage(language === "en" ? "pt" : "en")}
        >
          <Globe size={17} />
          {language === "en" ? "PT" : "EN"}
        </button>
      </header>

      <section className="lessons-intro">
        <div>
          <span className="lessons-label">DIGLE LEARNING</span>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <div className="lessons-total">
          <Star size={22} />
          <strong>1,240</strong>
          <span>{t.xp}</span>
        </div>
      </section>

      <div className="lessons-tabs">
        <button
          className={activeTab === "paths" ? "selected" : ""}
          onClick={() => setActiveTab("paths")}
        >
          {t.paths}
        </button>

        <button
          className={activeTab === "lessons" ? "selected" : ""}
          onClick={() => setActiveTab("lessons")}
        >
          {t.all}
        </button>
      </div>

      {activeTab === "paths" && (
        <>
          <div className="lessons-filters">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <button
                key={level}
                className={selectedLevel === level ? "active" : ""}
                onClick={() => setSelectedLevel(level)}
              >
                {level === "all" ? t.all : t[level]}
              </button>
            ))}
          </div>

          <section className="course-grid">
            {filteredCourses.map((course) => (
              <article className="course-card" key={course.id}>
                <div className={`course-icon ${course.color}`}>
                  {course.icon}
                </div>

                <div className="course-level">
                  {t[course.level]}
                </div>

                <h2>{language === "en" ? course.title : course.titlePt}</h2>

                <p>
                  {language === "en"
                    ? course.description
                    : course.descriptionPt}
                </p>

                <div className="course-meta">
                  <span>
                    {course.completed}/{course.total} {t.lessons}
                  </span>
                  <strong>{course.progress}%</strong>
                </div>

                <div className="course-progress">
                  <div style={{ width: `${course.progress}%` }} />
                </div>

                <Link to="/app/lesson" className="course-action">
                  {course.progress > 0 ? t.continue : t.start}
                  <ChevronRight size={17} />
                </Link>
              </article>
            ))}
          </section>
        </>
      )}

      {activeTab === "lessons" && (
        <section className="lesson-list">
          {lessons.map((lesson) => (
            <article className="lesson-item" key={lesson.id}>
              <div className="lesson-item-icon">
                {lesson.completed ? (
                  <CheckCircle size={22} />
                ) : lesson.locked ? (
                  <Lock size={22} />
                ) : (
                  <BookOpen size={22} />
                )}
              </div>

              <div className="lesson-item-content">
                <small>
                  {language === "en" ? lesson.course : lesson.coursePt}
                </small>
                <h3>
                  {language === "en" ? lesson.title : lesson.titlePt}
                </h3>
                <p>
                  {lesson.duration} · +{lesson.xp} {t.xp}
                </p>
              </div>

              {lesson.locked ? (
                <span className="lesson-locked">
                  <Lock size={15} />
                  {t.locked}
                </span>
              ) : lesson.completed ? (
                <span className="lesson-completed">
                  <CheckCircle size={16} />
                  {t.finished}
                </span>
              ) : (
                <Link to="/app/lesson" className="lesson-play">
                  <Play size={17} />
                </Link>
              )}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
