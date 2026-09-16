import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Flame, Heart, Lock, Play, Volume2, Trophy, Star,
  ChevronRight, Check, Sparkles, Crown, User, X, Menu, Shield,
  BarChart3, Plus, Settings, LogOut, ArrowLeft, Zap, CircleHelp
} from 'lucide-react'
import './style.css'

const lessons = [
  { id: 1, title: 'Quem é Jesus?', subtitle: 'Conheça a mensagem central', xp: 20, free: true, icon: '✝️', color: 'green' },
  { id: 2, title: 'O Bom Samaritano', subtitle: 'Aprenda sobre amor e compaixão', xp: 25, free: true, icon: '❤️', color: 'blue' },
  { id: 3, title: 'A Fé de Abraão', subtitle: 'Confiar mesmo sem ver', xp: 30, free: false, icon: '⭐', color: 'purple' },
  { id: 4, title: 'A Vida de Davi', subtitle: 'Coragem, queda e restauração', xp: 35, free: false, icon: '👑', color: 'orange' },
  { id: 5, title: 'O Poder da Oração', subtitle: 'Aprenda a desenvolver sua vida de oração', xp: 40, free: false, icon: '🙏', color: 'pink' },
  { id: 6, title: 'Frutos do Espírito', subtitle: 'Viva uma fé que transforma', xp: 45, free: false, icon: '🌿', color: 'teal' },
]

const quiz = [
  {
    question: 'Quem contou a parábola do Bom Samaritano?',
    options: ['Moisés', 'Jesus', 'Davi', 'Paulo'],
    answer: 1
  },
  {
    question: 'Qual é o primeiro livro da Bíblia?',
    options: ['Êxodo', 'Salmos', 'Gênesis', 'Mateus'],
    answer: 2
  },
  {
    question: 'O que significa amar o próximo?',
    options: ['Ignorá-lo', 'Servi-lo e cuidar dele', 'Julgá-lo', 'Evitar pessoas'],
    answer: 1
  }
]

