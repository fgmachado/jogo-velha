import { Component, OnInit } from '@angular/core';
import { Tabuleiro } from '../domain/tabuleiro';
import { Celula } from '../domain/celula';
import { Jogador } from '../domain/Jogador';
import { Resultado } from '../domain/resultados';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.css']
})
export class TabuleiroComponent implements OnInit {

  public tabuleiro: Tabuleiro;

  private resultado: Resultado;

  private partidaAberta: boolean;

  private jogadores: Array<Jogador>;

  private jogadorAtual: Jogador;

  constructor(private modalService: NgbModal) {
    this.iniciarJogo();
  }

  ngOnInit() { }

  iniciarJogo(): void {
    this.resultado = new Resultado();
    this.partidaAberta = true;
    this.tabuleiro = new Tabuleiro();
    this.jogadores = new Array<Jogador>(new Jogador(1, 'Jogador 1'), new Jogador(2, 'Jogador 2'));
    this.jogadorAtual = this.jogadores.find(jogador => jogador.id === 1);
  }

  registrarJogada(celula: Celula): void {
    if (this.partidaAberta) {
      if (this.existemJogadasDisponiveis()) {
        if (celula.jogador == null) {
          celula.jogador = this.jogadorAtual;
          this.jogadorAtual.jogadas.push(celula);
          this.verificarVencedor(this.jogadorAtual);
  
          if (this.jogadorAtual.nome === 'Jogador 1') {
            this.jogadorAtual = this.jogadores.find(jogador => jogador.id === 2);
          } else {
            this.jogadorAtual = this.jogadores.find(jogador => jogador.id === 1);
          }
        }
      } else {
        this.partidaAberta = false;
        let modal = this.modalService.open(ModalComponent, { size: "lg" })
        modal.componentInstance.titulo = "Partida encerrada!";
        modal.componentInstance.mensagem = `Não existem jogadas disponíveis`;
      }
    }      
  }

  existemJogadasDisponiveis(): boolean {
    return this.tabuleiro.celulas.filter(celula => celula.jogador == null).length > 0;
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
          let modal = this.modalService.open(ModalComponent, { size: "lg" })
          modal.componentInstance.titulo = "Partida encerrada!";
          modal.componentInstance.mensagem = `O jogador ${jogador.nome} ganhou!`;
        }
      });
    });
  }

}
