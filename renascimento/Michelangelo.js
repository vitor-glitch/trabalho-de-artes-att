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


