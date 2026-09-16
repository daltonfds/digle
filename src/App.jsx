import {
  BrowserRouter,
  Navigate,
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  BookOpen,
  Check,
  ChevronRight,
  Flame,
  Heart,
  Home,
  Lock,
  LogOut,
  Menu,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  X,
  Zap,
  BarChart3,
  BookMarked,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context";
import Protected from "./components/Protected";

import {
  checkAccess,
  getCourses,
  getModules,
  getLessons,
  getLesson,
  getQuestions,
  getStats,
  saveProgress,
  updateStats,
  getPurchases,
  getPasses,
} from "./lib/data";

import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Goals from "./pages/Goals";
import Community from "./pages/Community";
import LeaderboardPage from "./pages/Leaderboard";
import ProfilePage from "./pages/Profile";
import QuizHub from "./pages/QuizHub";
import Trails from "./pages/Trails";
import StudyStatistics from "./pages/StudyStatistics";
import StudyHistory from "./pages/StudyHistory";
import Certificates from "./pages/Certificates";
import HelpCenter from "./pages/HelpCenter";
import ContactSupport from "./pages/ContactSupport";
import AudioStudies from "./pages/AudioStudies";
import ProgressPage from "./pages/Progress";
import DailyChallenge from "./pages/DailyChallenge";
import LessonsPage from "./pages/Lessons";
import LessonReader from "./pages/LessonReader";
import Bible from "./pages/Bible";
import Notifications from "./pages/Notifications";
import SettingsPage from "./pages/Settings";
import SearchPage from "./pages/Search";
import Notes from "./pages/Notes";
import VerseOfDay from "./pages/VerseOfDay";
import StudyPlanner from "./pages/StudyPlanner";
import Flashcards from "./pages/Flashcards";
import QuizPlay from "./pages/QuizPlay";
import SavedVerses from "./pages/SavedVerses";
import AchievementsPage from "./pages/Achievements";
import Streak from "./pages/Streak";
import DigleCommandCenter from "./components/DigleCommandCenter";

import "./App.css";
import "./index.css";

function Loading() {
  return (
    <div className="screen-loader">
      <div className="loader-logo">d</div>
      <p>Loading Digle...</p>
    </div>
  );
}

function UserLayout() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    ["/app", Home, "Dashboard"],
    ["/app/lessons", BookOpen, "Lessons"],
    ["/app/bible", BookMarked, "Bible"],
    ["/app/quiz-hub", Trophy, "Quizzes"],
    ["/app/trails", Sparkles, "Trails"],
    ["/app/ranking", Trophy, "Ranking"],
    ["/app/achievements", Sparkles, "Achievements"],
    ["/app/community", Users, "Community"],
    ["/app/profile", User, "Profile"],
    ["/app/purchases", CreditCard, "Purchases"],
  ];

  return (
    <div className="user-shell">
      <aside className={`user-sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <span>digle</span>
        </div>

        <nav>
          {links.map(([to, Icon, label]) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="nav-item"
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>

        <Link className="pass-card" to="/app/purchases">
          <Sparkles size={18} />
          <strong>Digle Pass</strong>
          <small>Unlock everything</small>
        </Link>

        <div className="sidebar-user">
          <div className="avatar">
            {(user?.email?.[0] || "U").toUpperCase()}
          </div>

          <div>
            <strong>
              {user?.user_metadata?.full_name || "Learner"}
            </strong>
            <small>{user?.email}</small>
          </div>
        </div>

        <button className="logout-btn" onClick={signOut}>
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <main className="user-main">
        <header className="mobile-header">
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>

          <strong>digle</strong>
        </header>

        <div className="app-command-bar">
          <DigleCommandCenter />
        </div>

        <Outlet />
      </main>
    </div>
  );
}

function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <Link to="/" className="brand">
          digle
        </Link>

        <div>
          <Link className="header-login" to="/login">
            Log in
          </Link>

          <Link className="primary-btn small" to="/register">
            Start learning
          </Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            Learn the Bible. Build your faith.
          </div>

          <h1>
            Make your Bible journey
            <span> impossible to forget.</span>
          </h1>

          <p>
            Digle turns Bible learning into a fun daily experience with
            lessons, quizzes, XP, streaks, achievements and challenges.
          </p>

          <div className="hero-actions">
            <Link className="primary-btn large" to="/register">
              Start for free <ChevronRight size={20} />
            </Link>

            <Link className="secondary-btn large" to="/learn">
              Explore lessons
            </Link>
          </div>

          <div className="trust-row">
            <span>
              <Check size={16} /> Free lessons
            </span>

            <span>
              <Check size={16} /> Learn at your pace
            </span>

            <span>
              <Check size={16} /> No commitment
            </span>
          </div>
        </div>

        <div className="hero-game">
          <div className="game-window">
            <div className="game-top">
              <span>Today's lesson</span>

              <span>
                <Heart size={16} fill="currentColor" /> 5
              </span>
            </div>

            <div className="lesson-circle">
              <BookOpen size={54} />
            </div>

            <p className="game-kicker">NEW LESSON</p>
            <h3>The Good Samaritan</h3>
            <p>
              Discover what Jesus taught about loving others.
            </p>

            <div className="game-xp">
              <Zap size={17} fill="currentColor" /> +20 XP
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <Feature
          icon={<Flame />}
          title="Build your streak"
          text="Come back every day and keep your learning streak alive."
        />

        <Feature
          icon={<Trophy />}
          title="Compete & grow"
          text="Earn XP, climb the ranking and unlock achievements."
        />

        <Feature
          icon={<BookOpen />}
          title="Learn deeply"
          text="Short lessons and quizzes make Scripture easier to remember."
        />
      </section>

      <section className="landing-cta">
        <Sparkles size={28} />
        <h2>Your next chapter starts today.</h2>
        <p>
          Start learning the Bible in a way that actually feels fun.
        </p>

        <Link className="primary-btn large" to="/register">
          Create my free account
        </Link>
      </section>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Learn() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR JOURNEY</span>
          <h1>Keep learning.</h1>
          <p>Small lessons. Big growth.</p>
        </div>

        <div className="top-stats">
          <span>
            <Flame size={17} /> 0
          </span>

          <span>
            <Zap size={17} /> 0 XP
          </span>

          <span>
            <Heart size={17} /> 5
          </span>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : courses.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={42} />
          <h2>Courses are coming soon.</h2>
          <p>
            The first lessons will appear here once published.
          </p>
        </div>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <Link
              to={`/app/course/${course.id}`}
              className="course-card"
              key={course.id}
            >
              <div className="course-icon">
                <BookOpen />
              </div>

              <span className="course-label">COURSE</span>

              <h2>{course.title}</h2>

              <p>{course.description}</p>

              <span className="course-link">
                Start learning <ChevronRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Course() {
  const { courseId } = useParams();

  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState({});
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourseData();
  }, [courseId]);

  async function getCourseData() {
    try {
      const { getCourse } = await import("./lib/data");

      const c = await getCourse(courseId);
      const m = await getModules(courseId);

      setCourse(c);
      setModules(m);

      const entries = await Promise.all(
        m.map(async (module) => [
          module.id,
          await getLessons(module.id),
        ])
      );

      setLessons(Object.fromEntries(entries));
    } catch (e) {
      console.error(e);
    }
  }

  if (!course) return <Loading />;

  return (
    <div className="page">
      <Link className="back-link" to="/app">
        ← Back to learning
      </Link>

      <div className="course-header">
        <span className="eyebrow">COURSE</span>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>

      <div className="modules">
        {modules.map((module, index) => (
          <section className="module" key={module.id}>
            <div className="module-heading">
              <div className="module-number">{index + 1}</div>

              <div>
                <span>MODULE {index + 1}</span>
                <h2>{module.title}</h2>
              </div>
            </div>

            <div className="lesson-list">
              {(lessons[module.id] || []).map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/app/lesson/${lesson.id}`}
                  className="lesson-row"
                >
                  <div className="lesson-row-icon">
                    {lesson.text_access === "paid" ? (
                      <Lock size={18} />
                    ) : (
                      <BookOpen size={18} />
                    )}
                  </div>

                  <div>
                    <strong>{lesson.title}</strong>
                    <small>
                      {lesson.text_access === "paid"
                        ? "Premium lesson"
                        : "Free lesson"}
                    </small>
                  </div>

                  <ChevronRight />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Lesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [access, setAccess] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const l = await getLesson(lessonId);

        setLesson(l);

        if (l?.is_premium || l?.text_access === "paid") {
          const result = await checkAccess(lessonId);

          setAccess(
            Boolean(result?.has_access || result?.access)
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [lessonId]);

  if (loading) return <Loading />;

  if (!lesson) {
    return (
      <div className="empty-state">
        Lesson not found.
      </div>
    );
  }

  if (
    (lesson.text_access === "paid" || lesson.is_premium) &&
    !access
  ) {
    return (
      <div className="locked-page">
        <div className="locked-icon">
          <Lock size={34} />
        </div>

        <span className="eyebrow">PREMIUM LESSON</span>

        <h1>{lesson.title}</h1>

        <p>
          This lesson is part of Digle Premium. Unlock it to
          continue learning and access the audio experience.
        </p>

        <div className="locked-actions">
          <Link className="primary-btn large" to="/app/purchases">
            Unlock lesson
          </Link>

          <Link className="secondary-btn large" to="/app">
            Back to learning
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page">
      <div className="lesson-progress">
        <button onClick={() => navigate(-1)}>×</button>

        <div>
          <span />
        </div>

        <span>1 / 1</span>
      </div>

      <div className="lesson-content">
        <span className="eyebrow">LESSON</span>

        <h1>{lesson.title}</h1>

        <div
          className="lesson-body"
          dangerouslySetInnerHTML={{
            __html:
              lesson.body_text ||
              "<p>Content for this lesson will appear here.</p>",
          }}
        />

        {lesson.audio_url && (
          <div className="audio-card">
            <div>
              <strong>Listen to this lesson</strong>
              <small>Audio version</small>
            </div>

            <audio controls src={lesson.audio_url} />
          </div>
        )}

        <Link
          className="primary-btn large lesson-continue"
          to={`/app/quiz/${lesson.id}`}
        >
          Continue <ChevronRight />
        </Link>
      </div>
    </div>
  );
}

function Quiz() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getQuestions(lessonId)
      .then(setQuestions)
      .catch(console.error);
  }, [lessonId]);

  async function answer(option) {
    if (selected) return;

    setSelected(option.id);

    const isCorrect = option.is_correct === true;

    setCorrect(isCorrect);

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (index + 1 >= questions.length) {
        finish(isCorrect);
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
        setCorrect(null);
      }
    }, 700);
  }

  async function finish(lastCorrect) {
    const finalScore = score + (lastCorrect ? 1 : 0);

    setDone(true);

    try {
      await saveProgress({
        userId: user.id,
        lessonId,
        xp: 20,
        completed: true,
        score: finalScore,
      });

      const stats = await getStats(user.id);

      await updateStats(user.id, {
        xp: Number(stats?.xp || 0) + 20,
        lessons_completed:
          Number(stats?.lessons_completed || 0) + 1,
      });
    } catch (e) {
      console.error(e);
    }
  }

  if (!questions.length) {
    return (
      <div className="empty-state">
        <BookOpen size={42} />

        <h2>No quiz yet.</h2>

        <p>
          This lesson does not have questions configured.
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("/app")}
        >
          Back to learning
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="result-page">
        <div className="result-icon">
          <Trophy size={45} />
        </div>

        <span className="eyebrow">LESSON COMPLETE</span>

        <h1>Great job!</h1>

        <p>
          You earned <strong>+20 XP</strong>.
        </p>

        <div className="result-score">
          {score} / {questions.length}
        </div>

        <Link className="primary-btn large" to="/app">
          Continue learning
        </Link>
      </div>
    );
  }

  const question = questions[index];

  const options =
    question.question_options ||
    question.options ||
    [];

  return (
    <div className="quiz-page">
      <div className="quiz-top">
        <button onClick={() => navigate(-1)}>×</button>

        <div className="quiz-progress">
          <span
            style={{
              width: `${
                ((index + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>

        <span>
          {index + 1}/{questions.length}
        </span>
      </div>

      <div className="quiz-card">
        <span className="eyebrow">
          QUESTION {index + 1}
        </span>

        <h1>{question.question || question.text}</h1>

        <div className="answers">
          {options.map((option) => (
            <button
              key={option.id}
              className={`answer ${
                selected === option.id
                  ? correct
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              onClick={() => answer(option)}
            >
              <span>
                {option.text || option.option_text}
              </span>

              {selected === option.id &&
                (correct ? <Check /> : <X />)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Ranking() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">LEADERBOARD</span>
          <h1>Ranking</h1>
          <p>Learn more. Climb higher.</p>
        </div>

        <Trophy size={38} />
      </div>

      <div className="ranking-card">
        {[
          ["01", "Sarah", "2,840 XP"],
          ["02", "Michael", "2,510 XP"],
          ["03", "Jessica", "2,240 XP"],
          ["04", "You", "1,240 XP"],
          ["05", "David", "980 XP"],
        ].map(([position, name, xp]) => (
          <div
            className={`rank-row ${
              name === "You" ? "me" : ""
            }`}
            key={name}
          >
            <strong>{position}</strong>

            <div className="avatar">
              {name[0]}
            </div>

            <span>{name}</span>

            <b>{xp}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function Achievements() {
  const achievements = [
    ["🔥", "First Flame", "Complete your first lesson", true],
    ["⚡", "100 XP", "Earn 100 XP", true],
    ["📖", "Bible Beginner", "Complete 10 lessons", false],
    ["🏆", "Scholar", "Reach 1,000 XP", false],
    ["🔥", "7 Day Streak", "Learn for 7 days", false],
    ["💎", "Faithful", "Complete 50 lessons", false],
  ];

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h1>Achievements</h1>
          <p>Every step counts.</p>
        </div>
      </div>

      <div className="achievement-grid">
        {achievements.map(
          ([icon, title, text, unlocked]) => (
            <div
              className={`achievement ${
                unlocked ? "unlocked" : ""
              }`}
              key={title}
            >
              <div className="achievement-icon">
                {unlocked ? (
                  icon
                ) : (
                  <Lock size={25} />
                )}
              </div>

              <h3>{title}</h3>

              <p>{text}</p>

              {unlocked && <span>UNLOCKED</span>}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Profile() {
  const { user, profile, signOut } = useAuth();

  return (
    <div className="page">
      <div className="profile-header">
        <div className="profile-avatar">
          {(user?.email?.[0] || "U").toUpperCase()}
        </div>

        <span className="eyebrow">YOUR ACCOUNT</span>

        <h1>
          {profile?.full_name ||
            user?.user_metadata?.full_name ||
            "Learner"}
        </h1>

        <p>{user?.email}</p>
      </div>

      <div className="settings-card">
        <div>
          <User />

          <div>
            <strong>Account</strong>
            <small>
              Your Digle account information
            </small>
          </div>
        </div>

        <Link to="/app/settings">
          <Settings />

          <div>
            <strong>Preferences</strong>
            <small>
              Notifications and learning preferences
            </small>
          </div>
        </Link>

        <button
          className="danger-btn"
          onClick={signOut}
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </div>
  );
}

function Purchases() {
  const { user } = useAuth();

  const [purchases, setPurchases] = useState([]);
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    if (!user) return;

    Promise.all([
      getPurchases(user.id),
      getPasses(user.id),
    ]).then(([p, pass]) => {
      setPurchases(p);
      setPasses(pass);
    });
  }, [user]);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">PREMIUM</span>

          <h1>Unlock your journey.</h1>

          <p>
            Access premium lessons and the full Digle
            experience.
          </p>
        </div>
      </div>

      <div className="premium-grid">
        <div className="premium-card featured">
          <Sparkles size={28} />

          <span className="eyebrow">
            MOST POPULAR
          </span>

          <h2>Digle Pass</h2>

          <p>
            Unlimited access to premium lessons and audio
            for 30 days.
          </p>

          <div className="price">
            <strong>Admin price</strong>
            <small>30 days</small>
          </div>

          <button
            className="primary-btn large"
            disabled
          >
            Payment gateway coming soon
          </button>
        </div>

        <div className="premium-card">
          <Lock size={28} />

          <span className="eyebrow">
            INDIVIDUAL
          </span>

          <h2>Unlock a lesson</h2>

          <p>
            Purchase individual premium content at the
            price defined by Digle.
          </p>

          <button
            className="secondary-btn large"
            disabled
          >
            Select a lesson
          </button>
        </div>
      </div>

      {(purchases.length > 0 ||
        passes.length > 0) && (
        <div className="history-card">
          <h2>Purchase history</h2>

          {purchases.map((purchase) => (
            <div
              className="history-row"
              key={purchase.id}
            >
              <span>{purchase.status}</span>
              <strong>{purchase.amount}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Login() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    return <Navigate to="/app" replace />;
  }

  async function submit(e) {
    e.preventDefault();

    setError("");
    setBusy(true);

    try {
      const { error: authError } =
        await signIn(email, password);

      if (authError) throw authError;

      navigate("/app");
    } catch (e) {
      setError(
        e.message || "Unable to sign in."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthPage
      title="Welcome back."
      subtitle="Continue your Bible journey."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </>
      }
    >
      <form
        onSubmit={submit}
        className="auth-form"
      >
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <label>
          Email

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            type="email"
            required
          />
        </label>

        <label>
          Password

          <input
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            type="password"
            required
          />
        </label>

        <Link
          className="forgot"
          to="/forgot-password"
        >
          Forgot password?
        </Link>

        <button
          className="primary-btn large"
          disabled={busy}
        >
          {busy
            ? "Signing in..."
            : "Log in"}
        </button>
      </form>
    </AuthPage>
  );
}

function Register() {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    return <Navigate to="/app" replace />;
  }

  async function submit(e) {
    e.preventDefault();

    setError("");
    setMessage("");
    setBusy(true);

    try {
      const { data, error: authError } =
        await signUp(
          email,
          password,
          name
        );

      if (authError) throw authError;

      if (data.session) {
        navigate("/app");
      } else {
        setMessage(
          "Account created. Check your email to confirm your account."
        );
      }
    } catch (e) {
      setError(
        e.message ||
          "Unable to create account."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthPage
      title="Start your journey."
      subtitle="Create your free Digle account."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login">
            Log in
          </Link>
        </>
      }
    >
      <form
        onSubmit={submit}
        className="auth-form"
      >
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {message && (
          <div className="form-success">
            {message}
          </div>
        )}

        <label>
          Name

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />
        </label>

        <label>
          Email

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            type="email"
            required
          />
        </label>

        <label>
          Password

          <input
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            type="password"
            minLength={6}
            required
          />
        </label>

        <button
          className="primary-btn large"
          disabled={busy}
        >
          {busy
            ? "Creating account..."
            : "Create free account"}
        </button>
      </form>
    </AuthPage>
  );
}

function AuthPage({
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <div className="auth-page">
      <Link
        className="auth-brand"
        to="/"
      >
        digle
      </Link>

      <div className="auth-card">
        <div className="auth-icon">
          <Sparkles />
        </div>

        <h1>{title}</h1>

        <p>{subtitle}</p>

        {children}

        <div className="auth-footer">
          {footer}
        </div>
      </div>
    </div>
  );
}

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e) {
    e.preventDefault();

    const { supabase } =
      await import("./lib/supabase");

    if (supabase) {
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            `${window.location.origin}/login`,
        }
      );
    }

    setSent(true);
  }

  return (
    <AuthPage
      title="Reset your password."
      subtitle="We'll send you a secure recovery link."
      footer={
        <Link to="/login">
          Back to login
        </Link>
      }
    >
      {sent ? (
        <div className="form-success">
          Check your email for the password reset link.
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="auth-form"
        >
          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </label>

          <button className="primary-btn large">
            Send reset link
          </button>
        </form>
      )}
    </AuthPage>
  );
}

function AdminLayout() {
  const { signOut } = useAuth();

  const links = [
    ["/admin", BarChart3, "Overview"],
    ["/admin/courses", BookOpen, "Courses"],
    ["/admin/content", BookMarked, "Content"],
    ["/admin/users", Users, "Users"],
    ["/admin/purchases", CreditCard, "Purchases"],
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link
          to="/admin"
          className="admin-brand"
        >
          digle <span>ADMIN</span>
        </Link>

        <nav>
          {links.map(
            ([to, Icon, label]) => (
              <Link
                key={to}
                to={to}
                className="admin-nav-item"
              >
                <Icon size={19} />
                {label}
              </Link>
            )
          )}
        </nav>

        <div className="admin-security">
          <ShieldCheck size={20} />
          <strong>Admin mode</strong>
          <small>
            Protected workspace
          </small>
        </div>

        <button
          onClick={signOut}
          className="logout-btn"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <span>DIGLE ADMIN</span>
            <h2>Control center</h2>
          </div>

          <Link to="/app">
            Open user app →
          </Link>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="admin-content">
      <div className="admin-title">
        <span>OVERVIEW</span>
        <h1>Good to see you.</h1>
      </div>

      <div className="admin-stats">
        <AdminStat
          icon={<Users />}
          title="Users"
          value="—"
        />

        <AdminStat
          icon={<BookOpen />}
          title="Courses"
          value="—"
        />

        <AdminStat
          icon={<CreditCard />}
          title="Purchases"
          value="—"
        />

        <AdminStat
          icon={<BarChart3 />}
          title="Revenue"
          value="—"
        />
      </div>

      <div className="admin-panels">
        <div className="admin-panel">
          <h2>Content management</h2>

          <p>
            Publish courses, modules, lessons and quizzes
            from the admin workspace.
          </p>

          <Link
            className="primary-btn"
            to="/admin/content"
          >
            Manage content
          </Link>
        </div>

        <div className="admin-panel">
          <h2>Monetization</h2>

          <p>
            Configure premium lessons, individual prices
            and the 30-day Digle Pass.
          </p>

          <Link
            className="secondary-btn"
            to="/admin/purchases"
          >
            View purchases
          </Link>
        </div>
      </div>
    </div>
  );
}

function AdminStat({
  icon,
  title,
  value,
}) {
  return (
    <div className="admin-stat">
      {icon}
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AdminCourses() {
  const [courses, setCourses] =
    useState([]);

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <div className="admin-content">
      <div className="admin-title">
        <span>CATALOG</span>
        <h1>Courses</h1>
        <p>
          Published courses visible in the learning app.
        </p>
      </div>

      <div className="admin-table">
        <div className="table-head">
          <span>Course</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {courses.map((course) => (
          <div
            className="table-row"
            key={course.id}
          >
            <strong>{course.title}</strong>

            <span className="status active">
              Published
            </span>

            <Link
              to={`/app/course/${course.id}`}
            >
              View →
            </Link>
          </div>
        ))}

        {!courses.length && (
          <div className="table-empty">
            No published courses found.
          </div>
        )}
      </div>
    </div>
  );
}

function AdminContent() {
  return (
    <div className="admin-content">
      <div className="admin-title">
        <span>CMS</span>
        <h1>Content</h1>
        <p>
          Manage the learning structure and premium content.
        </p>
      </div>

      <div className="content-manager-grid">
        <ManagerCard
          icon={<BookOpen />}
          title="Courses"
          text="Create and organize Bible courses."
        />

        <ManagerCard
          icon={<BookMarked />}
          title="Modules"
          text="Organize lessons into learning paths."
        />

        <ManagerCard
          icon={<Sparkles />}
          title="Lessons"
          text="Create free and premium lessons."
        />

        <ManagerCard
          icon={<Zap />}
          title="Questions"
          text="Build quizzes and answer options."
        />

        <ManagerCard
          icon={<CreditCard />}
          title="Pricing"
          text="Set individual and Pass prices."
        />

        <ManagerCard
          icon={<BarChart3 />}
          title="Analytics"
          text="Monitor learning and revenue."
        />
      </div>
    </div>
  );
}

function ManagerCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="manager-card">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span>Management UI →</span>
    </div>
  );
}

function AdminUsers() {
  return (
    <div className="admin-content">
      <div className="admin-title">
        <span>PEOPLE</span>
        <h1>Users</h1>
        <p>
          User management and account activity.
        </p>
      </div>

      <div className="admin-panel">
        <Users size={35} />

        <h2>User management</h2>

        <p>
          Connect this area to your profiles table for
          account management, activity and admin actions.
        </p>
      </div>
    </div>
  );
}

function AdminPurchases() {
  return (
    <div className="admin-content">
      <div className="admin-title">
        <span>MONETIZATION</span>
        <h1>Purchases</h1>
        <p>
          Payments, unlocks and premium passes.
        </p>
      </div>

      <div className="admin-panel">
        <CreditCard size={35} />

        <h2>Payment operations</h2>

        <p>
          The payment webhook already provides the secure
          backend flow. Connect the payment provider before
          enabling checkout.
        </p>
      </div>
    </div>
  );
}

function AdminAnalytics() {
  return <Navigate to="/admin" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/learn"
        element={<LessonsPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route element={<Protected />}>
        <Route
          path="/app"
          element={<UserLayout />}
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="onboarding"
            element={<Onboarding />}
          />

          <Route
            path="lessons"
            element={<LessonsPage />}
          />

          <Route
            path="lesson-reader"
            element={<LessonReader />}
          />

          <Route
            path="lesson/:lessonId"
            element={<Lesson />}
          />

          <Route
            path="course/:courseId"
            element={<Course />}
          />

          <Route
            path="quiz/:lessonId"
            element={<Quiz />}
          />

          <Route
            path="quiz-hub"
            element={<QuizHub />}
          />

          <Route
            path="quiz-play"
            element={<QuizPlay />}
          />

          <Route
            path="daily-challenge"
            element={<DailyChallenge />}
          />

          <Route
            path="flashcards"
            element={<Flashcards />}
          />

          <Route
            path="trails"
            element={<Trails />}
          />

          <Route
            path="bible"
            element={<Bible />}
          />

          <Route
            path="audio"
            element={<AudioStudies />}
          />

          <Route
            path="audio-studies"
            element={<AudioStudies />}
          />

          <Route
            path="verse-of-day"
            element={<VerseOfDay />}
          />

          <Route
            path="saved-verses"
            element={<SavedVerses />}
          />

          <Route
            path="notes"
            element={<Notes />}
          />

          <Route
            path="planner"
            element={<StudyPlanner />}
          />

          <Route
            path="study-planner"
       element={<StudyPlanner />}
          />

          <Route
            path="study-planner"
            element={<StudyPlanner />}
          />

          <Route
            path="progress"
            element={<ProgressPage />}
          />

          <Route
            path="statistics"
            element={<StudyStatistics />}
          />

          <Route
            path="study-statistics"
            element={<StudyStatistics />}
          />

          <Route
            path="history"
            element={<StudyHistory />}
          />

          <Route
            path="study-history"
            element={<StudyHistory />}
          />

          <Route
            path="streak"
            element={<Streak />}
          />

          <Route
            path="goals"
            element={<Goals />}
          />

          <Route
            path="achievements"
            element={<AchievementsPage />}
          />

          <Route
            path="ranking"
            element={<LeaderboardPage />}
          />

          <Route
            path="leaderboard"
            element={<LeaderboardPage />}
          />

          <Route
            path="community"
            element={<Community />}
          />

          <Route
            path="certificates"
            element={<Certificates />}
          />

          <Route
            path="notifications"
            element={<Notifications />}
          />

          <Route
            path="search"
            element={<SearchPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />

          <Route
            path="settings"
            element={<SettingsPage />}
          />

          <Route
            path="help"
            element={<HelpCenter />}
          />

          <Route
            path="contact"
            element={<ContactSupport />}
          />

          <Route
            path="purchases"
            element={<Purchases />}
          />
        </Route>

        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="courses"
            element={<AdminCourses />}
          />

          <Route
            path="content"
            element={<AdminContent />}
          />

          <Route
            path="lessons"
            element={<AdminContent />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="purchases"
            element={<AdminPurchases />}
          />

          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
