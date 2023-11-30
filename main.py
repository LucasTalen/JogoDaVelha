from player import realizar_jogada
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

salas = {}

@app.route('/api/jogo_da_velha/<token>/multiplay/criar_sala/<nomeSala>/', methods=['GET'])
def criarSala(token,nomeSala):
    codigo = request.args.get('codigo')
  
    if not codigo is salas:
        salas[codigo] = {}
        salas[codigo]['nome'] = nomeSala
        salas[codigo]['estado'] = ['-','-','-','-','-','-','-','-','-']
        salas[codigo]['jogador1'] = token
        salas[codigo]['jogador1-X_ou_O'] = 'X'
        salas[codigo]['ultima_jogada'] = '-'
        salas[codigo]['quantidade'] = 1
    print(salas)
    return 'succes'

@app.route('/api/jogo_da_velha/<token>/multiplay/entrar_sala/', methods=['GET'])
def entrarSala(token):
    codigo = request.args.get('codigo')
    salas[codigo]['jogador2'] = token
    salas[codigo]['jogador2-X_ou_O'] = 'O'
    salas[codigo]['quantidade'] = 2
    print(salas)
    return 'True'


@app.route('/api/jogo_da_velha/<token>/multiplay/mostrar_sala', methods=['GET'])
def mostrarSala(token):
    return jsonify(salas) 

@app.route('/api/jogo_da_velha/fazer_acao/<token>/<lista>/<acao>', methods=['GET'])
def fazerAcao(token,lista,acao):

    for codigo in salas:

        if salas[codigo]['jogador1'] == token or salas[codigo]['jogador2'] == token:
            if salas[codigo]['ultima_jogada'] == '-':
                if salas[codigo]['jogador1'] == token:
                    salas[codigo]['ultima_jogada'] = 'X'
                    vez = salas[codigo]['jogador1-X_ou_O']  
                elif salas[codigo]['jogador2'] == token:
                    salas[codigo]['ultima_jogada'] = 'O'
                    vez = salas[codigo]['jogador2-X_ou_O']  
                
            else:
                if salas[codigo]['jogador1'] == token:
                    if  salas[codigo]['jogador1-X_ou_O'] ==  salas[codigo]['ultima_jogada']:
                        return False
                    else:
                        salas[codigo]['ultima_jogada'] = 'X'
                        vez = salas[codigo]['jogador1-X_ou_O'] 
                        
            
                elif salas[codigo]['jogador2'] == token:
                    if  salas[codigo]['jogador2-X_ou_O'] ==  salas[codigo]['ultima_jogada']:
                        return False
                    else:
                        salas[codigo]['ultima_jogada'] = 'O'
                        vez = salas[codigo]['jogador2-X_ou_O'] 
                





    lista1 = lista.split(',')

    realiza = realizar_jogada(token, vez, int(acao), lista1)

    print(realiza)
    if realiza:
        if salas[codigo]['jogador1'] == token:
            print(salas[codigo]['estado'][int(acao)])
            salas[codigo]['estado'][int(acao)] = 'X'
        elif salas[codigo]['jogador2'] == token:
            print(salas[codigo]['estado'][int(acao)])

            salas[codigo]['estado'][int(acao)] = 'O'


    return {"data": realiza}   



@app.route('/api/jogo_da_velha/multiplay/mostrar_estado/<salaAtual>', methods=['GET'])
def atualizarEstado(salaAtual):
    estado = salas[salaAtual]['estado']
    print(estado)
    return estado



app.run(debug=True,port=80)

                                                                                                   



