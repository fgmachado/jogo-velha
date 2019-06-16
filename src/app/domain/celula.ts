import { Jogador } from './Jogador';

export class Celula {

    public posicao: number;

    public jogador: Jogador;

    constructor(posicao: number) {
        this.posicao = posicao;
    }

}