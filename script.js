
let modoAcessivel = false;
let falaAtiva = false;
// Controle simples para evitar leitura repetida em loops rápidos
let lastSpokenText = '';
let lastSpokenTime = 0;
const SPEAK_DEBOUNCE_MS = 1200; // tempo mínimo entre leituras iguais

// Ativa/desativa modo acessível e anuncia (forçado)
function ativarAcessibilidade() {
  modoAcessivel = !modoAcessivel;
  document.body.classList.toggle('acessivel');

  const mensagem = modoAcessivel
    ? 'Modo acessibilidade ativado. Texto ampliado e contraste aumentado.'
    : 'Modo acessibilidade desativado.';

  falar(mensagem, true);
}

// Ativa/desativa sistema de fala e atualiza texto do botão
function ativarFala() {
  falaAtiva = !falaAtiva;

  // atualiza label do botão: procura por .fala-text ou último span
  const btn = document.querySelector('.fala');
  if (btn) {
    let label = btn.querySelector('.fala-text');
    if (!label) {
      const spans = btn.querySelectorAll('span');
      if (spans.length > 0) label = spans[spans.length - 1];
    }
    if (label) label.textContent = falaAtiva ? 'Desativar Fala' : 'Ativar Fala';
    btn.setAttribute('aria-pressed', falaAtiva ? 'true' : 'false');
  }

  if (falaAtiva) {
    falar('Sistema de fala ativado.', true);
  } else {
    // cancela qualquer fala em andamento e anuncia desativação
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    falar('Sistema de fala desativado.', true);
  }
}

// Função de fala: só fala se falaAtiva === true, a não ser que force === true
function falar(texto, force = false) {
  if (!force && !falaAtiva) return;

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'pt-BR';
    window.speechSynthesis.speak(u);
  } else {
    if (force || falaAtiva) alert(texto);
  }
}

// Inicializa ouvintes que disparam fala em hover/focus nos botões e na seleção de texto
function initFalaInteractions() {
  // falar ao passar o mouse ou focar cada botão .tema
  const temas = document.querySelectorAll('.temas .tema');
  temas.forEach(el => {
    const speakText = () => {
      const txt = (el.innerText || el.textContent || '').trim();
      if (!txt) return;
      const now = Date.now();
      if (txt === lastSpokenText && now - lastSpokenTime < SPEAK_DEBOUNCE_MS) return;
      lastSpokenText = txt;
      lastSpokenTime = now;
      falar(txt);
    };
    el.addEventListener('mouseenter', speakText);
    el.addEventListener('focus', speakText);
    // também suportar teclado (ao pressionar Enter ou Space o clique continuará funcionando)
  });

  // falar quando o usuário seleciona (destaca) texto — usamos mouseup e keyup para reduzir ruído
  const maybeSpeakSelection = () => {
    const sel = (document.getSelection && document.getSelection().toString().trim()) || '';
    if (!sel) return;
    const now = Date.now();
    if (sel === lastSpokenText && now - lastSpokenTime < SPEAK_DEBOUNCE_MS) return;
    lastSpokenText = sel;
    lastSpokenTime = now;
    // seleção é algo que o usuário pediu, mas respeitamos o estado de fala (não forçamos)
    falar(sel);
  };

  document.addEventListener('mouseup', () => setTimeout(maybeSpeakSelection, 50));
  document.addEventListener('keyup', (e) => {
    // keys como Shift/Arrow alteram seleção; tratamos qualquer keyup
    setTimeout(maybeSpeakSelection, 50);
  });
}

// iniciar ouvintes quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFalaInteractions);
} else {
  initFalaInteractions();
}