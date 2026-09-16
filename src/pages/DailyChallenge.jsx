import { useState } from "react";
import {
  Flame,
  CheckCircle,
  Circle,
  ChevronRight,
  Sparkles,
  BookOpen,
  Star,
  Lock,
} from "lucide-react";

const questions = [
  {
    question: "Qual é o primeiro livro da Bíblia?",
    options: ["Êxodo", "Gênesis", "Salmos", "Mateus"],
    answer: 1,
    reference: "Gênesis 1:1",
  },
  {
    question: "Quem construiu a arca?",
    options: ["Abraão", "Moisés", "Noé", "Davi"],
    answer: 2,
    reference: "Gênesis 6:14",
  },
  {
    question: "Quantos discípulos Jesus escolheu?",
    options: ["7", "10", "12", "40"],
    answer: 2,
    reference: "Lucas 6:13",
  },
];

export default function DailyChallenge() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[current];

  const chooseAnswer = (index) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((value) => value + 1);
    }
  };

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((value) => value + 1);
    setSelected(null);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setFinished(false);
    setScore(0);
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="challenge-page">
        <div className="challenge-result">
          <div className="result-icon">
            <Sparkles size={32} />
          </div>

          <span className="eyebrow">DESAFIO CONCLUÍDO</span>

          <h1>Você terminou o desafio!</h1>

          <p>
            Cada pergunta respondida é mais um passo no seu caminho de
            aprendizagem.
          </p>

          <div className="result-score">
            <strong>{score}/{questions.length}</strong>
            <span>{percentage}% de aproveitamento</span>
          </div>

          <div className="result-reward">
            <Star size={19} />
            <span>+{score * 25} XP conquistados</span>
          </div>

          <button className="challenge-primary-button" onClick={restart}>
            Fazer novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="challenge-page">
      <header className="challenge-header">
        <div>
          <div className="challenge-title-line">
            <div className="challenge-heading-icon">
              <Flame size={23} />
            </div>

            <div>
              <span className="eyebrow">DESAFIO DIÁRIO</span>
              <h1>Teste seu conhecimento.</h1>
            </div>
          </div>

          <p>
            Responda às perguntas de hoje e ganhe XP para continuar avançando.
          </p>
        </div>

        <div className="challenge-streak">
          <Flame size={17} />
          <strong>3</strong>
          <span>dias</span>
        </div>
      </header>

      <div className="challenge-layout">
        <main className="challenge-card">
          <div className="challenge-card-top">
            <span>
              Pergunta {current + 1} de {questions.length}
            </span>

            <span>
              {score} acertos
            </span>
          </div>

          <div className="challenge-progress">
            <span
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <div className="question-content">
            <span className="question-label">
              <BookOpen size={15} />
              CONHEÇA A BÍBLIA
            </span>

            <h2>{question.question}</h2>

            <div className="question-options">
              {question.options.map((option, index) => {
                const isSelected = selected === index;
                const isCorrect = index === question.answer;

                let className = "question-option";

                if (selected !== null && isCorrect) {
                  className += " correct";
                } else if (selected !== null && isSelected) {
                  className += " incorrect";
                } else if (isSelected) {
                  className += " selected";
                }

                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => chooseAnswer(index)}
                    disabled={selected !== null}
                  >
                    <span className="option-marker">
                      {selected !== null && isCorrect ? (
                        <CheckCircle size={18} />
                      ) : selected !== null && isSelected ? (
                        <Circle size={18} />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>

                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div
                className={`answer-feedback ${
                  selected === question.answer ? "success" : "error"
                }`}
              >
                <div>
                  {selected === question.answer ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Circle size={20} />
                  )}
                </div>

                <div>
                  <strong>
                    {selected === question.answer
                      ? "Resposta correta!"
                      : "Quase lá!"}
                  </strong>

                  <p>
                    Referência: {question.reference}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="question-footer">
            <span>
              {selected === null
                ? "Escolha uma resposta"
                : "Continue para a próxima pergunta"}
            </span>

            <button
              className="next-question-button"
              onClick={nextQuestion}
              disabled={selected === null}
            >
              {current === questions.length - 1 ? "Concluir" : "Próxima"}
              <ChevronRight size={17} />
            </button>
          </div>
        </main>

        <aside className="challenge-sidebar">
          <div className="daily-reward-card">
            <div className="reward-icon">
              <Star size={22} />
            </div>

            <span className="eyebrow">RECOMPENSA</span>
            <h3>Ganhe até 75 XP</h3>
            <p>
              Complete o desafio diário para aumentar seu nível e manter seu
              progresso.
            </p>
          </div>

          <div className="challenge-info-card">
            <span className="eyebrow">SEU PROGRESSO</span>

            {questions.map((item, index) => (
              <div
                className={`challenge-step ${
                  index < current
                    ? "completed"
                    : index === current
                      ? "current"
                      : ""
                }`}
                key={item.question}
              >
                <div className="step-icon">
                  {index < current ? (
                    <CheckCircle size={17} />
                  ) : index === current ? (
                    <BookOpen size={16} />
                  ) : (
                    <Lock size={14} />
                  )}
                </div>

                <span>Pergunta {index + 1}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
