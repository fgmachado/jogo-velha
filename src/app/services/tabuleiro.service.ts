import { Injectable } from '@angular/core';
import { Tabuleiro } from '../domain/tabuleiro';

@Injectable({
  providedIn: 'root'
})
export class TabuleiroService {

  constructor() { }

  existemJogadasDisponiveis(tabuleiro: Tabuleiro): boolean {
    return tabuleiro.celulas.filter(celula => celula.jogador == null).length > 0;
  }

}
