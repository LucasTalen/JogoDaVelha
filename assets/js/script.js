
var quantidade_de_sala = 0
var salaAtual = ' ';
let Jogador = null;
let Vencedor = null;
let JogadorSelecionado = document.getElementById('JogadorSelecionado');
let VencedorSelecionado = document.getElementById('VencedorSelecionado');
var verificar;
var estar_em_sala = false
var audio = document.getElementById('music-fundo')
audio.volume = 0.2

function atualizarTela(lista) {

    const quadrados = document.getElementsByClassName('Quadrado');

    if (quadrados.length !== lista.length) {
        console.error('Tamanho da lista e número de quadrados não coincidem.');
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        quadrados[i].textContent = lista[i];
    }
}



var intevalo = setInterval(function() {
    if (estar_em_sala){
        atualizar_lista()
        if (checaVencedor()){
            clearInterval(intevalo)
            
        }
    }
    
}, 1500);

function atualizar_lista(){
    const baseUrl = 'https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha';
    const endpoint = `multiplay/mostrar_estado/${salaAtual}`;
    const apiUrl = `${baseUrl}/${endpoint}`;

    const headers = {
    'ngrok-skip-browser-warning': 'true'
    };

    fetch(apiUrl, { headers })
    .then(response => response.json())
    .then(data => {
        console.log(typeof(data))
        atualizarTela(data);
    })
    .catch(error => {
        console.error('Ocorreu um erro ao consumir a API:', error);
    });


}






function EscolherQuadrado(id) {
    realizarAcao(token,id)
    if (Vencedor || document.getElementById(id).innerHTML !== '-') return ;
    if(verificar){
        console.log('entrei')
        verificar = false
        document.getElementById(id).innerHTML = Jogador;
        document.getElementById(id).style.color = 'black';

  
        checaVencedor();
    }else{
        console.log("Jogada invalida", verificar)
    }
}

function checaVencedor() {
    const sequencias = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]  
    ];

    for (const sequencia of sequencias) {
        const [a, b, c] = sequencia;
        const quadradoA = document.getElementById(a);
        const quadradoB = document.getElementById(b);
        const quadradoC = document.getElementById(c);

        if (ChecaSequencia(quadradoA, quadradoB, quadradoC)) {
            MudaCorQuadrado(quadradoA, quadradoB, quadradoC);
            MudarVencedor(quadradoA);
            return true;
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
function criarSala(codigo,nomeSala){
    if(estar_em_sala){
        alert("Você Já Estar Em Uma Sala!\n Reinicie Para Criar Outra Sala")
        return
    }
    salaAtual = codigo


    const baseUrl = 'https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha';
    const endpoint = `multiplay/criar_sala/${nomeSala}/?codigo=${codigo}`;
    const apiUrl = `${baseUrl}/${token}/${endpoint}`;

    const headers = {
    'ngrok-skip-browser-warning': 'true'
    };

    fetch(apiUrl, { headers })
    .then(response => response.text())
    .then(data => {
        estar_em_sala = true
        console.log(data);
    })
    .catch(error => {
        console.error('Ocorreu um erro ao consumir a API:', error);
    });

}
function entrarSala(codigo,quantidade_na_sala){
    if(estar_em_sala){
        alert("Você Já Estar Em Uma Sala!\n Reinicie Para Criar Outra Sala")
        return
    }
    else if (quantidade_na_sala > 1){
        alert("Sala Cheia")
        return
    }
    salaAtual = codigo
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
            estar_em_sala = true
            
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
                    if (data[salas]['quantidade'] == 2) {
                        var emoji = "🔒"
                    }else{
                        var emoji = "🔓"
                    }
                    modalSala.innerHTML += `
                    <div class="player-container">
                        <span class="player-name">${data[salas]['nome']}</span>
                        <span>${data[salas]['quantidade']}/2</span>
                        <i class="lock-icon">${emoji}</i>
                        <button id=${salas} onclick='entrarSala(this.id,${data[salas]['quantidade']})'>Entrar</button>
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
    return {matrix:matrix_de_quadrados}
}

function realizarAcao(token,acao){
    var estado = state()
    const baseUrl = 'https://upright-filly-upward.ngrok-free.app/api/jogo_da_velha';
    const endpoint = `fazer_acao/${token}/${[estado.matrix]}/${acao}`;
    const apiUrl = `${baseUrl}/${endpoint}`;

    const headers = {
    'ngrok-skip-browser-warning': 'true'
    };

    fetch(apiUrl, { headers })
    .then(response => response.json())
    .then(data => {
        console.log(data)
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

function acao(codigo){
    
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