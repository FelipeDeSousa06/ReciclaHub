# Etapa 04 — Interatividade com JavaScript

## Como executar a aplicação

O projeto é um site estático (HTML + CSS + JavaScript puro, sem build tool). Para rodar:

1. Baixe/clone o repositório mantendo a estrutura de pastas intacta (`styles/`, `scripts/`, `docs/`).
2. Abra o arquivo `index.html` diretamente no navegador — não é necessário nenhum servidor.
3. As funcionalidades desta etapa são testadas principalmente em `cadastro.html` e `perfil.html` (instruções detalhadas em cada seção abaixo).

## Descrição geral das funcionalidades interativas implementadas

Nesta etapa foi adicionado JavaScript puro (sem bibliotecas externas) em dois arquivos:

- **`scripts/script.js`** — lógica compartilhada entre várias páginas: exibição condicional de seções de formulário e os links de "convite" para assumir um segundo perfil.
- **`scripts/cadastro.js`** — lógica específica da página de cadastro: validação completa do formulário antes do envio.

Foram implementadas 3 funcionalidades interativas, descritas em detalhe a seguir.

---

## Funcionalidade 1 — Exibição condicional de seções do formulário

**Onde**: `cadastro.html`, `perfil.html`, `virar-coletor.html`
**Arquivos envolvidos**: `scripts/script.js`, `styles/style.css` (regras `.condicional` / `.condicional.ativo`)

### Como funciona

Várias seções dos formulários só fazem sentido dependendo do que o usuário marca. Por exemplo: a seção "Informações do coletor" só é relevante se a pessoa marcar "Quero coletar"; dentro dela, a lista de materiais aceitos só aparece se "Coletor fixo" estiver marcado, e o campo de meio de transporte só aparece se "Coletor itinerante" estiver marcado.

Cada seção condicional recebe a classe CSS `.condicional`, que por padrão aplica `display: none`. A função `alternar(idGatilho, idBloco)` liga um checkbox a um bloco: a cada evento `change` no checkbox, ela alterna a classe `.ativo` no bloco (`classList.toggle`). Quando `.ativo` está presente, uma regra CSS mais específica (`.condicional.ativo`) sobrescreve o `display: none` e exibe o conteúdo. A função também roda uma vez ao carregar a página, para sincronizar o estado inicial.

### Conceitos de programação utilizados

- Manipulação do DOM (`document.getElementById`, `classList.toggle`)
- Tratamento de eventos (`change`)
- Funções reutilizáveis (a mesma função atende 4 pares diferentes de checkbox/bloco, em 3 páginas distintas)
- Guarda de segurança (`if (!gatilho || !bloco) return;`) para a função não quebrar em páginas que não têm aquele par de elementos

### Como testar

1. Abra `cadastro.html`.
2. Marque "Quero coletar / represento uma cooperativa" → a seção "Informações do coletor" aparece.
3. Marque "Coletor fixo" → aparece "Quais materiais você aceita?".
4. Marque "Coletor itinerante" → aparece "Meio de transporte".
5. Desmarque qualquer um desses checkboxes → a seção correspondente some novamente.

**Evidências**: `docs/evidencias/01-condicional-cadastro-inicial.png` (estado inicial, nada marcado) e `docs/evidencias/02-condicional-cadastro-marcado.png` (com os perfis e tipos de coletor marcados, mostrando as seções reveladas).

---

## Funcionalidade 2 — Convite para assumir o outro perfil

**Onde**: `perfil.html`
**Arquivos envolvidos**: `scripts/script.js` (função `alternarConvite`)

### Como funciona

Na tela de gerenciamento de conta, se a pessoa só atua como Doador, aparece um link "Quero também atuar como coletor" (e o inverso também acontece). A lógica usa uma condição **invertida**: o convite aparece quando o checkbox do **outro** perfil está **desmarcado**.

