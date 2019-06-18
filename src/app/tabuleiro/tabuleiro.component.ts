import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Tabuleiro } from '../domain/tabuleiro';
import { Celula } from '../domain/celula';
import { Jogador } from '../domain/Jogador';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../shared/modal/modal.component';
import { TabuleiroService } from '../services/tabuleiro.service';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.css']
})
export class TabuleiroComponent implements OnInit {

  public tabuleiro: Tabuleiro;

  @Input()
  public fimPartida: string;

  public partidaEncerrada: boolean;

  constructor(private tabuleiroService: TabuleiroService, private modalService: NgbModal) {
    this.tabuleiro = new Tabuleiro();
    this.iniciarJogo();
  }

  ngOnInit() {
    this.tabuleiroService.fimPartida.subscribe((mensagem: string) => {
      this.partidaEncerrada = true;
      let modal = this.modalService.open(ModalComponent, { size: "lg" })
      modal.componentInstance.titulo = "Partida encerrada!";
      modal.componentInstance.mensagem = mensagem;
    });
  }

  iniciarJogo(): void {
    this.partidaEncerrada = false;
    this.tabuleiro = new Tabuleiro();
    this.tabuleiroService.iniciarJogo(new Array<Jogador>(new Jogador(1, 'Jogador 1'), new Jogador(2, 'Jogador 2')));
  }

  registrarJogada(celula: Celula): void {
    if (!this.tabuleiroService.registrarJogada(this.tabuleiro, celula)) {
      let modal = this.modalService.open(ModalComponent, { size: "lg" })
      modal.componentInstance.titulo = "Partida encerrada!";
      modal.componentInstance.mensagem = `Não existem jogadas disponíveis`;
    }
  }

}
