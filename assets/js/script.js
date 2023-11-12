let Jogador = null;
let Vencedor = null;
let JogadorSelecionado = document.getElementById('JogadorSelecionado');
let VencedorSelecionado = document.getElementById('VencedorSelecionado');




MudarJogador('X');

function EscolherQuadrado(id) 
{
    if (Vencedor !== null) 
    {
        return;
    }

    let Quadrado = document.getElementById(id);
    if (Quadrado.innerHTML !== '-') 
    {
        return;
    }

    Quadrado.innerHTML = Jogador;
    Quadrado.style.color = 'black';

    if (Jogador === 'X') 
    {
        Jogador = 'O';
    } 
    else 
    {
        Jogador = 'X';
    }

    MudarJogador(Jogador);
    checaVencedor();
}

function MudarJogador(Valor) 
{
    Jogador = Valor;
    JogadorSelecionado.innerHTML = Jogador;
}

function checaVencedor()
{
    let Quadrado1 = document.getElementById(1);
    let Quadrado2 = document.getElementById(2);
    let Quadrado3 = document.getElementById(3);
    let Quadrado4 = document.getElementById(4);
    let Quadrado5 = document.getElementById(5);
    let Quadrado6 = document.getElementById(6);
    let Quadrado7 = document.getElementById(7);
    let Quadrado8 = document.getElementById(8);
    let Quadrado9 = document.getElementById(9);

    if (ChecaSequencia(Quadrado1, Quadrado2, Quadrado3)) 
    {
        MudaCorQuadrado(Quadrado1, Quadrado2, Quadrado3);
        MudarVencedor(Quadrado1);
        return;
    }

    if (ChecaSequencia(Quadrado4, Quadrado5, Quadrado6)) 
    {
        MudaCorQuadrado(Quadrado4, Quadrado5, Quadrado6);
        MudarVencedor(Quadrado4);
        return;
    }

    if (ChecaSequencia(Quadrado7, Quadrado8, Quadrado9)) 
    {
        MudaCorQuadrado(Quadrado7, Quadrado8, Quadrado9);
        MudarVencedor(Quadrado7);
        return;
    }

    if (ChecaSequencia(Quadrado1, Quadrado4, Quadrado7)) 
    {
        MudaCorQuadrado(Quadrado1, Quadrado4, Quadrado7);
        MudarVencedor(Quadrado1);
        return;
    }

    if (ChecaSequencia(Quadrado2, Quadrado5, Quadrado8)) 
    {
        MudaCorQuadrado(Quadrado2, Quadrado5, Quadrado8);
        MudarVencedor(Quadrado2);
        return;
    }

    if (ChecaSequencia(Quadrado3, Quadrado6, Quadrado9)) 
    {
        MudaCorQuadrado(Quadrado3, Quadrado6, Quadrado9);
        MudarVencedor(Quadrado3);
        return;
    }

    if (ChecaSequencia(Quadrado1, Quadrado5, Quadrado9)) 
    {
        MudaCorQuadrado(Quadrado1, Quadrado5, Quadrado9);
        MudarVencedor(Quadrado1);
        return;
    }

    if (ChecaSequencia(Quadrado3, Quadrado5, Quadrado7)) 
    {
        MudaCorQuadrado(Quadrado3, Quadrado5, Quadrado7);
        MudarVencedor(Quadrado3);
    }
}

function MudarVencedor(Quadrado) 
{
    Vencedor = Quadrado.innerHTML;
    VencedorSelecionado.innerHTML = Vencedor;
    alert("O vencedor foi o : " + Vencedor)
}

function MudaCorQuadrado(Quadrado1, Quadrado2, Quadrado3) 
{
    Quadrado1.style.background = 'green';
    Quadrado2.style.background = 'green';
    Quadrado3.style.background = 'green';
}

function ChecaSequencia(Quadrado1, Quadrado2, Quadrado3) 
{
    let EIgual = false;

    if (Quadrado1.innerHTML !== '-' && Quadrado1.innerHTML === Quadrado2.innerHTML && Quadrado2.innerHTML === Quadrado3.innerHTML) 
    {
        EIgual = true;
    }

    return EIgual;
}

function Reiniciar()
{   
    location.reload();
}
// ------------------------------------------------------

token = criarToken()


function criarToken(){
    token =  Math.random().toString(20).substring(2);
}

function criarMultiplay(){
    codigo = criarCodigoMultiplay()
    criarSala(codigo)
}
function criarCodigoMultiplay(){
    return Math.random().toString(10).substring(10);
}
function criarSala(codigo){
    
    const apiUrl = `https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha/${token}/multiplay/?codigo=${codigo}/criar_sala`;
    fetch(apiUrl, {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
        .then(response => response.text())
        .then(data => {
            console.log(data)
            
        })
        .catch(error => {
            console.error('Ocorreu um erro ao consumir a API:', error);
        });
}
function entrarSala(codigo){
    
    const apiUrl = `https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha/${token}/multiplay/?codigo=${url}/entrar_sala`;
    fetch(apiUrl, {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
        .then(response => response.text())
        .then(data => {
            console.log(data)
            
        })
        .catch(error => {
            console.error('Ocorreu um erro ao consumir a API:', error);
        });
}
