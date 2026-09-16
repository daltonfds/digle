import { useMemo, useState } from "react";
import {
  Flame,
  CalendarDays,
  Trophy,
  Target,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function makeMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    days.push(day);
  }

  return days;
}

export default function Streak() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const days = useMemo(() => makeMonthDays(year, month), [year, month]);

  const activeDays = new Set(
    Array.from({ length: 14 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      return date.getDate();
    })
  );

  function previousMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((value) => value - 1);
    } else {
      setMonth((value) => value - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((value) => value + 1);
    } else {
      setMonth((value) => value + 1);
    }
  }

  return (
    <div className="streak-page">
      <section className="streak-hero">
        <div className="streak-flame">
          <Flame size={42} />
        </div>

        <div className="streak-hero-copy">
          <div className="page-eyebrow">
            <Flame size={15} />
            Sequência
          </div>

          <h1>7 dias seguidos!</h1>

          <p>
            Continue estudando todos os dias para manter sua sequência.
          </p>
        </div>

        <div className="streak-number">
          <strong>7</strong>
          <span>dias</span>
        </div>
      </section>

      <div className="streak-stats">
        <div className="streak-stat">
          <div>
            <Flame size={20} />
          </div>
          <span>Sequência atual</span>
          <strong>7 dias</strong>
        </div>

        <div className="streak-stat">
          <div>
            <Trophy size={20} />
          </div>
          <span>Melhor sequência</span>
          <strong>14 dias</strong>
        </div>

        <div className="streak-stat">
          <div>
            <Target size={20} />
          </div>
          <span>Meta semanal</span>
          <strong>6/7 dias</strong>
        </div>
      </div>

      <section className="streak-calendar-card">
        <div className="streak-calendar-header">
          <div>
            <CalendarDays size={20} />
            <h2>Calendário de estudo</h2>
          </div>

          <div className="streak-calendar-navigation">
            <button onClick={previousMonth}>
              <ChevronLeft size={18} />
            </button>

            <strong>
              {monthNames[month]} {year}
            </strong>

            <button onClick={nextMonth}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="streak-weekdays">
          {weekdays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="streak-calendar-grid">
          {days.map((day, index) => {
            if (!day) {
              return <div className="streak-calendar-empty" key={index} />;
            }

            const active =
              year === today.getFullYear() &&
              month === today.getMonth() &&
              activeDays.has(day);

            const isToday =
              year === today.getFullYear() &&
              month === today.getMonth() &&
              day === today.getDate();

            return (
              <div
                className={`streak-day ${active ? "active" : ""} ${
                  isToday ? "today" : ""
                }`}
                key={day}
              >
                <span>{day}</span>

                {active && <Check size={12} />}
              </div>
            );
          })}
        </div>
      </section>

      <section className="streak-motivation">
        <div className="streak-motivation-icon">
          <Flame size={23} />
        </div>

        <div>
          <strong>Não quebre sua sequência!</strong>
          <p>
            Uma pequena sessão hoje mantém o hábito vivo. Continue sua jornada.
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/app/lessons");
          }}
        >
          Estudar agora
        </button>
      </section>
    </div>
  );
}
