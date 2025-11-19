(() => {
    // Seleciona as divs cont1..cont6 (ignora ausentes)
    const slides = [];
    for (let i = 1; i <= 6; i++) {
        const el = document.getElementById('cont' + i);
        if (el) slides.push(el);
    }
    if (slides.length === 0) return; // nada a fazer

    // Seleciona setas
    const prevBtn = document.getElementById('setaE');
    const nextBtn = document.getElementById('setaD');

    let current = 0;

    // Mostra apenas o slide atual
    function show(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((s, i) => {
            s.style.display = i === current ? 'block' : 'none';
        });
    }

    // Navega para anterior/próximo
    function prev() { show(current - 1); }
    function next() { show(current + 1); }

    // Inicializa
    show(0);

    // Event listeners nas setas (se existirem)
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Suporte por teclado (setas esquerda/direita)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    // Toque simples: swipe left/right (móvel)
    let startX = null;
    const threshold = 40; // pixels mínimos para considerar swipe
    const container = slides[0].parentElement || document;
    container.addEventListener('touchstart', (e) => {
        startX = e.touches && e.touches[0] ? e.touches[0].clientX : null;
    }, {passive: true});
    container.addEventListener('touchend', (e) => {
        if (startX == null) return;
        const endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : null;
        if (endX == null) return;
        const diff = endX - startX;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) prev(); else next();
        }
        startX = null;
    }, {passive: true});
//  AUDIOS
const audiosFolder = "audios_galeria/";
// Lista dos áudios (alterar nomes aqui)
let audio1 = new Audio(audiosFolder + "audios_galeira/monalisa.mp3");  //mona lisa
let audio2 = new Audio(audiosFolder + "audios_galeira/ultima_ceia.mp3");  // ceia
let audio3 = new Audio(audiosFolder + "audios_galeira/vitruviano.mp3");  // homi vitruviano
let audio4 = new Audio(audiosFolder + "audios_galeira/david.mp3");  // David
let audio5 = new Audio(audiosFolder + "audios_galeira/adao.mp3");  // adao
let audio6 = new Audio(audiosFolder + "audios_galeira/moises.mp3");  // moises

// Carregar todos os áudios
[audio1, audio2, audio3, audio4, audio5, audio6].forEach(a => a.load());

//  (IDs dos botões)
const btn1 = document.getElementById('btn1');  // mona lisa
const btn2 = document.getElementById('btn2');  // ceia
const btn3 = document.getElementById('btn3');  // homi vitruviano
const btn4 = document.getElementById('btn4');  // David
const btn5 = document.getElementById('btn5');  // adao
const btn6 = document.getElementById('btn6');  // 

//  FUNÇÃO PADRÃO PARA TOCAR
function tocarAudio(audio) {
    if ((audio.paused && audio.currentTime === 0) || audio.ended) {
        audio.currentTime = 0;
        audio.play().catch(error => console.error("Erro ao tocar áudio:", error));
    }
}

//  EVENTOS DE MOUSE
btn1.addEventListener('mouseenter', () => tocarAudio(audio1));
btn2.addEventListener('mouseenter', () => tocarAudio(audio2));
btn3.addEventListener('mouseenter', () => tocarAudio(audio3));
btn4.addEventListener('mouseenter', () => tocarAudio(audio4));
btn5.addEventListener('mouseenter', () => tocarAudio(audio5));
btn6.addEventListener('mouseenter', () => tocarAudio(audio6));

})();