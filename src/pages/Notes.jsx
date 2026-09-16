import React, { useState } from "react";
import { BookOpen, Check, Edit3, Plus, Trash2 } from "lucide-react";

const initial = [
  {
    id: 1,
    title: "O que aprendi sobre fé",
    reference: "Vivendo pela fé",
    text: "A fé precisa aparecer nas minhas decisões e não apenas no que acredito.",
  },
  {
    id: 2,
    title: "Reflexão sobre oração",
    reference: "O poder da oração",
    text: "Quero desenvolver uma rotina diária de oração.",
  },
];

export default function Notes() {
  const [notes, setNotes] = useState(initial);
  const [editing, setEditing] = useState(null);

  const remove = (id) => setNotes(notes.filter((note) => note.id !== id));

  const add = () => {
    const note = {
      id: Date.now(),
      title: "Nova anotação",
      reference: "Minha jornada",
      text: "Escreva aqui o que você aprendeu...",
    };
    setNotes([note, ...notes]);
    setEditing(note.id);
  };

  const update = (id, field, value) => {
    setNotes(notes.map((note) => note.id === id ? { ...note, [field]: value } : note));
  };

  return (
    <main className="digle-page notes-page">
      <section className="page-heading notes-heading">
        <div>
          <span className="eyebrow"><Edit3 size={15} /> ANOTAÇÕES</span>
          <h1>Suas reflexões.</h1>
          <p>Registre o que você está aprendendo.</p>
        </div>
        <button className="primary-button" onClick={add}><Plus size={17} /> Nova anotação</button>
      </section>

      <div className="notes-grid">
        {notes.map((note) => (
          <article className="note-card" key={note.id}>
            <div className="note-top">
              <span><BookOpen size={14} /> {note.reference}</span>
              <div>
                <button onClick={() => setEditing(editing === note.id ? null : note.id)}>
                  {editing === note.id ? <Check size={17} /> : <Edit3 size={17} />}
                </button>
                <button onClick={() => remove(note.id)}><Trash2 size={17} /></button>
              </div>
            </div>

            {editing === note.id ? (
              <>
                <input
                  className="note-input"
                  value={note.title}
                  onChange={(e) => update(note.id, "title", e.target.value)}
                />
                <textarea
                  className="note-textarea"
                  value={note.text}
                  onChange={(e) => update(note.id, "text", e.target.value)}
                />
              </>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
