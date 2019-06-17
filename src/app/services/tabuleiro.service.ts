import { Injectable, Output, EventEmitter } from '@angular/core';
import { Tabuleiro } from '../domain/tabuleiro';
import { Resultado } from '../domain/resultados';
import { Jogador } from '../domain/Jogador';
import { Celula } from '../domain/celula';

@Injectable({
  providedIn: 'root'
})
export class TabuleiroService {

  private resultado: Resultado;

  private partidaAberta: boolean;

  private jogadores: Array<Jogador>;

  private jogadorAtual: Jogador;

  public fimPartida: EventEmitter<string>;

  constructor() {
    this.fimPartida = new EventEmitter();
  }

  iniciarJogo(jogadores: Array<Jogador>): void {
    this.resultado = new Resultado();
    this.partidaAberta = true;
    this.jogadores = jogadores;
    this.jogadorAtual = this.jogadores.find(jogador => jogador.id === 1);
  }

  isPartidaAberta(): boolean {
    return this.partidaAberta;
  }

  existemJogadasDisponiveis(tabuleiro: Tabuleiro): boolean {
    return tabuleiro.celulas.filter(celula => celula.jogador == null).length > 0;
  }

  registrarJogada(tabuleiro: Tabuleiro, celula: Celula): boolean {
    if (this.isPartidaAberta()) {
      if (celula.jogador == null) {
        celula.jogador = this.jogadorAtual;
        this.jogadorAtual.jogadas.push(celula);
        this.verificarVencedor(this.jogadorAtual);
  
        if (tabuleiro.celulas.filter(celula => celula.jogador == null).length === 0) {
          this.fimPartida.emit('Não há mais jogadas disponíveis.');
          this.partidaAberta = false;
        }
  
        if (this.jogadorAtual.nome === 'Jogador 1') {
          this.jogadorAtual = this.jogadores.find(jogador => jogador.id === 2);
        } else {
          this.jogadorAtual = this.jogadores.find(jogador => jogador.id === 1);
        }
  
        return true;
      }
    }      
  }

  verificarVencedor(jogador: Jogador): void {
    this.resultado.jogadas.forEach(resultados => {
      let totalAcertos = 0;

      resultados.forEach(resultado => {
        jogador.jogadas.forEach(jogada => {
          if (resultado === jogada.posicao) {
            totalAcertos++;
          }
        });

        if (totalAcertos === 3) {
          this.partidaAberta = false;
          this.fimPartida.emit(`O jogador ${jogador.nome} ganhou!`);
        }
      });
    });
  }

}
