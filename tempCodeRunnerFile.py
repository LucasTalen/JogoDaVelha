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
                

