let mira = document.getElementById('mira'); // Pega o elemento #mira do HTML
const telaDeJogo = document.getElementById('jogo');
const pontuacaoDisplay = document.getElementById('pontuacaoDisplay');
const tempoDisplay = document.getElementById('tempoDisplay');

let pontuacao = 0;
let tempoParaTerminar = 30;
let jogoInterval;
let jogoRodando = false;


window.addEventListener('mousemove', (e) => {
    if (!mira) return; 

    mira.style.left = `${e.clientX}px`;
    mira.style.top = `${e.clientY}px`;
});


telaDeJogo.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});



function criarAlvo() {
    if (!jogoRodando) return;

    const alvo = document.createElement('div');
    alvo.classList.add('alvo');
    const tamanhoAlvo = 20;
    const maxX = telaDeJogo.clientWidth - tamanhoAlvo;
    const maxY = telaDeJogo.clientHeight - tamanhoAlvo;
    const posX = Math.random() * maxX;
    const posY = Math.random() * maxY;

    alvo.style.left = `${posX}px`;
    alvo.style.top = `${posY}px`;
    
    alvo.addEventListener('click', () => {
    pontuacao++;
    pontuacaoDisplay.textContent = pontuacao;

    alvo.classList.add('hit');
    alvo.style.pointerEvents = 'none'; 

    setTimeout(() => {
        if (alvo.parentNode) {
            alvo.remove(); 
            criarAlvo(); 
        }
    }, 200); 
});
    telaDeJogo.appendChild(alvo);

   
    setTimeout(() => {
        
        if (alvo.parentNode === telaDeJogo && !alvo.classList.contains('hit')) {
            alvo.remove();
            if (jogoRodando) {
                criarAlvo();
            }
        }
    }, 1200); 
}

function atualizarCronometro() {
    tempoParaTerminar--;
    tempoDisplay.textContent = tempoParaTerminar;

    if (tempoParaTerminar <= 0) {
        clearInterval(jogoInterval);
        fimDeJogo();
    }
}

function fimDeJogo() {
    jogoRodando = false;
    telaDeJogo.innerHTML = '<p class="game-over" style="color: white; font-size: 2em; margin-top: 250px;">FIM DE JOGO!</p>'; 
    alert(`Fim de jogo! Sua pontuação final foi: ${pontuacao}`);
}


window.iniciarJogo = function() {
    if (jogoRodando) return;
    
    console.log("Jogo Iniciado e script carregado com sucesso!");

    
    pontuacao = 0;
    tempoParaTerminar = 30;
    pontuacaoDisplay.textContent = pontuacao;
    tempoDisplay.textContent = tempoParaTerminar;
    
    
    telaDeJogo.innerHTML = '';
    
    jogoRodando = true;
    
   
    jogoInterval = setInterval(atualizarCronometro, 1000);

    
    criarAlvo();
}