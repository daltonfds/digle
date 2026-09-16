import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Trophy,
  X,
  Zap,
} from "lucide-react";

const questions = [
  {
    text: "Qual é o primeiro livro da Bíblia?",
    answers: ["Êxodo", "Gênesis", "Mateus", "Salmos"],
    correct: 1,
  },
  {
    text: "Quem construiu a arca?",
    answers: ["Moisés", "Abraão", "Noé", "Davi"],
    correct: 2,
  },
  {
    text: "Quantos discípulos Jesus escolheu?",
    answers: ["7", "10", "12", "40"],
    correct: 2,
  },
];

export default function QuizPlay() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[index];

  const answer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === question.correct) setScore(score + 1);
  };

  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setSelected(null);
  };

  if (finished) {
    return (
      <main className="digle-page quiz-result-page">
        <div className="quiz-result-icon"><Trophy size={48} /></div>
        <span className="eyebrow">QUIZ CONCLUÍDO</span>
        <h1>Você terminou!</h1>
        <p>Veja como você se saiu neste desafio.</p>

        <div className="quiz-result-score">
          <strong>{score}/{questions.length}</strong>
          <span>respostas corretas</span>
        </div>

        <div className="result-stats">
          <div><CheckCircle2 /><strong>{score}</strong><span>corretas</span></div>
          <div><X /><strong>{questions.length - score}</strong><span>erradas</span></div>
          <div><Zap /><strong>+{score * 50}</strong><span>XP</span></div>
        </div>

        <button className="primary-button" onClick={() => window.location.reload()}>
          Fazer novamente <ArrowRight size={17} />
        </button>
      </main>
    );
  }

  return (
    <main className="digle-page quiz-play-page">
      <button className="quiz-back"><ArrowLeft size={17} /> Sair do quiz</button>

      <div className="quiz-play-top">
        <span>PERGUNTA {index + 1} DE {questions.length}</span>
        <strong><Zap size={15} /> +50 XP</strong>
      </div>

      <div className="quiz-question-progress"><i style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>

      <section className="quiz-question">
        <h1>{question.text}</h1>

        <div className="answers">
          {question.answers.map((answerText, i) => {
            const correct = selected !== null && i === question.correct;
            const wrong = selected === i && i !== question.correct;

            return (
              <button
                key={answerText}
                className={`${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                onClick={() => answer(i)}
              >
                <span>{String.fromCharCode(65 + i)}</span>
                {answerText}
                {correct && <Check />}
                {wrong && <X />}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className={`answer-feedback ${selected === question.correct ? "success" : "error"}`}>
            {selected === question.correct ? (
              <><CheckCircle2 /><div><strong>Resposta correta!</strong><span>Você ganhou 50 XP.</span></div></>
            ) : (
              <><X /><div><strong>Quase!</strong><span>A resposta correta está destacada acima.</span></div></>
            )}
          </div>
        )}

        <button className="primary-button quiz-next" disabled={selected === null} onClick={next}>
          {index === questions.length - 1 ? "Ver resultado" : "Próxima pergunta"}
          <ArrowRight size={17} />
        </button>
      </section>
    </main>
  );
}