function App() {
  const [screen, setScreen] = useState('home')
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [unlocked, setUnlocked] = useState([1, 2])
  const [hearts, setHearts] = useState(5)
  const [xp, setXp] = useState(120)
  const [streak, setStreak] = useState(7)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const openLesson = lesson => {
    if (!lesson.free && !unlocked.includes(lesson.id)) {
      setSelectedLesson(lesson)
      setShowPay(true)
      return
    }
    setSelectedLesson(lesson)
    setScreen('lesson')
  }

  const answerQuiz = index => {
    if (answered !== null) return
    setAnswered(index)
    if (index === quiz[quizIndex].answer) {
      setQuizScore(v => v + 1)
      setXp(v => v + 10)
    } else {
      setHearts(v => Math.max(0, v - 1))
    }
  }

  const nextQuestion = () => {
    if (quizIndex < quiz.length - 1) {
      setQuizIndex(v => v + 1)
      setAnswered(null)
    } else {
      setScreen('home')
      setQuizIndex(0)
      setAnswered(null)
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => setScreen('home')}>
          <span className="brandMark">D</span>
          <span>digle</span>
        </button>

        <div className="stats">
          <div className="stat streak"><Flame size={19} fill="currentColor" /> <b>{streak}</b></div>
          <div className="stat xp"><Zap size={18} fill="currentColor" /> <b>{xp}</b></div>
          <div className="stat hearts"><Heart size={19} fill="currentColor" /> <b>{hearts}</b></div>
        </div>

        <div className="top-actions">
          {loggedIn ? (
            <button className="avatar"><User size={19} /></button>
          ) : (
            <button className="loginBtn" onClick={() => setShowLogin(true)}>Entrar</button>
          )}
          <button className="menuBtn" onClick={() => setShowMenu(v => !v)}><Menu size={21} /></button>
        </div>
      </header>

      <AnimatePresence>
        {showMenu && (
          <motion.div className="sideMenu" initial={{x:320}} animate={{x:0}} exit={{x:320}}>
            <button onClick={() => {setScreen('home');setShowMenu(false)}}><BookOpen size={19}/> Aprender</button>
            <button onClick={() => {setScreen('leaderboard');setShowMenu(false)}}><Trophy size={19}/> Ranking</button>
            <button onClick={() => {setScreen('achievements');setShowMenu(false)}}><Star size={19}/> Conquistas</button>
            <button onClick={() => {setScreen('admin');setShowMenu(false)}}><Shield size={19}/> Administrador</button>
            <button><Settings size={19}/> Definições</button>
          </motion.div>
        )}
      </AnimatePresence>

      {screen === 'home' && (
        <main className="page">
          <section className="hero">
            <div>
              <span className="eyebrow"><Sparkles size={15}/> APRENDA. VIVA. CRESÇA.</span>
              <h1>Conheça a Bíblia.<br/><span>Transforme sua vida.</span></h1>
              <p>Aprenda ensinamentos bíblicos de forma simples, divertida e envolvente — um passo de cada vez.</p>
              <button className="primary" onClick={() => openLesson(lessons[0])}>
                Continuar aprendendo <ChevronRight size={19}/>
              </button>
            </div>
            <div className="heroArt">
              <motion.div className="sun" animate={{y:[0,-8,0]}} transition={{duration:3,repeat:Infinity}}>✦</motion.div>
              <div className="cross">✝</div>
              <div className="cloud cloud1"/>
              <div className="cloud cloud2"/>
            </div>
          </section>

          <section className="daily">
            <div className="dailyHead">
              <div><span className="sectionLabel">SEU PROGRESSO</span><h2>Trilha de aprendizado</h2></div>
              <div className="progressBox"><b>7 dias</b><span>de sequência 🔥</span></div>
            </div>

            <div className="path">
              {lessons.map((lesson, i) => {
                const isUnlocked = lesson.free || unlocked.includes(lesson.id)
                return (
                  <motion.div
                    className={`lessonNode ${i % 2 ? 'offset' : ''}`}
                    key={lesson.id}
                    initial={{opacity:0,y:20}}
                    animate={{opacity:1,y:0}}
                    transition={{delay:i*.08}}
                  >
                    <button
                      className={`nodeCircle ${lesson.color} ${!isUnlocked ? 'locked' : ''}`}
                      onClick={() => openLesson(lesson)}
                    >
                      {isUnlocked ? lesson.icon : <Lock size={25}/>}
                    </button>
                    <div className="nodeInfo">
                      <span className="lessonNumber">LIÇÃO {i+1}</span>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.subtitle}</p>
                      <small>{isUnlocked ? `${lesson.xp} XP` : 'Conteúdo premium'}</small>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>

          <section className="premiumBanner">
            <div className="crownCircle"><Crown size={27}/></div>
            <div><span>PASS DIGLE</span><h2>Desbloqueie tudo por 30 dias</h2><p>Acesso completo às lições, estudos e áudios premium.</p></div>
            <button className="secondary" onClick={() => setShowPay(true)}>Ver oferta <ChevronRight size={18}/></button>
          </section>

          <section className="features">
            <div className="featureCard"><div className="featureIcon green"><Flame/></div><h3>Crie sua sequência</h3><p>Volte todos os dias e mantenha seu progresso.</p></div>
            <div className="featureCard"><div className="featureIcon purple"><Trophy/></div><h3>Ganhe XP</h3><p>Complete lições e suba no ranking semanal.</p></div>
            <div className="featureCard"><div className="featureIcon orange"><Volume2/></div><h3>Ouça e aprenda</h3><p>Transforme seus estudos em momentos de áudio.</p></div>
          </section>
        </main>
      )}

      {screen === 'lesson' && selectedLesson && (
        <main className="lessonPage">
          <button className="backBtn" onClick={() => setScreen('home')}><ArrowLeft size={19}/> Voltar</button>
          <div className="lessonHeader">
            <span className="lessonTag">LIÇÃO {selectedLesson.id}</span>
            <h1>{selectedLesson.title}</h1>
            <p>{selectedLesson.subtitle}</p>
          </div>

          <article className="lessonContent">
            <div className="verse">
              <span>📖 PALAVRA DO DIA</span>
              <blockquote>“Ensina-me o teu caminho, Senhor, para que eu ande na tua verdade.”</blockquote>
              <small>Salmos 86:11</small>
            </div>

            <h2>Uma nova maneira de aprender</h2>
            <p>A Bíblia está cheia de histórias, ensinamentos e perguntas que continuam relevantes hoje. Nesta lição você vai descobrir uma ideia importante através de pequenos passos.</p>
            <p>Leia cada parte, reflita sobre a pergunta e avance. O objetivo não é apenas memorizar — é compreender e aplicar.</p>

            <div className="audioCard">
              <div className="audioIcon"><Volume2/></div>
              <div className="audioText"><b>Ouvir esta lição</b><span>Narração em áudio · 3 min</span></div>
              <button className="playBtn" onClick={() => setAudioPlaying(v=>!v)}>{audioPlaying ? '❚❚' : <Play size={19} fill="currentColor"/>}</button>
            </div>

            <button className="quizStart" onClick={() => setScreen('quiz')}>
              <div><CircleHelp size={25}/><div><b>Teste seus conhecimentos</b><span>3 perguntas · até 30 XP</span></div></div>
              <ChevronRight/>
            </button>
          </article>
        </main>
      )}

      {screen === 'quiz' && (
        <main className="quizPage">
          <div className="quizTop"><button onClick={() => setScreen('home')}><X/></button><div className="quizProgress"><span style={{width:`${((quizIndex)/quiz.length)*100}%`}}/></div><div className="quizHeart"><Heart fill="currentColor"/> {hearts}</div></div>
          <div className="quizBody">
            <span className="sectionLabel">PERGUNTA {quizIndex+1} DE {quiz.length}</span>
            <h1>{quiz[quizIndex].question}</h1>
            <div className="options">
              {quiz[quizIndex].options.map((option,i) => {
                let cls = ''
                if (answered !== null) cls = i === quiz[quizIndex].answer ? 'correct' : i === answered ? 'wrong' : ''
                return <button key={option} className={`option ${cls}`} onClick={() => answerQuiz(i)}><span>{String.fromCharCode(65+i)}</span>{option}{cls==='correct'&&<Check/>}</button>
              })}
            </div>
            {answered !== null && <button className="primary full" onClick={nextQuestion}>{quizIndex===quiz.length-1?'Concluir':'Continuar'} <ChevronRight/></button>}
          </div>
        </main>
      )}

      {screen === 'leaderboard' && (
        <main className="simplePage">
          <span className="sectionLabel">COMUNIDADE DIGLE</span><h1>Ranking semanal 🏆</h1><p className="lead">Aprenda, mantenha sua sequência e avance juntos.</p>
          <div className="leaderboard">
            {[['Maria S.','2.840 XP','🥇'],['Daniel R.','2.510 XP','🥈'],['Dálton','2.180 XP','🥉'],['Ana P.','1.940 XP','4'],['Lucas M.','1.720 XP','5']].map((u,i)=><div className="rankRow" key={u[0]}><b>{u[2]}</b><span className="rankAvatar">{u[0][0]}</span><strong>{u[0]}</strong><span>{u[1]}</span></div>)}
          </div>
        </main>
      )}

      {screen === 'achievements' && (
        <main className="simplePage">
          <span className="sectionLabel">SEUS RESULTADOS</span><h1>Conquistas ⭐</h1><p className="lead">Cada pequena vitória conta.</p>
          <div className="achievementGrid">
            {['Primeiro passo','7 dias seguidos','100 XP','Primeiro quiz','Leitor fiel','Mestre da oração'].map((a,i)=><div className={`achievement ${i>3?'lockedAchievement':''}`} key={a}><div>{['🌱','🔥','⚡','🧠','📖','🙏'][i]}</div><b>{a}</b><span>{i>3?'Bloqueada':'Conquistada'}</span></div>)}
          </div>
        </main>
      )}

      {screen === 'admin' && (
        <main className="adminPage">
          <div className="adminHeader"><div><span className="sectionLabel">ADMINISTRADOR</span><h1>Painel Digle</h1></div><button className="primary"><Plus/> Novo conteúdo</button></div>
          <div className="adminStats"><div><span>Conteúdos</span><b>24</b></div><div><span>Usuários</span><b>1,284</b></div><div><span>Receita</span><b>$842</b></div><div><span>Conversão</span><b>8.4%</b></div></div>
          <div className="adminTable"><div className="tableHead"><b>CONTEÚDO</b><b>STATUS</b><b>PREÇO</b><b>AÇÕES</b></div>{lessons.map(l=><div className="tableRow" key={l.id}><div><strong>{l.icon} {l.title}</strong><small>Lição {l.id}</small></div><span className={l.free?'published':'premium'}>{l.free?'Público':'Premium'}</span><b>{l.free?'Grátis':'$0.99'}</b><button>Editar</button></div>)}</div>
        </main>
      )}

      <footer><span>© 2026 Digle</span><span>Aprenda a Palavra de forma diferente.</span></footer>

      <AnimatePresence>
        {showPay && (
          <motion.div className="modalBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShowPay(false)}>
            <motion.div className="payModal" initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}} onClick={e=>e.stopPropagation()}>
              <button className="close" onClick={()=>setShowPay(false)}><X/></button>
              <div className="payCrown"><Crown/></div>
              <span className="sectionLabel">CONTEÚDO PREMIUM</span>
              <h2>{selectedLesson ? `Desbloquear "${selectedLesson.title}"` : 'Desbloqueie o Digle completo'}</h2>
              <p>Escolha como deseja acessar o conteúdo.</p>
              <button className="payOption" onClick={() => {if(!loggedIn){setShowPay(false);setShowLogin(true)}else{setUnlocked(v=>[...v,selectedLesson?.id].filter(Boolean));setShowPay(false);setScreen('lesson')}}}><div><b>Desbloquear esta lição</b><span>Acesso permanente</span></div><strong>$0.99</strong></button>
              <button className="payOption best" onClick={() => {if(!loggedIn){setShowPay(false);setShowLogin(true)}else{setUnlocked(lessons.map(l=>l.id));setShowPay(false)}}}><div><b>👑 Passe Digle · 30 dias</b><span>Todas as lições + áudios premium</span></div><strong>$4.99</strong></button>
              <small className="secure">🔒 Pagamento seguro · O acesso é liberado automaticamente após confirmação.</small>
            </motion.div>
          </motion.div>
        )}

        {showLogin && (
          <motion.div className="modalBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowLogin(false)}>
            <motion.div className="loginModal" initial={{scale:.94,opacity:0}} animate={{scale:1,opacity:1}} onClick={e=>e.stopPropagation()}>
              <button className="close" onClick={()=>setShowLogin(false)}><X/></button>
              <div className="loginLogo">D</div><h2>Continue no Digle</h2><p>Crie sua conta para guardar seu progresso e acessar conteúdos premium.</p>
              <input placeholder="Seu nome ou email"/>
              <input type="password" placeholder="Senha"/>
              <button className="primary full" onClick={()=>{setLoggedIn(true);setShowLogin(false)}}>Criar conta / Entrar <ChevronRight/></button>
              <small>Ao continuar, seu progresso fica associado à sua conta.</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
