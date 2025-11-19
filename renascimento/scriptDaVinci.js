const abrir = document.getElementById('abrirTexto');
const modal = document.getElementById('janela');
const fechar = document.getElementById('fecharTexto');

abrir.onclick = () => {
    modal.style.display = 'flex';
};

fechar.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
};

// Efeito de carregamento antes de trocar de página
const nextPage = document.getElementById('next-page');
const loadingScreen = document.getElementById('loading-screen');

if (nextPage) {
  nextPage.addEventListener('click', (e) => {
    e.preventDefault(); // impede redirecionamento imediato
    loadingScreen.style.display = 'flex'; // mostra o loading
    setTimeout(() => {
      window.location.href = "Michelangelo.html"; // troca a página após 2 segundos
    }, 1000);
  });
}

