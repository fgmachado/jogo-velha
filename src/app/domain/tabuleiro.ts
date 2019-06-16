import { Celula } from './celula';

export class Tabuleiro {

    public celulas: Array<Celula>;

    constructor() {
        this.celulas = new Array<Celula>();

        for(let i: number = 1; i <= 9; i++) {
            this.celulas.push(new Celula(i));
        }
    }

}