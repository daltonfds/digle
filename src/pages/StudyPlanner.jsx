import React, { useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Plus,
  Target,
} from "lucide-react";

const initial = [
  { id: 1, day: "Hoje", time: "08:00", title: "Conhecendo a Bíblia", duration: 15, done: true },
  { id: 2, day: "Hoje", time: "19:30", title: "O poder da oração", duration: 20, done: false },
  { id: 3, day: "Amanhã", time: "08:00", title: "Vivendo pela fé", duration: 15, done: false },
];

export default function StudyPlanner() {
  const [tasks, setTasks] = useState(initial);
  const [week, setWeek] = useState(0);

  const toggle = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  };

  return (
    <main className="digle-page planner-page">
      <section className="planner-header">
        <div>
          <span className="eyebrow"><CalendarDays size={15} /> PLANO DE ESTUDO</span>
          <h1>Crie seu ritmo.</h1>
          <p>Organize pequenos momentos para manter sua jornada.</p>
        </div>
        <button className="primary-button"><Plus size={17} /> Adicionar estudo</button>
      </section>

      <section className="planner-summary">
        <div><Target /><strong>20 min</strong><span>meta diária</span></div>
        <div><Flame /><strong>7 dias</strong><span>streak atual</span></div>
        <div><Check /><strong>6/7</strong><span>meta semanal</span></div>
      </section>

      <section className="calendar-strip">
        <button onClick={() => setWeek(week - 1)}><ChevronLeft /></button>
        <div className={week === 0 ? "calendar-day active" : "calendar-day"}><span>SEG</span><strong>14</strong></div>
        <div className="calendar-day"><span>TER</span><strong>15</strong></div>
        <div className="calendar-day today"><span>QUA</span><strong>16</strong></div>
        <div className="calendar-day"><span>QUI</span><strong>17</strong></div>
        <div className="calendar-day"><span>SEX</span><strong>18</strong></div>
        <div className="calendar-day"><span>SÁB</span><strong>19</strong></div>
        <div className="calendar-day"><span>DOM</span><strong>20</strong></div>
        <button onClick={() => setWeek(week + 1)}><ChevronRight /></button>
      </section>

      <section className="planner-list">
        <div className="section-heading">
          <div><span className="eyebrow">AGENDA</span><h2>Seus estudos</h2></div>
        </div>

        {tasks.map((task) => (
          <article className={`planner-task ${task.done ? "done" : ""}`} key={task.id}>
            <button className="task-check" onClick={() => toggle(task.id)}>
              {task.done && <Check size={17} />}
            </button>
            <div className="task-time"><Clock size={14} /> {task.time}</div>
            <div className="task-info">
              <span>{task.day}</span>
              <h3>{task.title}</h3>
            </div>
            <strong>{task.duration} min</strong>
          </article>
        ))}
      </section>
    </main>
  );
}
