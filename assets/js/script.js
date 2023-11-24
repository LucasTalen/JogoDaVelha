var quantidade_de_sala = 0
let Jogador = null;
let Vencedor = null;
let JogadorSelecionado = document.getElementById('JogadorSelecionado');
let VencedorSelecionado = document.getElementById('VencedorSelecionado');
var verificar;

MudarJogador('X');

function EscolherQuadrado(id) {
    realizarAcao(token,id)
    if (Vencedor || document.getElementById(id).innerHTML !== '-') return ;
    if(verificar){
        console.log('entrei')
        verificar = false
        document.getElementById(id).innerHTML = Jogador;
        document.getElementById(id).style.color = 'black';

        Jogador = (Jogador === 'X') ? 'O' : 'X';

        MudarJogador(Jogador);
        checaVencedor();
        // document.getElementById(id).setAttribute('onclick', false);
    }else{
        console.log("Jogada invalida", verificar)
    }
}


function MudarJogador(Valor) 
{   
    Jogador = Valor;
    JogadorSelecionado.innerHTML = Jogador;
}

function checaVencedor() {
    const sequencias = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    for (const sequencia of sequencias) {
        const [a, b, c] = sequencia;
        const quadradoA = document.getElementById(a);
        const quadradoB = document.getElementById(b);
        const quadradoC = document.getElementById(c);

        if (ChecaSequencia(quadradoA, quadradoB, quadradoC)) {
            MudaCorQuadrado(quadradoA, quadradoB, quadradoC);
            MudarVencedor(quadradoA);
            return;
        }
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
    return Quadrado1.innerHTML !== '-' && Quadrado1.innerHTML === Quadrado2.innerHTML && Quadrado2.innerHTML === Quadrado3.innerHTML;
}


// ------------------------------------------------------

var token = criarToken()


function criarToken(){
    return Math.random().toString(20).substring(2);
}


function criarCodigoMultiplay(){
    return Math.random().toString(10).substring(10);
}
function criarSala(codigo,nomeSala,senhaSala){
    
    const baseUrl = 'https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha';
    const endpoint = `multiplay/criar_sala/${nomeSala}/${senhaSala}/?codigo=${codigo}`;
    const apiUrl = `${baseUrl}/${token}/${endpoint}`;

    const headers = {
    'ngrok-skip-browser-warning': 'true'
    };

    fetch(apiUrl, { headers })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Ocorreu um erro ao consumir a API:', error);
    });

}
function entrarSala(codigo){
    console.log("passou aqui")
    const apiUrl = `https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha/${token}/multiplay/entrar_sala/?codigo=${codigo}`;
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

function MostrarSala(){
    var modalSala = document.getElementById('salas');
    
        const apiUrl = `https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha/${token}/multiplay/mostrar_sala`;
        fetch(apiUrl, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
            .then(response => response.json())
            .then(data => {
                
                for(var salas in data) {
                    console.log(salas)
                    modalSala.innerHTML += `
                    <div class="player-container">
                        <span class="player-name">${data[salas]['nome']}</span>
                        <span>1/2</span>
                        <i class="lock-icon">🔒</i>
                        <button id=${salas} onclick='entrarSala(this.id)'>Entrar</button>
                    </div>
                    `
                }
                
                
            })
            .catch(error => {
                console.error('Ocorreu um erro ao consumir a API:', error);
            });
 
    
}






// ----------------------------------

function state(){
    var matrix_de_quadrados = []
    var estado = document.getElementsByClassName('Quadrado');
    for(var i = 0; i < estado.length; i++) {
        matrix_de_quadrados.push(estado[i].textContent)
    }
    var jogador_atual = document.getElementById('JogadorSelecionado').textContent
    return {matrix:matrix_de_quadrados, jogador:jogador_atual}
}

function realizarAcao(token,acao){
    var estado = state()
    const baseUrl = 'https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha';
    const endpoint = `fazer_acao/${token}/${[estado.matrix]}/${estado.jogador}/${acao}`;
    const apiUrl = `${baseUrl}/${endpoint}`;

    const headers = {
    'ngrok-skip-browser-warning': 'true'
    };

    fetch(apiUrl, { headers })
    .then(response => response.json())
    .then(data => {
        console.log(data.data, '|', typeof(data.data), '| function');
        // alert(data.data)
        verificar = data.data;
        console.log('fetch', verificar)
    })
    .catch(error => {
        console.error('Ocorreu um erro ao consumir a API:', error);
        return false;
    });

}

function acao(codigo,nomeSala,senhaSala){
    
    const baseUrl = 'https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha';
    const endpoint = `teste/${codigo}`;
    const apiUrl = `${baseUrl}/${token}/${endpoint}`;

    const headers = {
    'ngrok-skip-browser-warning': 'true'
    };

    fetch(apiUrl, { headers })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Ocorreu um erro ao consumir a API:', error);
    });

}