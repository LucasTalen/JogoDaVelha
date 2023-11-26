def realizar_jogada(token,jogador_atual,acao,estado_do_jogo):
    #if jogador_atual['token'] != token : return
    print(estado_do_jogo[acao])
    if '-'  in estado_do_jogo[acao] : 
        return True
    else:
        return False