import React, { useState } from "react";
import {
  Bell,
  ChevronRight,
  Globe,
  Lock,
  Moon,
  Settings as SettingsIcon,
  Shield,
  Volume2,
} from "lucide-react";

export default function Settings() {
  const [daily, setDaily] = useState(true);
  const [sound, setSound] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <main className="digle-page settings-page">
      <section className="page-heading">
        <span className="eyebrow"><SettingsIcon size={15} /> DEFINIÇÕES</span>
        <h1>Personalize o Digle.</h1>
        <p>Controle sua experiência de aprendizagem.</p>
      </section>

      <section className="settings-group">
        <span className="settings-label">EXPERIÊNCIA</span>

        <SettingToggle
          icon={Bell}
          title="Lembrete diário"
          description="Receba um lembrete para estudar todos os dias."
          value={daily}
          onChange={() => setDaily(!daily)}
        />

        <SettingToggle
          icon={Volume2}
          title="Sons"
          description="Ativar sons durante quizzes e atividades."
          value={sound}
          onChange={() => setSound(!sound)}
        />

        <SettingToggle
          icon={Moon}
          title="Modo escuro"
          description="Usar uma aparência escura no aplicativo."
          value={dark}
          onChange={() => setDark(!dark)}
        />
      </section>

      <section className="settings-group">
        <span className="settings-label">CONTA</span>
        <SettingLink icon={Globe} title="Idioma" value="Português" />
        <SettingLink icon={Lock} title="Privacidade" value="Configurar" />
        <SettingLink icon={Shield} title="Segurança" value="Conta protegida" />
      </section>
    </main>
  );
}

function SettingToggle({ icon: Icon, title, description, value, onChange }) {
  return (
    <div className="setting-row">
      <div className="setting-icon"><Icon /></div>
      <div className="setting-copy">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
      <button className={`toggle ${value ? "on" : ""}`} onClick={onChange}>
        <i />
      </button>
    </div>
  );
}

function SettingLink({ icon: Icon, title, value }) {
  return (
    <button className="setting-row setting-link">
      <div className="setting-icon"><Icon /></div>
      <div className="setting-copy">
        <strong>{title}</strong>
        <span>{value}</span>
      </div>
      <ChevronRight />
    </button>
  );
}
