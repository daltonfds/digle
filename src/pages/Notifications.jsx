import React, { useState } from "react";
import { Bell, Check, Flame, Gift, MessageCircle, Trophy, Zap } from "lucide-react";

const initial = [
  { id: 1, icon: Flame, title: "Seu streak está ativo!", text: "Você já estudou por 7 dias seguidos.", time: "Agora", unread: true },
  { id: 2, icon: Gift, title: "Novo desafio disponível", text: "Complete o desafio diário e ganhe até 50 XP.", time: "2h", unread: true },
  { id: 3, icon: Trophy, title: "Conquista desbloqueada", text: "Você desbloqueou a conquista Constante.", time: "Ontem", unread: false },
  { id: 4, icon: Zap, title: "Quase no próximo nível", text: "Faltam apenas 180 XP para o nível 5.", time: "Ontem", unread: false },
];

export default function Notifications() {
  const [items, setItems] = useState(initial);

  const readAll = () => setItems(items.map((item) => ({ ...item, unread: false })));

  return (
    <main className="digle-page notifications-page">
      <section className="page-heading">
        <span className="eyebrow"><Bell size={15} /> NOTIFICAÇÕES</span>
        <h1>Não perca sua jornada.</h1>
        <p>Veja as novidades e lembretes do Digle.</p>
      </section>

      <div className="notifications-toolbar">
        <strong>{items.filter((x) => x.unread).length} não lidas</strong>
        <button onClick={readAll}><Check size={16} /> Marcar todas como lidas</button>
      </div>

      <div className="notifications-list">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article className={`notification-card ${item.unread ? "notification-unread" : ""}`} key={item.id}>
              <div className="notification-icon"><Icon /></div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <time>{item.time}</time>
              {item.unread && <i />}
            </article>
          );
        })}
      </div>
    </main>
  );
}
