var modal = document.getElementById("ModalCriarSala");

var btn = document.getElementById("ButtonModalCriarSalas");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var btnCriarSala = document.getElementById("btnCriarSala");

btnCriarSala.onclick = () => {
  
    var Sala = document.getElementById("inputSala").value
    var codigo = criarCodigoMultiplay()
    

    criarSala(codigo, Sala)
    modal.style.display = "none";
    
}


// ---------------
var modal_salas = document.getElementById("ModalVerSala");

var span1 = document.getElementsByClassName("close")[1];

var btn1 = document.getElementById("ButtonModalVerSalas");

var modalSala = document.getElementById('salas');


btn1.onclick = function() {
  modal_salas.style.display = "block";
  MostrarSala()
}

span1.onclick = function() {
  modal_salas.style.display = "none";
  modalSala.innerHTML = ''
}

window.onclick = function(event) {
  if (event.target == modal_salas) {
    modal_salas.style.display = "none";
    modalSala.innerHTML = ''

  }
}




