import { TestBed } from '@angular/core/testing';

import { TabuleiroService } from './tabuleiro.service';
import { Tabuleiro } from '../domain/tabuleiro';

describe('TabuleiroService', () => {

  let service: TabuleiroService;
  let tabuleiro: Tabuleiro;
  let spy: any;

  beforeEach(() => {
    service = new TabuleiroService();
    tabuleiro = new Tabuleiro();
  });

  it('Existem jogadas disponíveis', () => {
    spy = spyOn(service, 'existemJogadasDisponiveis').and.returnValue(true);
    expect(service.existemJogadasDisponiveis(tabuleiro)).toBeTruthy();
  });

  it('Não existem jogadas disponíveis', () => {
    spy = spyOn(service, 'existemJogadasDisponiveis').and.returnValue(false);
    expect(service.existemJogadasDisponiveis(tabuleiro)).toBeFalsy();
  });

});
