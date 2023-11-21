// Get the modal
var modal = document.getElementById("ModalCriarSala");

// Get the button that opens the modal
var btn = document.getElementById("ButtonModalCriarSalas");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var btnCriarSala = document.getElementById("btnCriarSala");

btnCriarSala.onclick = () => {
  
    var Sala = document.getElementById("inputSala").value
    var Senha = document.getElementById("inputSenha").value
    var codigo = criarCodigoMultiplay()
    

    criarSala(codigo, Sala, Senha)

    alert(Sala)
    alert(Senha)
}


// ---------------
var modal_salas = document.getElementById("ModalVerSala");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
var btn1 = document.getElementById("ButtonModalVerSalas");

btn1.onclick = function() {
  modal_salas.style.display = "block";
  MostrarSala()
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal_salas.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_salas) {
    modal_salas.style.display = "none";
  }
}
