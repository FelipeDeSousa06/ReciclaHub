document.addEventListener('DOMContentLoaded', function () {

  function alternar(idGatilho, idBloco) {
    var gatilho = document.getElementById(idGatilho);
    var bloco = document.getElementById(idBloco);
    if (!gatilho || !bloco) return;

    function atualizar() {
      bloco.classList.toggle('ativo', gatilho.checked);
    }

    gatilho.addEventListener('change', atualizar);
    atualizar();
  }

  function alternarConvite(idConvite, idCheckboxRelacionado) {
    var convite = document.getElementById(idConvite);
    var checkbox = document.getElementById(idCheckboxRelacionado);
    if (!convite || !checkbox) return;

    function atualizar() {
      convite.classList.toggle('ativo', !checkbox.checked);
    }

    checkbox.addEventListener('change', atualizar);
    atualizar();

    var link = convite.querySelector('a[data-marcar]');
    if (link) {
      link.addEventListener('click', function (evento) {
        evento.preventDefault();
        var idAlvo = link.getAttribute('data-marcar');
        var alvo = document.getElementById(idAlvo);
        if (alvo) {
          alvo.checked = true;
          alvo.dispatchEvent(new Event('change'));
        }
      });
    }
  }

  alternar('perfil-doador', 'secao-doador');
  alternar('perfil-coletor', 'secao-coletor');

  alternar('coletor-fixo', 'bloco-materiais');
  alternar('coletor-itinerante', 'bloco-transporte');

  alternarConvite('convite-coletor', 'perfil-coletor');
  alternarConvite('convite-doador', 'perfil-doador');

  document.querySelectorAll('[data-navegar]').forEach(function (botao) {
    botao.addEventListener('click', function () {
      window.location.href = botao.getAttribute('data-navegar');
    });
  });

});