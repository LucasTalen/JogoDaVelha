import player 
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

salas = {}

@app.route('/api/jogo_da_velha/<token>/multiplay/criar_sala/', methods=['GET'])
def criarSala(token):
    codigo = request.args.get('codigo')
    print(codigo)
    if not codigo is salas:
        salas[codigo] = []
    return 'succes'

@app.route('/api/jogo_da_velha/<token>/multiplay//entrar_sala', methods=['GET'])
def entrarSala(token):
    codigo = request.args.get('codigo')
    if codigo is salas:
        return 'succes'
    




app.run(debug=True,port=80)




# @app.route("/api/<token>/", methods=['GET'])
# def hello_world(token):
#     url = request.args.get('url')
#     print(url)
#     resposta = verificarURL(token,url)
#     return resposta

#  const apiUrl = `https://upright-filly-upward.ngrok-free.app/api/${token}/?url=${url}`;
