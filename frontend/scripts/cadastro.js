document.addEventListener('DOMContentLoaded', function () {

    var form = document.querySelector('.cadastro-form');
    if (!form) return;

    var camposObrigatorios = [
      { id: 'nome', mensagem: 'Informe seu nome completo ou razão social.' },
      { id: 'documento', mensagem: 'Informe um CPF ou CNPJ.' },
      { id: 'telefone', mensagem: 'Informe um telefone para contato.' },
      { id: 'cep', mensagem: 'Informe o CEP.' },
      { id: 'rua', mensagem: 'Informe a rua ou avenida.' },
      { id: 'numero', mensagem: 'Informe o número.' },
      { id: 'bairro', mensagem: 'Informe o bairro.' },
      { id: 'email', mensagem: 'Informe um e-mail.' },
      { id: 'senha', mensagem: 'Crie uma senha.' },
      { id: 'confirmar-senha', mensagem: 'Confirme a senha.' }
    ];

    var idsMateriais = ['material-plastico', 'material-papel', 'material-metal', 'material-vidro', 'material-eletronico'];

    function mostrarErro(id, mensagem) {
      var campo = document.getElementById(id);
      if (!campo) return;
      campo.classList.add('campo-invalido');
  
      var existente = campo.parentElement.querySelector('.mensagem-erro');
      if (!existente) {
        existente = document.createElement('span');
        existente.className = 'mensagem-erro';
        campo.insertAdjacentElement('afterend', existente);
      }
      existente.textContent = mensagem;
    }
  
    function limparErro(id) {
      var campo = document.getElementById(id);
      if (!campo) return;
      campo.classList.remove('campo-invalido');
      var existente = campo.parentElement.querySelector('.mensagem-erro');
      if (existente) existente.remove();
    }

    function mostrarErroGrupo(idContainer, mensagem) {
      var container = document.getElementById(idContainer);
      if (!container) return;
      var existente = container.querySelector('.mensagem-erro-grupo');
      if (!existente) {
        existente = document.createElement('p');
        existente.className = 'mensagem-erro-grupo';
        container.appendChild(existente);
      }
      existente.textContent = mensagem;
    }
  
    function limparErroGrupo(idContainer) {
      var container = document.getElementById(idContainer);
      if (!container) return;
      var existente = container.querySelector('.mensagem-erro-grupo');
      if (existente) existente.remove();
    }
  
    function apenasDigitos(valor) {
      return valor.replace(/\D/g, '');
    }
  
    function emailValido(valor) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }

    camposObrigatorios.forEach(function (item) {
      var campo = document.getElementById(item.id);
      if (campo) campo.addEventListener('input', function () { limparErro(item.id); });
    });
  
    var selectTransporte = document.getElementById('transporte');
    if (selectTransporte) selectTransporte.addEventListener('change', function () { limparErro('transporte'); });
  
    ['perfil-doador', 'perfil-coletor'].forEach(function (id) {
      var campo = document.getElementById(id);
      if (campo) campo.addEventListener('change', function () { limparErroGrupo('grupo-perfil-uso'); });
    });
  
    idsMateriais.forEach(function (id) {
      var campo = document.getElementById(id);
      if (campo) campo.addEventListener('change', function () { limparErroGrupo('bloco-materiais'); });
    });
  
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
  
      var valido = true;
      var primeiroCampoInvalido = null;
  
      function invalidar(id, mensagem) {
        mostrarErro(id, mensagem);
        valido = false;
        if (!primeiroCampoInvalido) primeiroCampoInvalido = document.getElementById(id);
      }

      camposObrigatorios.forEach(function (item) {
        var campo = document.getElementById(item.id);
        if (!campo) return;
        if (campo.value.trim() === '') {
          invalidar(item.id, item.mensagem);
        } else {
          limparErro(item.id);
        }
      });

      var email = document.getElementById('email');
      if (email && email.value.trim() !== '' && !emailValido(email.value.trim())) {
        invalidar('email', 'Informe um e-mail em um formato válido.');
      }

      var documento = document.getElementById('documento');
      if (documento && documento.value.trim() !== '' && apenasDigitos(documento.value).length < 11) {
        invalidar('documento', 'CPF/CNPJ incompleto — verifique os números digitados.');
      }

      var telefone = document.getElementById('telefone');
      if (telefone && telefone.value.trim() !== '' && apenasDigitos(telefone.value).length < 10) {
        invalidar('telefone', 'Informe um telefone com DDD.');
      }

      var cep = document.getElementById('cep');
      if (cep && cep.value.trim() !== '' && apenasDigitos(cep.value).length !== 8) {
        invalidar('cep', 'O CEP deve ter 8 dígitos.');
      }

      var senha = document.getElementById('senha');
      if (senha && senha.value !== '' && senha.value.length < 6) {
        invalidar('senha', 'A senha precisa ter pelo menos 6 caracteres.');
      }

      var confirmarSenha = document.getElementById('confirmar-senha');
      if (senha && confirmarSenha && senha.value !== '' && confirmarSenha.value !== '' && senha.value !== confirmarSenha.value) {
        invalidar('confirmar-senha', 'As senhas não coincidem.');
      }

      var perfilDoador = document.getElementById('perfil-doador');
      var perfilColetor = document.getElementById('perfil-coletor');
      if (perfilDoador && perfilColetor && !perfilDoador.checked && !perfilColetor.checked) {
        valido = false;
        mostrarErroGrupo('grupo-perfil-uso', 'Selecione pelo menos um perfil: Doador ou Coletor.');
      } else {
        limparErroGrupo('grupo-perfil-uso');
      }

      var coletorFixo = document.getElementById('coletor-fixo');
      if (coletorFixo && coletorFixo.checked) {
        var algumMaterial = idsMateriais.some(function (id) {
          var campo = document.getElementById(id);
          return campo && campo.checked;
        });
        if (!algumMaterial) {
          valido = false;
          mostrarErroGrupo('bloco-materiais', 'Selecione pelo menos um material aceito.');
        } else {
          limparErroGrupo('bloco-materiais');
        }
      }

      var coletorItinerante = document.getElementById('coletor-itinerante');
      var transporte = document.getElementById('transporte');
      if (coletorItinerante && coletorItinerante.checked && transporte && transporte.value === '') {
        invalidar('transporte', 'Selecione um meio de transporte.');
      }
  
      var mensagemSucesso = document.getElementById('mensagem-sucesso');
  
      if (!valido) {
        if (mensagemSucesso) mensagemSucesso.classList.remove('ativo');
        if (primeiroCampoInvalido) {
          primeiroCampoInvalido.focus();
        } else {
          var grupoComErro = form.querySelector('.mensagem-erro-grupo');
          if (grupoComErro) grupoComErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
  
      if (mensagemSucesso) {
        mensagemSucesso.classList.add('ativo');
        mensagemSucesso.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      form.reset();

      ['secao-doador', 'secao-coletor', 'bloco-materiais', 'bloco-transporte'].forEach(function (id) {
        var bloco = document.getElementById(id);
        if (bloco) bloco.classList.remove('ativo');
      });
    });
  
  });