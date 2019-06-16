import { Celula } from './celula';

export class Jogador {

    public id: number;

    public nome: string;

    public jogadas: Array<Celula>;

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
        this.jogadas = new Array<Celula>();
    }

}
