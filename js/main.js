(function () {
    'use strict';

    const simboloJogadorUm = '<i class="fas fa-times">';
    const simboloJogadorDois = '<i class="fas fa-circle"></i>';
    let jogadasJogadorUm = [];
    let jogadasJogadorDois = [];

    const resultados = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    
    // Click das posições do tabuleiro
    $('.tabuleiro a').click(function () {
        let partidaAberta = $('#partidaAberta').val();

        if (partidaAberta == 'true') {
            let jogada = $(this).data('posicao');
            let jogadorAtual = $('#jogadorAtual').val();

            $(this).html(jogadorAtual === '1' ? simboloJogadorUm : simboloJogadorDois);

            adicionarJogadaAoJogador(jogadorAtual, jogada, jogadorAtual === '1' ? jogadasJogadorUm : jogadasJogadorDois);

            $('#jogadorAtual').val(jogadorAtual === '1' ? '2' : '1');
        }
    });

    // Inicia um novo jogo
    $('#novoJogo').click(function () {
        jogadasJogadorUm = [];
        jogadasJogadorDois = [];
        $('.tabuleiro a').html('');
        $('#partidaAberta').val(true);
        $('#jogadorAtual').val('1');
    });

    // Adiciona a jogada ao array do jogador
    function adicionarJogadaAoJogador(jogadorAtual, jogada, jogadasDoJogador) {
        let jogadaRepetida = false;

        $.each(jogadasDoJogador, function(index, value) {
            if (value === jogada) {
                jogadaRepetida = true;
            }
        });

        if (!jogadaRepetida) {
            jogadasDoJogador.push(jogada);

            verificarSeVenceu(jogadorAtual, jogadasDoJogador);
        }
    }

    // Verifica se o jogador venceu
    function verificarSeVenceu(jogadorAtual, jogadasDoJogador) {
        $.each(resultados, function (i, resultado) {
            let jogadasCertas = 0;

            $.each(resultado, function(j, item) {
                $.each(jogadasDoJogador, function (k, jogada) {
                    if (item == jogada) {
                        jogadasCertas++;
                    }
                });

                if (jogadasCertas === 3) {
                    $('#partidaAberta').val(false);
                    $('#fimPartida .modal-body').html('O jogador ' + jogadorAtual + ' venceu!');
                    $('#fimPartida').modal();
                }
            });
        });
    }

}());