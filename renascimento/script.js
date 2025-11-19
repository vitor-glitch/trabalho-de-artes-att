document.addEventListener('DOMContentLoaded', () => {
    const texto = document.querySelector('.abertura');
    const conteudoOriginal = texto.innerHTML;
    texto.innerHTML = '';
    
    // Animação de digitação
    let i = 0;
    const velocidadeDigitacao = 2000 / conteudoOriginal.length; // Distribuir ao longo de 2 segundos

    function digitacao() {
        if (i < conteudoOriginal.length) {
            texto.innerHTML += conteudoOriginal.charAt(i);
            i++;
            setTimeout(digitacao, velocidadeDigitacao);
        }
    }

    digitacao();

    // Scroll após 4 segundos (2s da animação + 2s de intervalo)
    setTimeout(() => {
        window.scrollTo({
            top: window.innerHeight * 1.05,
            behavior: 'smooth'
        });
    }, 3500);
});
// Audios
const audiosFolder = "audios/";
let botaoDeTesteSom = new Audio(audiosFolder + "file-2025-11-7-9-58-0.mp3");

// Elementos para audio
const botaodeteste = document.getElementById('teste');
const botaodeteste2 = document.getElementById('teste2');

botaoDeTesteSom.load();

botaodeteste.addEventListener('mouseenter', () => {
    if (botaoDeTesteSom.paused && botaoDeTesteSom.currentTime === 0 || botaoDeTesteSom.ended) {
        botaoDeTesteSom.currentTime = 0;
        botaoDeTesteSom.play().catch(error => console.error("Erro ao tocar áudio:", error));
    }
});