Além de mostrar/esconder o convite, clicar no link dele marca o checkbox do outro perfil automaticamente e dispara manualmente o evento `change` (`dispatchEvent(new Event('change'))`), reaproveitando toda a lógica da Funcionalidade 1 — isso faz a seção daquele perfil aparecer e o próprio convite desaparecer, sem precisar duplicar nenhuma lógica.

### Conceitos de programação utilizados

- Manipulação do DOM (`querySelector` para localizar o link dentro do bloco de convite)
- Tratamento de eventos (`click`, além do disparo manual de um evento sintético)
- Lógica condicional invertida (`!checkbox.checked`)
- Reaproveitamento de função (chama a mesma lógica da Funcionalidade 1 indiretamente)

### Como testar

1. Abra `perfil.html`.
2. Marque apenas "Atuar como doador de resíduos".
3. Observe o link "Quero também atuar como coletor" dentro da seção "Informações de doador".
4. Clique no link → o checkbox "Atuar como coletor / cooperativa" é marcado sozinho, a seção "Informações de coletor" aparece, e o convite desaparece (porque agora os dois perfis estão ativos).

**Evidências**: `docs/evidencias/03-convite-perfil-antes.png` (antes do clique) e `docs/evidencias/04-convite-perfil-depois.png` (depois do clique).

---

## Funcionalidade 3 — Validação do formulário de cadastro

**Onde**: `cadastro.html`
**Arquivos envolvidos**: `scripts/cadastro.js`, `styles/style.css` (`.campo-invalido`, `.mensagem-erro`, `.mensagem-erro-grupo`)

### Como funciona

Ao submeter o formulário, o evento `submit` é interceptado (`event.preventDefault()`) e uma sequência de validações é executada. Para cada campo problemático, uma função (`mostrarErro`) adiciona a classe `.campo-invalido` (borda vermelha) e **cria dinamicamente** um elemento `<span class="mensagem-erro">` logo depois do campo, com a mensagem explicando o problema. Assim que o usuário começa a corrigir o campo (evento `input`), o erro é removido (`limparErro`). Para erros que não pertencem a um campo específico, mas a um grupo (ex: nenhum perfil selecionado), existe o par equivalente `mostrarErroGrupo` / `limparErroGrupo`, que insere a mensagem dentro do próprio contêiner do grupo.

Se tudo for válido, o formulário é limpo (`form.reset()`) e uma mensagem de sucesso (que também é uma seção `.condicional`, reaproveitando a Funcionalidade 1) é exibida no topo da página.

### Validações implementadas

1. Campos obrigatórios: nome, CPF/CNPJ, telefone, CEP, rua, número, bairro, e-mail, senha e confirmação de senha.
2. Formato do e-mail (expressão regular).
3. CPF/CNPJ com no mínimo 11 dígitos numéricos (ignorando pontuação).
4. Telefone com no mínimo 10 dígitos numéricos.
5. CEP com exatamente 8 dígitos.
6. Senha com no mínimo 6 caracteres.
7. Confirmação de senha idêntica à senha.
8. Pelo menos um perfil de uso selecionado (Doador ou Coletor).
9. Se "Coletor fixo" estiver marcado, pelo menos um material aceito precisa estar selecionado.
10. Se "Coletor itinerante" estiver marcado, um meio de transporte precisa estar selecionado.

### Situações inválidas tratadas

- Envio do formulário totalmente vazio.
- E-mail em formato incorreto — **inclusive um conflito real encontrado durante o teste**: o navegador tem validação nativa própria para `<input type="email">`, que interceptava o envio antes do JavaScript rodar. Foi corrigido adicionando o atributo `novalidate` ao `<form>`, tornando a validação em JavaScript a única fonte de verdade.
- CPF/CNPJ, telefone ou CEP com poucos dígitos.
- Senha curta demais, ou diferente da confirmação.
- Nenhum perfil de uso selecionado.
- "Coletor fixo" marcado sem nenhum material selecionado.
- "Coletor itinerante" marcado sem meio de transporte selecionado.
- Em qualquer um desses casos, o envio é bloqueado e o foco vai para o primeiro campo inválido (ou a página rola até o primeiro erro de grupo).

