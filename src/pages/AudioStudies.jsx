import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Headphones,
  Clock,
  CheckCircle,
} from "lucide-react";

const episodes = [
  {
    id: 1,
    title: "Understanding Faith",
    description: "Discover how faith shapes your daily walk with God.",
    duration: "12:40",
    category: "Faith",
  },
  {
    id: 2,
    title: "The Power of Prayer",
    description: "Learn how to develop a consistent prayer life.",
    duration: "18:25",
    category: "Prayer",
  },
  {
    id: 3,
    title: "Walking in Wisdom",
    description: "Biblical principles for making better decisions.",
    duration: "15:10",
    category: "Wisdom",
  },
  {
    id: 4,
    title: "The Love of Christ",
    description: "Explore the depth and meaning of God's love.",
    duration: "21:05",
    category: "Gospel",
  },
];

export default function AudioStudies() {
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState([]);

  function selectEpisode(episode) {
    setCurrent(episode);
    setPlaying(true);
  }

  function toggleComplete(id) {
    setCompleted((items) =>
      items.includes(id)
        ? items.filter((item) => item !== id)
        : [...items, id]
    );
  }

  return (
    <div className="page audio-studies-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">AUDIO LEARNING</span>
          <h1>Listen and grow.</h1>
          <p>Study Scripture wherever you are.</p>
        </div>

        <div className="audio-heading-icon">
          <Headphones size={28} />
        </div>
      </div>

      <section className="audio-player-card">
        <div className="audio-player-art">
          <Headphones size={42} />
        </div>

        <div className="audio-player-info">
          <span className="eyebrow">NOW PLAYING</span>
          <h2>{current ? current.title : "Choose an audio study"}</h2>
          <p>
            {current
              ? current.description
              : "Select a study below to begin your listening journey."}
          </p>
        </div>

        <div className="audio-player-controls">
          <button
            className="audio-control"
            onClick={() => setPlaying(false)}
            disabled={!current}
          >
            <SkipBack size={20} />
          </button>

          <button
            className="audio-play-button"
            onClick={() => current && setPlaying((value) => !value)}
            disabled={!current}
          >
            {playing ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            className="audio-control"
            onClick={() => setPlaying(false)}
            disabled={!current}
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="audio-progress">
          <span className={playing ? "active" : ""} />
        </div>

        <div className="audio-player-footer">
          <span>{playing ? "Playing" : "Paused"}</span>
          <span>
            <Volume2 size={16} />
            {current?.duration || "00:00"}
          </span>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <span className="eyebrow">LIBRARY</span>
          <h2>Audio studies</h2>
        </div>
        <span className="section-count">{episodes.length} studies</span>
      </div>

      <div className="audio-list">
        {episodes.map((episode) => {
          const isCurrent = current?.id === episode.id;
          const isCompleted = completed.includes(episode.id);

          return (
            <article
              className={`audio-study-row ${isCurrent ? "active" : ""}`}
              key={episode.id}
            >
              <button
                className="audio-row-play"
                onClick={() => selectEpisode(episode)}
              >
                {isCurrent && playing ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
              </button>

              <div className="audio-row-content">
                <span className="audio-category">{episode.category}</span>
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>

                <div className="audio-row-meta">
                  <span>
                    <Clock size={14} />
                    {episode.duration}
                  </span>

                  {isCompleted && (
                    <span className="audio-completed">
                      <CheckCircle size={14} />
                      Completed
                    </span>
                  )}
                </div>
              </div>

              <button
                className="audio-complete-button"
                onClick={() => toggleComplete(episode.id)}
                title="Mark as completed"
              >
                <CheckCircle
                  size={21}
                  fill={isCompleted ? "currentColor" : "none"}
                />
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
