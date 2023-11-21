from player import realizar_jogada
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

salas = {}

@app.route('/api/jogo_da_velha/<token>/multiplay/criar_sala/<nomeSala>/<senhaSala>/', methods=['GET'])
def criarSala(token,nomeSala,senhaSala):
    codigo = request.args.get('codigo')
    # print(codigo)
    # print('---------')
    # print(token)
    if not codigo is salas:
        salas[codigo] = {}
        salas[codigo]['nome'] = nomeSala
        salas[codigo]['senha'] = senhaSala
        salas[codigo]['jogador1'] = token

    return 'succes'

@app.route('/api/jogo_da_velha/<token>/multiplay/entrar_sala', methods=['GET'])
def entrarSala(token):
    codigo = request.args.get('codigo')
    # if codigo is salas:
    #     return 'succes'
    return 'False'

@app.route('/api/jogo_da_velha/<token>/multiplay/mostrar_sala', methods=['GET'])
def mostrarSala(token):
    return jsonify(salas) 

@app.route('/api/jogo_da_velha/fazer_acao/<token>/<lista>/<jogador_atual>/<acao>', methods=['GET'])
def fazerAcao(token,lista,jogador_atual,acao):
    jogadorAtual = {token: jogador_atual}
    lista1 = lista.split(',')
    # print(token, jogador_atual, lista1, acao)
    # print(type(lista1))
    realiza = realizar_jogada(token, jogadorAtual, int(acao), lista1)
    # print(lista1)
    print(realiza)
    return {"data": realiza}                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

app.run(debug=True,port=80)

                                                                                                   



#  const apiUrl = `https://upright-filly-upward.ngrok-free.app/api/${token}/?url=${url}`;
