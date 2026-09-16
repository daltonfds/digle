import React, { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  Lock,
  Share2,
  Sparkles,
  Trophy,
} from "lucide-react";
import { getStored } from "../lib/digleStorage";

const certificates = [
  {
    id: 1,
    title: "Fundamentos da Fé",
    subtitle: "Trilha de aprendizagem",
    description:
      "Certificado de conclusão dos fundamentos essenciais da fé cristã.",
    progress: 100,
    lessons: "6 de 6 lições",
    unlocked: true,
    date: "15 Set 2026",
  },
  {
    id: 2,
    title: "A Vida de Jesus",
    subtitle: "Trilha de aprendizagem",
    description:
      "Certificado de conclusão da trilha sobre a vida e ministério de Jesus.",
    progress: 62,
    lessons: "5 de 8 lições",
    unlocked: false,
    date: null,
  },
  {
    id: 3,
    title: "Sabedoria para Viver",
    subtitle: "Trilha de aprendizagem",
    description:
      "Certificado de conclusão da trilha de sabedoria bíblica para a vida.",
    progress: 28,
    lessons: "2 de 7 lições",
    unlocked: false,
    date: null,
  },
];

export default function Certificates() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(certificates[0]);
  const [shared, setShared] = useState(false);

  const xp = Number(getStored("xp", 420));

  const completed = useMemo(
    () => certificates.filter((item) => item.unlocked).length,
    []
  );

  function downloadCertificate() {
    const content = [
      "DIGLE",
      "",
      "CERTIFICADO DE CONCLUSÃO",
      "",
      selected.title,
      "",
      selected.description,
      "",
      `Concluído em: ${selected.date}`,
      "",
      "Este certificado reconhece a conclusão da trilha de aprendizagem.",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `digle-${selected.title.toLowerCase().replaceAll(" ", "-")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function shareCertificate() {
    const text = `Concluí a trilha "${selected.title}" no Digle!`;

    if (navigator.share) {
      await navigator.share({ title: "Meu certificado Digle", text });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }

    setShared(true);
    setTimeout(() => setShared(false), 1800);
  }

  return (
    <main className="certificates-page">
      <section className="certificates-header">
        <div>
          <span className="eyebrow">Suas conquistas</span>
          <h1>Certificados</h1>
          <p>Conclua trilhas e registre cada etapa da sua jornada.</p>
        </div>

        <div className="certificate-count">
          <Award size={19} />
          <strong>{completed}</strong>
          <span>certificado{completed !== 1 ? "s" : ""}</span>
        </div>
      </section>

      <section className="certificate-overview">
        <div className="overview-icon">
          <Sparkles size={25} />
        </div>
        <div>
          <strong>Continue aprendendo</strong>
          <p>
            Você já acumulou <b>{xp} XP</b>. Complete novas trilhas para
            desbloquear mais certificados.
          </p>
        </div>
      </section>

      <section className="certificates-layout">
        <div className="certificate-list">
          <h2>Minhas trilhas</h2>

          {certificates.map((certificate) => (
            <button
              className={`certificate-list-item ${
                selected.id === certificate.id ? "selected" : ""
              }`}
              key={certificate.id}
              onClick={() => setSelected(certificate)}
            >
              <div className="certificate-list-icon">
                {certificate.unlocked ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <Lock size={18} />
                )}
              </div>

              <div>
                <strong>{certificate.title}</strong>
                <span>{certificate.lessons}</span>
              </div>

              <b>{certificate.progress}%</b>
            </button>
          ))}
        </div>

        <div className="certificate-preview-card">
          {selected.unlocked ? (
            <>
              <div className="certificate-paper">
                <div className="certificate-corner certificate-corner-one" />
                <div className="certificate-corner certificate-corner-two" />

                <div className="certificate-logo">DIGLE</div>
                <Award size={48} className="certificate-award" />

                <span className="certificate-label">CERTIFICADO DE</span>
                <h2>Conclusão</h2>

                <p>Este certificado é concedido a</p>
                <strong className="certificate-name">Estudante Digle</strong>

                <span className="certificate-line" />

                <p>pela conclusão da trilha</p>
                <h3>{selected.title}</h3>

                <div className="certificate-footer">
                  <span>{selected.date}</span>
                  <span>
                    <Trophy size={14} /> DIGLE
                  </span>
                </div>
              </div>

              <div className="certificate-actions">
                <button onClick={downloadCertificate}>
                  <Download size={17} />
                  Baixar certificado
                </button>
                <button onClick={shareCertificate}>
                  <Share2 size={17} />
                  {shared ? "Copiado!" : "Compartilhar"}
                </button>
              </div>
            </>
          ) : (
            <div className="certificate-locked">
              <div>
                <Lock size={32} />
              </div>
              <h2>Certificado bloqueado</h2>
              <p>{selected.description}</p>

              <div className="certificate-progress">
                <div>
                  <span>Progresso</span>
                  <strong>{selected.progress}%</strong>
                </div>
                <div className="certificate-progress-track">
                  <span style={{ width: `${selected.progress}%` }} />
                </div>
              </div>

              <button
                onClick={() => {
                  navigate("/app/trails");
                }}
              >
                <BookOpen size={17} />
                Continuar trilha
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
