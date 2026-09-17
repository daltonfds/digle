import React, { useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";

const subjects = [
  "Dúvida sobre a plataforma",
  "Problema com uma lição",
  "Problema com minha conta",
  "Sugestão de melhoria",
  "Outro assunto",
];

export default function ContactSupport() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(event) {
    event.preventDefault();

    if (!email.trim() || !message.trim()) return;

    setSent(true);
  }

  if (sent) {
    return (
      <main className="support-page">
        <section className="support-success">
          <div className="support-success-icon">
            <CheckCircle2 size={42} />
          </div>
          <span className="eyebrow">Mensagem enviada</span>
          <h1>Recebemos sua mensagem!</h1>
          <p>
            Obrigado por entrar em contacto. A sua mensagem foi registrada e
            poderá ser respondida através do email informado.
          </p>

          <button
            onClick={() => {
              setSent(false);
              setMessage("");
            }}
          >
            Enviar outra mensagem
          </button>

          <button
            className="support-back"
            onClick={() => {
              navigate("/app/help");
            }}
          >
            <ChevronLeft size={16} />
            Voltar para a Central de Ajuda
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="support-page">
      <section className="support-header">
        <span className="eyebrow">Suporte</span>
        <h1>Fale com a equipa do Digle</h1>
        <p>
          Envie sua dúvida, problema ou sugestão. Estamos aqui para ajudar.
        </p>
      </section>

      <section className="support-layout">
        <form className="support-form" onSubmit={submit}>
          <div className="support-form-heading">
            <div className="support-form-icon">
              <MessageCircle size={21} />
            </div>
            <div>
              <h2>Enviar mensagem</h2>
              <span>Preencha os campos abaixo.</span>
            </div>
          </div>

          <label>
            Email
            <div className="support-input">
              <Mail size={16} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
          </label>

          <label>
            Assunto
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              {subjects.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Mensagem
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Descreva como podemos ajudar..."
              rows={7}
              required
            />
          </label>

          <button className="support-submit" type="submit">
            <Send size={16} />
            Enviar mensagem
          </button>
        </form>

        <aside className="support-sidebar">
          <div className="support-info-card">
            <div className="support-info-icon">
              <Clock3 size={20} />
            </div>
            <h3>Tempo de resposta</h3>
            <p>
              Nossa equipa procura responder às mensagens de suporte o mais
              rapidamente possível.
            </p>
          </div>

          <div className="support-info-card">
            <div className="support-info-icon">
              <ShieldCheck size={20} />
            </div>
            <h3>Privacidade</h3>
            <p>
              Não envie senhas, códigos de acesso ou outras informações
              confidenciais através deste formulário.
            </p>
          </div>

          <div className="support-email-card">
            <Mail size={18} />
            <div>
              <span>Email de suporte</span>
              <strong>support@digle.app</strong>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
