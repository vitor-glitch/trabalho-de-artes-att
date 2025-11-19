/* ============================= QUIZ COM ACESSIBILIDADE POR VOZ ============================= */
document.addEventListener('DOMContentLoaded', () => {

  // ===== CONFIGURAÇÃO DA ACESSIBILIDADE =====
  const audiosFolder = "audios/";
  let voiceEnabled = false;
  let voiceToggleBtn = null;

  // Áudios de confirmação
  const vozAtivadaSom = new Audio(audiosFolder + "voz_ativada.mp3");
  const vozDesativadaSom = new Audio(audiosFolder + "voz_desativada.mp3");
  vozAtivadaSom.load();
  vozDesativadaSom.load();

  // ===== ÁUDIOS DO QUIZ =====
  const tituloSom = new Audio(audiosFolder + "quiz.mp3");
  const startSom = new Audio(audiosFolder + "play.mp3");
  const backSom = new Audio(audiosFolder + "voltar_ao_site.mp3");
  const restartSom = new Audio(audiosFolder + "tente_novamente.mp3");
  const continueSom = new Audio(audiosFolder + "continuar.mp3");
  const bravissimoSom = new Audio(audiosFolder + "bravissimo.mp3");

  // Perguntas
  const perguntaSoms = Array.from({ length: 15 }, (_, i) => new Audio(audiosFolder + `pergunta${i}.mp3`));

  // Respostas
  const respostaSoms = Array.from({ length: 15 }, (_, q) =>
    Array.from({ length: 4 }, (_, a) => new Audio(audiosFolder + `resposta${q}_${a}.mp3`))
  );

  // Feedbacks
  const feedbackSoms = Array.from({ length: 15 }, (_, i) => ({
    correct: new Audio(audiosFolder + `feedback_correto.mp3`),
    wrong: new Audio(audiosFolder + `feedback_errado.mp3`)
  }));

  // Pontuação
  const scoreSoms = Array.from({ length: 16 }, (_, i) => new Audio(audiosFolder + `score${i}.mp3`));

  // Medalhas
  const medalSoms = [
    new Audio(audiosFolder + "medal_bronze.mp3"),
    new Audio(audiosFolder + "medal_silver.mp3"),
    new Audio(audiosFolder + "medal_gold.mp3")
  ];

  // ===== CARREGAR TODOS OS ÁUDIOS =====
  [
    tituloSom, startSom, backSom, restartSom, continueSom, bravissimoSom,
    ...perguntaSoms, ...respostaSoms.flat(), ...feedbackSoms.flatMap(f => [f.correct, f.wrong]),
    ...scoreSoms, ...medalSoms, vozAtivadaSom, vozDesativadaSom
  ].forEach(a => a.load());

  // ===== FUNÇÃO GLOBAL DE TOCAR ÁUDIO =====
  window.playAudio = function (audio) {
    if (!voiceEnabled || !audio) return;
    if (audio.paused && (audio.currentTime === 0 || audio.ended)) {
      audio.currentTime = 0;
      audio.play().catch(err => console.error("Erro ao tocar áudio:", err));
    }
  };

  // ===== TOGGLE DE VOZ =====
  function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    updateVoiceButton();
    if (voiceEnabled) {
      vozAtivadaSom.currentTime = 0;
      vozAtivadaSom.play();
    } else {
      vozDesativadaSom.currentTime = 0;
      vozDesativadaSom.play();
    }
  }

  function updateVoiceButton() {
    if (!voiceToggleBtn) return;
    voiceToggleBtn.classList.toggle('active', voiceEnabled);
    voiceToggleBtn.title = `Acessibilidade por voz: ${voiceEnabled ? 'ATIVADA' : 'DESATIVADA'} (clique para ${voiceEnabled ? 'desativar' : 'ativar'})`;
  }

  // ===== BOTÃO FLUTUANTE =====
  voiceToggleBtn = document.querySelector('.btn-flutuante');
  if (voiceToggleBtn) {
    voiceToggleBtn.style.cursor = 'pointer';
    voiceToggleBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      toggleVoice();
    });
    updateVoiceButton();
  }

  // ===== ELEMENTOS DO DOM =====
  const questionElement = document.getElementById("question");
  const answerButtons   = document.getElementById("answers");
  const restartButton   = document.getElementById("restart-btn");
  const startButton     = document.getElementById("start-btn");
  const mainTitle       = document.getElementById("main-title");
  const backButton      = document.getElementById("back-btn");
  const modal           = document.getElementById("feedback-modal");
  const feedbackText    = document.getElementById("feedback-text");
  const continueBtn     = document.getElementById("continue-btn");

  // ===== PERGUNTAS =====
  const questions = [
    {
      question: "Em que século o Renascimento teve seu auge na Europa?",
      answers: [
        { text: "Século XII", correct: false },
        { text: "Século XIV", correct: false },
        { text: "Século XV", correct: true },
        { text: "Século XVII", correct: false }
      ],
      feedback: {
        correct: "Correto! O Renascimento atingiu seu auge no século XV, especialmente na Itália.",
        wrong: "Errado! O auge do Renascimento ocorreu no século XV."
      }
    },
    {
      question: "Qual era o principal objetivo dos artistas e pensadores renascentistas?",
      answers: [
        { text: "Exaltar apenas a religião", correct: false },
        { text: "Valorizar o ser humano e a razão", correct: true },
        { text: "Rejeitar completamente o cristianismo", correct: false },
        { text: "Criar obras apenas para os reis", correct: false }
      ],
      feedback: {
        correct: "Certo! O Renascimento buscava valorizar o ser humano, a razão e o conhecimento.",
        wrong: "Errado! O principal foco era valorizar o ser humano e a razão, não apenas a religião."
      }
    },
    {
      question: "Onde o movimento renascentista começou?",
      answers: [
        { text: "França", correct: false },
        { text: "Alemanha", correct: false },
        { text: "Itália", correct: true },
        { text: "Inglaterra", correct: false }
      ],
      feedback: {
        correct: "Exato! O Renascimento teve origem na Itália, especialmente em cidades como Florença e Veneza.",
        wrong: "Não foi dessa vez! O Renascimento começou na Itália, o berço de grandes artistas."
      }
    },
    {
      question: "Michelangelo foi responsável por pintar o teto de qual famosa capela?",
      answers: [
        { text: "Capela de São Marcos", correct: false },
        { text: "Basílica de São Pedro", correct: false },
        { text: "Capela Sistina", correct: true },
        { text: "Catedral de Milão", correct: false }
      ],
      feedback: {
        correct: "Perfeito! Michelangelo pintou o teto da Capela Sistina, no Vaticano.",
        wrong: "Errado! A famosa pintura no teto da Capela Sistina foi feita por Michelangelo."
      }
    },
    {
      question: "Além de pintor, Michelangelo também era:",
      answers: [
        { text: "Escritor", correct: false },
        { text: "Escultor e arquiteto", correct: true },
        { text: "Matemático", correct: false },
        { text: "Médico", correct: false }
      ],
      feedback: {
        correct: "Correto! Michelangelo foi um gênio multifacetado: escultor, pintor e arquiteto.",
        wrong: "Errado! Michelangelo também foi escultor e arquiteto, além de pintor."
      }
    },
    {
      question: "Leonardo da Vinci ficou conhecido como um 'homem universal' porque:",
      answers: [
        { text: "Viajava por todo o mundo", correct: false },
        { text: "Estudava várias áreas, como arte, ciência e engenharia", correct: true },
        { text: "Criou a primeira universidade", correct: false },
        { text: "Era poliglota", correct: false }
      ],
      feedback: {
        correct: "Certo! Da Vinci estudava pintura, anatomia, mecânica, engenharia e muito mais.",
        wrong: "Errado! Ele ficou conhecido como 'homem universal' por dominar várias áreas do saber."
      }
    },
    {
      question: "Qual dessas obras foi pintada por Leonardo da Vinci?",
      answers: [
        { text: "A Criação de Adão", correct: false },
        { text: "O Juízo Final", correct: false },
        { text: "Mona Lisa", correct: true },
        { text: "A Última Ceia de Michelangelo", correct: false }
      ],
      feedback: {
        correct: "Correto! 'Mona Lisa' é uma das pinturas mais famosas de Leonardo da Vinci.",
        wrong: "Errado! A 'Mona Lisa' foi pintada por Leonardo da Vinci."
      }
    },
    {
      question: "Qual das invenções de Leonardo da Vinci foi um projeto visionário para a época?",
      answers: [
        { text: "Calculadora", correct: false },
        { text: "Helicóptero", correct: true },
        { text: "Telefone", correct: false },
        { text: "Relógio de pulso", correct: false }
      ],
      feedback: {
        correct: "Isso mesmo! Da Vinci projetou um modelo de helicóptero séculos antes de sua invenção real.",
        wrong: "Errado! Leonardo projetou um tipo de helicóptero muito antes de existir tecnologia para isso."
      }
    },
    {
      question: "O Renascimento marcou o fim de qual período histórico?",
      answers: [
        { text: "Antiguidade", correct: false },
        { text: "Idade Média", correct: true },
        { text: "Idade Contemporânea", correct: false },
        { text: "Revolução Francesa", correct: false }
      ],
      feedback: {
        correct: "Correto! O Renascimento marcou a transição da Idade Média para a Idade Moderna.",
        wrong: "Errado! O Renascimento marcou o fim da Idade Média e início da Idade Moderna."
      }
    },
    {
      question: "O que o termo 'Renascimento' significa?",
      answers: [
        { text: "Morte da arte antiga", correct: false },
        { text: "Renascimento dos valores da Antiguidade Clássica", correct: true },
        { text: "Rejeição da ciência", correct: false },
        { text: "Reforma da Igreja", correct: false }
      ],
      feedback: {
        correct: "Muito bem! O termo representa o renascer da cultura greco-romana.",
        wrong: "Errado! O Renascimento simboliza o renascer dos valores da Antiguidade Clássica."
      }
    },
    {
      question: "Qual é uma característica importante das obras renascentistas?",
      answers: [
        { text: "Falta de realismo", correct: false },
        { text: "Uso da perspectiva e proporção humana", correct: true },
        { text: "Cores frias e ausência de movimento", correct: false },
        { text: "Rejeição ao corpo humano", correct: false }
      ],
      feedback: {
        correct: "Perfeito! O uso da perspectiva e o realismo são marcas do Renascimento.",
        wrong: "Errado! As obras renascentistas valorizavam a perspectiva e o corpo humano."
      }
    },
    {
      question: "A escultura 'Davi', famosa por sua perfeição anatômica, foi feita por:",
      answers: [
        { text: "Leonardo da Vinci", correct: false },
        { text: "Donatello", correct: false },
        { text: "Michelangelo", correct: true },
        { text: "Rafael", correct: false }
      ],
      feedback: {
        correct: "Correto! 'Davi' é uma das esculturas mais famosas de Michelangelo.",
        wrong: "Errado! A escultura 'Davi' foi criada por Michelangelo."
      }
    },
    {
      question: "Qual dessas frases melhor resume o pensamento renascentista?",
      answers: [
        { text: "Tudo vem de Deus.", correct: false },
        { text: "A razão é o caminho para o conhecimento.", correct: true },
        { text: "A fé é mais importante que a experiência.", correct: false },
        { text: "A arte deve ser apenas religiosa.", correct: false }
      ],
      feedback: {
        correct: "Correto! O Renascimento valorizava a razão e a observação como formas de conhecimento.",
        wrong: "Errado! O pensamento renascentista destacava a razão e a experiência humana."
      }
    },
    {
      question: "Leonardo da Vinci fez importantes estudos sobre:",
      answers: [
        { text: "Religião e poesia", correct: false },
        { text: "Anatomia humana e mecânica", correct: true },
        { text: "Astronomia e alquimia", correct: false },
        { text: "Música e literatura", correct: false }
      ],
      feedback: {
        correct: "Perfeito! Da Vinci estudou anatomia humana e criou projetos mecânicos inovadores.",
        wrong: "Errado! Ele estudou anatomia humana e mecânica com grande profundidade."
      }
    },
    {
      question: "Qual dessas frases representa o Humanismo, uma das bases do Renascimento?",
      answers: [
        { text: "O homem é o centro do universo.", correct: true },
        { text: "A fé é a única verdade.", correct: false },
        { text: "A vida é apenas espiritual.", correct: false },
        { text: "A arte deve servir à Igreja.", correct: false }
      ],
      feedback: {
        correct: "Certo! O Humanismo colocava o homem e a razão no centro do conhecimento.",
        wrong: "Errado! O Humanismo defendia que o homem é o centro do universo e da razão."
      }
    }
  ];

  // ===== CONTROLE DO QUIZ =====
  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startButton.style.display = "none";
    backButton.style.display = "none";
    restartButton.style.display = "none";
    mainTitle.style.display = "none";
    questionElement.style.display = "block";
    showQuestion();
  }

  function resetState() {
    answerButtons.innerHTML = "";
  }

  function showQuestion() {
    resetState();
    const q = questions[currentQuestionIndex];
    questionElement.textContent = q.question;

    // FALA A PERGUNTA AO APARECER
    playAudio(perguntaSoms[currentQuestionIndex]);

    // HOVER NA PERGUNTA
    questionElement.addEventListener('mouseenter', () => playAudio(perguntaSoms[currentQuestionIndex]));

    q.answers.forEach((answer, i) => {
      const btn = document.createElement("button");
      btn.textContent = answer.text;
      btn.classList.add("btn");
      btn.addEventListener("click", () => selectAnswer(btn, answer.correct, q.feedback));
      btn.addEventListener('mouseenter', () => playAudio(respostaSoms[currentQuestionIndex][i]));
      answerButtons.appendChild(btn);
    });
  }

  function selectAnswer(btn, correct, feedback) {
    document.querySelectorAll(".btn").forEach(b => b.disabled = true);

    if (correct) {
      btn.classList.add("correct");
      score++;
      feedbackText.textContent = feedback.correct;
      feedbackText.style.color = "#00ff80";
      feedbackText.style.textShadow = "0 0 8px #00ff80, 0 0 15px #00ff80";
      playAudio(feedbackSoms[currentQuestionIndex].correct);
    } else {
      btn.classList.add("wrong");
      feedbackText.textContent = feedback.wrong;
      feedbackText.style.color = "#ff4040";
      feedbackText.style.textShadow = "0 0 8px #ff4040, 0 0 15px #ff4040";
      playAudio(feedbackSoms[currentQuestionIndex].wrong);
    }

    feedbackText.addEventListener('mouseenter', () => {
      const audio = correct ? feedbackSoms[currentQuestionIndex].correct : feedbackSoms[currentQuestionIndex].wrong;
      playAudio(audio);
    });

    modal.style.display = "flex";
  }

  continueBtn.addEventListener("click", () => {
    modal.style.display = "none";
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  });

  function endQuiz() {
  // Esconde a pergunta e limpa as respostas
  questionElement.style.display = "none";
  answerButtons.innerHTML = "";

  // Mostra texto final
  const finalTitle = document.createElement("h2");
  finalTitle.textContent = "Bravíssimo!";
  answerButtons.appendChild(finalTitle);
  playAudio(bravissimoSom);

  finalTitle.addEventListener('mouseenter', () => playAudio(bravissimoSom));

  const scoreMsg = document.createElement("p");
  scoreMsg.innerHTML = `Sua mente iluminada acertou <strong>${score}</strong> de <strong>${questions.length}</strong> enigmas da arte e da razão.<br>Continue assim, mestre!`;
  answerButtons.appendChild(scoreMsg);
  scoreMsg.addEventListener('mouseenter', () => playAudio(scoreSoms[score]));

  let medal = "", message = "", medalIdx = 0;
  if (score <= 5) {
    medal = "Aprendiz do Renascimento";
    message = "<br>Você está começando! <br>Continue estudando para descobrir mais sobre o Renascimento.";
    medalIdx = 0;
  } else if (score <= 10) {
    medal = "Artista Renascentista";
    message = "<br>Muito bom! <br>Você já entende bem o tema e mostra talento digno de um artista da época.";
    medalIdx = 1;
  } else {
    medal = "Gênio Renascentista";
    message = "<br>Excelente! <br>Você domina o assunto como um verdadeiro Leonardo da Vinci!";
    medalIdx = 2;
  }

  const resultMsg = document.createElement("p");
  resultMsg.innerHTML = `<strong>${medal}</strong><br>${message}`;
  resultMsg.classList.add("result-msg");
  answerButtons.appendChild(resultMsg);
  resultMsg.addEventListener('mouseenter', () => playAudio(medalSoms[medalIdx]));

  restartButton.style.display = "block";
}

  restartButton.addEventListener("click", () => {
    questionElement.style.display = "none";
    restartButton.style.display = "none";
    mainTitle.style.display = "block";
    startButton.style.display = "block";
    backButton.style.display = "block";
    answerButtons.innerHTML = "";
  });

  startButton.addEventListener("click", startQuiz);
  backButton.addEventListener("click", () => {
    window.location.href = "galeria.html";
  });

  // ===== HOVER NOS BOTÕES ESTÁTICOS =====
  const staticElements = {
    '#main-title': tituloSom,
    '#start-btn': startSom,
    '#back-btn': backSom,
    '#restart-btn': restartSom,
    '#continue-btn': continueSom
  };

  Object.entries(staticElements).forEach(([selector, audio]) => {
    const el = document.querySelector(selector);
    if (el) el.addEventListener('mouseenter', () => playAudio(audio));
  });

}); 