### Conceitos de programação utilizados

- Manipulação do DOM (criação e remoção de elementos com `createElement`/`insertAdjacentElement`/`remove`, `classList`)
- Tratamento de eventos (`submit`, `input`, `change`)
- Funções (`mostrarErro`, `limparErro`, `mostrarErroGrupo`, `limparErroGrupo`, `apenasDigitos`, `emailValido`)
- Arrays (`camposObrigatorios` — lista de campos obrigatórios com sua respectiva mensagem; `idsMateriais` — lista dos checkboxes de material)
- Métodos de iteração (`.forEach()` para validar cada campo da lista; `.some()` para verificar se **pelo menos um** material foi marcado)
- Expressões regulares (validação de e-mail, extração de dígitos)
- Tratamento de situações inválidas (lista acima)

### Como testar

1. Abra `cadastro.html` e clique em "Cadastrar" sem preencher nada → todos os campos obrigatórios ficam com borda vermelha e mensagem de erro, incluindo o aviso de grupo em "Perfil de uso".
2. Preencha os campos com valores propositalmente inválidos (ex: CPF "123", e-mail "email-invalido", senha "123" e confirmação "456") e marque "Coletor fixo" sem marcar nenhum material → cada regra dispara sua mensagem específica.
3. Corrija um campo qualquer → a mensagem de erro dele desaparece imediatamente.
4. Preencha tudo corretamente e envie → mensagem de sucesso aparece no topo, o formulário é limpo e as seções condicionais voltam a ficar escondidas.

**Evidências**: `docs/evidencias/05-validacao-campos-vazios.png`, `docs/evidencias/06-validacao-campos-invalidos.png` e `docs/evidencias/07-validacao-sucesso.png`.

---

## Matriz de evidências

| Requisito | Funcionalidade relacionada | Arquivo(s) | Evidência |
|---|---|---|---|
| Manipulação do DOM | Todas as 3 | `scripts/script.js`, `scripts/cadastro.js` | `classList.toggle/add/remove`; criação/remoção de elementos em `mostrarErro`/`mostrarErroGrupo` |
| Tratamento de eventos | Todas as 3 | `scripts/script.js`, `scripts/cadastro.js` | Listeners de `change` (Func. 1 e 2), `click` (Func. 2), `submit` e `input` (Func. 3) |
| Validação de formulários | Funcionalidade 3 | `scripts/cadastro.js`, `cadastro.html` | Bloco `form.addEventListener('submit', ...)`; `docs/evidencias/05-07` |
| Alteração dinâmica da interface | Todas as 3 | `scripts/script.js`, `scripts/cadastro.js` | Seções aparecendo/sumindo; mensagens de erro e de sucesso; `docs/evidencias/01-04` |
| Uso de funções | Todas as 3 | `scripts/script.js`, `scripts/cadastro.js` | `alternar`, `alternarConvite`, `mostrarErro`, `limparErro`, `mostrarErroGrupo`, `limparErroGrupo`, `apenasDigitos`, `emailValido` |
| Uso de arrays | Funcionalidade 3 | `scripts/cadastro.js` | `camposObrigatorios`, `idsMateriais` |
| Métodos de iteração | Funcionalidade 3 | `scripts/cadastro.js` | `.forEach()` em `camposObrigatorios`; `.some()` em `idsMateriais` |
| Tratamento de situações inválidas | Funcionalidade 3 | `scripts/cadastro.js` | As 10 validações listadas acima; `docs/evidencias/05-06` |

## Observação sobre a entrega

A tag Git `etapa-04` identificando esta versão deve ser criada manualmente no repositório — isso não faz parte do que pode ser gerado automaticamente nesta documentação.
