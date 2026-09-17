import { useState } from "react";
import {
  BookOpen,
  Target,
  Flame,
  Brain,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { setStored } from "../lib/digleStorage";

const steps = [
  {
    title: "O que você quer aprender?",
    subtitle: "Escolha os temas que mais despertam seu interesse.",
    options: [
      { id: "bible", icon: BookOpen, label: "Conhecer a Bíblia", text: "Entender livros, histórias e ensinamentos." },
      { id: "faith", icon: Sparkles, label: "Fortalecer minha fé", text: "Aprender sobre fé, confiança e vida com Deus." },
      { id: "prayer", icon: Brain, label: "Aprender a orar", text: "Desenvolver uma vida de oração." },
      { id: "life", icon: Target, label: "Viver melhor", text: "Aplicar princípios bíblicos no dia a dia." },
    ],
  },
  {
    title: "Quanto tempo você tem?",
    subtitle: "Vamos adaptar sua jornada ao seu ritmo.",
    options: [
      { id: "5", icon: Flame, label: "5 minutos", text: "Uma experiência rápida todos os dias." },
      { id: "10", icon: Flame, label: "10 minutos", text: "Pequenas sessões consistentes." },
      { id: "20", icon: Flame, label: "20 minutos", text: "Uma jornada equilibrada." },
      { id: "30", icon: Flame, label: "30+ minutos", text: "Quero mergulhar mais fundo." },
    ],
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);

  const current = steps[step];

  function toggleOption(id) {
    setSelected((items) =>
      items.includes(id)
        ? items.filter((item) => item !== id)
        : [...items, id]
    );
  }

  function next() {
    if (step < steps.length - 1) {
      setStep((value) => value + 1);
      return;
    }

    setStored("onboardingComplete", true);
    setStored("learningPreferences", selected);
    setStored("onboardingDoneAt", new Date().toISOString());

    navigate("/app/dashboard");
  }

  return (
    <main className="onboarding-page">
      <div className="onboarding-brand">
        <div className="onboarding-logo">D</div>
        <strong>digle</strong>
      </div>

      <div className="onboarding-progress">
        {steps.map((_, index) => (
          <span
            key={index}
            className={index <= step ? "active" : ""}
          />
        ))}
      </div>

      <section className="onboarding-content">
        <div className="onboarding-heading">
          <span>PASSO {step + 1} DE {steps.length}</span>
          <h1>{current.title}</h1>
          <p>{current.subtitle}</p>
        </div>

        <div className="onboarding-options">
          {current.options.map((option) => {
            const Icon = option.icon;
            const active = selected.includes(option.id);

            return (
              <button
                key={option.id}
                className={`onboarding-option ${active ? "selected" : ""}`}
                onClick={() => toggleOption(option.id)}
              >
                <div className="onboarding-option-icon">
                  <Icon size={22} />
                </div>

                <div className="onboarding-option-copy">
                  <strong>{option.label}</strong>
                  <span>{option.text}</span>
                </div>

                <div className="onboarding-check">
                  {active && <Check size={15} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="onboarding-actions">
          {step > 0 ? (
            <button
              className="onboarding-back"
              onClick={() => setStep((value) => value - 1)}
            >
              <ArrowLeft size={17} />
              Voltar
            </button>
          ) : (
            <span />
          )}

          <button
            className="onboarding-next"
            onClick={next}
            disabled={!selected.length}
          >
            {step === steps.length - 1 ? "Começar minha jornada" : "Continuar"}
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <p className="onboarding-footer">
        Você poderá alterar suas preferências a qualquer momento.
      </p>
    </main>
  );
}
