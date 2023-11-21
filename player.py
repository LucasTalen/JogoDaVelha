def realizar_jogada(token=None,jogador_atual={},acao=0,estado_do_jogo=None):
    if jogador_atual['token'] != token : return
    print(estado_do_jogo[acao])
    if '-'  in estado_do_jogo[acao] : 
        return True
    else:
        return False